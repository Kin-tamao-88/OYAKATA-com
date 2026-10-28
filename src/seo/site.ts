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

/**
 * 親方ドットコム パートナーズ(/contractors 配下)を一般公開するか。
 * 既定は非公開: ビルド時にHTMLを出力せず、公開用JSにもパートナーズのコード・データを含めない。
 * 本番では /contractors 配下が404になり、sitemapにも載らない。
 * データ(src/contractors/*)は削除しない。公開を再開するときは、ビルド環境に
 * VITE_CONTRACTORS_PUBLIC=true を設定して再デプロイする(Vercelの環境変数。Previewだけに設定すれば確認用にも使える)。
 */
export const CONTRACTORS_PUBLIC = import.meta.env.VITE_CONTRACTORS_PUBLIC === "true";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
