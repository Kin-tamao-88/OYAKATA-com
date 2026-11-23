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
  return <p className="pb-3 mb-4 border-b-2 border-[#111] text-[#111] font-black text-[16px]">{children}</p>;
}

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="lg:space-y-[10px]">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="block py-[9px] lg:py-0 lg:whitespace-nowrap text-[#111] text-[16px] hover:underline underline-offset-4">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    // SPは下部固定CTAの分だけ下の余白を広く取る
    <footer className="bg-white px-5 pt-[52px] pb-[100px] lg:pt-[72px] lg:pb-9 lg:px-[max(40px,calc((100vw-1280px)/2))]">
      <div className="flex flex-col gap-9 lg:flex-row lg:justify-between lg:gap-10 xl:gap-16">
        <div>
          <Logo />
          <p className="mt-5 text-[#111] text-[16px] leading-[1.9]">工事会社の集客と事業成長を支援するサービスです。</p>
        </div>

        <div className="flex flex-col gap-9 lg:flex-row lg:gap-8 xl:gap-[72px]">
          <nav aria-label="サイトメニュー">
            <ColumnTitle>サイトメニュー</ColumnTitle>
            <LinkList items={SITE_LINKS} />
          </nav>

          <nav aria-label="関連リンク">
            <ColumnTitle>関連リンク</ColumnTitle>
            <LinkList items={RELATED_LINKS} />
          </nav>

          <div>
            <ColumnTitle>会社情報</ColumnTitle>
            <dl className="text-[#111] text-[16px] leading-[1.9]">
              <dt className="font-bold">運営会社</dt>
              <dd>アイブレ株式会社</dd>
              <dt className="mt-[10px] font-bold">所在地</dt>
              <dd className="lg:whitespace-nowrap">愛知県名古屋市<br className="hidden lg:block xl:hidden" />中村区松重町4-51</dd>
            </dl>
          </div>
        </div>
      </div>

      <p className="mt-14 pt-6 border-t border-[#111] text-[#333] text-[14px]">© 2026 アイブレ株式会社</p>
    </footer>
  );
}
