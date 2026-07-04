const Y = "#f5a623";
const BK = "#1a1a1a";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-gray-200 bg-white">
      {/* ロゴ */}
      <div className="flex items-center gap-2.5">
        <svg width="44" height="48" viewBox="0 0 48 52" aria-label="親方ドットコム">
          <polygon points="24,2 44,13 44,39 24,50 4,39 4,13" fill={BK} />
          <text
            x="24" y="31" textAnchor="middle"
            fontFamily="'Noto Sans JP',sans-serif"
            fontSize="18" fontWeight="900" fill={Y}
          >
            親
          </text>
        </svg>
        <div>
          <div className="text-xl font-black text-[#1a1a1a] leading-tight">親方ドットコム</div>
          <div className="text-[11px] text-[#666] leading-tight">工事業者専門の集客支援サービス</div>
        </div>
      </div>

      {/* 電話番号 */}
      <div className="text-center">
        <span className="block text-[11px] text-[#888] mb-0.5">📞 受付時間 平日9:00-18:00</span>
        <div className="text-[28px] font-black text-[#1a1a1a] tracking-wider leading-none">
          0120-123-456
        </div>
      </div>

      {/* CTAボタン */}
      <button
        aria-label="無料相談はこちら"
        className="flex items-center gap-2.5 rounded-[4px] px-5 py-2.5 min-w-[180px]"
        style={{ background: Y }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke={BK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <div className="flex flex-col items-start">
          <span className="text-[15px] font-black text-[#1a1a1a]">無料相談はこちら ›</span>
          <span className="text-[11px] text-[#1a1a1a] opacity-70">1分で簡単入力</span>
        </div>
      </button>
    </header>
  );
}
