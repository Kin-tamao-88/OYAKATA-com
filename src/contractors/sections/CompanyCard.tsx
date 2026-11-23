import { getCategoryLabel } from "../data";
import type { Company } from "../data";
import { ArrowIcon } from "../icons";
import { getCompanyDetail } from "../companyDetails";
import PartnerBadge from "../PartnerBadge";

type Props = {
  company: Company;
  /** 先頭の数枚だけ即時読み込みにする */
  eager?: boolean;
  /** 1社だけ掲載するとき、PCで画像を左・本文を右に並べる */
  wide?: boolean;
};

export default function CompanyCard({ company, eager = false, wide = false }: Props) {
  const works = company.categories.map(getCategoryLabel).join("／");
  // 狭い幅で折り返すときは、都道府県と市区町村の間で改行する(市名の途中で切らない)
  const locationParts = company.location.match(/^(.+?[都道府県])(.+)$/);

  return (
    <article
      className={`bg-white border border-[#d8d4ca] flex flex-col h-full ${wide ? "lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:h-auto" : ""}`}
    >
      {/* バッジと所在地は画像の外に置く(FV画像のロゴ・電話番号に重ねない) */}
      <div className={`flex items-center justify-between gap-3 px-4 py-3 border-b border-[#e8e4da] ${wide ? "lg:col-span-2" : ""}`}>
        <PartnerBadge />
        <p className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px] text-right">
          {locationParts ? (
            <>
              <span className="inline-block">{locationParts[1]}</span>
              <span className="inline-block">{locationParts[2]}</span>
            </>
          ) : (
            company.location
          )}
        </p>
      </div>
      <div className="relative">
        <img
          src={company.image}
          alt={company.imageAlt}
          width={1536}
          height={1024}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`w-full aspect-[3/2] object-cover ${wide ? "lg:h-full lg:aspect-auto" : ""}`}
        />
      </div>

      <div className="flex flex-col flex-1 p-5 lg:p-8">
        <h3 className="text-[#1a1a1a] font-black leading-[1.35] text-[24px] lg:text-[30px]">{company.name}</h3>
        <p className="mt-4 text-[#333] text-[16px] leading-[1.85] [word-break:auto-phrase]">
          {company.summary}
        </p>

        <dl className="mt-6 border-t border-[#d8d4ca] text-[16px]">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 py-3 border-b border-[#e8e4da]">
            <dt className="shrink-0 w-[88px] font-bold text-[#1a1a1a]">対応工事</dt>
            <dd className="text-[#333] leading-[1.7] [word-break:auto-phrase]">{works}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 py-3 border-b border-[#e8e4da]">
            <dt className="shrink-0 w-[88px] font-bold text-[#1a1a1a]">対応エリア</dt>
            <dd className="text-[#333] leading-[1.7] [word-break:auto-phrase]">{company.areaLabel}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-6">
          {company.externalUrl ? (
            <a
              href={company.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 h-[60px] px-8 bg-[#FFD000] text-[#1a1a1a] font-black text-[17px] no-underline hover:brightness-95 transition-all"
            >
              <span className="sm:hidden">サイトを見る</span>
              <span className="hidden sm:inline">{company.name}のサイトを見る</span>
              <ArrowIcon className="w-5 h-5" />
              <span className="sr-only">(別のウィンドウで開きます)</span>
            </a>
          ) : getCompanyDetail(company.slug) ? (
            <a
              href={`/contractors/${company.slug}`}
              className="inline-flex items-center gap-2 text-[#1a1a1a] font-black text-[17px] no-underline border-b-[3px] border-[#FFD000] pb-1 hover:gap-3 transition-all"
            >
              詳細を見る
              <ArrowIcon className="w-5 h-5" />
            </a>
          ) : (
            <p className="inline-flex items-center gap-2 text-[#555] font-bold text-[16px]">
              <span className="block w-6 h-[3px] bg-[#d8d4ca]" />
              企業ページは公開準備中です
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
