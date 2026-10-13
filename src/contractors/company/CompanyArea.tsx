import type { CompanyAreaDetail } from "../companyDetails";
import type { CompanyTheme } from "../companyTheme";

type Props = {
  companyName: string;
  areas: CompanyAreaDetail[];
  theme: CompanyTheme;
};

export default function CompanyArea({ companyName, areas, theme }: Props) {
  if (areas.length === 0) return null;
  const prefectureText = areas.map((a) => a.prefecture).join("・");

  return (
    <section className={`${theme.warmBg} py-16 lg:py-28`}>
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20">
        <div className="mb-8 lg:mb-0">
          <p className="flex items-center gap-3 mb-4 text-[#1a1a1a] font-bold text-[14px] tracking-wider">
            <span className={`block w-6 h-[3px] ${theme.accentBg}`} />
            AREA
          </p>
          <h2 className="text-[#1a1a1a] font-black leading-[1.4] text-[26px] lg:text-[38px]">対応エリア</h2>
          <p className="mt-4 text-[#333] text-[16px] leading-[1.9] [word-break:auto-phrase]">
            {companyName}は、{prefectureText}を中心に対応しています。
          </p>
        </div>

        <div className="border-t-[3px] border-[#1a1a1a]">
          {areas.map((a) => (
            <div key={a.prefecture} className="py-6 lg:py-7 border-b border-[#d8d4ca] lg:grid lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-6">
              <h3 className="font-black text-[#1a1a1a] text-[22px] lg:text-[24px] flex items-center gap-3">
                <span className={`block w-3 h-3 ${theme.accentBg}`} />
                {a.prefecture}
              </h3>
              {a.cities.length > 0 && (
                <p className="mt-2 lg:mt-0 text-[#1a1a1a] text-[16px] lg:text-[17px] font-medium leading-[2] [word-break:auto-phrase]">
                  {a.cities.join("、")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
