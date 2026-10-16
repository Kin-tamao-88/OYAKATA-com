import { useState } from "react";
import logoMark from "../../../assets/images/logos/logo-mark2.webp";
import { CONTRACTORS_LINK, NAV_ITEMS } from "./data";

function BrandLogo() {
  return (
    <a href="/about" className="block no-underline" aria-label="親方ドットコム 公式サイト">
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
    </a>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e4e4e0]">
      <div className="flex items-center justify-between h-[64px] lg:h-[80px] pl-4 pr-2 lg:pl-[max(40px,calc((100vw-1240px)/2))] lg:pr-[max(40px,calc((100vw-1240px)/2))]">
        <BrandLogo />

        <nav className="hidden lg:flex items-center gap-9" aria-label="グローバルナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#111] font-bold text-[16px] no-underline hover:text-[#8a6a00] transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          {CONTRACTORS_LINK && (
            <a
              href={CONTRACTORS_LINK.href}
              className="text-[#111] font-bold text-[16px] no-underline border-l border-[#cfcfca] pl-9 hover:text-[#8a6a00] transition-colors whitespace-nowrap"
            >
              {CONTRACTORS_LINK.label}
            </a>
          )}
        </nav>

        <button
          type="button"
          className="lg:hidden w-[48px] h-[48px] flex items-center justify-center"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          aria-controls="about-sp-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="block w-6">
            <span
              className={`block h-[2px] bg-[#111] transition-transform ${isOpen ? "translate-y-[8px] rotate-45" : ""}`}
            />
            <span className={`block h-[2px] bg-[#111] my-[6px] ${isOpen ? "opacity-0" : ""}`} />
            <span
              className={`block h-[2px] bg-[#111] transition-transform ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {isOpen && (
        <nav
          id="about-sp-menu"
          className="lg:hidden border-t border-[#e4e4e0] bg-white"
          aria-label="スマートフォン用メニュー"
        >
          <ul className="px-5 py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-[#e4e4e0]">
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between h-[56px] text-[#111] font-bold text-[17px] no-underline"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-[#8a6a00]">›</span>
                </a>
              </li>
            ))}
            {CONTRACTORS_LINK && (
              <li>
                <a
                  href={CONTRACTORS_LINK.href}
                  className="flex items-center justify-between h-[56px] text-[#111] font-bold text-[17px] no-underline"
                >
                  {CONTRACTORS_LINK.label}
                  <span aria-hidden="true" className="text-[#8a6a00]">›</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
