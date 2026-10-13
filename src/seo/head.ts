import { SEO_PAGES, pagePath } from "./registry";
import { buildBreadcrumbs } from "./breadcrumbs";
import {
  ORGANIZATION_ID,
  ORGANIZATION_NAME,
  SITE_NAME,
  SITE_URL,
  STATIC_ROUTES,
  absoluteUrl,
} from "./site";
import { getIndexablePaths } from "../contractors/seo";
import type { SeoPageDef } from "./types";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function jsonLdScript(id: string, data: unknown): string {
  // </script> でタグが閉じないよう "<" をエスケープする
  const json = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
  return `<script id="${id}" type="application/ld+json">\n${json}\n</script>`;
}

export function buildPageHead(page: SeoPageDef): string {
  const url = absoluteUrl(pagePath(page));
  const robots = page.noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large";
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:type" content="${page.article ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="ja_JP" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    ...(page.ogImage
      ? [`<meta property="og:image" content="${escapeHtml(page.ogImage)}" />`]
      : []),
    `<meta name="twitter:card" content="${page.ogImage ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    ...(page.ogImage
      ? [`<meta name="twitter:image" content="${escapeHtml(page.ogImage)}" />`]
      : []),
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: buildBreadcrumbs(page).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
  tags.push(jsonLdScript("ld-breadcrumb", breadcrumbLd));

  if (page.article) {
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.breadcrumbLabel,
      description: page.description,
      inLanguage: "ja",
      datePublished: page.datePublished,
      dateModified: page.dateModified,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@id": ORGANIZATION_ID },
      publisher: {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: ORGANIZATION_NAME,
        url: `${SITE_URL}/`,
      },
      ...(page.ogImage ? { image: [page.ogImage] } : {}),
    };
    tags.push(jsonLdScript("ld-article", articleLd));
  }

  return tags.map((tag) => `    ${tag}`).join("\n");
}

export function buildNotFoundHead(): string {
  return [
    `<title>ページが見つかりません｜${SITE_NAME}</title>`,
    `<meta name="robots" content="noindex, nofollow" />`,
  ]
    .map((tag) => `    ${tag}`)
    .join("\n");
}

export function buildSitemap(): string {
  const entries: { loc: string; lastmod?: string }[] = [
    ...STATIC_ROUTES.map((r) => ({
      loc: absoluteUrl(r.path),
      lastmod: r.lastmod,
    })),
    ...SEO_PAGES.filter((p) => !p.noindex).map((p) => ({
      loc: absoluteUrl(pagePath(p)),
      lastmod: p.dateModified,
    })),
    // 親方ドットコム パートナーズ(index可能なページのみ。サンプルの間は空)
    ...getIndexablePaths().map((path) => ({ loc: absoluteUrl(path), lastmod: undefined as string | undefined })),
  ];
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ""}  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
