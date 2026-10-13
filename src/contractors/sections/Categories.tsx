import { CATEGORIES } from "../data";
import type { CategoryId, CompanyFilter } from "../data";
import { CategoryScene } from "../art";
import { CATEGORY_PHOTOS } from "../fvAssets";
import { ArrowIcon } from "../icons";

type Props = {
  filter: CompanyFilter;
  onSelect: (id: CategoryId) => void;
};

export default function Categories({ filter, onSelect }: Props) {
  return (
    <section id="categories" className="scroll-mt-[72px] lg:scroll-mt-[90px] bg-[#faf8f4] pt-6 pb-16 lg:pt-10 lg:pb-24">
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10">
        <div className="mb-6 lg:mb-8 lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="flex items-center gap-3 mb-2 text-[#1a1a1a] font-bold text-[14px] tracking-wider">
              <span className="block w-6 h-[3px] bg-[#FFD000]" />
              CATEGORY
              <span className="block w-6 h-[3px] bg-[#FFD000]" />
            </p>
            <h2 className="text-[#1a1a1a] font-black leading-[1.35] text-[28px] lg:text-[40px]">工事の種類から探す</h2>
          </div>
          <p className="mt-3 lg:mt-0 text-[#333] text-[16px] leading-[1.8] text-balance [word-break:auto-phrase]">
            住まいの修理からリフォーム、専門工事まで
            <br className="hidden lg:block" />
            さまざまな工事会社を掲載しています。
          </p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 xl:gap-2">
          {CATEGORIES.map((c) => {
            const active = filter.category === c.id;
            const photo = CATEGORY_PHOTOS[c.id];
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  aria-pressed={active}
                  className={`group w-full h-full text-left flex flex-col bg-white border-2 transition-colors ${
                    active ? "border-[#1a1a1a]" : "border-[#ece8de] hover:border-[#FFD000]"
                  }`}
                >
                  <span className="block overflow-hidden aspect-[3/2]">
                    {photo ? (
                      <img
                        src={photo}
                        alt=""
                        width={800}
                        height={428}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <CategoryScene id={c.id} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    )}
                  </span>
                  <span
                    className={`flex flex-1 items-center justify-between gap-2 px-3 xl:px-2 py-3 min-h-[64px] xl:flex-col xl:items-start xl:justify-between xl:gap-1 ${
                      active ? "bg-[#FFD000]" : "bg-white"
                    }`}
                  >
                    <span className="font-bold text-[15px] xl:text-[14px] leading-[1.45] text-[#1a1a1a] [word-break:auto-phrase]">{c.label}</span>
                    <ArrowIcon className="w-4 h-4 shrink-0 text-[#1a1a1a] xl:self-end" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
