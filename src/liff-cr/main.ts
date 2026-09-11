/**
 * LINE友だち追加 中継ページ（LIFF）
 *
 * Meta広告のクリエイティブ識別子（cr）をLPのsessionStorageから引き継ぎ、
 * LINE友だち追加前にLINEユーザーIDと紐付けてからLINEの友だち追加を促す。
 *
 * このページの唯一の責務は「CRとuserIdの紐付け」であり、
 * ヒアリングフロー（Q1〜Q10）やfollow Webhookには一切関与しない。
 *
 * 最優先事項は「LINE友だち追加を妨げないこと」。
 * CR紐付けに失敗しても、友だち追加の導線は必ず提供する。
 */
import liff from "@line/liff";

const LIFF_ID = import.meta.env.VITE_LIFF_ID;
const CR_API_URL = "/api/line/liff-cr";
const CR_API_TIMEOUT_MS = 4000;

/** LIFF自体が起動できない場合の最終フォールバック（通常の友だち追加URL） */
const FALLBACK_LINE_URL = "https://lin.ee/yFZ5vjU";

function setStatus(text: string): void {
  const el = document.getElementById("status");
  if (el) el.textContent = text;
}

/**
 * LIFF起動時のURLからcrパラメータを取得する。
 * LINEのLIFFリダイレクト方式により、crは以下のいずれかに入る。
 *   - そのままクエリパラメータ（?cr=cr04）
 *   - liff.state パラメータの中（LIFF IDの後ろに付与した情報が転送される場合）
 */
function readCr(): string | null {
  const query = new URLSearchParams(window.location.search);

  const direct = query.get("cr");
  if (direct) return direct;

  const state = query.get("liff.state");
  if (!state) return null;

  try {
    const decoded = decodeURIComponent(state);
    const queryIndex = decoded.indexOf("?");
    const stateQuery = queryIndex >= 0 ? decoded.slice(queryIndex + 1) : decoded;
    return new URLSearchParams(stateQuery).get("cr");
  } catch {
    return null;
  }
}

/**
 * CRをIDトークンとともにサーバーへ送信する。
 * 失敗してもここでは何もしない（友だち追加を止めないため、呼び出し側で握りつぶす）。
 */
async function reportCr(cr: string): Promise<void> {
  const idToken = liff.getIDToken();
  if (!idToken) return;

  await fetch(CR_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken, cr }),
    signal: AbortSignal.timeout(CR_API_TIMEOUT_MS),
  });
}

/** 友だち追加を促す。既に友だちの場合はLINE側が自動的にスキップする */
async function promptAddFriend(): Promise<void> {
  await liff.requestFriendship();
}

async function main(): Promise<void> {
  if (!LIFF_ID) {
    // 環境変数未設定（デプロイ設定漏れ）。通常の友だち追加導線は必ず提供する
    window.location.replace(FALLBACK_LINE_URL);
    return;
  }

  try {
    await liff.init({ liffId: LIFF_ID, withLoginOnExternalBrowser: true });
  } catch {
    // LIFF自体が起動できない環境（非対応ブラウザ等）。通常導線へ逃がす
    window.location.replace(FALLBACK_LINE_URL);
    return;
  }

  if (!liff.isLoggedIn()) {
    // withLoginOnExternalBrowser:true 指定時、外部ブラウザでは liff.init() が
    // 自動的にログイン画面へ遷移させるため、通常ここには到達しない
    setStatus("LINEにログインしています…");
    liff.login();
    return;
  }

  const cr = readCr();
  if (cr) {
    setStatus("ご案内を準備しています…");
    try {
      await reportCr(cr);
    } catch (error) {
      // CR紐付けの失敗は致命的ではない。ログにのみ残し、友だち追加へ進む
      console.error("[liff-cr] failed to report cr:", error);
    }
  }

  setStatus("友だち追加のご案内を表示します…");
  try {
    await promptAddFriend();
  } catch (error) {
    console.error("[liff-cr] requestFriendship failed:", error);
  }

  setStatus("画面を閉じて、LINEでのご案内をお待ちください。");
}

main().catch((error) => {
  // 想定外の例外。最終手段として通常の友だち追加URLへ逃がす
  console.error("[liff-cr] unexpected error:", error);
  window.location.replace(FALLBACK_LINE_URL);
});
