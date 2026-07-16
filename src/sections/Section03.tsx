import paintRoller from "../assets/images/OC03/problem-roller-paint.webp";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";
import iconProfit from "../assets/images/OC03/issue-profit-de.webp";
import iconUnstable from "../assets/images/OC03/problem-unstable-work.webp";
import iconNoTime from "../assets/images/OC03/problem-no-sales-time.webp";
import iconConnections from "../assets/images/OC03/problem-dependent-connections.webp";

const problems = [
  {
    num: "01",
    title: "利益が残らない",
    body: "下請け案件は単価が低く、人件費や材料費を引くと利益がほとんど残らない。",
    icon: <img src={iconProfit} alt="" className="w-[56px] h-[56px] object-contain" aria-hidden="true" />,
  },
  {
    num: "02",
    title: "仕事が不安定",
    body: "元請けからの依頼が止まると、仕事が一気に減ってしまう。",
    icon: <img src={iconUnstable} alt="" className="w-[56px] h-[56px] object-contain" aria-hidden="true" />,
  },
  {
    num: "03",
    title: "営業する時間がない",
    body: "現場が忙しく、見積りや事務作業に追われ、新しい元請けを探す時間が取れない。",
    icon: <img src={iconNoTime} alt="" className="w-[56px] h-[56px] object-contain" aria-hidden="true" />,
  },
  {
    num: "04",
    title: "紹介・つながりに依存してしまう",
    body: "新しい出会いが生まれず、いつまでも同じ下請け案件の繰り返し。",
    icon: <img src={iconConnections} alt="" className="w-[56px] h-[56px] object-contain" aria-hidden="true" />,
  },
];

export default function Section04() {
  return (
    <section className="bg-[#f7f7f7] py-14 lg:py-[80px]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        {/* ── Section Header ── */}
        <div className="text-center mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
            <div>
              <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">03</span>
              <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
            </div>
            <div className="w-px h-10 bg-[#1a1a1a]" />
            <span className="text-[#1a1a1a] font-bold text-[14px] lg:text-[16px] tracking-widest">WHAT'S THE PROBLEM?</span>
          </div>
          <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-4 text-[32px] lg:text-[52px]">
            下請けだけでは、<br />
            <span className="border-b-[6px] border-[#D4A820] pb-[2px]">会社は大きくならない。</span>
          </h2>
          <p className="text-[#555] text-[15px]">多くの工事業者が、同じ悩みに直面しています。</p>
        </div>

        {/* ── 2-column ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12 mt-8 lg:mt-12">

          {/* Left: Problem list */}
          <div className="flex-1 flex flex-col justify-center">
            {problems.map((p, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 py-5 lg:py-7 ${i < problems.length - 1 ? "border-b border-[#ddd]" : ""}`}
              >
                <div className="w-[56px] h-[56px] shrink-0 flex items-center justify-center">
                  {p.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#D4A820] font-bold text-[12px]">{p.num}</span>
                    <span className="text-[#1a1a1a] font-black text-[17px] lg:text-[20px]">{p.title}</span>
                  </div>
                  <p className="text-[#1a1a1a] text-[14px] lg:text-[15px] leading-[1.8]">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Paint roller image + overlay text */}
          <div className="relative w-full min-h-[300px] lg:w-[46%] lg:shrink-0 overflow-hidden">
            <img
              src={paintRoller}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-right"
              aria-hidden="true"
            />
            <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-[#f7f7f7] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#f7f7f7] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#f7f7f7] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#f7f7f7] to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-black leading-[1.35] text-center px-8">
                <span className="block text-white text-[18px] lg:text-[22px] mb-1">このままでは、</span>
                <span className="block text-[#D4A820] text-[32px] lg:text-[42px]">将来の不安は<br />消えません。</span>
              </p>
            </div>
          </div>

        </div>

        {/* ── Conclusion ── */}
        <div className="text-center mt-10 lg:mt-12">
          <div className="flex justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2 L10 16 M4 10 L10 16 L16 10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[#1a1a1a] font-black text-[16px] lg:text-[18px]">
            変わるためには、<span className="text-[#D4A820]">元請け案件を増やせる仕組み</span>が必要です。
          </p>
        </div>

      </div>
    </section>
  );
}
