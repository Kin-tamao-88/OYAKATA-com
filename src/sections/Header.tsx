import logoMark from "../assets/images/logos/logo-mark.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200" style={{ height: "72px", paddingLeft: "40px", paddingRight: "32px" }}>

      {/* ロゴ */}
      <div className="flex-shrink-0">
        <img
          src={logoMark}
          alt="親方ドットコム ｜ 工事業者専門の集客支援サービス"
          style={{ height: "56px", width: "auto" }}
        />
      </div>

      {/* 電話番号（中央） */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.61a16 16 0 0 0 5.51 5.51l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
        </svg>
        <div>
          <p className="text-[#555] leading-none" style={{ fontSize: "11px", marginBottom: "3px" }}>受付時間 平日9:00-18:00</p>
          <p className="font-black text-[#1a1a1a] leading-none" style={{ fontSize: "26px", letterSpacing: "-0.02em" }}>0120-123-456</p>
        </div>
      </div>

      {/* CTAボタン */}
      <div className="flex-shrink-0">
        <button
          aria-label="無料相談はこちら"
          className="flex items-center gap-3 rounded-[4px]"
          style={{ backgroundColor: "#f5a623", padding: "12px 24px", border: "none", cursor: "pointer" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <div className="text-left">
            <span className="block font-black text-[#1a1a1a]" style={{ fontSize: "15px", lineHeight: 1.2 }}>無料相談はこちら ›</span>
            <span className="block text-[#1a1a1a]" style={{ fontSize: "11px", opacity: 0.7, lineHeight: 1.4 }}>1分で簡単入力</span>
          </div>
        </button>
      </div>

    </header>
  );
}
