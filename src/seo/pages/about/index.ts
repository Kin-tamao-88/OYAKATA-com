import type { SeoPageDef } from "../../types";
import AboutContent from "./Content";

export const about: SeoPageDef = {
  slug: "about",
  title: "親方ドットコム 公式サイト｜工事会社の集客を支援",
  description:
    "親方ドットコムは、工事会社の集客を専門に支援するサービスです。ホームページ・LP制作、広告運用、問い合わせ導線の設計を通じて、直請け案件が増える仕組みをつくります。",
  // ユーザーがデザインの完成版を明示的に承認するまで noindex を維持する(false にすると sitemap にも自動で載る)
  noindex: true,
  article: false,
  datePublished: "2026-10-16",
  dateModified: "2026-10-17",
  breadcrumbLabel: "公式サイト",
  ogImage: "https://oyakata-com.jp/og/about.jpg",
  bare: true,
  Component: AboutContent,
};
