import dashboardMockup from "../assets/images/OC02/OC2-dashbord2.png";

export default function Section02() {
  return (
    <section className="bg-white py-14 lg:py-[80px]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        {/* ── Section Header ── */}
        <div className="flex items-center gap-4 mb-10 lg:mb-14">
          <div>
            <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">01</span>
            <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
          </div>
          <div className="w-px h-10 bg-[#1a1a1a]" />
          <span className="text-[#1a1a1a] font-bold text-[14px] lg:text-[16px]">親方ドットコムとは？</span>
        </div>

        {/* ── Main 2-column ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Left: Text */}
          <div className="w-full lg:w-[42%] lg:shrink-0 lg:pt-4">
            <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-6 text-[32px] lg:text-[48px]">
              親方ドットコムは、<br />
              工事業者専門の<br />
              <span className="text-[#D4A820]">集客支援サービス</span>です。
            </h2>
            <p className="text-[#1a1a1a] text-[16px] leading-[2]">
              データ分析に基づいた集客戦略の立案から、<br />
              広告運用・改善までを一貫してサポート。<br />
              元請け案件の獲得に特化した仕組みづくりで、<br />
              工事業者の売上と事業成長に貢献します。
            </p>
          </div>
          {/* Right: Dashboard mockup */}
          <div className="w-full lg:flex-1 lg:-mt-14">
            <img
              src={dashboardMockup}
              alt="親方ドットコム ダッシュボード画面"
              className="block w-full"
            />
          </div>
        </div>

        {/* ── Bottom 4 Features ── */}
        <div className="grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-[#e8e8e8] lg:grid-cols-4 lg:mt-16 lg:pt-14">

          {/* 戦略設計 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg width="72" height="72" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <circle cx="40" cy="40" r="36" stroke="#1a1a1a" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="24" stroke="#1a1a1a" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="12" stroke="#1a1a1a" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="5" fill="#D4A820" />
                <line x1="40" y1="2" x2="40" y2="14" stroke="#1a1a1a" strokeWidth="1.5" />
                <line x1="40" y1="66" x2="40" y2="78" stroke="#1a1a1a" strokeWidth="1.5" />
                <line x1="2" y1="40" x2="14" y2="40" stroke="#1a1a1a" strokeWidth="1.5" />
                <line x1="66" y1="40" x2="78" y2="40" stroke="#1a1a1a" strokeWidth="1.5" />
                <path d="M54 26 L72 10 M62 10 H72 V20" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-[#1a1a1a] font-black text-[17px] lg:text-[20px] mb-2">戦略設計</h3>
            <p className="text-[#1a1a1a] text-[13px] lg:text-[15px] leading-[1.9]">工事業界の市場・競合・顧客を分析し、元請け案件獲得に特化した集客戦略を設計します。</p>
          </div>

          {/* 広告運用 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg width="72" height="72" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <path d="M18 56 Q18 26 40 24 Q62 26 62 56" stroke="#1a1a1a" strokeWidth="1.8" fill="none" />
                <line x1="12" y1="56" x2="68" y2="56" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                <path d="M40 24 L40 15 M33 15 H47" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
                <rect x="27" y="41" width="7" height="15" fill="#D4A820" />
                <rect x="37" y="35" width="7" height="21" fill="#D4A820" />
                <rect x="47" y="46" width="7" height="10" fill="#D4A820" />
              </svg>
            </div>
            <h3 className="text-[#1a1a1a] font-black text-[17px] lg:text-[20px] mb-2">広告運用</h3>
            <p className="text-[#1a1a1a] text-[13px] lg:text-[15px] leading-[1.9]">リスティング広告・SNS広告を最適に運用し、問い合わせの最大化を実現します。</p>
          </div>

          {/* データ分析 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg width="72" height="72" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <circle cx="36" cy="35" r="24" stroke="#1a1a1a" strokeWidth="1.8" />
                <line x1="53" y1="52" x2="70" y2="69" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
                <path d="M24 42 L30 34 L37 41 L44 28" stroke="#D4A820" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-[#1a1a1a] font-black text-[17px] lg:text-[20px] mb-2">データ分析</h3>
            <p className="text-[#1a1a1a] text-[13px] lg:text-[15px] leading-[1.9]">問い合わせ・広告・LPを多角的に分析し、課題を明確にして改善につなげます。</p>
          </div>

          {/* 改善提案・実行 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg width="72" height="72" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <line x1="10" y1="70" x2="74" y2="70" stroke="#1a1a1a" strokeWidth="1.5" />
                <line x1="10" y1="18" x2="10" y2="72" stroke="#1a1a1a" strokeWidth="1.5" />
                <path d="M10 62 L22 55 L36 59 L50 42 L64 28 L72 18" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M65 12 L72 18 L66 25" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-[#1a1a1a] font-black text-[17px] lg:text-[20px] mb-2">改善提案・実行</h3>
            <p className="text-[#1a1a1a] text-[13px] lg:text-[15px] leading-[1.9]">分析結果をもとに改善案を提示し、実行まで一貫してサポート。成果の最大化を追求します。</p>
          </div>

        </div>
      </div>
    </section>
  );
}
