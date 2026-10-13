export const SITE_URL = "https://oyakata-com.jp";
export const SITE_NAME = "親方ドットコム";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const ORGANIZATION_NAME = "アイブレ株式会社";

/**
 * 既存の React SPA（LP・プライバシーポリシー）のURL。
 * sitemap.xml にだけ含める。SEOページ基盤の対象外で、実体は index.html。
 * lastmod は「実際に内容を更新した日付」を確認できたときだけ設定する。
 */
export const STATIC_ROUTES: { path: string; lastmod?: string }[] = [
  { path: "/" },
  { path: "/privacy" },
];

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
