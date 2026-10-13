import type { CompanyService } from "../companyDetails";
import type { CompanyTheme } from "../companyTheme";

type Props = {
  services: CompanyService[];
  theme: CompanyTheme;
};

export default function CompanyServices({ services, theme }: Props) {
  if (services.length === 0) return null;

  return (
    <section className={`${theme.softBg} py-16 lg:py-28`}>
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20">
        <div className="mb-8 lg:mb-0">
          <div className="lg:sticky lg:top-[112px]">
            <p className="flex items-center gap-3 mb-4 text-[#1a1a1a] font-bold text-[14px] tracking-wider">
              <span className={`block w-6 h-[3px] ${theme.accentBg}`} />
              SERVICE
            </p>
            <h2 className="text-[#1a1a1a] font-black leading-[1.4] text-[26px] lg:text-[38px]">対応工事・サービス</h2>
          </div>
        </div>

        <ol className="border-t-[3px] border-[#1a1a1a]">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-[48px_minmax(0,1fr)] lg:grid-cols-[72px_minmax(0,1fr)_auto] gap-x-3 lg:gap-x-6 py-6 lg:py-8 border-b border-[#c9c5bc]"
            >
              <span className={`font-black ${theme.accentText} text-[20px] lg:text-[28px] leading-[1.3]`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-black text-[#1a1a1a] text-[20px] lg:text-[26px] leading-[1.4]">{s.title}</h3>
                <p className="mt-2 text-[#333] text-[16px] lg:text-[17px] leading-[1.9] [word-break:auto-phrase]">{s.body}</p>
              </div>
              {s.image && (
                <img
                  src={s.image.src}
                  alt={s.image.alt}
                  width={s.image.width}
                  height={s.image.height}
                  loading="lazy"
                  decoding="async"
                  className="col-span-2 lg:col-span-1 mt-4 lg:mt-0 w-full lg:w-[200px] aspect-[4/3] object-cover"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
