import { getStoredUtmParams } from "./utm";

/**
 * 通常のLINE友だち追加URL。
 * LIFF IDが未設定（環境変数未設定）の場合のフォールバックとして使う。
 * LINE追加の導線自体は、CR紐付けの成否に関わらず必ず提供する。
 */
const FALLBACK_LINE_URL = "https://lin.ee/yFZ5vjU";

/**
 * LINE CTAのリンク先を組み立てる。
 *
 * sessionStorageに保存済みのutm_content（Meta広告のCR識別子。例: cr04）を
 * LIFF起動パラメータへ引き継ぎ、LIFF側でLINEユーザーIDと紐付けられるようにする。
 * utm_contentが無い場合（自然流入等）は、crパラメータなしでLIFFを起動する。
 */
export function buildLineCtaHref(): string {
  const liffId = import.meta.env.VITE_LIFF_ID;
  if (!liffId) return FALLBACK_LINE_URL;

  const { utm_content } = getStoredUtmParams();
  if (!utm_content) return `https://liff.line.me/${liffId}`;

  const params = new URLSearchParams({ cr: utm_content });
  return `https://liff.line.me/${liffId}?${params.toString()}`;
}
