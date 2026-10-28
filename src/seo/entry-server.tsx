import { renderToString } from "react-dom/server";
import SeoApp, { NOT_FOUND_KEY } from "./SeoApp";
import { buildNotFoundHead, buildPageHead, buildSitemap } from "./head";
import { SEO_PAGES, pagePath } from "./registry";
import ContractorsRoute from "../contractors/ContractorsRoute";
import { getContractorsPrerenderPages } from "../contractors/prerender";
import { CONTRACTORS_PUBLIC } from "./site";

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
  // 非公開の間はHTMLを出力しない(公開範囲は site.ts の CONTRACTORS_PUBLIC)
  const contractorPages = (CONTRACTORS_PUBLIC ? getContractorsPrerenderPages() : []).map((p) => ({
    file: p.file,
    key: p.key,
    head: p.head,
    body: renderToString(<ContractorsRoute path={p.path} />),
  }));
  const notFound = {
    file: "404.html",
    key: NOT_FOUND_KEY,
    head: buildNotFoundHead(),
    body: renderToString(<SeoApp pageKey={NOT_FOUND_KEY} />),
  };
  return { pages: [...pages, ...contractorPages], notFound, sitemap: buildSitemap() };
}
