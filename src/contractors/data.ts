import fvMaruesu from "../assets/images/contractors/fv-maruesu.webp";
import fvTakumi from "../assets/images/contractors/fv-takumi.webp";
import fvKodensetsu from "../assets/images/contractors/fv-kodensetsu.webp";
import fvKiyomirai from "../assets/images/contractors/fv-kiyomirai.webp";

/* ────────────────────────────────────────────────
 * 親方ドットコム パートナーズ データ定義
 * 掲載企業は COMPANIES 配列に追加するだけで一覧・絞り込みに反映される。
 * ──────────────────────────────────────────────── */

export type CategoryId =
  | "exterior"
  | "reform"
  | "electric"
  | "exterior-work"
  | "plumbing"
  | "interior"
  | "cleaning"
  | "other";

export type Category = {
  id: CategoryId;
  label: string;
};

export const CATEGORIES: Category[] = [
  { id: "exterior", label: "外壁塗装・屋根工事" },
  { id: "reform", label: "リフォーム・リノベーション" },
  { id: "electric", label: "電気工事" },
  { id: "exterior-work", label: "外構・エクステリア" },
  { id: "plumbing", label: "水道・設備工事" },
  { id: "interior", label: "内装工事" },
  { id: "cleaning", label: "ハウスクリーニング" },
  { id: "other", label: "その他の工事" },
];

/** 将来の全国展開に備え、地域区分ごとに都道府県を持たせる。 */
export type AreaGroup = {
  region: string;
  prefectures: string[];
};

export const AREA_GROUPS: AreaGroup[] = [
  {
    region: "関東",
    prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
  },
  {
    region: "関西",
    prefectures: ["大阪府", "兵庫県", "京都府"],
  },
];

export const ALL_PREFECTURES: string[] = AREA_GROUPS.flatMap((g) => g.prefectures);

export type Company = {
  /** 個別企業ページのURL用。一意であること。 */
  slug: string;
  name: string;
  /** 所在地(都道府県+市区町村) */
  location: string;
  categories: CategoryId[];
  /** 対応エリア(都道府県名。絞り込みに使用) */
  areas: string[];
  /** 対応エリアの表示用テキスト */
  areaLabel: string;
  /** 企業の特徴を伝える短い紹介文 */
  summary: string;
  image: string;
  imageAlt: string;
  /** 開発用サンプルなら true。本番データに差し替える際は false にする。 */
  isSample: boolean;
};

const categoryLabelMap = new Map(CATEGORIES.map((c) => [c.id, c.label]));

export function getCategoryLabel(id: CategoryId): string {
  return categoryLabelMap.get(id) ?? "";
}

/* ※ 以下は開発・営業デモ用のサンプルデータです。実在の企業とは関係ありません。
 *   先頭4社は、パートナーズ掲載後の企業紹介ページのイメージ(FV画像つき)です。
 *   本番公開時は実在企業のデータに差し替え、isSample を false にしてください。 */
export const COMPANIES: Company[] = [
  {
    slug: "maruesu-reform",
    name: "マルエスリフォーム",
    location: "大阪府 大阪市",
    categories: ["exterior"],
    areas: ["大阪府", "兵庫県", "京都府"],
    areaLabel: "大阪府・兵庫県・京都府",
    summary: "外壁塗装・屋根工事・雨漏り修理を、住まいの状態に合わせてご提案。安心の施工保証と、地域密着の丁寧な対応が強みです。",
    image: fvMaruesu,
    imageAlt: "マルエスリフォームの紹介ページのファーストビュー。外壁塗装の職人と、外壁塗装・屋根工事・雨漏り修理のメニュー",
    isSample: true,
  },
  {
    slug: "takumi-naisou",
    name: "匠内装",
    location: "大阪府 大阪市",
    categories: ["interior", "reform"],
    areas: ["大阪府", "兵庫県", "京都府"],
    areaLabel: "大阪府・兵庫県・京都府",
    summary: "店舗・オフィス・住宅の内装工事とリフォームを、企画から施工までワンストップで対応。確かな技術で理想の空間をカタチにします。",
    image: fvTakumi,
    imageAlt: "匠内装の紹介ページのファーストビュー。内装工事をする職人と、店舗・オフィス・住宅のメニュー",
    isSample: true,
  },
  {
    slug: "kodensetsu",
    name: "光電設",
    location: "大阪府 大阪市",
    categories: ["electric"],
    areas: ["大阪府", "兵庫県", "京都府"],
    areaLabel: "大阪府・兵庫県・京都府",
    summary: "住宅から店舗・オフィス・工場まで、経験豊富な職人が確かな技術で電気設備を施工。EV充電設備の設置にも対応します。",
    image: fvKodensetsu,
    imageAlt: "光電設の紹介ページのファーストビュー。電気工事をする職人と、住宅・店舗・工場・EV充電のメニュー",
    isSample: true,
  },
  {
    slug: "kiyomirai",
    name: "きよみらい",
    location: "大阪府 大阪市",
    categories: ["cleaning"],
    areas: ["大阪府", "兵庫県", "京都府"],
    areaLabel: "大阪府・兵庫県・京都府",
    summary: "キッチン・浴室・エアコンなど、頑固な汚れを徹底洗浄するハウスクリーニング専門店。暮らしに気持ちいい毎日をお届けします。",
    image: fvKiyomirai,
    imageAlt: "きよみらいの紹介ページのファーストビュー。清掃をするスタッフと、キッチン・浴室・エアコンのメニュー",
    isSample: true,
  },
];

export const HAS_SAMPLE_DATA = COMPANIES.some((c) => c.isSample);

export type CompanyFilter = {
  category: CategoryId | "";
  area: string;
};

export const EMPTY_FILTER: CompanyFilter = { category: "", area: "" };

export function filterCompanies(companies: Company[], filter: CompanyFilter): Company[] {
  return companies.filter(
    (c) =>
      (!filter.category || c.categories.includes(filter.category)) &&
      (!filter.area || c.areas.includes(filter.area)),
  );
}

export function countByCategory(companies: Company[], id: CategoryId): number {
  return companies.filter((c) => c.categories.includes(id)).length;
}

export function countByArea(companies: Company[], prefecture: string): number {
  return companies.filter((c) => c.areas.includes(prefecture)).length;
}
