import { escapeHtml, jsonLdScript } from "../seo/head";
import { SITE_NAME } from "../seo/site";
import type { PageSeo } from "./seo";

/** プリレンダー用のhead。既存SEO基盤(seo/head.ts)のエスケープ処理を再利用する。 */
export function buildContractorsHead(seo: PageSeo): string {
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${seo.url}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="ja_JP" />`,
    `<meta property="og:url" content="${seo.url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    ...(seo.ogImage ? [`<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`] : []),
    `<meta name="twitter:card" content="${seo.ogImage ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    ...(seo.ogImage ? [`<meta name="twitter:image" content="${escapeHtml(seo.ogImage)}" />`] : []),
    jsonLdScript("ld-json", { "@context": "https://schema.org", "@graph": seo.graph }),
  ];
  return tags.map((tag) => `    ${tag}`).join("\n");
}
