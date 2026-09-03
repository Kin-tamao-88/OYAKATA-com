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

/** 台帳の列構成（A列〜N列）。空シートの場合はこの内容を1行目へ自動作成する */
const HEADERS = [
  '登録日時',
  'LINE表示名',
  '最初の悩み',
  '業種',
  '対応エリア',
  '従業員数',
  '年商',
  '新規獲得方法',
  'HP状況',
  '会社名・屋号',
  '担当者名',
  '電話番号',
  '電話希望時間',
  '回答完了',
];

const COLUMN_COUNT = HEADERS.length;

/** 重複判定に使う列（1始まり）。A列=登録日時、L列=電話番号 */
const KEY_COLUMN_DATE = 1;
const KEY_COLUMN_PHONE = 12;

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

    var completedAt = sanitize(data.completedAt);
    if (!completedAt) {
      return jsonResponse({ success: false, error: 'invalid payload' });
    }

    var completedDate = new Date(completedAt);
    if (isNaN(completedDate.getTime())) {
      return jsonResponse({ success: false, error: 'invalid completedAt' });
    }

    var registeredAtLabel = Utilities.formatDate(completedDate, TIMEZONE, DATE_FORMAT);
    var phone = sanitize(data.q9Phone);

    var row = [
      registeredAtLabel, // A 登録日時
      sanitize(data.displayName), // B LINE表示名
      sanitize(data.initialConcern), // C 最初の悩み
      sanitize(data.q1Job), // D 業種
      sanitize(data.q2Area), // E 対応エリア
      sanitize(data.q3Employees), // F 従業員数
      sanitize(data.q4Revenue), // G 年商
      sanitize(data.q5Acquisition), // H 新規獲得方法
      sanitize(data.q6Website), // I HP状況
      sanitize(data.q7Company), // J 会社名・屋号
      sanitize(data.q8ContactName), // K 担当者名
      phone, // L 電話番号
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

      ensureHeader(sheet);

      // (登録日時, 電話番号) が既にあれば追記しない。
      // 追記後に呼び出し側が落ちて再試行された場合の二重登録を防ぐ。
      // 再試行は同じ completedAt と同じ電話番号を送るため確実に一致する。
      var existingRow = findExistingRow(sheet, registeredAtLabel, phone);
      if (existingRow > 0) {
        return jsonResponse({ success: true, duplicate: true, row: existingRow });
      }

      var targetRow = sheet.getLastRow() + 1;
      writeRow(sheet, targetRow, row);

      return jsonResponse({ success: true, duplicate: false, row: targetRow });
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
 * 空シートの場合のみ1行目へヘッダーを作成する。
 * 既に行が存在する場合は一切変更しない。
 */
function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }
  writeRow(sheet, 1, HEADERS);
}

/**
 * 1行分を書き込む。
 * 書き込み前に対象行を書式なしテキストにするため、
 * 電話番号の先頭0や登録日時がシート側の書式設定に影響されない。
 */
function writeRow(sheet, rowIndex, values) {
  var range = sheet.getRange(rowIndex, 1, 1, COLUMN_COUNT);
  range.setNumberFormat('@');
  range.setValues([values]);
}

/**
 * 同じ (登録日時, 電話番号) の行番号を返す。無ければ 0。
 * 既存行が日付値・数値で保存されていても比較できるよう正規化する。
 */
function findExistingRow(sheet, registeredAtLabel, phone) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0;
  }

  var values = sheet.getRange(2, 1, lastRow - 1, KEY_COLUMN_PHONE).getValues();
  for (var i = 0; i < values.length; i++) {
    var rowLabel = toDateLabel(values[i][KEY_COLUMN_DATE - 1]);
    var rowPhone = sanitize(values[i][KEY_COLUMN_PHONE - 1]);
    if (rowLabel === registeredAtLabel && rowPhone === phone) {
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
