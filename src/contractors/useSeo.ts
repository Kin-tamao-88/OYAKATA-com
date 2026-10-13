import { useEffect } from "react";
import type { PageSeo } from "./seo";

type MetaAttr = "name" | "property";

function setMeta(attr: MetaAttr, key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * ページのtitle・meta・canonical・OGP・JSON-LDを設定する。
 * 本番はプリレンダー済みのheadと同じ値になる。開発時(LPのindex.html経由)の表示を揃えるために使う。
 */
export function usePageSeo(seo: PageSeo) {
  useEffect(() => {
    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("name", "robots", seo.robots);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", seo.url);
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", seo.url);

    const ld = document.getElementById("ld-json");
    if (ld) ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": seo.graph });
  }, [seo]);
}
