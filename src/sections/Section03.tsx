import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";
import iconProfit from "../assets/images/OC03/issue-profit-de.webp";
import iconUnstable from "../assets/images/OC03/problem-unstable-work.webp";
import iconNoTime from "../assets/images/OC03/problem-no-sales-time.webp";
import iconConnections from "../assets/images/OC03/problem-dependent-connections.webp";

const problems = [
  {
    num: "01",
    title: "利益が残らない",
    body: <>下請け案件は単価が低く、<br />人件費や材料費を引くと<br className="lg:hidden" />利益がほとんど残らない。</>,
    icon: iconProfit,
  },
  {
    num: "02",
    title: "仕事が不安定",
    body: <>直請けからの依頼が止まると、<br className="lg:hidden" />仕事が一気に減ってしまう。</>,
    icon: iconUnstable,
  },
  {
    num: "03",
    title: "営業する時間がない",
    body: <>現場が忙しく直請けの<br className="lg:hidden" />仕事を増やす時間が取れない。</>,
    icon: iconNoTime,
  },
  {
    num: "04",
    title: "紹介・繋がりに依存してしまう",
    body: <>新しい出会いが生まれず、<br className="lg:hidden" />いつまでも下請けの繰り返し。</>,
    icon: iconConnections,
  },
];

export default function Section04() {
  return (
    <section className="relative overflow-hidden bg-white pt-9 lg:pt-[80px]">

      {/* ── 装飾: 右上の黄色い斜め帯 ── */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-0 h-[150px] w-[220px] bg-[#FFCC00]/90 [clip-path:polygon(35%_0,100%_0,100%_100%,0_55%)] lg:h-[90px] lg:w-[420px]" />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        <div className="lg:flex lg:items-start lg:gap-14">

          {/* ── Left: header + heading ── */}
          <div className="lg:w-[48%] lg:shrink-0">
            <div className="flex items-center gap-3 lg:gap-4 mb-5 lg:mb-8">
              <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
              <span className="block text-[#FFCC00] font-black leading-none text-[40px] lg:text-[56px]">03</span>
              <div className="w-px h-10 bg-[#171717]" />
              <span className="text-[#171717] font-bold text-[13px] lg:text-[18px] tracking-wider">WHAT'S THE PROBLEM?</span>
            </div>
            <h2 className="text-[#171717] font-black leading-[1.25] text-[30px] tracking-[-0.02em] lg:tracking-normal lg:text-[46px]">
              直請けを増やさないと、<br />
              <span className="inline-block bg-[linear-gradient(transparent_58%,#FFCC00_58%,#FFCC00_92%,transparent_92%)]">会社は大きくならない。</span>
            </h2>
            <p className="text-[#333] font-medium text-[14px] lg:text-[17px] leading-[1.8] mt-4 lg:mt-6">多くの工事業者が、同じ悩みに直面しています。</p>
          </div>

          {/* ── Right: timeline ── */}
          <ol className="mt-7 lg:mt-0 lg:flex-1">
            {problems.map((p, i) => (
              <li key={i} className="relative flex items-center gap-[6px] lg:gap-4 py-5 lg:py-6">
                <span className="absolute inset-x-0 bottom-0 h-px bg-[#E3E5E8]" />
                <span className="w-[30px] lg:w-[60px] shrink-0 text-[#FFE27A] font-black leading-none text-[24px] lg:text-[54px] tracking-tight">{p.num}</span>
                <span aria-hidden="true" className="relative self-stretch w-[14px] shrink-0">
                  <span className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#FFDF70] ${i === 0 ? "top-1/2 -bottom-5 lg:-bottom-6" : i === problems.length - 1 ? "-top-5 lg:-top-6 bottom-1/2" : "-inset-y-5 lg:-inset-y-6"}`} />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#FFCC00]" />
                </span>
                <span className="flex items-center justify-center w-[44px] h-[44px] lg:w-[76px] lg:h-[76px] shrink-0 rounded-full bg-[#F3F4F6]">
                  <img src={p.icon} alt="" aria-hidden="true" className="w-[28px] h-[28px] lg:w-[52px] lg:h-[52px] object-contain" />
                </span>
                <div className="min-w-0 pl-1 lg:pl-0">
                  <p className="text-[#171717] font-black text-[15px] lg:text-[21px] leading-[1.4] mb-1.5">{p.title}</p>
                  <p className="text-[#333] text-[14.5px] lg:text-[15px] leading-[1.7] text-pretty [word-break:auto-phrase]">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>

        </div>
      </div>

    </section>
  );
}
