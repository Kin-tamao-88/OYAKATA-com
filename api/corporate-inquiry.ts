/**
 * 公式サイト(/about)の「法人向け集客相談」フォーム受信用エンドポイント
 *
 * POST /api/corporate-inquiry
 * Body: { company, name, email, phone?, message, consent, website?, request_id }
 *
 * LPの無料相談フォーム(VITE_CONTACT_API_URL / リード台帳)とは完全に別系統。
 * 送信先は環境変数で指定した「法人相談専用のメール通知用 Apps Script」だけで、
 * 広告用リード台帳・Meta Pixel・GA4(generate_lead)・LINEヒアリングには一切接続しない。
 *
 * 必要な環境変数(Vercel の Environment Variables に設定):
 *   CORPORATE_INQUIRY_WEBHOOK_URL    apps-script/CorporateInquiryMail.gs をデプロイしたウェブアプリのURL
 *   CORPORATE_INQUIRY_WEBHOOK_TOKEN  上記スクリプトの SHARED_TOKEN と同じ文字列
 * どちらかが未設定のときは 503 を返す(送信成功に見せない)。
 *
 * 個人情報はログに出さない(エラー種別のみ記録する)。
 */
import type { IncomingMessage, ServerResponse } from "node:http";

const UPSTREAM_TIMEOUT_MS = 20000;
const MAX_LENGTH = { company: 100, name: 60, email: 254, phone: 30, message: 3000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type VercelNodeRequest = IncomingMessage & { body?: unknown };

function jsonResponse(res: ServerResponse, status: number, body: Record<string, unknown>): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: VercelNodeRequest): Promise<Record<string, unknown> | null> {
  if (req.body !== undefined) {
    if (typeof req.body === "object" && req.body !== null) return req.body as Record<string, unknown>;
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
  let size = 0;
  for await (const chunk of req) {
    const buf = typeof chunk === "string" ? Buffer.from(chunk, "utf8") : (chunk as Buffer);
    size += buf.length;
    if (size > 50_000) return null;
    chunks.push(buf);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** 文字列に整え、制御文字を除く(メール本文のヘッダ注入対策)。複数行の項目は改行とタブだけ残す */
function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const ch of value) {
    const code = ch.codePointAt(0) ?? 0;
    const isControl = code < 0x20 || code === 0x7f;
    out += isControl && !(multiline && (code === 0x0a || code === 0x09)) ? " " : ch;
  }
  return out.trim().slice(0, max);
}

export default async function handler(req: VercelNodeRequest, res: ServerResponse): Promise<void> {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.end("Method Not Allowed");
    return;
  }

  const webhookUrl = process.env.CORPORATE_INQUIRY_WEBHOOK_URL;
  const webhookToken = process.env.CORPORATE_INQUIRY_WEBHOOK_TOKEN;
  if (!webhookUrl || !webhookToken) {
    console.error("[corporate-inquiry] missing configuration (webhook url/token)");
    jsonResponse(res, 503, {
      success: false,
      error: "現在、フォームからの送信をご利用いただけません。お手数ですが、LINEからご連絡ください。",
    });
    return;
  }

  const body = await readJsonBody(req);
  if (!body) {
    jsonResponse(res, 400, { success: false, error: "送信内容を確認できませんでした。" });
    return;
  }

  // ボット対策のおとりフィールド。入力があれば成功を装って破棄する
  if (typeof body.website === "string" && body.website !== "") {
    jsonResponse(res, 200, { success: true });
    return;
  }

  const company = clean(body.company, MAX_LENGTH.company);
  const name = clean(body.name, MAX_LENGTH.name);
  const email = clean(body.email, MAX_LENGTH.email);
  const phone = clean(body.phone, MAX_LENGTH.phone);
  const message = clean(body.message, MAX_LENGTH.message, true);
  const requestId = clean(body.request_id, 80);

  if (!company || !name || !email || !message || body.consent !== true || !EMAIL_PATTERN.test(email)) {
    jsonResponse(res, 400, { success: false, error: "入力内容をご確認ください。" });
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: webhookToken, company, name, email, phone, message, request_id: requestId }),
      signal: controller.signal,
    });
    const result = (await upstream.json()) as { success?: boolean };
    if (!upstream.ok || result.success !== true) {
      console.error("[corporate-inquiry] upstream rejected the request");
      jsonResponse(res, 502, { success: false, error: "送信に失敗しました。時間をおいて、もう一度お試しください。" });
      return;
    }
    jsonResponse(res, 200, { success: true });
  } catch (error) {
    console.error("[corporate-inquiry] upstream request failed:", error instanceof Error ? error.name : "unknown");
    jsonResponse(res, 502, { success: false, error: "送信に失敗しました。時間をおいて、もう一度お試しください。" });
  } finally {
    clearTimeout(timeoutId);
  }
}
