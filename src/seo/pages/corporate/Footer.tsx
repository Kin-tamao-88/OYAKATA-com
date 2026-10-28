import { CONTRACTORS_PUBLIC } from "../../site";
import { Logo } from "./Header";

const SITE_LINKS = [
  { label: "私たちについて", href: "#mission" },
  { label: "事業内容", href: "#service" },
  { label: "選ばれる理由", href: "#strength" },
  { label: "親方ドットコム パートナーズ", href: "#partners" },
  { label: "お問い合わせ", href: "#contact" },
];

const RELATED_LINKS = [
  ...(CONTRACTORS_PUBLIC ? [{ label: "パートナーズサイト", href: "/contractors" }] : []),
  { label: "プライバシーポリシー", href: "/privacy" },
];

function ColumnTitle({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-[#111] font-black text-[16px] mb-4">
      <span className="w-[5px] h-[18px] bg-[#f2b500]" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t-[4px] border-[#f2b500]">
      <div className="px-5 pt-12 pb-8 lg:pt-16 lg:pb-10 lg:px-[max(40px,calc((100vw-1320px)/2))]">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="lg:max-w-[360px]">
            <Logo />
            <p className="mt-5 text-[#222] text-[16px] leading-[1.9]">工事会社の集客と事業成長を支援するサービスです。</p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_auto_auto] lg:gap-16">
            <nav aria-label="サイトメニュー">
              <ColumnTitle>サイトメニュー</ColumnTitle>
              <ul className="space-y-3">
                {SITE_LINKS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-[#222] text-[16px] hover:underline underline-offset-4">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="関連リンク">
              <ColumnTitle>関連リンク</ColumnTitle>
              <ul className="space-y-3">
                {RELATED_LINKS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-[#222] text-[16px] hover:underline underline-offset-4">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <ColumnTitle>会社情報</ColumnTitle>
              <dl className="space-y-3 text-[#222] text-[16px] leading-[1.8]">
                <div>
                  <dt className="font-bold">運営会社</dt>
                  <dd>アイブレ株式会社</dd>
                </div>
                <div>
                  <dt className="font-bold">所在地</dt>
                  <dd>愛知県名古屋市中村区松重町4-51<br />KAKOビル4C</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <p className="mt-12 pt-6 border-t border-[#e0e0e0] text-[#555] text-[16px]">© 2026 アイブレ株式会社</p>
      </div>
    </footer>
  );
}
