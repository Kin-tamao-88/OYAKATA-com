import { THEMES } from "./companyTheme";
import type { ThemeKey } from "./companyTheme";

/* ────────────────────────────────────────────────
 * 個別企業ページ用データ。
 * 企業を追加するときは COMPANIES(data.ts) に一覧用データを足し、
 * ここの COMPANY_DETAILS に同じ slug で詳細データを足すだけで /contractors/<slug> が増える。
 * 任意項目(?)は未登録なら該当ブロック・行ごと非表示になる。
 * ──────────────────────────────────────────────── */

export type Photo = {
  src: string;
  alt: string;
  /** 元画像のピクセルサイズ(レイアウトシフト防止用) */
  width: number;
  height: number;
};

export type CompanyService = {
  title: string;
  body: string;
  image?: Photo;
};

export type CompanyWork = {
  title: string;
  /** 施工場所 */
  place: string;
  /** 工事内容 */
  content: string;
  body?: string;
  photo: Photo;
};

export type CompanyStrength = {
  title: string;
  body: string;
};

export type CompanyAreaDetail = {
  prefecture: string;
  /** 市区町村 */
  cities: string[];
};

export type CompanyContact = {
  tel?: string;
  formUrl?: string;
  lineUrl?: string;
  websiteUrl?: string;
};

export type CompanyProfile = {
  /** 番地まで含む所在地 */
  address?: string;
  representative?: string;
  established?: string;
  hours?: string;
  holiday?: string;
};

export type CompanyDetail = {
  slug: string;
  /** 企業ページの配色。未指定は "brand"(親方ドットコムの黄・黒)。 */
  theme?: ThemeKey;
  /** "mockup": ファーストビューが企業ページのデザイン画像(画像全体を見せる)。"photo"(既定): 施工写真。 */
  heroKind?: "photo" | "mockup";
  /** false の間はページを生成せず、一覧からもリンクしない(404) */
  published: boolean;
  tagline: string;
  heroPhoto: Photo;
  /** この会社について */
  about: {
    heading?: string;
    paragraphs: string[];
    specialties?: string[];
    attitude?: { title: string; body: string };
    /** 代表者・職人写真(どちらも任意) */
    portrait?: Photo & { name: string; role: string };
    teamPhoto?: Photo;
  };
  services: CompanyService[];
  works: CompanyWork[];
  /** 2〜5項目程度 */
  strengths: CompanyStrength[];
  strengthsPhoto?: Photo;
  areaDetails: CompanyAreaDetail[];
  profile: CompanyProfile;
  contact: CompanyContact;
  seo: {
    title?: string;
    description?: string;
    /** true にし、かつ一覧側の isSample が false のときだけ index 対象になる */
    index: boolean;
  };
};

/* 掲載企業の詳細データ。実在企業のみ追加する(ダミー・サンプル企業は載せない)。
 * 空の間は /contractors/<slug> がすべて404になる。 */
export const COMPANY_DETAILS: Record<string, CompanyDetail> = {};

export function getTheme(detail: CompanyDetail) {
  return THEMES[detail.theme ?? "brand"];
}

export function getCompanyDetail(slug: string): CompanyDetail | undefined {
  const detail = COMPANY_DETAILS[slug];
  return detail?.published ? detail : undefined;
}

export type ContactMethod = {
  kind: "tel" | "form" | "line";
  label: string;
  href: string;
  /** 表示用の補助テキスト(電話番号など) */
  note?: string;
};

/** 登録されている連絡手段だけを返す。 */
export function getContactMethods(contact: CompanyContact): ContactMethod[] {
  const methods: ContactMethod[] = [];
  if (contact.tel) {
    methods.push({
      kind: "tel",
      label: "電話で相談する",
      href: `tel:${contact.tel.replace(/[^0-9+]/g, "")}`,
      note: contact.tel,
    });
  }
  if (contact.formUrl) {
    methods.push({ kind: "form", label: "お問い合わせフォーム", href: contact.formUrl });
  }
  if (contact.lineUrl) {
    methods.push({ kind: "line", label: "LINEで相談する", href: contact.lineUrl });
  }
  return methods;
}
