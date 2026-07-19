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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ══ SP Header ══════════════════════════════════════════════════ */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b-2 border-[#f5a623]">
        <div className="flex items-center px-3 h-[56px] gap-3">

          {/* 左：ロゴマーク */}
          <div className="flex-1 overflow-hidden h-[56px] flex items-center justify-center mt-[9px]">
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
      <div className="hidden lg:block bg-white border-b border-gray-200">
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

          {/* スペーサー */}
          <div className="flex-1" />

          {/* CTA：ヘッダー全高パネル */}
          <a
            href="#contact"
            className="relative flex flex-col items-center justify-center flex-shrink-0 self-stretch no-underline hover:bg-gray-50 transition-colors"
            style={{ paddingLeft: "36px", paddingRight: "36px", gap: "8px", textDecoration: "none" }}
          >
            {/* バッジ */}
            <div className="relative">
              <div
                className="text-[#D4A820]"
                style={{ backgroundColor: "#252525", fontSize: "11px", fontWeight: 500, padding: "4px 14px", borderRadius: "4px", whiteSpace: "nowrap", lineHeight: 1.4 }}
              >
                無料相談はカンタン&thinsp;
                <span style={{ color: "#D4A820", fontSize: "14px", fontWeight: 900 }}>1分</span>
                &thinsp;で入力完了
              </div>
              <div
                className="absolute left-1/2"
                style={{ bottom: "-7px", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #252525" }}
              />
            </div>

            {/* CTAボタン */}
            <div
              className="flex items-center bg-[#1a1a1a]"
              style={{ gap: "10px", borderRadius: "6px", padding: "11px 22px", whiteSpace: "nowrap", border: "2px solid #D4A820" }}
            >
              <svg width="18" height="14" viewBox="0 0 28 22" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="25" height="19" rx="2.5" stroke="#fff" strokeWidth="2.2" fill="none" />
                <polyline points="1.5,4.5 14,13.5 26.5,4.5" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="font-black text-white" style={{ fontSize: "15px" }}>無料相談はこちら</span>
              <span className="font-black text-white" style={{ fontSize: "13px" }}>›</span>
            </div>
          </a>

        </div>
      </div>
    </>
  );
}
