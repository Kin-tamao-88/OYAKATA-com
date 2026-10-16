/**
 * 親方ドットコム 公式サイト「法人向け集客相談」メール通知用 Google Apps Script
 *
 * このファイルは Vite ビルドの対象外です。
 * script.google.com で【新規プロジェクト】を作成して貼り付けてください。
 * LPの無料相談フォーム用(Code.gs)とは別プロジェクトにします。
 *
 * ・スプレッドシートには一切保存しません(メール通知のみ)。
 * ・呼び出し元は Vercel の api/corporate-inquiry.ts だけです。
 *
 * 設定手順:
 *  1. プロジェクトの設定 > スクリプト プロパティ に SHARED_TOKEN を追加する
 *     (推測されにくい長い文字列。コードには書かない。Git にも入れない)
 *  2. デプロイ > 新しいデプロイ > 種類「ウェブアプリ」
 *       実行ユーザー: 自分 / アクセスできるユーザー: 全員
 *  3. 発行されたウェブアプリURLと SHARED_TOKEN を、Vercel の環境変数に設定
 *       CORPORATE_INQUIRY_WEBHOOK_URL   = ウェブアプリURL
 *       CORPORATE_INQUIRY_WEBHOOK_TOKEN = SHARED_TOKEN と同じ文字列
 */

// ── 設定値（要手動設定） ────────────────────────────
const NOTIFY_EMAIL = 'oyakata.listing@gmail.com'; // 通知先メールアドレス
const MAIL_SUBJECT = '【親方ドットコム公式HP】法人向け集客相談';
const REQUEST_ID_CACHE_SECONDS = 1800; // 同一request_idの再送信を二重通知しないための保持時間（秒）
// ──────────────────────────────────────────────

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false });
    }
    var data = JSON.parse(e.postData.contents);

    // トークンはスクリプトプロパティで管理する(未設定のときは全リクエストを拒否)
    var sharedToken = PropertiesService.getScriptProperties().getProperty('SHARED_TOKEN');
    if (!sharedToken || sharedToken.length < 32 || data.token !== sharedToken) {
      return jsonResponse({ success: false });
    }

    var company = String(data.company || '');
    var name = String(data.name || '');
    var email = String(data.email || '');
    var phone = String(data.phone || '');
    var message = String(data.message || '');
    var requestId = String(data.request_id || '');
    if (!company || !name || !email || !message) {
      return jsonResponse({ success: false });
    }

    var cache = CacheService.getScriptCache();
    var cacheKey = requestId ? 'corp_inquiry_' + requestId : '';
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (cacheKey && cache.get(cacheKey)) {
        return jsonResponse({ success: true }); // 再送信は二重通知しない
      }
      var receivedAtLabel = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
      var body =
        '公式サイトの「法人向け集客相談」フォームから、お問い合わせが入りました。\n\n' +
        '会社名・屋号：' + company + '\n' +
        '担当者名：' + name + '\n' +
        'メールアドレス：' + email + '\n' +
        '電話番号：' + (phone || '（記入なし）') + '\n\n' +
        '【相談したい内容】\n' + message + '\n\n' +
        '受付日時：' + receivedAtLabel;
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: MAIL_SUBJECT,
        body: body,
        replyTo: email,
      });
      if (cacheKey) cache.put(cacheKey, '1', REQUEST_ID_CACHE_SECONDS);
    } finally {
      lock.releaseLock();
    }
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
