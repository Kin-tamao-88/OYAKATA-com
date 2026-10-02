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
 *
 * Q1回答時点で行を作成し、Q2〜Q10は RowKey（webhook側でuserId等から算出した
 * 非可逆ハッシュ値。生のuserIdはここへ一切送られない）で同じ行を特定して
 * 上書き更新する。A〜O列の意味・Q10完了時の最終データは従来と同一。
 *
 * P列「備考」は営業担当者が台帳へ直接手入力する自由記入欄（2026-09-28時点で
 * 実データが入っている）。このスクリプトはP列を一切読み書きしない。
 */

const TIMEZONE = 'Asia/Tokyo';
const DATE_FORMAT = 'yyyy/MM/dd HH:mm:ss';

/** 同時実行の排他待ち時間。呼び出し側のtimeoutより短くする */
const LOCK_WAIT_MS = 5000;

/** 台帳の列構成（A列〜O列）。既存の完了済みリードと意味・順序を変更しない */
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
  '流入CR',
];

/**
 * P列〜S列。P「備考」は営業担当者の手入力欄（既存シートでは既に手動作成・使用中のため、
 * このスクリプトからは一切書き込まない）。Q〜Sが今回追加する管理列で、既存行には後追いで拡張する。
 */
const EXTRA_HEADERS = [
  '備考',
  'ヒアリング進捗',
  'RowKey',
  'ヒアリング開始日時',
];

const CORE_COLUMN_COUNT = HEADERS.length; // 15（A〜O）
const COLUMN_COMPLETED = 14; // 14（N 回答完了）。完了済み行の判定に使う
const COMPLETED_LABEL = '完了';
const COLUMN_REMARKS = CORE_COLUMN_COUNT + 1; // 16（P）※書き込み禁止・営業担当の手入力専用
const COLUMN_PROGRESS = CORE_COLUMN_COUNT + 2; // 17（Q）
const COLUMN_ROWKEY = CORE_COLUMN_COUNT + 3; // 18（R）
const COLUMN_STARTED_AT = CORE_COLUMN_COUNT + 4; // 19（S）

/** webhook側がHMAC-SHA256(hex)で生成するRowKeyの形式 */
const ROWKEY_PATTERN = /^[0-9a-f]{64}$/;

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

    var rowKey = sanitize(data.rowKey);
    if (!ROWKEY_PATTERN.test(rowKey)) {
      return jsonResponse({ success: false, error: 'invalid rowKey' });
    }

    var isFinal = Boolean(data.final);
    var progress = sanitize(data.progress) || 'Q1';

    var registeredAtLabel = '';
    if (isFinal) {
      var completedAt = sanitize(data.completedAt);
      if (!completedAt) {
        return jsonResponse({ success: false, error: 'invalid payload' });
      }
      var completedDate = new Date(completedAt);
      if (isNaN(completedDate.getTime())) {
        return jsonResponse({ success: false, error: 'invalid completedAt' });
      }
      registeredAtLabel = Utilities.formatDate(completedDate, TIMEZONE, DATE_FORMAT);
    }

    // A〜O列。回答が未収集の項目は空文字のまま（列の意味・順序は従来と同一）
    var coreValues = [
      registeredAtLabel, // A 登録日時（Q10完了時のみ確定。従来と同じ挙動）
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
      sanitize(data.q9Phone), // L 電話番号
      sanitize(data.q10CallTime), // M 電話希望時間
      isFinal ? COMPLETED_LABEL : '', // N 回答完了
      sanitize(data.cr) || '不明', // O 流入CR（Meta広告クリエイティブ識別子）
    ];

    if (coreValues.length !== CORE_COLUMN_COUNT) {
      console.error('column count mismatch');
      return jsonResponse({ success: false, error: 'server error' });
    }

    // 同時に届いても行の作成・更新は1件だけになるよう排他する
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(LOCK_WAIT_MS)) {
      // 呼び出し側で再試行できるよう失敗を返す
      return jsonResponse({ success: false, error: 'busy' });
    }

    try {
      var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
      if (!sheet) {
        console.error('sheet not found');
        return jsonResponse({ success: false, error: 'sheet not found' });
      }

      ensureHeader(sheet);

      var existingRow = findRowByKey(sheet, rowKey);
      if (existingRow > 0) {
        // 完了済みの行は、遅れて届いた途中経過(非最終)の保存で未完了状態へ戻さない。
        // 最終状態は常に途中状態より優先する（A登録日時・M電話希望時間・N回答完了・Q進捗を保護）
        if (!isFinal && isRowCompleted(sheet, existingRow)) {
          return jsonResponse({ success: true, duplicate: true, row: existingRow });
        }
        // A〜O列を更新。P列(備考)は範囲に含めない＝一切触れない。
        // 開始日時のS列は初回のみのため触れない＝以降変更しない
        writeRow(sheet, existingRow, coreValues);
        writeRange(sheet, existingRow, COLUMN_PROGRESS, [progress, rowKey]);
        return jsonResponse({ success: true, duplicate: false, row: existingRow });
      }

      var targetRow = sheet.getLastRow() + 1;
      var startedAtLabel = toDateLabelFromIso(sanitize(data.startedAt));
      // A〜O列を作成。P列(備考)は範囲に含めない＝空欄のまま営業担当の手入力に委ねる
      writeRow(sheet, targetRow, coreValues);
      writeRange(sheet, targetRow, COLUMN_PROGRESS, [progress, rowKey, startedAtLabel]);

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
 * ヘッダーを用意する。
 * 空シートなら1行目へA〜S列すべてを作成する（P列「備考」を含む）。
 * 既にデータがある既存シートの場合は、P〜S列それぞれについて
 * ヘッダーが未設定の列だけを個別に補完する。
 * P列はこの台帳では既に「備考」が手動作成・使用済みのため、
 * 中身が入っている列を上書きすることは無い（＝重複作成しない）。
 */
function ensureHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    writeRow(sheet, 1, HEADERS.concat(EXTRA_HEADERS));
    return;
  }

  // 毎回の呼び出しで走るため、P〜S列のヘッダーは1回でまとめて読む（応答時間短縮）
  var current = sheet.getRange(1, COLUMN_REMARKS, 1, EXTRA_HEADERS.length).getValues()[0];
  for (var i = 0; i < EXTRA_HEADERS.length; i++) {
    if (sanitize(current[i]) === '') {
      sheet.getRange(1, COLUMN_REMARKS + i).setValue(EXTRA_HEADERS[i]);
    }
  }
}

/**
 * A〜O列（15列）を書き込む。
 * 書き込み前に対象範囲を書式なしテキストにするため、
 * 電話番号の先頭0や日時がシート側の書式設定に影響されない。
 */
function writeRow(sheet, rowIndex, values) {
  writeRange(sheet, rowIndex, 1, values);
}

/**
 * 指定した開始列から連続する値を書き込む。
 * P列(備考)は呼び出し元が範囲に含めない限り触れられない。
 */
function writeRange(sheet, rowIndex, startColumn, values) {
  var range = sheet.getRange(rowIndex, startColumn, 1, values.length);
  range.setNumberFormat('@');
  range.setValues([values]);
}

/**
 * RowKey（R列）が一致する行番号を返す。無ければ 0。
 * RowKeyはwebhook側でuserId等から生成した非可逆ハッシュ値であり、
 * 生のuserIdはこのシートへ一切送られない。
 */
function findRowByKey(sheet, rowKey) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0;
  }

  var values = sheet.getRange(2, COLUMN_ROWKEY, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (sanitize(values[i][0]) === rowKey) {
      return i + 2;
    }
  }
  return 0;
}

/** 対象行の「回答完了」(N列)が完了になっているか */
function isRowCompleted(sheet, rowIndex) {
  return sanitize(sheet.getRange(rowIndex, COLUMN_COMPLETED).getValue()) === COMPLETED_LABEL;
}

/** ISO日時文字列をシート表示用ラベルへ変換する。不正・空なら空文字 */
function toDateLabelFromIso(isoString) {
  if (!isoString) {
    return '';
  }
  var date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return '';
  }
  return Utilities.formatDate(date, TIMEZONE, DATE_FORMAT);
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
