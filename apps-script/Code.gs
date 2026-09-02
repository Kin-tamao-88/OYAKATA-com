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

    if (!company || !name || !phone || !email || !area) {
      return jsonResponse({ success: false, error: '必須項目が不足しています。' });
    }

    var receivedAt = new Date();

    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ success: false, error: 'シートが見つかりません。' });
    }

    sheet.appendRow([receivedAt, company, name, phone, email, area, message]);

    sendNotificationEmail({
      company: company,
      name: name,
      phone: phone,
      email: email,
      area: area,
      message: message,
      receivedAt: receivedAt,
    });

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
  var formattedDate = Utilities.formatDate(d.receivedAt, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');

  var subject = '【親方ドットコム】新しい無料相談が入りました';
  var body =
    '親方ドットコムから新しいお問い合わせが入りました。\n\n' +
    '会社名：' + d.company + '\n' +
    'ご担当者名：' + d.name + '\n' +
    '電話番号：' + d.phone + '\n' +
    'メールアドレス：' + d.email + '\n' +
    'お住まいの地域：' + d.area + '\n' +
    'ご相談内容：' + (d.message || '（記入なし）') + '\n\n' +
    '受付日時：' + formattedDate;

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
