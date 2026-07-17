import logoMark from "../assets/images/logos/logo-mark2.webp";

export default function Header() {
  return (
    <>
      {/* ══ SP Header ══════════════════════════════════════════════════ */}
      <div className="lg:hidden bg-white border-b-2 border-[#f5a623]">
        <div className="flex items-center px-3 h-[56px] gap-3">

          {/* 左：ロゴマーク（余白クロップ・PCと同スケール） */}
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
            <button className="flex flex-col justify-center gap-[5px] p-1 shrink-0" aria-label="メニューを開く">
              <span className="block w-[22px] h-[2px] bg-[#1a1a1a]" />
              <span className="block w-[22px] h-[2px] bg-[#1a1a1a]" />
              <span className="block w-[22px] h-[2px] bg-[#1a1a1a]" />
            </button>
          </div>

        </div>
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
          <div
            className="flex flex-col items-center justify-center flex-shrink-0 self-stretch"
            style={{ backgroundColor: "#f5a623", paddingLeft: "48px", paddingRight: "48px", gap: "6px" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <div className="text-center">
              <span className="block font-black text-[#1a1a1a]" style={{ fontSize: "16px", lineHeight: 1.3 }}>無料相談はこちら ›</span>
              <span className="block text-[#1a1a1a]" style={{ fontSize: "11px", opacity: 0.7, lineHeight: 1.4 }}>1分で簡単入力</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
