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
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const LINE_PROFILE_ENDPOINT = "https://api.line.me/v2/bot/profile/";

/** 外部APIの待ち時間上限。maxDuration は安全余裕であり、待ち時間ではない */
const REPLY_TIMEOUT_MS = 5000;
const STATE_TIMEOUT_MS = 2000;
const SHEETS_TIMEOUT_MS = 18000;
const PROFILE_TIMEOUT_MS = 3000;

/**
 * Q10完了の台帳同期が、途中経過の同期とロックで重なったときの待機（合計10秒まで）。
 * 待っても取れなかった場合も何も捨てず、pending（未保存）のまま残して
 * 進行中の同期の後追い・次のメッセージ受信時に必ず再試行する。
 */
const FINAL_LOCK_RETRIES = 5;
const FINAL_LOCK_RETRY_WAIT_MS = 2000;

/** 最終保存がGASの一時的な混雑(busy)で失敗したときの即時再試行までの待機 */
const FINAL_BUSY_RETRY_WAIT_MS = 2000;

/** 回答処理ロックの取得待ち（合計6秒まで）。LINE返信まで含めても数秒で終わる処理にだけ使う */
const ANSWER_LOCK_RETRIES = 20;
const ANSWER_LOCK_RETRY_WAIT_MS = 300;

/** 状態の保持期間（7日）。書き込みのたびに延長される */
const STATE_TTL_SECONDS = 60 * 60 * 24 * 7;

/** 状態キーの接頭辞。スキーマ変更時は v2 に上げて旧データと分離する */
const STATE_KEY_PREFIX = "line:hearing:v1:";

/**
 * Meta広告CR（クリエイティブ識別子）紐付けのキー接頭辞。
 * api/line/liff-cr.ts が書き込み、ここでは読み取り専用として扱う。
 * スキーマはそちらと合わせて v1 とする。
 */
const CR_KEY_PREFIX = "line:cr:v1:";

/** CRが見つからない場合（自然流入・直接友だち追加）に台帳へ記録する値 */
const UNKNOWN_CR = "不明";

/**
 * 台帳同期の処理中ロック（同期どうしの排他のみを担う）。
 * 有効期間は「プロフィール3秒＋Sheets 18秒＋Redis数回」を十分に上回る値にし、
 * 通信の途中で失効して二重実行にならないようにする。Functionが異常終了しても
 * この時間で自然に失効する。
 */
const SHEET_LOCK_KEY_PREFIX = "line:hearing:sheetlock:";
const SHEET_LOCK_TTL_SECONDS = 40;

/**
 * 回答処理ロック。同一userIdの回答イベントが並列に状態を更新しないよう直列化する。
 * 保持するのは「状態の読み込み〜更新〜LINE返信」だけで、Sheets同期（GAS通信）は含めない。
 */
const ANSWER_LOCK_KEY_PREFIX = "line:hearing:answerlock:";
const ANSWER_LOCK_TTL_SECONDS = 20;

/**
 * 台帳同期の結果（保存状況・LINE表示名・CR・行番号）の保存先。
 * ヒアリング進行状態(STATE_KEY_PREFIX)とは別キーにし、同期処理が進行状態を書き換えられないようにする。
 */
const META_KEY_PREFIX = "line:hearing:meta:v1:";

/** Webhookイベントの処理済みマーク（冪等性）。LINEの再送を十分にカバーする1日保持 */
const EVENT_KEY_PREFIX = "line:hearing:event:v1:";
const EVENT_TTL_SECONDS = 60 * 60 * 24;

/** LINE Developers の「検証」で送られてくるダミーの replyToken */
const VERIFY_REPLY_TOKEN = "00000000000000000000000000000000";

/**
 * ヒアリング開始トリガー（完全一致で判定）。
 * サイト表記を「元請け」から「直請け」へ統一したため、新旧どちらの文言でも開始できるようにしている。
 * LINE公式アカウント側(リッチメニュー等)が旧文言「元請け案件を増やしたい」を送る間も、ヒアリングが止まらない。
 */
const START_TRIGGERS: readonly string[] = [
  "直請け案件を増やしたい",
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

/**
 * 台帳の行特定に使うRowKey（HMAC-SHA256, hex）を算出する際のドメイン分離用文字列。
 * 生のuserIdは台帳（Apps Script）へ一切送らないため、このハッシュ値のみを渡す。
 * セッション開始時刻(startedAt)も入力に含めることで、同一ユーザーが後日
 * 別のセッションでヒアリングをやり直した場合に別の行として扱われる
 * （過去の完了済みリードを新しいセッションが上書きしないようにするため）。
 */
const ROWKEY_HMAC_CONTEXT = "line-hearing-rowkey:v1:";

function computeRowKey(
  channelSecret: string,
  userId: string,
  startedAt: string
): string {
  return createHmac("sha256", channelSecret)
    .update(`${ROWKEY_HMAC_CONTEXT}${userId}:${startedAt}`)
    .digest("hex");
}

/**
 * 台帳の「ヒアリング進捗」列に書く値を、ヒアリング進行状態から決める。
 * 同期時点の最新stateから算出するため、呼び出し側が古い進捗を渡して台帳を巻き戻すことが無い。
 * 完了は常に "Q10完了"。日時指定の詳細待ち（q10Detail）はまだQ10が確定していない
 * 状態のため "Q10"。それ以外は「現在待っている質問の1つ前」＝直近に回答済みの質問。
 */
function progressFromState(state: HearingState): string {
  if (state.step === DONE_STEP) {
    return "Q10完了";
  }
  if (state.step === CALL_TIME_DETAIL_STEP) {
    return "Q10";
  }
  const index = QUESTIONS.findIndex((item) => item.step === state.step);
  return index > 0 ? QUESTIONS[index - 1].step.toUpperCase() : "Q1";
}

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
    text: `${Q1_INTRO}Q1. どんなお仕事をされていますか？\n👇 下から選んでください`,
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
    text: "Q3. 従業員数を教えてください。\n👇 下から選んでください",
    choices: ["ご自身のみ", "2〜5名", "6〜14名", "15名以上"],
  },
  {
    step: "q4",
    answerKey: "q4Revenue",
    text: "Q4. 現在の年商を教えてください。\n👇 下から選んでください",
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
    text: "Q5. 現在、新規のお客様はどのように獲得していますか？\n👇 下から選んでください",
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
    text: "Q6. 自社ホームページはありますか？\n👇 下から選んでください",
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
    text: "Q10. お電話可能な時間帯を教えてください。\n👇 下から選んでください",
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
type SheetStatus = "pending" | "saved";

/**
 * ヒアリング進行状態。更新してよいのは回答処理（回答処理ロック内）だけ。
 * 台帳同期は読み取り専用で扱い、決して書き戻さない（古いstateでの巻き戻し防止）。
 */
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
  /**
   * 以下は旧実装（〜2026-10-03）がこのstateへ直接書いていた台帳同期の結果。
   * 現在は SheetMeta（別キー）へ保存し、ここへは書かない。
   * 修正前から進行中だったセッションの読み出し互換のためだけに残している。
   */
  displayName?: string;
  cr?: string;
  sheetStatus?: "pending" | "saving" | "saved";
  savedAt?: string;
  savedRow?: number;
};

/** 台帳同期の結果。同期処理だけが書き込む（ヒアリング進行状態とは別キー） */
type SheetMeta = {
  /** どのセッション(HearingState.startedAt)のメタか。別セッションに引き継がないための照合用 */
  startedAt: string;
  /** LINEプロフィールの表示名。取得できるまで undefined のまま */
  displayName?: string;
  /**
   * 流入CR。台帳への初回同期（通常はQ1回答時）に一度だけRedisから読み出して確定し、
   * 以降はこの値を使い回す（再取得しない）。取得できるまで undefined のまま
   */
  cr?: string;
  sheetStatus: SheetStatus;
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

function crKey(userId: string): string {
  return `${CR_KEY_PREFIX}${userId}`;
}

/**
 * LIFF経由で紐付けられたCRを取得する。
 * 取得できない（自然流入・直接友だち追加・期限切れ）場合は UNKNOWN_CR を返す。
 * 読み取り失敗はヒアリング・台帳保存を止める理由にならないため、例外を投げない。
 */
async function loadCr(store: StateStore, userId: string): Promise<string> {
  try {
    const raw = await runStateCommand(store, "GET cr", ["GET", crKey(userId)]);
    return typeof raw === "string" && raw ? raw : UNKNOWN_CR;
  } catch (error) {
    console.error("[line/webhook] failed to load cr:", describeError(error));
    return UNKNOWN_CR;
  }
}

/**
 * 消費済みのCR紐付けを削除する。
 * 同一ユーザーが後日（TTL内に）別の広告経由で再度ヒアリングを開始した際に、
 * 古いCRが誤って引き継がれるのを防ぐ。削除失敗はTTL失効に任せるため無視する。
 */
async function deleteCr(store: StateStore, userId: string): Promise<void> {
  try {
    await runStateCommand(store, "DEL cr", ["DEL", crKey(userId)]);
  } catch (error) {
    console.error("[line/webhook] failed to delete cr:", describeError(error));
  }
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

function answerLockKey(userId: string): string {
  return `${ANSWER_LOCK_KEY_PREFIX}${userId}`;
}

function metaKey(userId: string): string {
  return `${META_KEY_PREFIX}${userId}`;
}

function eventKey(eventId: string): string {
  return `${EVENT_KEY_PREFIX}${eventId}`;
}

/**
 * 台帳同期の結果を読む。現在のセッション(state.startedAt)のものだけを有効とし、
 * 無ければ（旧実装がstateへ直接書いていた値があればそれを引き継いで）pendingから始める。
 */
async function loadMeta(
  store: StateStore,
  userId: string,
  state: HearingState
): Promise<SheetMeta> {
  const raw = await runStateCommand(store, "GET meta", ["GET", metaKey(userId)]);

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as SheetMeta;
      if (parsed.startedAt === state.startedAt) {
        return parsed;
      }
    } catch {
      // 壊れたメタは無いものとして扱い、台帳へ再同期する（RowKeyで同じ行が更新されるだけ）
    }
  }

  return {
    startedAt: state.startedAt,
    displayName: state.displayName,
    cr: state.cr,
    sheetStatus: state.sheetStatus === "saved" ? "saved" : "pending",
    savedAt: state.savedAt,
    savedRow: state.savedRow,
  };
}

async function saveMeta(
  store: StateStore,
  userId: string,
  meta: SheetMeta
): Promise<void> {
  await runStateCommand(store, "SET meta", [
    "SET",
    metaKey(userId),
    JSON.stringify(meta),
    "EX",
    String(STATE_TTL_SECONDS),
  ]);
}

/**
 * ロックを取得する。取得できれば所有トークン、できなければ null。
 * 失効後に他者が取り直したロックを誤って解放しないよう、解放はトークン一致のときだけ行う。
 */
async function acquireLock(
  store: StateStore,
  key: string,
  ttlSeconds: number
): Promise<string | null> {
  const token = randomUUID();
  const result = await runStateCommand(store, "SET NX", [
    "SET",
    key,
    token,
    "NX",
    "EX",
    String(ttlSeconds),
  ]);
  return result === null ? null : token;
}

const RELEASE_LOCK_SCRIPT =
  'if redis.call("GET", KEYS[1]) == ARGV[1] then return redis.call("DEL", KEYS[1]) else return 0 end';

async function releaseLock(
  store: StateStore,
  key: string,
  token: string
): Promise<void> {
  await runStateCommand(store, "EVAL release", [
    "EVAL",
    RELEASE_LOCK_SCRIPT,
    "1",
    key,
    token,
  ]);
}

/**
 * Webhookイベントを「処理する」と宣言する（SET NX）。
 * 初めてなら true、既に処理済み・処理中の同一イベント（LINEの再送）なら false。
 */
async function claimEvent(store: StateStore, eventId: string): Promise<boolean> {
  const result = await runStateCommand(store, "SET NX event", [
    "SET",
    eventKey(eventId),
    "1",
    "NX",
    "EX",
    String(EVENT_TTL_SECONDS),
  ]);
  return result !== null;
}

async function releaseEventClaim(
  store: StateStore,
  eventId: string
): Promise<void> {
  await runStateCommand(store, "DEL event", ["DEL", eventKey(eventId)]);
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
  state: HearingState,
  meta: SheetMeta,
  rowKey: string,
  progress: string,
  isFinal: boolean
): Promise<SheetsSaveResult> {
  const res = await fetch(endpoint.url, {
    method: "POST",
    // Apps Script は本文をそのまま受け取るため text/plain を使う
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      token: endpoint.token,
      // userId は台帳に載せないため送らない。行の特定は RowKey（非可逆ハッシュ）で行う。
      rowKey,
      progress,
      final: isFinal,
      // 行の新規作成時（R列 ヒアリング開始日時）にのみ使われる。更新時は無視される
      startedAt: state.startedAt,
      // 回答完了（Q10）時のみ。未完了時は undefined のまま送りAppsScript側でA/N列を空欄にする
      completedAt: isFinal ? state.completedAt : undefined,
      displayName: meta.displayName ?? "",
      initialConcern: state.initialConcern,
      // Meta広告クリエイティブ識別子。紐付けが無い場合は UNKNOWN_CR
      cr: meta.cr ?? UNKNOWN_CR,
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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * ヒアリング進行状態を「読み取り専用」で台帳へ同期する（作成 または RowKeyによる更新）。
 *
 * 責務の分離（2026-10-03 修正）:
 *   - この関数はヒアリング進行状態(step/answers/completedAt)を一切書き換えない。
 *     書き込むのは同期結果の SheetMeta（別キー）だけ。
 *     以前は、GAS通信前に読んだ古いstateを通信後に丸ごと書き戻していたため、通信中に
 *     次の回答が進めたstepが巻き戻り、質問が重複送信され、Q10完了も失われていた。
 *   - 同期する内容は、ロック取得後に読み直した「その時点の最新state」から毎回作る。
 *     呼び出し側が古い進捗を渡して台帳を巻き戻すことが無い。
 *   - 完了(step=done)が確定していれば、最終同期(final)として A列・M列・N列・Q列を確定する。
 *
 * 排他は2段。
 *   1. Redis のロック（同期どうしの排他。有効期間はSheetsタイムアウトより長い）
 *   2. Apps Script 側の LockService、および完了済み行を途中経過で上書きしない防御
 *
 * ロックが取れなかった場合:
 *   - 途中経過（waitForLock=false）: 次の同期が累積データを送るため、ログに残して終了する。
 *   - 最終保存（waitForLock=true）: 最大10秒待つ。それでも取れなければ pending のまま残して
 *     ログへ明示する。進行中の同期が終わった直後に自動で後追いする（allowDrain）ほか、
 *     お客様の次のメッセージ受信時にも再試行される。回答データは決して捨てない。
 *
 * ユーザーへの返信内容はこの結果に左右されない。
 */
async function syncLeadToSheets(
  store: StateStore,
  endpoint: SheetsEndpoint,
  accessToken: string,
  channelSecret: string,
  userId: string,
  waitForLock: boolean,
  allowDrain: boolean
): Promise<void> {
  let lockToken: string | null = null;
  try {
    lockToken = await acquireLock(
      store,
      sheetLockKey(userId),
      SHEET_LOCK_TTL_SECONDS
    );
    for (
      let attempt = 0;
      waitForLock && !lockToken && attempt < FINAL_LOCK_RETRIES;
      attempt++
    ) {
      await sleep(FINAL_LOCK_RETRY_WAIT_MS);
      lockToken = await acquireLock(
        store,
        sheetLockKey(userId),
        SHEET_LOCK_TTL_SECONDS
      );
    }
  } catch (error) {
    console.error(
      `[line/webhook] sheet lock failed (${waitForLock ? "final, left pending" : "progress"}):`,
      describeError(error)
    );
    return;
  }
  if (!lockToken) {
    if (waitForLock) {
      // 最終保存は捨てない。stateは完了済み・メタは未保存のままなので、後追い・次回受信で再試行される
      console.error(
        "[line/webhook] final sheets sync deferred: lock busy, left pending for retry"
      );
    } else {
      console.warn(
        "[line/webhook] progress sheets sync skipped: lock busy (later sync sends cumulative data)"
      );
    }
    return;
  }

  let finalSynced = false;
  try {
    finalSynced = await syncLockedOnce(
      store,
      endpoint,
      accessToken,
      channelSecret,
      userId
    );
  } catch (error) {
    console.error(
      "[line/webhook] sheets save error:",
      describeError(error),
      "(final data stays pending)"
    );
  } finally {
    try {
      await releaseLock(store, sheetLockKey(userId), lockToken);
    } catch (error) {
      console.error(
        "[line/webhook] failed to release sheet lock:",
        describeError(error)
      );
    }
  }

  // 途中経過の同期の最中にQ10が完了していた場合、最終保存はロック待ちで先送りされている。
  // 進行中だった同期が終わった今、自分で後追いして取りこぼしを防ぐ。
  if (allowDrain && !waitForLock && !finalSynced) {
    try {
      const latest = await loadState(store, userId);
      if (latest && latest.step === DONE_STEP && latest.completedAt) {
        const latestMeta = await loadMeta(store, userId, latest);
        if (latestMeta.sheetStatus !== "saved") {
          await syncLeadToSheets(
            store,
            endpoint,
            accessToken,
            channelSecret,
            userId,
            true,
            false
          );
        }
      }
    } catch (error) {
      console.error(
        "[line/webhook] final sheets sync drain failed:",
        describeError(error)
      );
    }
  }
}

/**
 * 同期ロックを保持した状態で、最新のヒアリング進行状態を台帳へ1回送る。
 * 最終保存まで完了したら true。ヒアリング進行状態は書き換えない（SheetMetaのみ更新）。
 */
async function syncLockedOnce(
  store: StateStore,
  endpoint: SheetsEndpoint,
  accessToken: string,
  channelSecret: string,
  userId: string
): Promise<boolean> {
  // ロック取得後に最新のヒアリング進行状態を読む（読み取り専用）
  const state = await loadState(store, userId);
  if (!state) {
    return false;
  }
  let meta = await loadMeta(store, userId, state);
  if (meta.sheetStatus === "saved") {
    return false;
  }

  const isFinal = state.step === DONE_STEP && Boolean(state.completedAt);

  // 表示名は一度取得できれば保持する。失敗した場合は undefined のまま残し、次の再試行で取り直す。
  let metaChanged = false;
  if (meta.displayName === undefined) {
    const displayName = await fetchDisplayName(accessToken, userId);
    if (displayName !== null) {
      meta = { ...meta, displayName };
      metaChanged = true;
    }
  }

  // 流入CRは初回同期時（通常はQ1）に一度だけ確定させ、以降はこの値を使い回す。
  let crLoaded = false;
  if (meta.cr === undefined) {
    meta = { ...meta, cr: await loadCr(store, userId) };
    metaChanged = true;
    crLoaded = true;
  }

  if (metaChanged) {
    await saveMeta(store, userId, meta);
  }
  if (crLoaded) {
    // 確定したCRをメタへ保存した後で、消費済みのCR紐付けを削除する。失敗してもTTLで失効する
    await deleteCr(store, userId);
  }

  const rowKey = computeRowKey(channelSecret, userId, state.startedAt);
  const progress = progressFromState(state);

  let result = await postLeadToSheets(
    endpoint,
    state,
    meta,
    rowKey,
    progress,
    isFinal
  );
  // 最終保存はGASの一時的な混雑(busy)なら1回だけ即再試行する
  if (isFinal && !result.ok && result.reason === "busy") {
    await sleep(FINAL_BUSY_RETRY_WAIT_MS);
    result = await postLeadToSheets(endpoint, state, meta, rowKey, progress, isFinal);
  }

  if (!result.ok) {
    console.error(
      `[line/webhook] sheets save failed (${isFinal ? "final, left pending" : "progress"}):`,
      result.reason
    );
    return false;
  }

  // 書くのは同期結果のメタだけ。ヒアリング進行状態には触れない
  await saveMeta(store, userId, {
    ...meta,
    sheetStatus: isFinal ? "saved" : meta.sheetStatus,
    savedAt: isFinal ? new Date().toISOString() : meta.savedAt,
    savedRow: result.row,
  });
  return isFinal;
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
  /** Webhookイベントごとに一意。LINEが再送しても同じ値になる（冪等性の判定キー） */
  webhookEventId?: string;
  deliveryContext?: { isRedelivery?: boolean };
  replyToken?: string;
  source?: { type?: string; userId?: string };
  message?: {
    id?: string;
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

/** 回答処理のあとに行う台帳同期の種類 */
type SyncRequest = "none" | "progress" | "final";

/**
 * 回答処理ロックを取得する。取得できなければ null。
 * 保持者が異常終了してもTTLで失効する。待っても取れない場合は、
 * お客様の回答を捨てないよう呼び出し側でログを残したうえでロック無しで続行する。
 */
async function acquireAnswerLock(
  store: StateStore,
  userId: string
): Promise<string | null> {
  for (let attempt = 0; attempt <= ANSWER_LOCK_RETRIES; attempt++) {
    const token = await acquireLock(
      store,
      answerLockKey(userId),
      ANSWER_LOCK_TTL_SECONDS
    );
    if (token) {
      return token;
    }
    await sleep(ANSWER_LOCK_RETRY_WAIT_MS);
  }
  return null;
}

/**
 * テキストメッセージ1件を処理する。
 * 状態の読み書きに失敗した場合は例外を投げ、呼び出し側でログに残す。
 *
 * 回答処理（状態の読み込み〜更新〜LINE返信）は同一userIdで直列化する。
 * 台帳同期（GAS通信）は回答処理ロックを解放した後に行い、次の回答を待たせない。
 */
async function handleTextMessage(
  store: StateStore,
  sheets: SheetsEndpoint | null,
  accessToken: string,
  channelSecret: string,
  userId: string,
  replyToken: string,
  text: string
): Promise<void> {
  const lockToken = await acquireAnswerLock(store, userId);
  if (!lockToken) {
    console.error(
      "[line/webhook] answer lock busy: continuing without lock to avoid dropping the answer"
    );
  }

  let syncRequest: SyncRequest;
  try {
    syncRequest = await processAnswer(store, accessToken, userId, replyToken, text);
  } finally {
    if (lockToken) {
      try {
        await releaseLock(store, answerLockKey(userId), lockToken);
      } catch (error) {
        console.error(
          "[line/webhook] failed to release answer lock:",
          describeError(error)
        );
      }
    }
  }

  if (syncRequest === "none") {
    return;
  }
  if (!sheets) {
    console.error("[line/webhook] sheets endpoint is not configured");
    return;
  }
  await syncLeadToSheets(
    store,
    sheets,
    accessToken,
    channelSecret,
    userId,
    syncRequest === "final",
    true
  );
}

/**
 * 回答1件の状態遷移とLINE返信を行う（回答処理ロックの内側で呼ぶ）。
 * ヒアリング進行状態を更新するのはここだけ。戻り値は、ロック解放後に行う台帳同期の種類。
 */
async function processAnswer(
  store: StateStore,
  accessToken: string,
  userId: string,
  replyToken: string,
  text: string
): Promise<SyncRequest> {
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
    return "none";
  }

  const state = await loadState(store, userId);

  // 進行中のヒアリングが無い場合と、完了済みの場合は自動返信しない
  if (!state || state.step === DONE_STEP) {
    // 台帳への保存が終わっていないリードがあれば、この機会に再試行する
    if (state) {
      const meta = await loadMeta(store, userId, state);
      if (meta.sheetStatus !== "saved") {
        return "final";
      }
    }
    return "none";
  }

  const question = findQuestion(state.step);
  if (!question) {
    console.error("[line/webhook] unknown step in stored state");
    return "none";
  }

  // Quick Reply の質問は想定された選択肢のみ受理し、
  // それ以外は同じ質問を出し直して回答を待つ
  if (question.choices && !question.choices.includes(text)) {
    await askQuestion(accessToken, replyToken, question);
    return "none";
  }

  // 自由入力の検証（Q9 電話番号など）
  if (!question.choices) {
    if (text.length === 0) {
      await askQuestion(accessToken, replyToken, question);
      return "none";
    }
    const result = question.validate?.(text);
    if (result && !result.ok) {
      await replyMessage(accessToken, replyToken, result.message);
      return "none";
    }
  }

  const now = new Date().toISOString();
  const step = nextStep(question, text);
  const updated: HearingState = {
    ...state,
    step,
    answers: { ...state.answers, [question.answerKey]: text },
    updatedAt: now,
    ...(step === DONE_STEP ? { completedAt: now } : {}),
  };

  // 先に回答完了状態を確定させる。
  // これにより Q10 を重複受信しても以降の処理には入らない。
  await saveState(store, userId, updated);

  if (updated.step === DONE_STEP) {
    // 台帳保存の成否・所要時間にかかわらず、ユーザーには先に完了メッセージを返す。
    // 最終保存はロック解放後に行い、未保存(pending)のうちは何度でも再試行される。
    await replyMessage(accessToken, replyToken, COMPLETION_TEXT);
    return "final";
  }

  const following = findQuestion(updated.step);
  if (!following) {
    console.error("[line/webhook] next step not found");
    return "none";
  }

  // 先に次の質問を返信し、回答テンポを変えないようにする。
  // 台帳への途中経過の同期はその後に行う（Q1回答時点で行を作成、以降は同じ行を更新）。
  await askQuestion(accessToken, replyToken, following);
  return "progress";
}

/** Webhookイベントを1回だけ処理するためのID。webhookEventIdを優先し、無ければmessage.idを使う */
function eventIdOf(event: LineWebhookEvent): string | null {
  if (event.webhookEventId) {
    return event.webhookEventId;
  }
  return event.message?.id ? `message:${event.message.id}` : null;
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

    // 同じWebhookイベントは1回だけ処理する（LINEの再送による二重保存・step二重進行・質問の二重送信を防ぐ）
    const eventId = eventIdOf(event);
    let claimed = false;
    if (eventId) {
      try {
        if (!(await claimEvent(store, eventId))) {
          console.warn(
            "[line/webhook] duplicate webhook event skipped",
            event.deliveryContext?.isRedelivery ? "(redelivery)" : ""
          );
          continue;
        }
        claimed = true;
      } catch (error) {
        // 判定できない場合は、回答を取りこぼさないよう通常どおり処理する
        console.error(
          "[line/webhook] event dedupe unavailable:",
          describeError(error)
        );
      }
    }

    try {
      await handleTextMessage(
        store,
        sheets,
        accessToken,
        channelSecret,
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
      // 処理できなかったイベントは、再送されたときに処理し直せるよう処理済みマークを外す
      if (eventId && claimed) {
        try {
          await releaseEventClaim(store, eventId);
        } catch (releaseError) {
          console.error(
            "[line/webhook] failed to release event claim:",
            describeError(releaseError)
          );
        }
      }
    }
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("OK");
}
