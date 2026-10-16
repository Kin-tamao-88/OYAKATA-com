/**
 * 公式HP(/about)の表示データ。
 * href を持つ項目だけがリンクとして描画される。未公開ページは href を入れないこと。
 */

export type NavItem = {
  label: string;
  href: string;
};

/** 公開済みの導線だけを置く。/column などは公開時にここへ1行足す */
export const NAV_ITEMS: NavItem[] = [
  { label: "私たちについて", href: "#intro" },
  { label: "サービス", href: "#business" },
  { label: "対応業種", href: "#industries" },
  { label: "お問い合わせ", href: "#contact" },
];

/**
 * 一般のお客様向け(工事会社を探している方)の導線。
 * 現在の /contractors は営業デモ用のサンプル企業のため、公式サイトからは非表示(null)。
 * 実際の掲載企業を公開したら、下の定義に差し替えるとヘッダー・フッターに復活する:
 *   { label: "工事会社をお探しの方", href: "/contractors" }
 */
export const CONTRACTORS_LINK: NavItem | null = null;

export type ServiceItem = {
  title: string;
  lead: string;
  body: string;
};

export const SERVICES: ServiceItem[] = [
  {
    title: "集客支援",
    lead: "工事の依頼が入る入口を、整理する。",
    body: "紹介や下請けだけに頼らず、お客様から直接ご依頼をいただくための入口を整理します。ホームページ・広告・LINEなど、自社に合う方法を選び、順番に進めます。",
  },
  {
    title: "ホームページ・LP制作",
    lead: "会社の強みが伝わるページを、つくる。",
    body: "施工内容・対応エリア・会社の強みを、見る人が分かりやすい形にまとめます。スマートフォンで見たお客様が、そのまま問い合わせできるページにします。",
  },
  {
    title: "広告運用",
    lead: "工事を探している人に、広告を届ける。",
    body: "Google・Metaなどの広告で、工事を探している地域のお客様に表示します。問い合わせ1件あたりの費用を見ながら、広告の内容を調整し続けます。",
  },
  {
    title: "問い合わせ導線の設計",
    lead: "連絡しやすい形を、整える。",
    body: "電話・LINE・フォームなど、お客様が連絡しやすい方法を、ページのどこに置くかまで設計します。迷って離れてしまう人を減らします。",
  },
];

export type ApproachStep = {
  title: string;
  body: string;
};

/** 実際の支援の流れ。順番に表示される */
export const APPROACH_STEPS: ApproachStep[] = [
  {
    title: "整理する",
    body: "工事会社の強みや、対応できる工事を整理します。どこが選ばれる理由になるのかを明確にします。",
  },
  {
    title: "伝える",
    body: "ホームページ・LPで、施工内容や対応エリア、会社の魅力を分かりやすく伝えます。",
  },
  {
    title: "届ける",
    body: "広告運用で、工事を探しているお客様との接点をつくります。",
  },
  {
    title: "改善する",
    body: "問い合わせの数や経路を見ながら、連絡しやすい導線に整え続けます。",
  },
];

export type IndustryItem = {
  name: string;
  note: string;
  /** 業種別ページを公開したら、ここに /industries/xxx を入れる。未公開の間は入れない */
  href?: string;
};

export const INDUSTRIES: IndustryItem[] = [
  { name: "塗装", note: "外壁塗装・屋根塗装" },
  { name: "電気工事", note: "住宅・店舗・工場の電気設備" },
  { name: "内装", note: "店舗・オフィス・住宅の内装工事" },
  { name: "リフォーム", note: "水まわり・増改築・住宅改修" },
  { name: "その他の工事業種", note: "外構・防水・解体・設備工事など" },
];

export type InsightTheme = {
  title: string;
  body: string;
  /** 記事一覧・記事を公開したら href を入れる。未公開の間は入れない */
  href?: string;
};

/** 記事そのものではなく、取り上げるテーマ。架空の記事は載せない */
export const INSIGHT_THEMES: InsightTheme[] = [
  {
    title: "工事会社の集客方法",
    body: "紹介・ポータル・ホームページ・広告など、集客の選択肢をどう組み合わせるか。",
  },
  {
    title: "直請け案件の獲得",
    body: "下請けに頼らず、お客様から直接ご依頼をいただくための考え方。",
  },
  {
    title: "ツクリンク・助太刀などのサービス比較",
    body: "工事会社向けサービスの違いと、自社に合った使い分け。",
  },
];

export type Article = {
  title: string;
  href: string;
  /** YYYY-MM-DD */
  date: string;
};

/** 公開済みの記事だけを新しい順に入れる。空の間は JOURNAL に一覧を出さない */
export const ARTICLES: Article[] = [];

export const OPERATOR_NAME = "アイブレ株式会社";
