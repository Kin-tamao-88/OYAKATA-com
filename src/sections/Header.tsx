import { useState } from "react";
import logoMark from "../assets/images/logos/logo-mark2.webp";

const navItems = [
  { label: "親方ドットコムとは？", href: "#s01" },
  { label: "課題・問題点", href: "#s02" },
  { label: "他社との違い", href: "#s04" },
  { label: "親方ドットコムの仕組み", href: "#s05" },
  { label: "選ばれる理由", href: "#s06" },
  { label: "導入実績・成果", href: "#s07" },
  { label: "現場の声", href: "#s08" },
  { label: "ご相談後のサポート", href: "#s09" },
  { label: "無料相談フォーム", href: "#contact" },
];

const pcNavItems = [
  { label: "親方ドットコムとは？", href: "#s01" },
  { label: "他社との違い", href: "#s04" },
  { label: "選ばれる理由", href: "#s06" },
  { label: "導入企業一例", href: "#s07" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ══ SP Header ══════════════════════════════════════════════════ */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b-2 border-[#f5a623]">
        <div className="flex items-center px-3 h-[68px] gap-3">

          {/* 左：ロゴマーク */}
          <div className="flex-1 overflow-hidden h-[68px] flex items-center justify-center mt-[9px]">
            <img
              src={logoMark}
              alt="親方ドットコム"
              className="h-[180px] w-auto max-w-none"
            />
          </div>

          {/* 右：サブコピー＋ハンバーガー */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[#1a1a1a] text-[11px] font-bold leading-tight text-right">
              工事業者専門の<br />集客支援サービス
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center justify-center gap-[5px] p-1 shrink-0"
              aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {isOpen ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <line x1="3" y1="3" x2="19" y2="19" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="19" y1="3" x2="3" y2="19" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              ) : (
                <>
                  <span className="block w-[22px] h-[2px] bg-[#1a1a1a]" />
                  <span className="block w-[22px] h-[2px] bg-[#1a1a1a]" />
                  <span className="block w-[22px] h-[2px] bg-[#1a1a1a]" />
                </>
              )}
            </button>
          </div>

        </div>

        {/* ── SP ドロップダウンメニュー ── */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#1a1a1a] border-t-2 border-[#D4A820] z-50">
            <nav className="px-5 divide-y divide-[#2a2a2a]">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 py-[14px] no-underline"
                >
                  <span className="text-[#D4A820] font-black text-[11px] w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white font-bold text-[14px] flex-1">{item.label}</span>
                  <span className="text-[#D4A820] font-black text-[16px]">›</span>
                </a>
              ))}
            </nav>
            <div className="px-5 py-5 border-t-2 border-[#D4A820]">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#D4A820] py-4 no-underline"
              >
                <span className="font-black text-[#1a1a1a] text-[15px]">無料相談はこちら ›</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ══ PC Header ══════════════════════════════════════════════════ */}
      <div className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-40">
        <div
          className="flex items-stretch"
          style={{ maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}
        >

          {/* ロゴ */}
          <div className="flex items-center flex-shrink-0" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
            <div style={{ overflow: "hidden", height: "88px", width: "320px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "9px" }}>
              <img
                src={logoMark}
                alt="親方ドットコム ｜ 工事業者専門の集客支援サービス"
                style={{ height: "280px", width: "auto", maxWidth: "none" }}
              />
            </div>
          </div>

          {/* PCナビメニュー */}
          <nav className="flex items-center flex-1 justify-center gap-4">
            {pcNavItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                {i > 0 && <span className="text-[#ddd] text-[14px]">|</span>}
                <a
                  href={item.href}
                  className="text-[#1a1a1a] font-extrabold text-[14px] no-underline hover:text-[#D4A820] transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          {/* 電話番号エリア */}
          <a
            href="tel:08047729896"
            className="flex items-center gap-2.5 flex-shrink-0 no-underline"
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0 rounded-full"
              style={{ width: "42px", height: "42px", backgroundColor: "#f5a623" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[#1a1a1a]" style={{ fontSize: "11px", fontWeight: 500 }}>お電話でのご相談</span>
              <span className="text-[#D4A820] font-bold" style={{ fontSize: "17px" }}>080-4772-9896</span>
            </div>
          </a>

          {/* 区切り線 */}
          <div className="flex-shrink-0" style={{ width: "1px", backgroundColor: "#e5e5e5", marginTop: "26px", marginBottom: "26px" }} />

          {/* LINE CTA：ヘッダー全高パネル */}
          <a
            href="#contact"
            className="relative flex flex-col items-center justify-center flex-shrink-0 self-stretch no-underline hover:bg-gray-50 transition-colors"
            style={{ paddingLeft: "36px", paddingRight: "36px", textDecoration: "none" }}
          >
            {/* CTAボタン */}
            <div
              className="flex items-center bg-[#FFD000] hover:brightness-95 transition-all"
              style={{ gap: "10px", borderRadius: "6px", padding: "11px 22px", whiteSpace: "nowrap" }}
            >
              <span
                className="flex items-center justify-center flex-shrink-0 rounded-full"
                style={{ width: "26px", height: "26px", backgroundColor: "#fff" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" role="img" aria-label="LINE" fill="#06C755">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </span>
              <span className="font-black text-[#1a1a1a]" style={{ fontSize: "15px" }}>LINEで無料相談</span>
              <span className="font-black text-[#1a1a1a]" style={{ fontSize: "13px" }}>›</span>
            </div>
          </a>

        </div>
      </div>
    </>
  );
}
