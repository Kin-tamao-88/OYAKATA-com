import { AREA_GROUPS, COMPANIES, countByArea } from "../data";
import type { CompanyFilter } from "../data";
import { ArrowIcon } from "../icons";

type Props = {
  filter: CompanyFilter;
  onSelect: (prefecture: string) => void;
};

export default function Areas({ filter, onSelect }: Props) {
  return (
    <section id="areas" className="scroll-mt-[72px] lg:scroll-mt-[90px] bg-white py-16 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-10 lg:grid lg:grid-cols-[430px_1fr] lg:gap-16">
        <div className="mb-8 lg:mb-0">
          <h2 className="text-[#1a1a1a] font-black leading-[1.4] text-[26px] lg:text-[36px] lg:whitespace-nowrap">
            お住まいの地域から探す
          </h2>
          <p className="mt-4 text-[#333] text-[16px] leading-[1.9] text-pretty">
            お住まいの都道府県を選ぶと、その地域に対応する工事会社が表示されます。
          </p>
        </div>

        <div>
          {AREA_GROUPS.map((group) => (
            <div key={group.region}>
              <h3 className="flex items-center gap-3 pb-3 border-b-[3px] border-[#1a1a1a] text-[#1a1a1a] font-black text-[20px]">
                <span className="block w-3 h-3 bg-[#FFD000]" />
                {group.region}
              </h3>
              <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10">
                {group.prefectures.map((p) => {
                  const active = filter.area === p;
                  return (
                    <li key={p} className="border-b border-[#d8d4ca]">
                      <button
                        type="button"
                        onClick={() => onSelect(p)}
                        aria-pressed={active}
                        className="group w-full flex items-center justify-between gap-2 min-h-[64px] py-3 text-left"
                      >
                        <span className="min-w-0">
                          <span
                            className={`block font-black text-[18px] lg:text-[20px] ${
                              active ? "text-[#8a6a00]" : "text-[#1a1a1a] group-hover:text-[#8a6a00]"
                            }`}
                          >
                            {p}
                          </span>
                          <span className="block text-[14px] text-[#555] font-medium">
                            {countByArea(COMPANIES, p)}社が対応
                          </span>
                        </span>
                        <ArrowIcon className="w-5 h-5 shrink-0 text-[#1a1a1a] group-hover:translate-x-1 transition-transform" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
