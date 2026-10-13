import { COMPANIES, EMPTY_FILTER, filterCompanies, getCategoryLabel } from "../data";
import type { CompanyFilter } from "../data";
import CompanyCard from "./CompanyCard";
import FilterSelects from "./FilterSelects";

type Props = {
  filter: CompanyFilter;
  onFilterChange: (next: CompanyFilter) => void;
};

export default function CompanyList({ filter, onFilterChange }: Props) {
  const results = filterCompanies(COMPANIES, filter);
  const isFiltered = Boolean(filter.area || filter.category);
  const conditionText = [filter.area, filter.category ? getCategoryLabel(filter.category) : ""]
    .filter(Boolean)
    .join(" × ");

  return (
    <section id="companies" className="scroll-mt-[72px] lg:scroll-mt-[90px] bg-[#f4f1ea] py-16 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-10">
        <div className="mb-8 lg:mb-10">
          <p className="flex items-center gap-3 mb-3 text-[#1a1a1a] font-bold text-[15px]">
            <span className="block w-8 h-[3px] bg-[#FFD000]" />
            Contractors
          </p>
          <h2 className="text-[#1a1a1a] font-black leading-[1.35] text-[28px] lg:text-[44px]">パートナー工事会社を探す</h2>
          <p className="mt-3 text-[#333] text-[16px] lg:text-[18px] font-medium leading-[1.8]">
            地域に根ざした工事会社から、専門性の高い施工会社まで。
          </p>
        </div>

        {/* 絞り込みバー */}
        <div className="bg-white border border-[#d8d4ca] p-4 lg:p-6 mb-8 lg:mb-10">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
            <FilterSelects filter={filter} onChange={onFilterChange} idPrefix="list" labelClassName="text-[#1a1a1a]" />
            <button
              type="button"
              onClick={() => onFilterChange(EMPTY_FILTER)}
              disabled={!isFiltered}
              className="h-[56px] px-8 border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold text-[16px] hover:bg-[#1a1a1a] hover:text-white transition-colors disabled:border-[#c9c5bc] disabled:text-[#8a867c] disabled:hover:bg-transparent disabled:hover:text-[#8a867c] disabled:cursor-not-allowed"
            >
              条件をリセット
            </button>
          </div>
          <p className="mt-4 text-[#1a1a1a] text-[16px] font-bold" aria-live="polite">
            {isFiltered ? `${conditionText}：` : "すべての掲載会社："}
            <span className="text-[24px] font-black mx-1">{results.length}</span>社
          </p>
        </div>

        {results.length > 0 ? (
          <ul className="grid gap-6 lg:gap-8 lg:grid-cols-2">
            {results.map((c, i) => (
              <li key={c.slug}>
                <CompanyCard company={c} eager={i < 2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-white border border-[#d8d4ca] px-6 py-14 lg:py-20 text-center">
            <p className="text-[#1a1a1a] font-black text-[22px] lg:text-[28px] leading-[1.5]">
              条件に合う工事会社が見つかりませんでした。
            </p>
            <p className="mt-3 text-[#333] text-[16px] leading-[1.8]">
              エリアや工事内容の条件を変えて、もう一度お探しください。
            </p>
            <button
              type="button"
              onClick={() => onFilterChange(EMPTY_FILTER)}
              className="mt-8 h-[56px] px-10 bg-[#1a1a1a] text-white font-bold text-[17px] hover:bg-[#333] transition-colors"
            >
              条件をリセットする
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
