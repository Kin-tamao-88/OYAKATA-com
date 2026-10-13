import { getCategoryLabel } from "../data";
import type { Company } from "../data";
import type { CompanyDetail } from "../companyDetails";
import type { CompanyTheme } from "../companyTheme";

type Props = {
  company: Company;
  detail: CompanyDetail;
  theme: CompanyTheme;
};

type Row = { label: string; value: string; href?: string; external?: boolean };

export default function CompanyProfile({ company, detail, theme }: Props) {
  const { profile, contact } = detail;

  // 未登録の項目は行ごと表示しない
  const rows: (Row | null)[] = [
    { label: "会社名", value: company.name },
    { label: "所在地", value: profile.address ?? company.location },
    profile.representative ? { label: "代表者", value: profile.representative } : null,
    profile.established ? { label: "設立", value: profile.established } : null,
    { label: "対応工事", value: company.categories.map(getCategoryLabel).join("、") },
    { label: "対応エリア", value: company.areaLabel },
    profile.hours ? { label: "営業時間", value: profile.hours } : null,
    profile.holiday ? { label: "定休日", value: profile.holiday } : null,
    contact.tel
      ? { label: "電話番号", value: contact.tel, href: `tel:${contact.tel.replace(/[^0-9+]/g, "")}` }
      : null,
    contact.websiteUrl
      ? { label: "公式ホームページ", value: contact.websiteUrl, href: contact.websiteUrl, external: true }
      : null,
  ];
  const visible = rows.filter((r): r is Row => r !== null && r.value !== "");

  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20">
        <div className="mb-8 lg:mb-0">
          <p className="flex items-center gap-3 mb-4 text-[#1a1a1a] font-bold text-[14px] tracking-wider">
            <span className={`block w-6 h-[3px] ${theme.accentBg}`} />
            COMPANY
          </p>
          <h2 className="text-[#1a1a1a] font-black leading-[1.4] text-[26px] lg:text-[38px]">会社概要</h2>
        </div>

        <dl className="border-t-[3px] border-[#1a1a1a]">
          {visible.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[132px_minmax(0,1fr)] lg:grid-cols-[180px_minmax(0,1fr)] gap-4 py-4 lg:py-5 border-b border-[#d8d4ca]"
            >
              <dt className="font-bold text-[#555] text-[16px] whitespace-nowrap">{r.label}</dt>
              <dd className="text-[#1a1a1a] font-bold text-[16px] lg:text-[17px] leading-[1.8] break-words [word-break:auto-phrase]">
                {r.href ? (
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
                    className="text-[#1a1a1a] underline underline-offset-4 decoration-[#b9b4a8] decoration-2 hover:opacity-70"
                  >
                    {r.value}
                  </a>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
