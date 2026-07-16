import logoMark from "../assets/images/logos/logo-mark2.webp";

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200">
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
  );
}
