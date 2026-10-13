import { COMPANIES } from "./data";
import { getCompanyDetail } from "./companyDetails";
import { buildContractorsHead } from "./head";
import { CONTRACTORS_PATH, companyPath, getCompanySeo, getListSeo } from "./seo";

export type ContractorsPrerenderPage = {
  /** ルーティング用パス。例: /contractors/kodensetsu */
  path: string;
  /** data-page に入れる識別子(先頭スラッシュなし) */
  key: string;
  /** dist 配下の出力パス */
  file: string;
  head: string;
};

/** 親方ドットコム パートナーズのプリレンダー対象ページ(一覧+公開状態の個別企業)。 */
export function getContractorsPrerenderPages(): ContractorsPrerenderPage[] {
  const pages: ContractorsPrerenderPage[] = [
    {
      path: CONTRACTORS_PATH,
      key: CONTRACTORS_PATH.slice(1),
      file: `${CONTRACTORS_PATH.slice(1)}/index.html`,
      head: buildContractorsHead(getListSeo()),
    },
  ];
  for (const company of COMPANIES) {
    const detail = getCompanyDetail(company.slug);
    if (!detail) continue;
    const path = companyPath(company.slug);
    pages.push({
      path,
      key: path.slice(1),
      file: `${path.slice(1)}/index.html`,
      head: buildContractorsHead(getCompanySeo(company, detail)),
    });
  }
  return pages;
}
