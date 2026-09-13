/**
 * LINE公式アカウントの友だち追加URL。
 * PC・スマホ・LINEアプリ内ブラウザいずれもLINE側で適切な追加画面へ
 * 自動的にルーティングされる。ログイン要求やLIFF中継を挟まない。
 */
const LINE_ADD_FRIEND_URL = "https://lin.ee/yFZ5vjU";

/** LINE CTAのリンク先を返す。 */
export function buildLineCtaHref(): string {
  return LINE_ADD_FRIEND_URL;
}
