import visualBg from "../assets/images/OC01/oc01-visual-bg.webp";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";

export default function Section02B() {
  return (
    <>
      {/* ── 上段: ホワイトブロック ── */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto lg:[container-type:inline-size] relative">

          {/* PC: 背景素材（右側ビジュアル）+ 左側HTML */}
          <div className="hidden lg:block relative w-full aspect-[1850/850] mt-8">
            <img
              src={visualBg}
              alt="親方ドットコムのダッシュボード、スマートフォン、ターゲット設計・集客戦略の提案資料"
              className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_bottom,transparent_0%,black_9%)]"
            />
            <div className="absolute left-[4.5cqw] top-[5.7cqw] w-[44cqw]">
              <div className="flex items-center h-[4.05cqw]">
                <img src={logoHorizontal} alt="" aria-hidden="true" className="h-full w-auto object-contain mix-blend-multiply shrink-0" />
                <span className="ml-[1.7cqw] text-[#FFCC00] font-black leading-none text-[3.8cqw]">01</span>
                <span className="mx-[1.7cqw] w-px h-[2.9cqw] bg-[#B9BDC3]" />
                <span className="text-[#171717] font-bold tracking-[0.08em] text-[max(16px,1.6cqw)]">親方ドットコムとは？</span>
              </div>
              <div className="mt-[1.2cqw] w-[43.5cqw] h-[2px] bg-[#FFCC00]" />

              <h2 className="mt-[2.9cqw] text-[#171717] font-black leading-[4.8cqw] text-[3.75cqw] whitespace-nowrap">
                <span className="bg-[#FFD84D] -ml-[0.3cqw] pl-[0.3cqw] pr-[0.2cqw]">親方ドットコム</span>は、<br />
                工事業者専門の<br />
                集客支援サービスです。
              </h2>
              <div className="mt-[0.57cqw] w-[25.6cqw] h-[0.27cqw] min-h-[4px] bg-[#FFCC00]" />

              <p className="mt-[1.3cqw] text-[#333] font-medium text-[max(16px,1.4cqw)] leading-[2.65cqw] [word-break:auto-phrase]">
                データ分析に基づいた集客戦略の立案から、<br />
                広告運用・改善までを一貫してサポート。<br />
                直請け案件の獲得に特化した仕組みづくりで、<br />
                工事業者の売上と事業成長に貢献します。
              </p>
            </div>
          </div>

          {/* SP: ロゴ → コピー → ビジュアル → 説明文 */}
          <div className="lg:hidden pt-8">
            <div className="px-5">
              <div className="flex items-center gap-3">
                <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[44px] w-auto object-contain mix-blend-multiply shrink-0" />
                <span className="text-[#FFCC00] font-black leading-none text-[36px]">01</span>
                <span className="w-px h-8 bg-[#B9BDC3]" />
                <span className="text-[#171717] font-bold text-[17px] tracking-[0.04em]">親方ドットコムとは？</span>
              </div>
              <div className="mt-3 h-[2px] bg-[#FFCC00]" />

              <h2 className="mt-6 text-[#171717] font-black leading-[1.3] text-[28px]">
                <span className="bg-[#FFD84D] px-1 -ml-1">親方ドットコム</span>は、<br />
                工事業者専門の<br />
                集客支援サービスです。
              </h2>
              <div className="mt-2 w-[220px] h-[4px] bg-[#FFCC00]" />
            </div>

            {/* デバイス群を中心にトリミング（素材左側の余白を除外） */}
            <div className="relative mt-4 w-full aspect-[1250/850] overflow-hidden">
              <img
                src={visualBg}
                alt="親方ドットコムのダッシュボード、スマートフォン、ターゲット設計・集客戦略の提案資料"
                className="absolute top-0 left-[-48%] w-[148%] max-w-none h-auto"
              />
            </div>

            <p className="px-5 pt-4 pb-8 text-[#333] font-medium text-[16px] leading-[1.9] [word-break:auto-phrase]">
              データ分析に基づいた集客戦略の立案から、広告運用・改善までを一貫してサポート。直請け案件の獲得に特化した仕組みづくりで、工事業者の売上と事業成長に貢献します。
            </p>
          </div>

        </div>
      </section>

      {/* ── 下段: ライトブロック（4特徴） ── */}
      <section className="bg-[#F5F6F7] py-7 lg:py-9 relative overflow-hidden">
        {/* 上端イエローライン */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FFCC00]" />
        {/* 下端イエローライン */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B9BDC3]" />

        <div className="max-w-[1280px] mx-auto px-3 lg:px-[68px] relative">
          <div className="relative grid grid-cols-2 gap-0 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#B9BDC3]">

            {/* SP 十字線 */}
            <div className="lg:hidden absolute top-1/2 left-0 right-0 h-px bg-[#B9BDC3] pointer-events-none z-10" />
            <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-px bg-[#B9BDC3] pointer-events-none z-10" />

            {/* 戦略設計 */}
            <div className="text-center px-2 py-4 lg:px-6 lg:py-0">
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 lg:w-[72px] lg:h-[72px]" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <circle cx="40" cy="40" r="36" stroke="#171717" strokeWidth="2.2" />
                  <circle cx="40" cy="40" r="24" stroke="#171717" strokeWidth="2.2" />
                  <circle cx="40" cy="40" r="12" stroke="#171717" strokeWidth="2.2" />
                  <circle cx="40" cy="40" r="5" fill="#FFCC00" />
                  <line x1="40" y1="2" x2="40" y2="14" stroke="#171717" strokeWidth="2.2" />
                  <line x1="40" y1="66" x2="40" y2="78" stroke="#171717" strokeWidth="2.2" />
                  <line x1="2" y1="40" x2="14" y2="40" stroke="#171717" strokeWidth="2.2" />
                  <line x1="66" y1="40" x2="78" y2="40" stroke="#171717" strokeWidth="2.2" />
                  <path d="M54 26 L72 10 M62 10 H72 V20" stroke="#FFCC00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[#171717] font-black text-[17px] lg:text-[20px] mb-1">戦略設計</h3>
              <p className="text-[#222] font-medium text-[13px] lg:text-[15px] leading-[1.9] [word-break:auto-phrase]">工事業界の市場・競合・顧客を分析し、直請け案件獲得に特化した集客戦略を設計します。</p>
            </div>

            {/* 広告運用 */}
            <div className="text-center px-2 py-4 lg:px-6 lg:py-0">
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 lg:w-[72px] lg:h-[72px]" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <path d="M18 56 Q18 26 40 24 Q62 26 62 56" stroke="#171717" strokeWidth="2.4" fill="none" />
                  <line x1="12" y1="56" x2="68" y2="56" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M40 24 L40 15 M33 15 H47" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />
                  <rect x="27" y="41" width="7" height="15" fill="#FFCC00" />
                  <rect x="37" y="35" width="7" height="21" fill="#FFCC00" />
                  <rect x="47" y="46" width="7" height="10" fill="#FFCC00" />
                </svg>
              </div>
              <h3 className="text-[#171717] font-black text-[17px] lg:text-[20px] mb-1">広告運用</h3>
              <p className="text-[#222] font-medium text-[13px] lg:text-[15px] leading-[1.9] [word-break:auto-phrase]">リスティング広告・SNS広告を最適に運用し、問い合わせの最大化を実現します。</p>
            </div>

            {/* データ分析 */}
            <div className="text-center px-2 py-4 lg:px-6 lg:py-0">
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 lg:w-[72px] lg:h-[72px]" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <circle cx="36" cy="35" r="24" stroke="#171717" strokeWidth="2.4" />
                  <line x1="53" y1="52" x2="70" y2="69" stroke="#171717" strokeWidth="3.6" strokeLinecap="round" />
                  <path d="M24 42 L30 34 L37 41 L44 28" stroke="#FFCC00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[#171717] font-black text-[17px] lg:text-[20px] mb-1">データ分析</h3>
              <p className="text-[#222] font-medium text-[13px] lg:text-[15px] leading-[1.9] [word-break:auto-phrase]">問い合わせ・広告・LPを多角的に分析し、課題を明確にして改善につなげます。</p>
            </div>

            {/* 改善提案・実行 */}
            <div className="text-center px-2 py-4 lg:px-6 lg:py-0">
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 lg:w-[72px] lg:h-[72px]" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <line x1="10" y1="70" x2="74" y2="70" stroke="#171717" strokeWidth="2.2" />
                  <line x1="10" y1="18" x2="10" y2="72" stroke="#171717" strokeWidth="2.2" />
                  <path d="M10 62 L22 55 L36 59 L50 42 L64 28 L72 18" stroke="#FFCC00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M65 12 L72 18 L66 25" stroke="#FFCC00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[#171717] font-black text-[17px] lg:text-[20px] mb-1">改善提案・実行</h3>
              <p className="text-[#222] font-medium text-[13px] lg:text-[15px] leading-[1.9] [word-break:auto-phrase]">分析結果をもとに改善案を提示し、実行まで一貫してサポート。成果の最大化を追求します。</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
