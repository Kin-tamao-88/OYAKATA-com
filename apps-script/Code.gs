/**
 * 親方ドットコム 無料相談フォーム受信用 Google Apps Script
 *
 * このファイルは Vite ビルドの対象外です。
 * Google Apps Script のエディタ（script.google.com）に貼り付けて使用してください。
 *
 * 手動設定が必要な項目は下記の SPREADSHEET_ID / SHEET_NAME です。
 */

// ── 設定値（要手動設定） ────────────────────────────
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // GoogleスプレッドシートのID（URLの /d/ と /edit の間の文字列）
const SHEET_NAME = 'シート1'; // 保存先シート名
const NOTIFY_EMAIL = 'oyakata.listing@gmail.com'; // 通知先メールアドレス
const REQUEST_ID_CACHE_SECONDS = 1800; // 同一request_idの再送信を重複保存させないための保持時間（秒）
// ──────────────────────────────────────────────

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'リクエストが不正です。' });
    }

    var data = JSON.parse(e.postData.contents);

    var company = sanitize(data.company);
    var name = sanitize(data.name);
    var phone = sanitize(data.phone);
    var email = sanitize(data.email);
    var area = sanitize(data.area);
    var message = sanitize(data.message);
    var utmSource = sanitize(data.utm_source);
    var utmMedium = sanitize(data.utm_medium);
    var utmCampaign = sanitize(data.utm_campaign);
    var utmContent = sanitize(data.utm_content);
    var utmTerm = sanitize(data.utm_term);
    var requestId = sanitize(data.request_id);

    if (!company || !name || !phone || !email || !area) {
      return jsonResponse({ success: false, error: '必須項目が不足しています。' });
    }

    var receivedAt = new Date();
    var receivedAtLabel = Utilities.formatDate(receivedAt, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');

    var cache = CacheService.getScriptCache();
    var cacheKey = requestId ? 'lead_request_' + requestId : '';
    var isDuplicate = false;

    // 同一request_idでの再送信（タイムアウト後の再送等）が同時に来ても
    // 二重にappendRowされないよう、重複チェックと保存をロックで直列化する。
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (cacheKey && cache.get(cacheKey)) {
        isDuplicate = true;
      } else {
        var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
        if (!sheet) {
          return jsonResponse({ success: false, error: 'シートが見つかりません。' });
        }

        sheet.appendRow([
          receivedAtLabel,
          company,
          name,
          phone,
          email,
          area,
          message,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
        ]);

        if (cacheKey) {
          cache.put(cacheKey, '1', REQUEST_ID_CACHE_SECONDS);
        }
      }
    } finally {
      lock.releaseLock();
    }

    if (!isDuplicate) {
      // 通知メールの送信失敗は問い合わせの保存成否に影響させない（ログにのみ残す）。
      // ただしMailApp.sendEmailは同期実行のため、doPost自体の応答時間は短縮されない点に注意。
      try {
        sendNotificationEmail({
          company: company,
          name: name,
          phone: phone,
          email: email,
          area: area,
          message: message,
          receivedAtLabel: receivedAtLabel,
          utmSource: utmSource,
          utmMedium: utmMedium,
          utmCampaign: utmCampaign,
          utmContent: utmContent,
          utmTerm: utmTerm,
        });
      } catch (mailErr) {
        console.error('通知メール送信に失敗しました: ' + mailErr);
      }
    }

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: 'サーバーエラーが発生しました。' });
  }
}

function sanitize(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function sendNotificationEmail(d) {
  var subject = '【親方ドットコム】新しい無料相談が入りました';
  var body =
    '親方ドットコムから新しいお問い合わせが入りました。\n\n' +
    '会社名：' + d.company + '\n' +
    'ご担当者名：' + d.name + '\n' +
    '電話番号：' + d.phone + '\n' +
    'メールアドレス：' + d.email + '\n' +
    'お住まいの地域：' + d.area + '\n' +
    'ご相談内容：' + (d.message || '（記入なし）') + '\n\n' +
    '流入元：' + (d.utmSource || '（なし）') + '\n' +
    '媒体：' + (d.utmMedium || '（なし）') + '\n' +
    'キャンペーン：' + (d.utmCampaign || '（なし）') + '\n' +
    'クリエイティブ（CR）：' + (d.utmContent || '（なし）') + '\n' +
    '検索語：' + (d.utmTerm || '（なし）') + '\n\n' +
    '受付日時：' + d.receivedAtLabel;

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
