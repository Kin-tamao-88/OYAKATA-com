/**
 * LIFF CR（Meta広告クリエイティブ識別子）紐付け 受信用エンドポイント
 *
 * POST /api/line/liff-cr
 * Body: { idToken: string, cr: string }
 *
 * LINEプラットフォームでIDトークンを検証し、検証済みuserId（sub）をキーに
 * Upstash Redis（既存のヒアリングフローと同じ接続情報）へ cr値を一時保存する。
 *
 * このエンドポイントの成否は、呼び出し元（LIFFページ）でのLINE友だち追加を
 * 一切妨げてはならない。そのため常に軽量に失敗し、詳細はログにのみ残す。
 *
 * Node.js Runtime で動作させる（config を書かない場合の既定ランタイム）。
 * LINEの検証APIへの外部fetchを伴うため、api/line/webhook.ts と同様に
 * Edge Runtime は避ける。
 */
import type { IncomingMessage, ServerResponse } from "node:http";

const LINE_VERIFY_ENDPOINT = "https://api.line.me/oauth2/v2.1/verify";
const VERIFY_TIMEOUT_MS = 4000;
const REDIS_TIMEOUT_MS = 2000;

/** cr01 のような、2桁の数字を伴う想定フォーマットのみ受理する */
const CR_PATTERN = /^cr\d{2}$/;

/**
 * CR紐付けの保持期間。
 * LIFF起動（広告クリック直後）から実際の友だち追加完了までの時間差を吸収する。
 * ヒアリング状態（line:hearing:v1:）とは別スキーマのため独立してTTL管理する。
 */
const CR_TTL_SECONDS = 60 * 60 * 24; // 24時間

const CR_KEY_PREFIX = "line:cr:v1:";

function describeError(error: unknown): string {
  return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
}

function jsonResponse(
  res: ServerResponse,
  status: number,
  body: Record<string, unknown>
): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

// ── 状態ストア（Upstash Redis REST） ──────────────────
// api/line/webhook.ts と同一の接続情報・命名規則に合わせる

type StateStore = { url: string; token: string };

function getStateStore(): StateStore | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }
  return { url: url.replace(/\/+$/, ""), token };
}

function crKey(userId: string): string {
  return `${CR_KEY_PREFIX}${userId}`;
}

async function storeCr(store: StateStore, userId: string, cr: string): Promise<void> {
  const res = await fetch(store.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "SET",
      crKey(userId),
      cr,
      "EX",
      String(CR_TTL_SECONDS),
    ]),
    signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
  });

  const payload = (await res.json()) as { result?: unknown; error?: string };
  if (!res.ok || payload.error) {
    throw new Error(`redis SET failed (status ${res.status})`);
  }
}

// ── LINE IDトークン検証 ────────────────────────────────

type LineVerifyResult = { sub: string; aud: string };

/**
 * LINEプラットフォームでIDトークンを検証する。
 * client_id にLIFFチャネルのChannel IDを渡すことで、
 * このチャネル以外が発行したトークンやaudience不一致のトークンは
 * LINE側の検証で弾かれる。念のため戻り値のaudも呼び出し側で再確認する。
 */
async function verifyIdToken(
  idToken: string,
  channelId: string
): Promise<LineVerifyResult> {
  const res = await fetch(LINE_VERIFY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      id_token: idToken,
      client_id: channelId,
    }).toString(),
    signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
  });

  const payload = (await res.json()) as {
    sub?: string;
    aud?: string;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !payload.sub || !payload.aud) {
    throw new Error(
      `id token verification failed: ${payload.error ?? res.status} ${
        payload.error_description ?? ""
      }`
    );
  }
  if (payload.aud !== channelId) {
    throw new Error("id token audience mismatch");
  }

  return { sub: payload.sub, aud: payload.aud };
}

// ── ハンドラ本体 ─────────────────────────────────────

type VercelNodeRequest = IncomingMessage & { body?: unknown };

/** Vercel Node.js Runtime は Content-Type: application/json を自動パースするが、念のため両対応する */
async function readJsonBody(
  req: VercelNodeRequest
): Promise<Record<string, unknown> | null> {
  if (req.body !== undefined) {
    if (typeof req.body === "object" && req.body !== null) {
      return req.body as Record<string, unknown>;
    }
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body) as Record<string, unknown>;
      } catch {
        return null;
      }
    }
    return null;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export default async function handler(
  req: VercelNodeRequest,
  res: ServerResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.end("Method Not Allowed");
    return;
  }

  const channelId = process.env.LIFF_CHANNEL_ID;
  const store = getStateStore();

  if (!channelId || !store) {
    console.error(
      "[line/liff-cr] missing configuration (LIFF_CHANNEL_ID or Redis env vars)"
    );
    jsonResponse(res, 500, { ok: false, reason: "not configured" });
    return;
  }

  let body: Record<string, unknown> | null;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    console.error("[line/liff-cr] failed to read body:", describeError(error));
    jsonResponse(res, 400, { ok: false, reason: "bad request" });
    return;
  }

  const idToken = typeof body?.idToken === "string" ? body.idToken : "";
  const cr = typeof body?.cr === "string" ? body.cr : "";

  if (!idToken || !cr) {
    jsonResponse(res, 400, { ok: false, reason: "missing fields" });
    return;
  }

  // 想定フォーマット（例: cr01）以外の任意文字列は保存しない
  if (!CR_PATTERN.test(cr)) {
    console.error("[line/liff-cr] rejected cr with unexpected format");
    jsonResponse(res, 400, { ok: false, reason: "invalid cr format" });
    return;
  }

  let userId: string;
  try {
    const verified = await verifyIdToken(idToken, channelId);
    userId = verified.sub;
  } catch (error) {
    console.error(
      "[line/liff-cr] id token verification failed:",
      describeError(error)
    );
    jsonResponse(res, 401, { ok: false, reason: "unauthorized" });
    return;
  }

  try {
    await storeCr(store, userId, cr);
  } catch (error) {
    console.error("[line/liff-cr] failed to store cr:", describeError(error));
    jsonResponse(res, 500, { ok: false, reason: "storage error" });
    return;
  }

  jsonResponse(res, 200, { ok: true });
}
