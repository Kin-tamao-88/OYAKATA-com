import type { SeoPageDef } from "../../types";
import CorporateContent from "./Content";

export const corporate: SeoPageDef = {
  slug: "corporate",
  title: "親方ドットコム 法人公式サイト｜建設業の集客と事業成長を支援",
  description:
    "親方ドットコムは、工事会社の集客と事業成長を支援するサービスです。Webサイト制作・広告運用を通じて、個人のお客様との出会いを増やし、安定した受注につながる仕組みづくりをサポートします。",
  // デザインの完成・承認まで noindex を維持する(false にすると sitemap にも自動で載る)
  noindex: true,
  article: false,
  datePublished: "2026-10-28",
  dateModified: "2026-10-28",
  breadcrumbLabel: "法人公式サイト",
  bare: true,
  Component: CorporateContent,
};
