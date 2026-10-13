import { useState } from "react";
import { trackLineClick } from "../../lib/analytics";
import { buildLineCtaHref } from "../../lib/line";
import { ArrowIcon, LineIcon } from "../icons";
import logoMark from "../../assets/images/logos/logo-mark2.webp";

const NAV_ITEMS = [
  { label: "工事会社を探す", href: "#companies" },
  { label: "工事の種類から探す", href: "#categories" },
  { label: "エリアから探す", href: "#areas" },
  { label: "掲載について", href: "#listing" },
];

function BrandLockup() {
  return (
    <a href="/contractors" className="flex items-center no-underline" aria-label="親方ドットコム パートナーズ">
      {/* ロゴ画像は余白を含むため、表示領域を絞って使用(画像自体は無加工) */}
      <span className="block overflow-hidden w-[172px] h-[44px] lg:w-[232px] lg:h-[56px] relative">
        <img
          src={logoMark}
          alt="親方ドットコム"
          width={1536}
          height={1024}
          className="absolute max-w-none h-[168px] lg:h-[224px] w-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-[47%]"
        />
      </span>
      <span className="mx-3 lg:mx-4 block w-px h-6 bg-[#c9c5bc]" />
      <span className="text-[#1a1a1a] font-black text-[15px] lg:text-[18px] leading-none tracking-wide whitespace-nowrap">
        パートナーズ
      </span>
    </a>
  );
}

type Props = {
  /** 一覧ページ以外から使うときのアンカー用ベースパス(例: /contractors) */
  base?: string;
};

export default function Header({ base = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e4e0d8]">
      <div className="flex items-stretch justify-between h-[64px] lg:h-[80px] pl-4 lg:pl-[max(40px,calc((100vw-1340px)/2))]">
        <div className="flex items-center">
          <BrandLockup />
        </div>

        {/* PC ナビ */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-9 ml-auto mr-6 xl:mr-10" aria-label="グローバルナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={base + item.href}
              className={`text-[#1a1a1a] font-bold text-[16px] no-underline hover:text-[#8a6a00] transition-colors whitespace-nowrap ${item.href === "#listing" ? "hidden min-[1400px]:block" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={buildLineCtaHref()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackLineClick}
          className="hidden lg:flex items-center gap-3 bg-[#FFD000] text-[#1a1a1a] font-black text-[16px] no-underline px-5 xl:px-8 hover:brightness-95 transition-all whitespace-nowrap"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0">
            <LineIcon className="w-[18px] h-[18px]" />
          </span>
          パートナー掲載について
          <ArrowIcon className="w-5 h-5" />
        </a>

        {/* SP ハンバーガー */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden flex items-center justify-center w-12 h-full text-[#1a1a1a] mr-2"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          aria-controls="contractors-sp-menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {isOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div id="contractors-sp-menu" className="lg:hidden absolute top-full left-0 right-0 bg-[#1a1a1a] border-t-2 border-[#FFD000]">
          <nav className="px-5 divide-y divide-[#333]" aria-label="スマートフォン用ナビゲーション">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={base + item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 no-underline"
              >
                <span className="text-white font-bold text-[16px]">{item.label}</span>
                <span className="text-[#FFD000] font-black text-[18px]">›</span>
              </a>
            ))}
          </nav>
          <div className="px-5 pb-5">
            <a
              href={buildLineCtaHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackLineClick();
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-3 h-[60px] bg-[#FFD000] text-[#1a1a1a] font-black text-[17px] no-underline"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0">
                <LineIcon className="w-[18px] h-[18px]" />
              </span>
              パートナー掲載について
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
