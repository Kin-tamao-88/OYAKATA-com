import type { ComponentType } from "react";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type SeoPageDef = {
  /** URLの識別子。/construction-marketing なら "construction-marketing" */
  slug: string;
  title: string;
  description: string;
  /** true の間は noindex・sitemap対象外。正式原稿の完成後に false にする */
  noindex: boolean;
  /** true で Article 構造化データを出力する */
  article: boolean;
  /** YYYY-MM-DD。公開日 */
  datePublished: string;
  /** YYYY-MM-DD。内容を実際に更新した日。sitemap の lastmod にも使う */
  dateModified: string;
  /** パンくず表示名。省略時は h1 相当のタイトルを使えるよう title の前半を指定する */
  breadcrumbLabel: string;
  /** トップと現在ページの間に入る親ページ（ハブ記事など）。通常は空 */
  breadcrumbParents?: BreadcrumbItem[];
  /** 内部リンクとして末尾に表示する関連ページの slug */
  relatedSlugs?: string[];
  /** 絶対URLのOGP画像。未指定なら og:image を出力しない */
  ogImage?: string;
  /** true なら共通の記事レイアウト(SeoLayout)を使わず、ページ側で全体を組む(公式HPトップなど) */
  bare?: boolean;
  Component: ComponentType;
};
