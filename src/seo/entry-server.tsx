import { renderToString } from "react-dom/server";
import SeoApp, { NOT_FOUND_KEY } from "./SeoApp";
import { buildNotFoundHead, buildPageHead, buildSitemap } from "./head";
import { SEO_PAGES, pagePath } from "./registry";

export type PrerenderedPage = {
  /** dist 配下の出力パス（先頭スラッシュなし）。例: construction-marketing/index.html */
  file: string;
  key: string;
  head: string;
  body: string;
};

export function prerenderAll(): { pages: PrerenderedPage[]; notFound: PrerenderedPage; sitemap: string } {
  const pages = SEO_PAGES.map((page) => ({
    file: `${pagePath(page).slice(1)}/index.html`,
    key: page.slug,
    head: buildPageHead(page),
    body: renderToString(<SeoApp pageKey={page.slug} />),
  }));
  const notFound = {
    file: "404.html",
    key: NOT_FOUND_KEY,
    head: buildNotFoundHead(),
    body: renderToString(<SeoApp pageKey={NOT_FOUND_KEY} />),
  };
  return { pages, notFound, sitemap: buildSitemap() };
}
