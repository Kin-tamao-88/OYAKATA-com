import brushYellow from "../assets/images/ui/brush-yellow.webp";
import logoMark2 from "../assets/images/logos/logo-mark2.webp";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";

function IconMonitor() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="18" height="13" rx="1.5" stroke="#888" strokeWidth="1.5" />
      <line x1="7" y1="19" x2="15" y2="19" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="16" x2="11" y2="19" stroke="#888" strokeWidth="1.5" />
    </svg>
  );
}
function IconMegaphone() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M4 8 H8 L16 4 L16 18 L8 14 H4 Z" stroke="#888" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M8 14 L8 19" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="6.5" stroke="#888" strokeWidth="1.5" />
      <line x1="14" y1="14" x2="20" y2="20" stroke="#888" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 4 H19 Q20 4 20 5 L20 14 Q20 15 19 15 H7 L3 19 L3 5 Q3 4 3 4 Z" stroke="#888" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="12" width="4" height="8" fill="#888" />
      <rect x="9" y="8" width="4" height="12" fill="#888" />
      <rect x="16" y="4" width="4" height="16" fill="#888" />
    </svg>
  );
}
import iconProfit from "../assets/images/OC03/icon-profit.webp";
import iconAdvertising from "../assets/images/OC03/icon-advertising.webp";
import iconTime from "../assets/images/OC03/icon-time.webp";
import iconConnections from "../assets/images/OC03/icon-connections.webp";
import iconGrowth from "../assets/images/OC03/icon-growth.webp";

const leftItems = [
  { text: "ホームページを作るだけ", sub: "作って終わりで、見てもらえない。", icon: <IconMonitor /> },
  { text: "広告を出すだけ", sub: "一時的に集客できても、費用がかさむだけ。", icon: <IconMegaphone /> },
  { text: "SEO 対策だけ", sub: "結果が出るまで時間がかかり、安定しない。", icon: <IconSearch /> },
  { text: "SNS を頑張るだけ", sub: "手間ばかり増え、問い合わせにつながらない。", icon: <IconChat /> },
  { text: "改善や分析をしない", sub: <>うまくいかない理由が分からず、<br className="lg:hidden" />成果が伸びない。</>, icon: <IconChart /> },
];

const rightItems = [
  { text: "市場・競合を徹底分析", sub: <>地域や業種の特性を分析し、<br className="lg:hidden" />勝てる戦略を設計。</>, icon: iconProfit },
  { text: "集客導線を設計・構築", sub: <>HP・広告・SNSなど<br className="lg:hidden" />最適な導線を設計・構築。</>, icon: iconAdvertising },
  { text: "広告運用とLP改善を一括サポート", sub: <>成果を最大化する<br className="lg:hidden" />広告運用とLP改善を実施。</>, icon: iconTime },
  { text: "問い合わせ獲得を最大化", sub: <>確度の高い問い合わせを<br className="lg:hidden" />増やし受注につなげる。</>, icon: iconConnections },
  { text: "データ分析で改善を継続", sub: <>分析・改善を繰り返し、<br className="lg:hidden" />成果を安定的に伸ばす。</>, icon: iconGrowth },
];

export default function Section05() {
  return (
    <section className="bg-white pt-14 pb-8 lg:pt-[80px] lg:pb-[40px]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        {/* ── Section Header ── */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
            <div>
              <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">04</span>
              <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
            </div>
            <div className="w-px h-10 bg-[#1a1a1a]" />
            <span className="text-[#1a1a1a] font-bold text-[16px] lg:text-[16px]">他社サービスとの違い</span>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-[#D4A820] to-[#1a1a1a] mt-3 mb-5" />
          <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-4 text-[24px] lg:text-[50px]">
            集客のやり方で、<br className="lg:hidden" />
            <span style={{ borderBottom: "6px solid #D4A820", paddingBottom: "2px" }}>結果は大きく変わります。</span>
          </h2>
        </div>

        {/* ── Comparison: SP=stacked / PC=side by side ── */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">

          {/* Left: bad panel */}
          <div className="flex-1 bg-[#1a1a1a] flex flex-col px-6 py-7 lg:px-8 lg:py-8">
            <div className="border border-[#555] text-center py-2 mb-5">
              <span className="text-white font-bold text-[14px] lg:text-[15px]">一般的な集客代行会社</span>
            </div>
            <p className="text-white font-black text-[18px] lg:text-[22px] leading-[1.4] mb-6 text-center">
              バラバラの施策で、<br />一時的に集客して終わり…
            </p>
            <div className="flex flex-col gap-0 flex-1">
              {leftItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-white font-bold text-[14px] lg:text-[15px]">{item.text}</p>
                    <p className="text-[#aaa] text-[12px] lg:text-[13px] mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#444] flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2 L8 14 M2 8 L14 8" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" transform="rotate(45 8 8)" />
              </svg>
              <span className="text-[#aaa] text-[12px]">点の施策では、<br className="lg:hidden" />安定した集客は実現できません。</span>
            </div>
          </div>

          {/* Center arrow: horizontal on PC, vertical on SP */}
          <div className="flex items-center justify-center py-2 lg:py-0 lg:px-0 lg:shrink-0" style={{ width: "auto" }}>
            {/* SP: downward arrow */}
            <div className="flex flex-col items-center lg:hidden">
              <svg width="36" height="40" viewBox="0 0 36 40" fill="none" aria-hidden="true">
                <path d="M4 4 L18 16 L32 4" stroke="#D4A820" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 18 L18 30 L32 18" stroke="#D4A820" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="bg-[#1a1a1a] text-[#D4A820] font-black text-[16px] text-center mt-2 px-5 py-2">集客は「仕組み」で変わる！</p>
            </div>
            {/* PC: right arrow */}
            <div className="hidden lg:flex flex-col items-center" style={{ width: "120px" }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <polygon points="0,10 60,40 0,70" fill="#D4A820" />
              </svg>
              <p className="text-[#1a1a1a] font-black text-[13px] text-center leading-tight mt-2" style={{ width: "80px" }}>
                集客は<br />「仕組み」で<br />変わる！
              </p>
            </div>
          </div>

          {/* Right: good panel */}
          <div className="flex-1 border-2 border-[#D4A820] flex flex-col px-6 py-7 lg:px-8 lg:py-8">
            <div className="flex justify-center mb-5 overflow-hidden h-[52px]">
              <img src={logoMark2} alt="親方ドットコム" className="h-[160px] w-auto -mt-[42px]" />
            </div>
            <p className="text-[#1a1a1a] font-black text-[18px] lg:text-[22px] leading-[1.4] mb-6 text-center">
              仕組みで集客を生み出し、<br />安定した売上につなげます。
            </p>
            <div className="flex flex-col gap-0 flex-1">
              {rightItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <img src={item.icon} alt="" aria-hidden="true" className="w-[48px] h-[48px] object-contain shrink-0" />
                  <div>
                    <p className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px]">{item.text}</p>
                    <p className="text-[#333] text-[14px] lg:text-[13px] mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-[#D4A820] flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="8" fill="#D4A820" />
                <path d="M5 9 L8 12 L13 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[#1a1a1a] font-bold text-[12px] lg:text-[13px]">仕組みで回るから、<br className="lg:hidden" />安定して売上と利益が伸びる！</span>
            </div>
          </div>

        </div>

        {/* ── Bottom statement ── */}
        <div className="relative mt-10 overflow-hidden">
          <img src={brushYellow} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
          <div className="relative bg-[#1a1a1a] px-6 py-4 lg:px-10 lg:py-5 text-center">
            <p className="text-white font-black text-[16px] lg:text-[20px]">
              親方ドットコムは、<br className="lg:hidden" /><span className="text-[#D4A820]">元請け案件が自然と集まる<br className="lg:hidden" />仕組みづくり</span>を支援します。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
