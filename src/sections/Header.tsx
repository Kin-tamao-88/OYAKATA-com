import logoMark from "../assets/images/logo-mark.png";

const Y = "#f5a623";
const BK = "#1a1a1a";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-gray-200 bg-white">
      {/* ロゴ：画像にビネット余白があるためoverflowクロップでズームイン */}
      <div className="h-[64px] w-[380px] overflow-hidden shrink-0">
        <img
          src={logoMark}
          alt="親方ドットコム"
          className="h-[320px] w-auto -mt-[132px] -ml-[88px]"
        />
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
