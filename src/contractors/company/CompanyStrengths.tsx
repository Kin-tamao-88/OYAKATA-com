import type { CompanyStrength, Photo } from "../companyDetails";
import type { CompanyTheme } from "../companyTheme";

type Props = {
  strengths: CompanyStrength[];
  photo?: Photo;
  theme: CompanyTheme;
};

export default function CompanyStrengths({ strengths, photo, theme }: Props) {
  if (strengths.length === 0) return null;

  return (
    <section className={`${theme.darkBg} py-16 lg:py-28`}>
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10 lg:grid lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-20">
        <div className="mb-10 lg:mb-0">
          <div className="lg:sticky lg:top-[112px]">
            <p className={`flex items-center gap-3 mb-4 ${theme.accentTextOnDark} font-bold text-[14px] tracking-wider`}>
              <span className={`block w-6 h-[3px] ${theme.accentBg}`} />
              STRENGTH
            </p>
            <h2 className="text-white font-black leading-[1.4] text-[26px] lg:text-[38px]">選ばれる理由</h2>
            {photo && (
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="mt-8 w-full aspect-[4/3] lg:aspect-[4/5] object-cover object-[40%_50%]"
              />
            )}
          </div>
        </div>

        <ol>
          {strengths.map((s, i) => (
            <li key={s.title} className="py-8 lg:py-10 border-t border-white/25 last:border-b">
              <div className="flex items-baseline gap-5">
                <span className={`font-black leading-none ${theme.accentTextOnDark} text-[44px] lg:text-[64px]`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-black text-white text-[22px] lg:text-[30px] leading-[1.4]">{s.title}</h3>
              </div>
              <p className="mt-4 lg:pl-[88px] text-white/85 text-[16px] lg:text-[18px] leading-[2] [word-break:auto-phrase]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
