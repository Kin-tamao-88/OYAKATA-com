import { COMPANIES, HAS_SAMPLE_DATA } from "./data";
import type { Company } from "./data";
import { COMPANY_DETAILS, getCompanyDetail } from "./companyDetails";
import type { CompanyDetail } from "./companyDetails";

export const SITE_ORIGIN = "https://oyakata-com.jp";
export const CONTRACTORS_PATH = "/contractors";
export const CONTRACTORS_URL = SITE_ORIGIN + CONTRACTORS_PATH;

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export const CONTRACTORS_TITLE = "親方ドットコム パートナーズ｜地域の頼れる工事会社を探す";
export const CONTRACTORS_DESCRIPTION =
  "親方ドットコム パートナーズは、親方ドットコムが紹介する地域の工事会社ネットワークです。電気工事・外壁塗装・リフォーム・外構工事など、地域と工事内容から頼れる工事会社を探せます。";

const ROBOTS_INDEX = "index, follow, max-image-preview:large";
const ROBOTS_NOINDEX = "noindex, nofollow";

type LdNode = Record<string, unknown> & { "@type": string };

/** ページごとのSEO情報。プリレンダー(head生成)とクライアント(useSeo)の両方で使う。 */
export type PageSeo = {
  title: string;
  description: string;
  url: string;
  robots: string;
  ogImage?: string;
  /** JSON-LD の @graph */
  graph: LdNode[];
};

const organizationNode: LdNode = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "アイブレ株式会社",
  url: `${SITE_ORIGIN}/`,
  brand: { "@type": "Brand", name: "親方ドットコム" },
};

function breadcrumbNode(url: string, items: { name: string; url: string }[]): LdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** 一覧ページ /contractors */
export function getListSeo(): PageSeo {
  const graph: LdNode[] = [
    organizationNode,
    {
      "@type": "CollectionPage",
      "@id": `${CONTRACTORS_URL}#webpage`,
      url: CONTRACTORS_URL,
      name: CONTRACTORS_TITLE,
      description: CONTRACTORS_DESCRIPTION,
      inLanguage: "ja",
      publisher: { "@id": ORGANIZATION_ID },
      breadcrumb: { "@id": `${CONTRACTORS_URL}#breadcrumb` },
    },
    breadcrumbNode(CONTRACTORS_URL, [
      { name: "親方ドットコム", url: `${SITE_ORIGIN}/` },
      { name: "親方ドットコム パートナーズ", url: CONTRACTORS_URL },
    ]),
  ];

  // サンプル企業を構造化データに出さない(実在企業と誤認されないため)
  if (!HAS_SAMPLE_DATA) {
    graph.push({
      "@type": "ItemList",
      "@id": `${CONTRACTORS_URL}#list`,
      itemListElement: COMPANIES.filter((c) => getCompanyDetail(c.slug)).map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        url: `${CONTRACTORS_URL}/${c.slug}`,
      })),
    });
  }

  return {
    title: CONTRACTORS_TITLE,
    description: CONTRACTORS_DESCRIPTION,
    url: CONTRACTORS_URL,
    // 開発用サンプルデータが含まれる間は検索エンジンにインデックスさせない。
    robots: HAS_SAMPLE_DATA ? ROBOTS_NOINDEX : ROBOTS_INDEX,
    graph,
  };
}

/** 個別企業ページがindex対象か。サンプル企業、またはdetail.seo.indexがfalseならnoindex。 */
export function isCompanyIndexable(company: Company, detail: CompanyDetail): boolean {
  return !company.isSample && detail.seo.index;
}

export function companyPath(slug: string): string {
  return `${CONTRACTORS_PATH}/${slug}`;
}

/** 個別企業ページ /contractors/<slug> */
export function getCompanySeo(company: Company, detail: CompanyDetail): PageSeo {
  const url = SITE_ORIGIN + companyPath(company.slug);
  const indexable = isCompanyIndexable(company, detail);
  const title =
    detail.seo.title ?? `${company.name}｜${company.location}の工事会社｜親方ドットコム パートナーズ`;
  const description =
    detail.seo.description ??
    `${company.name}(${company.location})の紹介ページです。${detail.tagline}対応エリアや施工事例、会社概要をご覧いただけます。`;

  const graph: LdNode[] = [
    organizationNode,
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "ja",
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORGANIZATION_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    breadcrumbNode(url, [
      { name: "親方ドットコム", url: `${SITE_ORIGIN}/` },
      { name: "親方ドットコム パートナーズ", url: CONTRACTORS_URL },
      { name: company.name, url },
    ]),
  ];

  // サンプル企業の架空情報はLocalBusinessとして出さない
  if (indexable) {
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${url}#business`,
      name: company.name,
      description: detail.tagline,
      url,
      ...(detail.contact.tel ? { telephone: detail.contact.tel } : {}),
      ...(detail.contact.websiteUrl ? { sameAs: [detail.contact.websiteUrl] } : {}),
      address: {
        "@type": "PostalAddress",
        addressCountry: "JP",
        streetAddress: detail.profile.address ?? company.location,
      },
      areaServed: detail.areaDetails.flatMap((a) =>
        a.cities.length ? a.cities.map((c) => `${a.prefecture}${c}`) : [a.prefecture],
      ),
      image: detail.heroPhoto.src,
    });
  }

  return {
    title,
    description,
    url,
    robots: indexable ? ROBOTS_INDEX : ROBOTS_NOINDEX,
    ogImage: detail.heroPhoto.src.startsWith("/") ? SITE_ORIGIN + detail.heroPhoto.src : undefined,
    graph,
  };
}

/** sitemap対象(index可能な)個別企業ページのパス。サンプルの間は空。 */
export function getIndexablePaths(): string[] {
  const paths: string[] = [];
  if (!HAS_SAMPLE_DATA) paths.push(CONTRACTORS_PATH);
  for (const company of COMPANIES) {
    const detail = getCompanyDetail(company.slug);
    if (detail && isCompanyIndexable(company, detail)) paths.push(companyPath(company.slug));
  }
  return paths;
}

/** プリレンダー対象の slug 一覧(公開状態のものだけ)。 */
export function getPublishedSlugs(): string[] {
  return COMPANIES.filter((c) => COMPANY_DETAILS[c.slug]?.published).map((c) => c.slug);
}
