import type { SeoPageDef } from "./types";
import { about } from "./pages/about";
import { corporate } from "./pages/corporate";
import { constructionMarketing } from "./pages/construction-marketing";

/**
 * SEOページの一覧。ページを追加するときは
 * 1) src/seo/pages/<slug>/ に Content.tsx（本文）と index.ts（メタ情報）を作り
 * 2) ここの配列に追加する。
 * プリレンダー・sitemap.xml・パンくず・関連リンクは、この配列から自動生成される。
 */
export const SEO_PAGES: SeoPageDef[] = [about, corporate, constructionMarketing];

export function findPage(slug: string): SeoPageDef | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}

export function pagePath(page: SeoPageDef): string {
  return `/${page.slug}`;
}
