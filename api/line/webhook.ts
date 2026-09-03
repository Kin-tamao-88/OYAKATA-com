/**
 * LINE Messaging API Webhook
 *
 * POST /api/line/webhook
 *
 * 生のリクエストボディをそのままHMAC検証する必要があるため、
 * Web標準の Request が使える Edge Runtime を使用する。
 * （Node.js Runtime では Vercel がボディを事前パースするため生ボディを取得できない）
 */
export const config = {
  runtime: "edge",
};

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";

/** LINE Developers の「検証」で送られてくるダミーの replyToken */
const VERIFY_REPLY_TOKEN = "00000000000000000000000000000000";

/** ヒアリング開始トリガー（完全一致で判定） */
const START_TRIGGERS: readonly string[] = [
  "元請け案件を増やしたい",
  "受注・売上の減少が不安",
  "従業員・職人を増やしたい",
  "今後の集客に備えたい",
];

const Q1_TEXT = [
  "ありがとうございます！",
  "あなたに合ったご案内のため、いくつか質問させてください。",
  "",
  "Q1. どんなお仕事をされていますか？",
].join("\n");

const Q1_QUICK_REPLY_LABELS: readonly string[] = [
  "外壁・屋根塗装",
  "リフォーム",
  "工務店・建築",
  "設備・電気",
  "その他",
];

type LineWebhookEvent = {
  type?: string;
  replyToken?: string;
  message?: {
    type?: string;
    text?: string;
  };
};

type LineWebhookBody = {
  destination?: string;
  events?: LineWebhookEvent[];
};

const encoder = new TextEncoder();

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/** 長さ・内容ともに定数時間で比較する */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** x-line-signature を LINE_CHANNEL_SECRET で検証する（HMAC-SHA256 → Base64） */
async function isValidSignature(
  channelSecret: string,
  rawBody: string,
  signature: string
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(channelSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
  return timingSafeEqual(toBase64(new Uint8Array(mac)), signature);
}

function isStartTrigger(text: string): boolean {
  return START_TRIGGERS.includes(text);
}

async function replyQ1(accessToken: string, replyToken: string): Promise<void> {
  const res = await fetch(LINE_REPLY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [
        {
          type: "text",
          text: Q1_TEXT,
          quickReply: {
            items: Q1_QUICK_REPLY_LABELS.map((label) => ({
              type: "action",
              action: {
                type: "message",
                label,
                text: label,
              },
            })),
          },
        },
      ],
    }),
  });

  // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
  console.log(
    "[line/webhook][debug] reply API:",
    JSON.stringify({ status: res.status, ok: res.ok })
  );
  // --- [一時デバッグログ] ここまで ---

  if (!res.ok) {
    console.error(
      "[line/webhook] reply API failed:",
      res.status,
      await res.text()
    );
  }
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }

  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!channelSecret || !accessToken) {
    console.error("[line/webhook] missing LINE environment variables");
    return new Response("Server Configuration Error", { status: 500 });
  }

  // 署名検証のため、パース前の生ボディを取得する
  const rawBody = await request.text();
  const signature = request.headers.get("x-line-signature");

  if (!signature || !(await isValidSignature(channelSecret, rawBody, signature))) {
    return new Response("Unauthorized", { status: 401 });
  }

  // ---- ここから先は署名検証済み ----

  let body: LineWebhookBody;
  try {
    body = JSON.parse(rawBody) as LineWebhookBody;
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // Webhook URL の「検証」は events: [] で送られてくるため、そのまま 200 を返す
  const events = body.events ?? [];

  // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
  console.log(
    "[line/webhook][debug] request:",
    JSON.stringify({
      eventCount: events.length,
      // 値は出力しない。トークン前後の空白混入という設定ミスの検知のみ
      accessTokenHasSurroundingWhitespace: accessToken !== accessToken.trim(),
    })
  );
  // --- [一時デバッグログ] ここまで ---

  for (const [index, event] of events.entries()) {
    const messageType = event.message?.type;
    const rawText = event.message?.text ?? "";
    const normalizedText = rawText.trim();
    const matchedTriggerIndex = START_TRIGGERS.indexOf(normalizedText);

    // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
    console.log(
      "[line/webhook][debug] event:",
      JSON.stringify({
        index,
        eventType: event.type ?? null,
        messageType: messageType ?? null,
        text: rawText,
        textLength: rawText.length,
        trimmedLength: normalizedText.length,
        matchedTrigger: matchedTriggerIndex >= 0,
        matchedTriggerIndex,
        hasReplyToken: Boolean(event.replyToken),
        isVerifyReplyToken: event.replyToken === VERIFY_REPLY_TOKEN,
        // 完全一致しなかった場合のみ、不可視文字・異体字を特定するため出力
        codePoints:
          matchedTriggerIndex >= 0
            ? undefined
            : [...normalizedText].map((char) => char.codePointAt(0)),
      })
    );
    // --- [一時デバッグログ] ここまで ---

    if (event.type !== "message" || messageType !== "text") {
      continue;
    }

    const replyToken = event.replyToken;
    if (!replyToken || replyToken === VERIFY_REPLY_TOKEN) {
      continue;
    }

    // トリガー以外の通常メッセージには現段階では自動返信しない
    if (!isStartTrigger(normalizedText)) {
      continue;
    }

    try {
      await replyQ1(accessToken, replyToken);
    } catch (error) {
      // 返信に失敗してもLINE側の再送を招かないよう 200 を返す
      console.error("[line/webhook] reply failed:", error);
    }
  }

  return new Response("OK", { status: 200 });
}
