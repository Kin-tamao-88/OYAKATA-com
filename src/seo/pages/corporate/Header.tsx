import { useState } from "react";
import { IMG } from "./assets";
import { ArrowRight } from "./icons";

const NAV_ITEMS = [
  { label: "私たちについて", href: "#mission" },
  { label: "事業内容", href: "#service" },
  { label: "選ばれる理由", href: "#strength" },
];

/** ロゴ(横組み・余白付き画像)を本体部分だけ切り出して表示する */
function Logo() {
  return (
    <a href="/corporate" className="block relative h-[40px] w-[157px] lg:h-[46px] lg:w-[181px] overflow-hidden shrink-0" aria-label="親方ドットコム">
      <img
        src={IMG.logo}
        alt="親方ドットコム"
        className="absolute max-w-none h-auto w-[234px] -left-[37px] -top-[51px] lg:w-[270px] lg:-left-[43px] lg:-top-[59px]"
      />
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e8e8e8]">
      <div className="flex items-center justify-between h-[64px] lg:h-[76px] px-5 lg:px-[max(40px,calc((100vw-1320px)/2))]">
        <Logo />

        <nav className="hidden lg:flex items-center gap-10" aria-label="メインメニュー">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="text-[#111] font-bold text-[16px] hover:text-[#b88700] transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 h-[48px] px-7 rounded-full bg-[#ffd400] text-[#111] font-black text-[16px] hover:brightness-95 transition"
          >
            お問い合わせ
            <ArrowRight />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            className="lg:hidden flex flex-col items-center justify-center gap-[6px] w-10 h-10"
          >
            <span className={`block w-6 h-[2px] bg-[#111] transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#111] transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#111] transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden bg-white border-t border-[#e8e8e8] px-5 pb-5" aria-label="モバイルメニュー">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 border-b border-[#eee] text-[#111] font-bold text-[16px]"
            >
              {item.label}
              <ArrowRight className="text-[#e0a800]" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-3 h-[52px] rounded-full bg-[#ffd400] text-[#111] font-black text-[16px]"
          >
            お問い合わせ
            <ArrowRight />
          </a>
        </nav>
      )}
    </header>
  );
}
