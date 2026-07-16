import brushHeroYellow from "../assets/images/ui/brush-hero-yellow.webp";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";

const steps = [
  {
    num: "01",
    title: "分析する",
    body: "市場・競合・地域を分析し、勝てる戦略の土台をつくります。",
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
    body: "LP・広告・導線を設計し、問い合わせを最大化する仕組みを構築します。",
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
        <span className="text-[#D4A820] font-bold">2000社を超える実績データ</span>を活用し、
        <span className="text-[#D4A820] font-bold">最短1ヶ月</span>で元請け受注の増加を実現します。
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
        {/* Decorative brush */}
        <img
          src={brushHeroYellow}
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 pointer-events-none opacity-20"
          style={{ width: "320px", transform: "rotate(180deg) translateY(-40%)" }}
        />

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
                <span className="text-[#1a1a1a] font-bold text-[14px] lg:text-[16px]">親方ドットコムの仕組み</span>
              </div>

              <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-6 text-[28px] lg:text-[46px]">
                WEB集客による受注は、<br />
                偶然ではなく
                <span className="text-[#D4A820]" style={{ borderBottom: "5px solid #D4A820", paddingBottom: "2px" }}>戦略</span>
                で増やします。
              </h2>

              <p className="text-[#1a1a1a] text-[16px] leading-[2] mb-8">
                親方ドットコムは、<br />
                <span className="font-bold" style={{ borderBottom: "3px solid #D4A820" }}>元請け受注が増える</span>仕組みを<br />
                一緒につくるパートナーです。
              </p>

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
                <p className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px] leading-[1.8]">
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
                    <div className="relative shrink-0">
                      <div className={`w-[84px] h-[84px] rounded-full border-2 flex items-center justify-center ${step.highlight ? "bg-[#fff9e6] border-[#D4A820]" : "bg-white border-[#e0e0e0]"}`}>
                        {step.icon}
                      </div>
                      <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                        <span className="text-white font-black text-[11px]">{step.num}</span>
                      </div>
                    </div>
                    {/* テキスト */}
                    <div className="flex-1 pt-3">
                      <h3 className="text-[#1a1a1a] font-black text-[18px] lg:text-[20px] mb-1">{step.title}</h3>
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
      <div className="bg-[#1a1a1a] max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-4 px-5 py-6 lg:flex-row lg:items-center lg:px-[68px] lg:py-7 lg:gap-6">
          <div className="shrink-0 border-2 border-[#D4A820] px-3 py-2 text-center self-start">
            <span className="text-[#D4A820] font-black text-[11px] block leading-tight">重要</span>
            <span className="text-[#D4A820] font-black text-[11px] block leading-tight">POINT</span>
          </div>
          <p className="text-white text-[14px] lg:text-[15px] leading-[1.8] flex-1">
            集客は、広告を出して終わりではありません。<br />
            戦略的な仕組みとスピード改善で、<span className="text-[#D4A820] font-bold">元請け受注を継続的に増やします。</span>
          </p>
          <a
            href="#contact"
            className="shrink-0 flex flex-col items-center bg-[#D4A820] px-7 py-4 no-underline self-stretch lg:self-auto justify-center"
          >
            <span className="text-[#1a1a1a] text-[11px] font-bold mb-1">相談・提案すべて無料</span>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-[#1a1a1a] font-black text-[15px] whitespace-nowrap">無料相談はこちら ›</span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
