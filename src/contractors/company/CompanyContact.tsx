import type { CompanyContact as ContactData } from "../companyDetails";
import { getContactMethods } from "../companyDetails";
import type { CompanyTheme } from "../companyTheme";
import { ArrowIcon } from "../icons";

type Props = {
  companyName: string;
  contact: ContactData;
  theme: CompanyTheme;
};

/**
 * 一般のお客様が掲載企業へ相談するためのCTA。
 * 工事会社が親方ドットコムへ掲載を申し込む導線(ListingCta)とは別物。登録されている連絡手段だけを表示する。
 */
export default function CompanyContact({ companyName, contact, theme }: Props) {
  const methods = getContactMethods(contact);
  if (methods.length === 0 && !contact.websiteUrl) return null;

  return (
    <section id="contact" className={`scroll-mt-[72px] lg:scroll-mt-[90px] ${theme.ctaBg} ${theme.ctaText} py-16 lg:py-24`}>
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-20 lg:items-center">
        <div>
          <h2 className="font-black leading-[1.4] text-[26px] lg:text-[40px] text-balance [word-break:auto-phrase]">
            住まいのお困りごと、まずは相談してみませんか？
          </h2>
          <p className="mt-5 text-[16px] lg:text-[18px] leading-[1.9] font-medium [word-break:auto-phrase]">
            {companyName}へのご相談・お見積りのご依頼は、こちらからお気軽にどうぞ。
          </p>
        </div>

        <div className="mt-8 lg:mt-0 flex flex-col gap-3">
          {methods.map((m) => {
            const isTel = m.kind === "tel";
            return (
              <a
                key={m.kind}
                href={m.href}
                {...(isTel ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className={`flex items-center justify-between gap-4 min-h-[72px] px-6 no-underline font-black text-[18px] transition-colors ${
                  isTel
                    ? theme.ctaPrimary
                    : "bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-[#faf8f4]"
                }`}
              >
                <span className="flex flex-col">
                  <span>{m.label}</span>
                  {m.note && <span className={`${isTel ? theme.ctaPrimaryNote : ""} text-[16px] lg:text-[20px] tracking-wide`}>{m.note}</span>}
                </span>
                <ArrowIcon className="w-5 h-5 shrink-0" />
              </a>
            );
          })}
          {contact.websiteUrl && (
            <a
              href={contact.websiteUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-1 self-start font-bold text-[16px] underline underline-offset-4 decoration-2 text-inherit"
            >
              公式ホームページを見る
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
