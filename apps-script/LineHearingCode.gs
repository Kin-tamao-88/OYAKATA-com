/**
 * 親方ドットコム LINEヒアリング完了リード 受信用 Google Apps Script
 *
 * このファイルは Vite ビルドの対象外です。
 * Google Apps Script のエディタ（script.google.com）へ貼り付けて使用してください。
 *
 * 無料相談フォーム用の Code.gs とは別プロジェクト・別スプレッドシートで運用します。
 * （既存フォームに影響を与えないため）
 *
 * 設定値はソースに直書きせず、スクリプト プロパティから読み込みます。
 * プロジェクトの設定 → スクリプト プロパティ に以下を登録してください。
 *
 *   SPREADSHEET_ID … 台帳スプレッドシートのID（URLの /d/ と /edit の間）
 *   SHEET_NAME     … 保存先シート名（例: leads）
 *   SHARED_SECRET  … Vercel の LINE_SHEETS_API_TOKEN と同じ文字列
 */

const TIMEZONE = 'Asia/Tokyo';
const DATE_FORMAT = 'yyyy/MM/dd HH:mm:ss';

/** 同時実行の排他待ち時間。呼び出し側のtimeoutより短くする */
const LOCK_WAIT_MS = 5000;

/** 台帳の列順（A列〜N列） */
const COLUMN_COUNT = 14;

function doGet() {
  // デプロイ確認用。書き込みはPOSTのみ受け付ける
  return jsonResponse({ success: false, error: 'POST only' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'bad request' });
    }

    var props = PropertiesService.getScriptProperties();
    var spreadsheetId = props.getProperty('SPREADSHEET_ID');
    var sheetName = props.getProperty('SHEET_NAME') || 'leads';
    var sharedSecret = props.getProperty('SHARED_SECRET');

    if (!spreadsheetId || !sharedSecret) {
      console.error('script properties are not configured');
      return jsonResponse({ success: false, error: 'not configured' });
    }

    var data = JSON.parse(e.postData.contents);

    // 共有シークレット検証。通過するまで一切の書き込みを行わない
    if (!secureEquals(sanitize(data.token), sharedSecret)) {
      console.error('unauthorized request rejected');
      return jsonResponse({ success: false, error: 'unauthorized' });
    }

    var userId = sanitize(data.userId);
    var completedAt = sanitize(data.completedAt);

    // 重複判定のキーになるため、この2つは必須
    if (!userId || !completedAt) {
      return jsonResponse({ success: false, error: 'invalid payload' });
    }

    var completedDate = new Date(completedAt);
    if (isNaN(completedDate.getTime())) {
      return jsonResponse({ success: false, error: 'invalid completedAt' });
    }
    var registeredAtLabel = Utilities.formatDate(completedDate, TIMEZONE, DATE_FORMAT);

    var row = [
      registeredAtLabel, // A 登録日時
      userId, // B LINE userId
      sanitize(data.initialConcern), // C 最初の悩み
      sanitize(data.q1Job), // D 業種
      sanitize(data.q2Area), // E 対応エリア
      sanitize(data.q3Employees), // F 従業員数
      sanitize(data.q4Revenue), // G 年商
      sanitize(data.q5Acquisition), // H 新規獲得方法
      sanitize(data.q6Website), // I HP状況
      sanitize(data.q7Company), // J 会社名・屋号
      sanitize(data.q8ContactName), // K 担当者名
      sanitize(data.q9Phone), // L 電話番号
      sanitize(data.q10CallTime), // M 電話希望時間
      '完了', // N 回答完了
    ];

    if (row.length !== COLUMN_COUNT) {
      console.error('column count mismatch');
      return jsonResponse({ success: false, error: 'server error' });
    }

    // 同時に届いても追記は1件だけになるよう排他する
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(LOCK_WAIT_MS)) {
      // 呼び出し側で pending のまま再試行できるよう失敗を返す
      return jsonResponse({ success: false, error: 'busy' });
    }

    try {
      var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
      if (!sheet) {
        console.error('sheet not found');
        return jsonResponse({ success: false, error: 'sheet not found' });
      }

      // (登録日時, LINE userId) が既にあれば追記しない。
      // 追記後に呼び出し側が落ちて再試行された場合の二重登録を防ぐ。
      var existingRow = findExistingRow(sheet, registeredAtLabel, userId);
      if (existingRow > 0) {
        return jsonResponse({ success: true, duplicate: true, row: existingRow });
      }

      sheet.appendRow(row);

      return jsonResponse({
        success: true,
        duplicate: false,
        row: sheet.getLastRow(),
      });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    // 個人情報を出さないため、ペイロードは一切ログに残さない
    console.error('unexpected error: ' + (err && err.name ? err.name : 'Error'));
    return jsonResponse({ success: false, error: 'server error' });
  }
}

/**
 * 同じ (登録日時, LINE userId) の行番号を返す。無ければ 0。
 * A列がテキストでも日付値でも比較できるよう正規化する。
 */
function findExistingRow(sheet, registeredAtLabel, userId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0;
  }

  var values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  for (var i = 0; i < values.length; i++) {
    var rowLabel = toDateLabel(values[i][0]);
    var rowUserId = sanitize(values[i][1]);
    if (rowLabel === registeredAtLabel && rowUserId === userId) {
      return i + 2;
    }
  }
  return 0;
}

/** セルの値を登録日時ラベルへ正規化する */
function toDateLabel(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, TIMEZONE, DATE_FORMAT);
  }
  return sanitize(value);
}

function sanitize(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

/** 文字列を定数時間で比較する */
function secureEquals(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;

  var diff = 0;
  for (var i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
