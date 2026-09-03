/**
 * LINE Messaging API Webhook
 *
 * POST /api/line/webhook
 *
 * Node.js Runtime で動作させる（config を書かない場合の既定ランタイム）。
 * Edge Runtime では api.line.me への fetch が完了せず、
 * fetch 直後のログも出ないまま FUNCTION_INVOCATION_TIMEOUT(25s) になったため。
 *
 * 署名検証にはパース前の生ボディが必要なため、
 * リクエストストリームから直接バイト列を読み取って検証する。
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";

/** Reply API の待ち時間上限。Function のタイムアウトより必ず短くする */
const REPLY_TIMEOUT_MS = 7000;

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

/** Vercel Node.js Runtime が渡すリクエスト（パース済みボディが付く場合がある） */
type VercelNodeRequest = IncomingMessage & { body?: unknown };

/**
 * リクエストストリームから生ボディを読み取る。
 * 既に読み終わっているストリームを待つとハングするため、その場合は空を返す。
 */
async function readStreamBody(req: IncomingMessage): Promise<Buffer> {
  if (req.readableEnded || req.readable === false) {
    return Buffer.alloc(0);
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * 署名検証に使う生ボディ候補を返す。
 *
 * 通常はストリームから読んだバイト列をそのまま使う。
 * ランタイムがボディを事前パースしてストリームを消費していた場合に限り、
 * パース済みボディの再シリアライズを候補に加える
 * （LINE は空白なしJSONを送るため一致する）。
 * どの候補も HMAC 検証を通過する必要があるため、検証の強度は変わらない。
 */
function buildRawBodyCandidates(
  streamBody: Buffer,
  parsedBody: unknown
): Buffer[] {
  if (streamBody.length > 0) {
    return [streamBody];
  }
  if (typeof parsedBody === "string") {
    return [Buffer.from(parsedBody, "utf8")];
  }
  if (parsedBody !== null && typeof parsedBody === "object") {
    return [Buffer.from(JSON.stringify(parsedBody), "utf8")];
  }
  return [];
}

/** x-line-signature を LINE_CHANNEL_SECRET で検証する（HMAC-SHA256 / Base64） */
function isValidSignature(
  channelSecret: string,
  rawBody: Buffer,
  signature: string
): boolean {
  const expected = createHmac("sha256", channelSecret).update(rawBody).digest();
  const provided = Buffer.from(signature, "base64");

  if (provided.length !== expected.length) {
    return false;
  }
  return timingSafeEqual(provided, expected);
}

function isStartTrigger(text: string): boolean {
  return START_TRIGGERS.includes(text);
}

async function replyQ1(accessToken: string, replyToken: string): Promise<void> {
  const payload = JSON.stringify({
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
  });

  // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
  console.log(
    "[line/webhook][debug] reply: payload生成完了 → fetch開始",
    JSON.stringify({
      payloadBytes: Buffer.byteLength(payload, "utf8"),
      timeoutMs: REPLY_TIMEOUT_MS,
    })
  );
  // --- [一時デバッグログ] ここまで ---

  let res: Response;
  try {
    res = await fetch(LINE_REPLY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: payload,
      // 応答が返らない場合でも Function をハングさせない
      signal: AbortSignal.timeout(REPLY_TIMEOUT_MS),
    });
  } catch (error) {
    // タイムアウト・DNS・到達不可はここに入る
    console.error(
      "[line/webhook] reply API unreachable:",
      error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    );
    return;
  }

  // ボディを読み切ってコネクションを解放する
  const responseBody = await res.text();

  // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
  console.log(
    "[line/webhook][debug] reply API:",
    JSON.stringify({ status: res.status, ok: res.ok })
  );
  // --- [一時デバッグログ] ここまで ---

  if (!res.ok) {
    console.error("[line/webhook] reply API failed:", res.status, responseBody);
  }
}

export default async function handler(
  req: VercelNodeRequest,
  res: ServerResponse
): Promise<void> {
  // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
  console.log(
    "[line/webhook][debug] handler開始:",
    JSON.stringify({
      method: req.method ?? null,
      runtime:
        typeof (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime ===
        "undefined"
          ? "nodejs"
          : "edge",
      nodeVersion: process.version,
      hasFetch: typeof fetch === "function",
    })
  );
  // --- [一時デバッグログ] ここまで ---

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.end("Method Not Allowed");
    return;
  }

  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!channelSecret || !accessToken) {
    console.error("[line/webhook] missing LINE environment variables");
    res.statusCode = 500;
    res.end("Server Configuration Error");
    return;
  }

  // 署名検証のため、パース前の生ボディを取得する
  const streamBody = await readStreamBody(req);
  const rawBodyCandidates = buildRawBodyCandidates(streamBody, req.body);
  const signatureHeader = req.headers["x-line-signature"];
  const signature = Array.isArray(signatureHeader)
    ? signatureHeader[0]
    : signatureHeader;

  // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
  console.log(
    "[line/webhook][debug] 生ボディ取得:",
    JSON.stringify({
      streamBodyBytes: streamBody.length,
      candidateCount: rawBodyCandidates.length,
      hasSignatureHeader: Boolean(signature),
      // 値は出力しない。トークン前後の空白混入という設定ミスの検知のみ
      accessTokenHasSurroundingWhitespace: accessToken !== accessToken.trim(),
    })
  );
  // --- [一時デバッグログ] ここまで ---

  const verifiedBody = signature
    ? rawBodyCandidates.find((candidate) =>
        isValidSignature(channelSecret, candidate, signature)
      )
    : undefined;

  if (!verifiedBody) {
    res.statusCode = 401;
    res.end("Unauthorized");
    return;
  }

  // ---- ここから先は署名検証済み ----

  let body: LineWebhookBody;
  try {
    body = JSON.parse(verifiedBody.toString("utf8")) as LineWebhookBody;
  } catch {
    res.statusCode = 400;
    res.end("Bad Request");
    return;
  }

  // Webhook URL の「検証」は events: [] で送られてくるため、そのまま 200 を返す
  const events = body.events ?? [];

  // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
  console.log(
    "[line/webhook][debug] 署名検証OK:",
    JSON.stringify({ eventCount: events.length })
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

    // --- [一時デバッグログ] ここから（原因特定後に削除する） ---
    console.log(
      "[line/webhook][debug] トリガー一致 → replyQ1 呼び出し:",
      JSON.stringify({ index })
    );
    // --- [一時デバッグログ] ここまで ---

    try {
      await replyQ1(accessToken, replyToken);
    } catch (error) {
      // 返信に失敗してもLINE側の再送を招かないよう 200 を返す
      console.error("[line/webhook] reply failed:", error);
    }
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("OK");
}
