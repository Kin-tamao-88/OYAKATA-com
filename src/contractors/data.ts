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
  /** 使用許可を確認できた画像だけを設定する。未設定なら、カードは写真なしの文字だけのレイアウトになる */
  image?: string;
  imageAlt?: string;
  /**
   * 一覧のカードから直接遷移する外部サイト(掲載企業のLP)のURL。
   * 指定した企業は個別ページ(/contractors/<slug>)を作らず、カードのボタンがこのURLへ遷移する。
   */
  externalUrl?: string;
  /** 構造化データ(LocalBusiness)用。確認できた事実だけを入れる */
  schema?: {
    postalCode: string;
    region: string;
    locality: string;
    streetAddress: string;
  };
  /** 開発用サンプルなら true。本番データに差し替える際は false にする。 */
  isSample: boolean;
};

const categoryLabelMap = new Map(CATEGORIES.map((c) => [c.id, c.label]));

export function getCategoryLabel(id: CategoryId): string {
  return categoryLabelMap.get(id) ?? "";
}

/* 掲載企業。実在のパートナーのみ追加する(ダミー・架空の企業は載せない)。
 * 0件の間は一覧が「提携パートナーを順次ご紹介します」の案内になり、絞り込みや件数は表示されない。
 * 追加するときは companyDetails.ts の COMPANY_DETAILS にも同じ slug で詳細を足す。 */
export const COMPANIES: Company[] = [
  {
    // 第1号パートナー。個別ページは作らず、一覧のカードから企業のLPへ直接遷移する。
    // 掲載内容は、クライアント現行サイト(https://www.tcp-2011.com 事業所概要・事業案内)で確認できた事実のみ。
    slug: "total-cleanpro",
    name: "トータルクリーンプロ",
    location: "埼玉県さいたま市西区",
    categories: ["cleaning"],
    areas: ["埼玉県", "東京都", "神奈川県", "千葉県"],
    areaLabel: "埼玉県・東京都・神奈川県・千葉県(一部エリアを除く)",
    summary:
      "さいたま市に拠点を置く清掃業者です。住まいのハウスクリーニングやエアコンクリーニングのほか、定期清掃・新築清掃にも対応しています。年中無休で、ご相談を受け付けています。",
    // 写真は、使用許可を確認できてから設定する(現在は写真なしで掲載)。
    // 遷移先はクライアントの公式サイト。LPは未公開のため、LPが正式公開されたらここを差し替える。
    externalUrl: "https://www.tcp-2011.com",
    schema: { postalCode: "331-0047", region: "埼玉県", locality: "さいたま市西区", streetAddress: "指扇3555-1" },
    isSample: false,
  },
];

/** 掲載企業が1社以上あるか。0件のときは一覧・絞り込み・件数を出さない。 */
export const HAS_COMPANIES = COMPANIES.length > 0;

/** 検索・絞り込みUI(FVの検索、工事種類、エリア)を出すか。比べる相手がいない1社以下の間は出さない。 */
export const SHOW_FILTERS = COMPANIES.length >= 2;

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
