/**
 * LINE Messaging API Webhook（ヒアリング Q1〜Q10 → 営業台帳へ保存）
 *
 * POST /api/line/webhook
 *
 * Node.js Runtime で動作させる（config を書かない場合の既定ランタイム）。
 * Edge Runtime では api.line.me への fetch が完了せず、
 * fetch 直後のログも出ないまま FUNCTION_INVOCATION_TIMEOUT(25s) になったため。
 *
 * 署名検証にはパース前の生ボディが必要なため、
 * リクエストストリームから直接バイト列を読み取って検証する。
 *
 * 状態管理は役割を分ける。
 *   Upstash Redis … ヒアリング途中の一時状態と保存状況(pending/saving/saved)
 *   Google Sheets … 回答完了リードの営業用台帳（Apps Script経由）
 *
 * Vercel Functions はリクエスト間でメモリが永続化される保証がないため、
 * グローバル変数やインメモリ Map は状態管理に使わない。
 *
 * ログは障害調査に必要なものだけを出す。個人情報・認証情報は一切出力しない。
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const LINE_PROFILE_ENDPOINT = "https://api.line.me/v2/bot/profile/";

/** 外部APIの待ち時間上限。maxDuration は安全余裕であり、待ち時間ではない */
const REPLY_TIMEOUT_MS = 5000;
const STATE_TIMEOUT_MS = 2000;
const SHEETS_TIMEOUT_MS = 7000;
const PROFILE_TIMEOUT_MS = 3000;

/** 状態の保持期間（7日）。書き込みのたびに延長される */
const STATE_TTL_SECONDS = 60 * 60 * 24 * 7;

/** 状態キーの接頭辞。スキーマ変更時は v2 に上げて旧データと分離する */
const STATE_KEY_PREFIX = "line:hearing:v1:";

/**
 * 台帳保存の処理中ロック。
 * 保存済みかどうかは sheetStatus が持ち、このロックは同時実行の排他のみを担う。
 * 処理時間（最大でも プロフィール3秒＋Sheets 7秒＋Redis 数回）を十分上回り、
 * 異常終了しても短時間で失効して再試行を妨げない値にする。
 */
const SHEET_LOCK_KEY_PREFIX = "line:hearing:sheetlock:";
const SHEET_LOCK_TTL_SECONDS = 15;

/** LINE Developers の「検証」で送られてくるダミーの replyToken */
const VERIFY_REPLY_TOKEN = "00000000000000000000000000000000";

/** ヒアリング開始トリガー（完全一致で判定） */
const START_TRIGGERS: readonly string[] = [
  "元請け案件を増やしたい",
  "受注・売上の減少が不安",
  "従業員・職人を増やしたい",
  "今後の集客に備えたい",
];

const Q1_INTRO = [
  "ありがとうございます！",
  "あなたに合ったご案内のため、いくつか質問させてください。",
  "",
].join("\n");

const COMPLETION_TEXT = [
  "ご回答ありがとうございました！",
  "",
  "内容を確認のうえ、担当者よりご連絡いたします。",
  "ご相談内容について追加で伝えておきたいことがございましたら、",
  "このままトーク画面からお気軽にお送りください。",
].join("\n");

const PHONE_RETRY_TEXT = [
  "電話番号をもう一度ご入力ください。",
  "例：090-1234-5678",
].join("\n");

/** Q10でこの選択肢を選んだ場合のみ、具体的な希望日時を追加で聞く */
const CALL_TIME_DETAIL_CHOICE = "日時を指定したい";
const CALL_TIME_DETAIL_STEP = "q10Detail";

// ── 質問定義 ──────────────────────────────────────────

type AnswerKey =
  | "q1Job"
  | "q2Area"
  | "q3Employees"
  | "q4Revenue"
  | "q5Acquisition"
  | "q6Website"
  | "q7Company"
  | "q8ContactName"
  | "q9Phone"
  | "q10CallTime";

type Question = {
  /** この質問の回答を待っている状態を表すキー */
  step: string;
  answerKey: AnswerKey;
  text: string;
  /** 指定時は Quick Reply。この選択肢と完全一致した入力のみ受理する */
  choices?: readonly string[];
  /** 自由入力の追加検証。未指定なら空でなければ受理 */
  validate?: (input: string) => { ok: true } | { ok: false; message: string };
  /** 特定の回答のときだけ、通常の次の質問ではなく指定の質問へ進む */
  branchOn?: { answer: string; step: string };
};

const QUESTIONS: readonly Question[] = [
  {
    step: "q1",
    answerKey: "q1Job",
    text: `${Q1_INTRO}Q1. どんなお仕事をされていますか？`,
    choices: [
      "外壁・屋根塗装",
      "リフォーム",
      "工務店・建築",
      "設備・電気",
      "その他",
    ],
  },
  {
    step: "q2",
    answerKey: "q2Area",
    text: "Q2. 主な対応エリアを教えてください。\n\n例：東京都、神奈川県",
  },
  {
    step: "q3",
    answerKey: "q3Employees",
    text: "Q3. 従業員数を教えてください。",
    choices: ["ご自身のみ", "2〜5名", "6〜14名", "15名以上"],
  },
  {
    step: "q4",
    answerKey: "q4Revenue",
    text: "Q4. 現在の年商を教えてください。",
    choices: [
      "〜1,000万円",
      "1,000〜3,000万円",
      "3,000〜5,000万円",
      "5,000万円〜1億円",
      "1億円以上",
    ],
  },
  {
    step: "q5",
    answerKey: "q5Acquisition",
    text: "Q5. 現在、新規のお客様はどのように獲得していますか？",
    choices: [
      "紹介・口コミが中心",
      "下請け案件が中心",
      "ポータルサイト",
      "Google・SNSなどWeb集客",
      "特に集客していない",
    ],
  },
  {
    step: "q6",
    answerKey: "q6Website",
    text: "Q6. 自社ホームページはありますか？",
    choices: ["ある", "ない", "あるが、ほぼ活用できていない"],
  },
  {
    step: "q7",
    answerKey: "q7Company",
    text: "Q7. 会社名・屋号を教えてください。",
  },
  {
    step: "q8",
    answerKey: "q8ContactName",
    text: "Q8. ご担当者名を教えてください。",
  },
  {
    step: "q9",
    answerKey: "q9Phone",
    text: "Q9. ご連絡先のお電話番号を教えてください。",
    validate: (input) =>
      isValidJapanesePhone(input)
        ? { ok: true }
        : { ok: false, message: PHONE_RETRY_TEXT },
  },
  {
    step: "q10",
    answerKey: "q10CallTime",
    text: "Q10. お電話可能な時間帯を教えてください。",
    choices: ["午前", "12〜15時", "15〜18時", "18時以降", "日時を指定したい"],
    // 「日時を指定したい」のときだけ完了させず、具体的な希望日時を聞く
    branchOn: { answer: CALL_TIME_DETAIL_CHOICE, step: CALL_TIME_DETAIL_STEP },
  },
];

/**
 * Q10で「日時を指定したい」が選ばれたときだけ聞く追加質問。
 * 回答は q10CallTime を上書きするため、台帳の「電話希望時間」列には
 * 選択肢ではなくユーザーが入力した具体的な希望日時が入る。
 */
const CALL_TIME_DETAIL_QUESTION: Question = {
  step: CALL_TIME_DETAIL_STEP,
  answerKey: "q10CallTime",
  text: "承知しました。ご希望の日時を教えてください。",
};

/** 通常フローの質問に、分岐先の追加質問を加えた全質問 */
const ALL_QUESTIONS: readonly Question[] = [
  ...QUESTIONS,
  CALL_TIME_DETAIL_QUESTION,
];

const DONE_STEP = "done";

function findQuestion(step: string): Question | undefined {
  return ALL_QUESTIONS.find((question) => question.step === step);
}

function nextStep(question: Question, answer: string): string {
  if (question.branchOn && question.branchOn.answer === answer) {
    return question.branchOn.step;
  }
  // 分岐先の追加質問は通常フローに含まれないため、回答した時点で完了する
  const index = QUESTIONS.findIndex((item) => item.step === question.step);
  if (index < 0) {
    return DONE_STEP;
  }
  return QUESTIONS[index + 1]?.step ?? DONE_STEP;
}

function describeError(error: unknown): string {
  return error instanceof Error
    ? `${error.name}: ${error.message}`
    : String(error);
}

// ── 電話番号バリデーション ────────────────────────────

/** 全角数字を半角へ、ハイフン・空白・括弧を除去。+81 は 0 に置換する */
function normalizePhone(raw: string): string {
  const halfWidth = raw.replace(/[０-９＋]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0xfee0)
  );
  const stripped = halfWidth.replace(/[\s　()（）.\-‐‑‒–—―ー－ｰ]/g, "");
  return stripped.startsWith("+81") ? `0${stripped.slice(3)}` : stripped;
}

/**
 * 日本国内の電話番号として妥当かを判定する。
 * ハイフンあり・なしの両方を許容する。
 * - 11桁: 050 / 070 / 080 / 090 で始まる番号
 * - 10桁: 0 で始まる固定電話・0120 等（携帯プレフィックスは除外）
 */
function isValidJapanesePhone(raw: string): boolean {
  const digits = normalizePhone(raw);

  if (!/^\d+$/.test(digits)) {
    return false;
  }
  // 0000000000 のような明らかに不自然な入力を弾く
  if (/^(\d)\1+$/.test(digits)) {
    return false;
  }

  const isMobile = /^0[5789]0\d{8}$/.test(digits);
  const isLandline = /^0(?![5789]0)\d{9}$/.test(digits);
  return isMobile || isLandline;
}

// ── 状態ストア（Upstash Redis REST） ──────────────────

/** 台帳への保存状況 */
type SheetStatus = "pending" | "saving" | "saved";

type HearingState = {
  /** 開始トリガーで選ばれた4択 */
  initialConcern: string;
  /** 現在回答を待っている質問。全問完了後は "done" */
  step: string;
  answers: Partial<Record<AnswerKey, string>>;
  startedAt: string;
  updatedAt: string;
  /** Q10受理時刻。台帳の登録日時と重複判定キーを兼ねる */
  completedAt?: string;
  /** LINEプロフィールの表示名。取得できるまで undefined のまま */
  displayName?: string;
  sheetStatus?: SheetStatus;
  savedAt?: string;
  savedRow?: number;
};

type StateStore = { url: string; token: string };

/**
 * Upstash の接続情報を返す。
 * Vercel Marketplace 経由なら KV_*、Upstash コンソール直接作成なら UPSTASH_* の
 * 名前で環境変数が入るため、どちらも受け付ける。
 */
function getStateStore(): StateStore | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }
  return { url: url.replace(/\/+$/, ""), token };
}

async function runStateCommand(
  store: StateStore,
  label: string,
  command: string[]
): Promise<unknown> {
  const res = await fetch(store.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(STATE_TIMEOUT_MS),
  });

  const payload = (await res.json()) as { result?: unknown; error?: string };

  if (!res.ok || payload.error) {
    throw new Error(`state store ${label} failed (status ${res.status})`);
  }
  return payload.result;
}

function stateKey(userId: string): string {
  return `${STATE_KEY_PREFIX}${userId}`;
}

function sheetLockKey(userId: string): string {
  return `${SHEET_LOCK_KEY_PREFIX}${userId}`;
}

async function loadState(
  store: StateStore,
  userId: string
): Promise<HearingState | null> {
  const raw = await runStateCommand(store, "GET", ["GET", stateKey(userId)]);

  if (typeof raw !== "string") {
    return null;
  }
  try {
    return JSON.parse(raw) as HearingState;
  } catch {
    // 壊れたデータは無いものとして扱い、次の開始トリガーで作り直す
    return null;
  }
}

async function saveState(
  store: StateStore,
  userId: string,
  state: HearingState
): Promise<void> {
  await runStateCommand(store, "SET", [
    "SET",
    stateKey(userId),
    JSON.stringify(state),
    "EX",
    String(STATE_TTL_SECONDS),
  ]);
}

/** 台帳保存の処理中ロックを取得する。取得できなければ false */
async function acquireSheetLock(
  store: StateStore,
  userId: string
): Promise<boolean> {
  const result = await runStateCommand(store, "SET NX", [
    "SET",
    sheetLockKey(userId),
    "1",
    "NX",
    "EX",
    String(SHEET_LOCK_TTL_SECONDS),
  ]);
  return result !== null;
}

async function releaseSheetLock(
  store: StateStore,
  userId: string
): Promise<void> {
  await runStateCommand(store, "DEL", ["DEL", sheetLockKey(userId)]);
}

// ── 営業台帳（Apps Script 経由の Google Sheets） ───────

type SheetsEndpoint = { url: string; token: string };

type SheetsSaveResult =
  | { ok: true; duplicate: boolean; row?: number }
  | { ok: false; reason: string };

function getSheetsEndpoint(): SheetsEndpoint | null {
  const url = process.env.LINE_SHEETS_API_URL;
  const token = process.env.LINE_SHEETS_API_TOKEN;

  if (!url || !token) {
    return null;
  }
  return { url, token };
}

/**
 * LINEプロフィールから表示名を取得する。
 * 営業台帳には userId ではなく表示名を載せるため。
 * 取得に失敗しても例外は投げない（ヒアリングと台帳保存を止めないため）。
 */
async function fetchDisplayName(
  accessToken: string,
  userId: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `${LINE_PROFILE_ENDPOINT}${encodeURIComponent(userId)}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(PROFILE_TIMEOUT_MS),
      }
    );

    if (!res.ok) {
      await res.text();
      console.error("[line/webhook] profile API failed:", res.status);
      return null;
    }

    const payload = (await res.json()) as { displayName?: unknown };
    return typeof payload.displayName === "string" ? payload.displayName : null;
  } catch (error) {
    console.error(
      "[line/webhook] profile API unreachable:",
      describeError(error)
    );
    return null;
  }
}

async function postLeadToSheets(
  endpoint: SheetsEndpoint,
  state: HearingState
): Promise<SheetsSaveResult> {
  const res = await fetch(endpoint.url, {
    method: "POST",
    // Apps Script は本文をそのまま受け取るため text/plain を使う
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      token: endpoint.token,
      // userId は台帳に載せないため送らない。
      // 重複判定は Apps Script 側で (登録日時, 電話番号) により行う。
      completedAt: state.completedAt,
      displayName: state.displayName ?? "",
      initialConcern: state.initialConcern,
      ...state.answers,
    }),
    signal: AbortSignal.timeout(SHEETS_TIMEOUT_MS),
  });

  if (!res.ok) {
    return { ok: false, reason: `http ${res.status}` };
  }

  let payload: { success?: boolean; duplicate?: boolean; row?: number; error?: string };
  try {
    payload = (await res.json()) as typeof payload;
  } catch {
    // デプロイ未完了などで HTML が返るケース
    return { ok: false, reason: "invalid response" };
  }

  if (!payload.success) {
    return { ok: false, reason: payload.error ?? "unknown" };
  }
  return {
    ok: true,
    duplicate: Boolean(payload.duplicate),
    row: payload.row,
  };
}

/**
 * 回答完了リードを台帳へ保存する。
 *
 * 重複保存は3段で防ぐ。
 *   1. sheetStatus === "saved" なら二度と送らない（恒久的な事実）
 *   2. Redis の NX ロックで同時実行を1つに絞る（短命・finallyで必ず解放）
 *   3. Apps Script 側が (登録日時, userId) で行を照合し追記しない
 *
 * 失敗しても回答データは消さず sheetStatus を pending に戻して再試行可能にする。
 * ユーザーへの返信内容はこの結果に左右されない。
 */
async function saveLeadToSheets(
  store: StateStore,
  endpoint: SheetsEndpoint,
  accessToken: string,
  userId: string,
  state: HearingState
): Promise<void> {
  if (state.sheetStatus === "saved" || !state.completedAt) {
    return;
  }

  let locked = false;
  try {
    locked = await acquireSheetLock(store, userId);
  } catch (error) {
    console.error("[line/webhook] sheet lock failed:", describeError(error));
    return;
  }
  if (!locked) {
    // 他のインスタンスが処理中。追記は1件だけに保たれる
    return;
  }

  let current = state;
  try {
    // ロック取得後に最新状態を読み直す（取得前に保存済みになっていた場合の対策）
    const fresh = await loadState(store, userId);
    if (fresh) {
      current = fresh;
    }
    if (current.sheetStatus === "saved" || !current.completedAt) {
      return;
    }

    // 表示名は一度取得できれば状態に保持する。
    // 失敗した場合は undefined のまま残し、次の再試行で取り直す。
    if (current.displayName === undefined) {
      const displayName = await fetchDisplayName(accessToken, userId);
      if (displayName !== null) {
        current = { ...current, displayName };
      }
    }

    await saveState(store, userId, { ...current, sheetStatus: "saving" });

    const result = await postLeadToSheets(endpoint, current);

    if (result.ok) {
      await saveState(store, userId, {
        ...current,
        sheetStatus: "saved",
        savedAt: new Date().toISOString(),
        savedRow: result.row,
      });
      return;
    }

    console.error("[line/webhook] sheets save failed:", result.reason);
    await saveState(store, userId, { ...current, sheetStatus: "pending" });
  } catch (error) {
    console.error("[line/webhook] sheets save error:", describeError(error));
    try {
      await saveState(store, userId, { ...current, sheetStatus: "pending" });
    } catch (nested) {
      console.error(
        "[line/webhook] failed to reset sheetStatus:",
        describeError(nested)
      );
    }
  } finally {
    try {
      await releaseSheetLock(store, userId);
    } catch (error) {
      console.error(
        "[line/webhook] failed to release sheet lock:",
        describeError(error)
      );
    }
  }
}

// ── LINE 返信 ────────────────────────────────────────

async function replyMessage(
  accessToken: string,
  replyToken: string,
  text: string,
  choices?: readonly string[]
): Promise<void> {
  const message: Record<string, unknown> = { type: "text", text };

  if (choices) {
    message.quickReply = {
      items: choices.map((label) => ({
        type: "action",
        action: { type: "message", label, text: label },
      })),
    };
  }

  let res: Response;
  try {
    res = await fetch(LINE_REPLY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ replyToken, messages: [message] }),
      // 応答が返らない場合でも Function をハングさせない
      signal: AbortSignal.timeout(REPLY_TIMEOUT_MS),
    });
  } catch (error) {
    console.error(
      "[line/webhook] reply API unreachable:",
      describeError(error)
    );
    return;
  }

  // ボディを読み切ってコネクションを解放する
  const responseBody = await res.text();

  if (!res.ok) {
    console.error("[line/webhook] reply API failed:", res.status, responseBody);
  }
}

async function askQuestion(
  accessToken: string,
  replyToken: string,
  question: Question
): Promise<void> {
  await replyMessage(accessToken, replyToken, question.text, question.choices);
}

// ── Webhook 本体 ─────────────────────────────────────

type LineWebhookEvent = {
  type?: string;
  replyToken?: string;
  source?: { type?: string; userId?: string };
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

/**
 * テキストメッセージ1件を処理する。
 * 状態の読み書きに失敗した場合は例外を投げ、呼び出し側でログに残す。
 */
async function handleTextMessage(
  store: StateStore,
  sheets: SheetsEndpoint | null,
  accessToken: string,
  userId: string,
  replyToken: string,
  text: string
): Promise<void> {
  // 開始トリガーはいつ送られても最初からやり直す
  if (isStartTrigger(text)) {
    const now = new Date().toISOString();
    const firstQuestion = QUESTIONS[0];

    await saveState(store, userId, {
      initialConcern: text,
      step: firstQuestion.step,
      answers: {},
      startedAt: now,
      updatedAt: now,
    });

    await askQuestion(accessToken, replyToken, firstQuestion);
    return;
  }

  const state = await loadState(store, userId);

  // 進行中のヒアリングが無い場合と、完了済みの場合は自動返信しない
  if (!state || state.step === DONE_STEP) {
    // 台帳への保存が終わっていないリードがあれば、この機会に再試行する
    if (state && state.sheetStatus !== "saved" && sheets) {
      await saveLeadToSheets(store, sheets, accessToken, userId, state);
    }
    return;
  }

  const question = findQuestion(state.step);
  if (!question) {
    console.error("[line/webhook] unknown step in stored state");
    return;
  }

  // Quick Reply の質問は想定された選択肢のみ受理し、
  // それ以外は同じ質問を出し直して回答を待つ
  if (question.choices && !question.choices.includes(text)) {
    await askQuestion(accessToken, replyToken, question);
    return;
  }

  // 自由入力の検証（Q9 電話番号など）
  if (!question.choices) {
    if (text.length === 0) {
      await askQuestion(accessToken, replyToken, question);
      return;
    }
    const result = question.validate?.(text);
    if (result && !result.ok) {
      await replyMessage(accessToken, replyToken, result.message);
      return;
    }
  }

  const now = new Date().toISOString();
  const step = nextStep(question, text);
  const updated: HearingState = {
    ...state,
    step,
    answers: { ...state.answers, [question.answerKey]: text },
    updatedAt: now,
    ...(step === DONE_STEP
      ? { completedAt: now, sheetStatus: "pending" as const }
      : {}),
  };

  // 先に回答完了状態を確定させる。
  // これにより Q10 を重複受信しても以降の処理には入らない。
  await saveState(store, userId, updated);

  if (updated.step === DONE_STEP) {
    if (sheets) {
      await saveLeadToSheets(store, sheets, accessToken, userId, updated);
    } else {
      console.error("[line/webhook] sheets endpoint is not configured");
    }

    // 台帳保存の成否にかかわらず、ユーザーには完了メッセージを返す
    await replyMessage(accessToken, replyToken, COMPLETION_TEXT);
    return;
  }

  const following = findQuestion(updated.step);
  if (!following) {
    console.error("[line/webhook] next step not found");
    return;
  }

  await askQuestion(accessToken, replyToken, following);
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

  const verifiedBody = signature
    ? rawBodyCandidates.find((candidate) =>
        isValidSignature(channelSecret, candidate, signature)
      )
    : undefined;

  if (!verifiedBody) {
    console.error("[line/webhook] signature verification failed");
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
  const store = getStateStore();
  const sheets = getSheetsEndpoint();

  if (events.length > 0 && !store) {
    // 状態を保存できない状態で会話を始めると途中で破綻するため、返信しない
    console.error(
      "[line/webhook] state store is not configured " +
        "(KV_REST_API_URL / KV_REST_API_TOKEN)"
    );
    res.statusCode = 200;
    res.end("OK");
    return;
  }

  for (const event of events) {
    if (event.type !== "message" || event.message?.type !== "text") {
      continue;
    }

    const replyToken = event.replyToken;
    if (!replyToken || replyToken === VERIFY_REPLY_TOKEN) {
      continue;
    }

    // 1対1トーク以外は userId が取れず状態管理できないため対象外
    const userId = event.source?.userId;
    if (!userId || !store) {
      continue;
    }

    try {
      await handleTextMessage(
        store,
        sheets,
        accessToken,
        userId,
        replyToken,
        (event.message.text ?? "").trim()
      );
    } catch (error) {
      // 失敗してもLINE側の再送を招かないよう 200 を返す
      console.error(
        "[line/webhook] failed to handle message:",
        describeError(error)
      );
    }
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("OK");
}
