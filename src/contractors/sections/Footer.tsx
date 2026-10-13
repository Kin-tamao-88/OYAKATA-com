import logoMark from "../../assets/images/logos/logo-mark2.webp";

const LINKS = [
  { label: "親方ドットコム", href: "/" },
  { label: "親方ドットコム パートナーズ", href: "/contractors" },
  { label: "工事内容から探す", href: "#categories" },
  { label: "エリアから探す", href: "#areas" },
  { label: "掲載について", href: "#listing" },
  { label: "プライバシーポリシー", href: "/privacy" },
];

type Props = {
  /** 一覧ページ以外から使うときのアンカー用ベースパス(例: /contractors) */
  base?: string;
};

export default function Footer({ base = "" }: Props) {
  return (
    <footer className="bg-white border-t border-[#e4e0d8]">
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10 py-12 lg:py-16 lg:flex lg:items-start lg:justify-between lg:gap-12">
        <div>
          <a href="/contractors" className="flex items-center no-underline" aria-label="親方ドットコム パートナーズ">
            <span className="block overflow-hidden relative w-[180px] h-[50px] lg:w-[240px] lg:h-[60px]">
              <img
                src={logoMark}
                alt="親方ドットコム"
                width={1536}
                height={1024}
                loading="lazy"
                className="absolute max-w-none h-[190px] lg:h-[236px] w-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-[47%]"
              />
            </span>
            <span className="mx-4 block w-px h-6 bg-[#c9c5bc]" />
            <span className="text-[#1a1a1a] font-black text-[18px] leading-none whitespace-nowrap">パートナーズ</span>
          </a>
          <p className="mt-4 text-[#555] text-[14px] leading-[1.8] text-balance [word-break:auto-phrase]">
            親方ドットコム パートナーズ
            <br />
            親方ドットコムが紹介する、地域の工事会社ネットワーク。
          </p>
        </div>

        <nav className="mt-10 lg:mt-0" aria-label="フッターナビゲーション">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href.startsWith("#") ? base + l.href : l.href}
                  className="flex items-center min-h-[44px] text-[#1a1a1a] font-bold text-[16px] no-underline hover:text-[#8a6a00]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-[#e4e0d8] py-5 text-center text-[14px] text-[#555]">
        © 親方ドットコム
      </div>
    </footer>
  );
}
