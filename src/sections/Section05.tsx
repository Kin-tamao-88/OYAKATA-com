import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";

const steps = [
  {
    num: "01",
    title: "分析する",
    body: null,
    bodyJsx: <>市場・競合・地域を分析し、<br className="lg:hidden" />勝てる戦略の土台をつくります。</>,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="17" cy="17" r="11" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="26" y1="26" x2="36" y2="36" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M11 20 L15 15 L19 20 L23 12" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    highlight: false,
  },
  {
    num: "02",
    title: "仕組みをつくる",
    body: null,
    bodyJsx: <>LP・広告・導線を設計し、<br />問い合わせを最大化する<br className="lg:hidden" />仕組みを構築します。</>,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="16" stroke="#1a1a1a" strokeWidth="2" />
        <circle cx="20" cy="20" r="9" stroke="#1a1a1a" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="#D4A820" />
        <path d="M27 13 L34 7 M30 7 H34 V11" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    highlight: false,
  },
  {
    num: "03",
    title: "最短1ヶ月で結果を出す",
    body: null,
    bodyJsx: (
      <span>
        <span className="text-[#D4A820] font-bold">2000社を超える実績データ</span>を<br className="lg:hidden" />活用し<span className="text-[#D4A820] font-bold">最短1ヶ月</span>で元請け<br className="lg:hidden" />受注の増加を実現します。
      </span>
    ),
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <line x1="4" y1="36" x2="36" y2="36" stroke="#1a1a1a" strokeWidth="1.5" />
        <line x1="4" y1="10" x2="4" y2="37" stroke="#1a1a1a" strokeWidth="1.5" />
        <path d="M4 30 L12 24 L20 27 L28 16 L36 8" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 4 L36 8 L32 13" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    highlight: true,
  },
];

export default function Section06() {
  return (
    <>
      <section className="bg-white py-14 lg:py-[80px] relative overflow-hidden">

        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] relative">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:items-start">

            {/* ── Left ── */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-7">
                <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
                <div>
                  <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">05</span>
                  <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
                </div>
                <div className="w-px h-10 bg-[#1a1a1a]" />
                <span className="text-[#1a1a1a] font-bold text-[16px] lg:text-[22px]">親方ドットコムの仕組み</span>
              </div>
              <div className="h-[2px] bg-gradient-to-r from-[#D4A820] to-[#1a1a1a] mt-3 mb-5" />

              <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-6 text-[24px] lg:text-[46px]">
                受注は偶然ではなく、<span className="block pl-[2em]"><span className="text-[#D4A820] border-b-[3px] lg:border-b-[5px] border-[#D4A820] pb-[2px]">戦略</span>的に増やします。</span>
              </h2>


              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-[#D4A820]" />
                <p className="text-[#1a1a1a] font-black text-[16px] lg:text-[18px] whitespace-nowrap">
                  シンプルな <span className="text-[#D4A820] text-[24px] lg:text-[28px]">3</span> STEP
                </p>
                <div className="flex-1 h-px bg-[#D4A820]" />
              </div>

              <div className="border border-[#D4A820] flex items-center gap-4 px-5 py-4">
                <div
                  className="w-11 h-11 bg-[#D4A820] flex items-center justify-center shrink-0"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    <ellipse cx="11" cy="6" rx="7" ry="3" stroke="#1a1a1a" strokeWidth="1.5" />
                    <path d="M4 6 L4 16 Q4 19 11 19 Q18 19 18 16 L18 6" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
                    <path d="M4 11 Q4 14 11 14 Q18 14 18 11" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <p className="lg:hidden text-[#1a1a1a] font-bold text-[14px] leading-[1.8]">
                  <span className="text-[#D4A820]">2000社</span>を超えるデータを活用して、<br />
                  最短で成果に繋げます。
                </p>
                <p className="hidden lg:block text-[#1a1a1a] font-bold text-[15px] leading-[1.8]">
                  <span className="text-[#D4A820]">2000社</span>を超える実績データがあるから、<br />
                  無駄なく、<span className="text-[#D4A820]">最短で成果</span>につながります。
                </p>
              </div>
            </div>

            {/* ── Right: 3 Steps ── */}
            <div className="w-full lg:w-[44%] lg:shrink-0 lg:pt-[100px]">
              {steps.map((step, i) => (
                <div key={i}>
                  <div className="flex items-start gap-5">
                    {/* アイコン円 + 数字バッジ重ね */}
                    <div className="relative shrink-0 mt-3 lg:mt-0">
                      <div className={`w-[84px] h-[84px] rounded-full border-2 flex items-center justify-center ${step.highlight ? "bg-[#fff9e6] border-[#D4A820]" : "bg-white border-[#e0e0e0]"}`}>
                        {step.icon}
                      </div>
                      <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                        <span className="text-white font-black text-[11px]">{step.num}</span>
                      </div>
                    </div>
                    {/* テキスト */}
                    <div className="flex-1 pt-3">
                      <h3 className="inline-block bg-[#1a1a1a] text-white font-black text-[18px] lg:text-[20px] px-3 py-1 mb-1">{step.title}</h3>
                      <div className="w-12 h-[3px] bg-[#D4A820] mb-2" />
                      <p className="text-[#1a1a1a] text-[14px] leading-[1.9]">
                        {step.bodyJsx ?? step.body}
                      </p>
                    </div>
                  </div>
                  {/* 塗り三角矢印 */}
                  {i < steps.length - 1 && (
                    <div className="flex justify-start pl-7 py-2">
                      <svg width="30" height="18" viewBox="0 0 30 18" fill="none" aria-hidden="true">
                        <polygon points="0,0 30,0 15,18" fill="#D4A820" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA Bar ── */}
      {/* SP CTA帯 */}
      <div className="lg:hidden bg-[#111111] px-4 pt-4 pb-4">
        <p className="text-white font-black text-[15px] leading-[1.35] mb-2.5 text-center">
          下請けだけの経営から、<span className="text-[#D4A820] border-b-2 border-[#D4A820]">脱却</span>しませんか？
        </p>
        <a
          href="#contact"
          aria-label="無料相談はこちら"
          className="flex items-center justify-center gap-2.5 bg-[#D4A820] no-underline rounded-lg py-3 w-full"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="font-black text-[#1a1a1a] text-[16px]">無料相談はこちら ›</span>
        </a>
      </div>
      {/* PC CTA帯 */}
      <a
        href="https://lin.ee/yFZ5vjU"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINEで無料相談"
        className="hidden lg:flex items-stretch bg-[#111111] no-underline"
        style={{ minHeight: "108px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto", textDecoration: "none" }}
      >
        <div className="flex items-center flex-1" style={{ paddingLeft: "68px", paddingRight: "40px" }}>
          <p className="text-white font-black leading-tight m-0" style={{ fontSize: "26px" }}>
            下請けだけの経営から、
            <span style={{ color: "#D4A820", borderBottom: "2px solid #D4A820", paddingBottom: "1px" }}>脱却</span>
            しませんか？
          </p>
        </div>
        <div className="flex flex-col items-center justify-center flex-shrink-0 gap-[10px] px-12">
          <div className="relative">
            <div style={{ backgroundColor: "#252525", color: "#fff", fontSize: "11px", fontWeight: 500, padding: "4px 14px", borderRadius: "4px", whiteSpace: "nowrap", lineHeight: 1.4 }}>
              無料相談はカンタン&thinsp;<span style={{ color: "#D4A820", fontSize: "14px", fontWeight: 900 }}>1分</span>&thinsp;で入力完了
            </div>
            <div className="absolute left-1/2" style={{ bottom: "-7px", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #252525" }} />
          </div>
          <div className="flex items-center" style={{ gap: "10px", borderRadius: "6px", padding: "11px 22px", whiteSpace: "nowrap", border: "2px solid #06C755" }}>
            <span className="flex items-center justify-center flex-shrink-0 rounded-full" style={{ width: "24px", height: "24px", backgroundColor: "#fff" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" role="img" aria-label="LINE" fill="#06C755">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </span>
            <span className="font-black text-white" style={{ fontSize: "15px" }}>無料相談はこちら</span>
            <span className="font-black text-white" style={{ fontSize: "13px" }}>›</span>
          </div>
        </div>
      </a>
    </>
  );
}
