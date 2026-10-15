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
    <section className="relative overflow-hidden bg-white pt-9 lg:pt-[80px] lg:pb-[40px]">

      {/* ── 装飾: 右上の黄色い斜め帯(SPのみ) ── */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-0 h-[150px] w-[220px] bg-[#FFCC00]/90 [clip-path:polygon(35%_0,100%_0,100%_100%,0_55%)] lg:hidden" />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        {/* ── Header + heading (SP: 左揃え / PC: 中央揃え) ── */}
        <div className="lg:text-center">
          <div className="flex items-center gap-3 lg:justify-center lg:gap-4 mb-5 lg:mb-2">
            <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
            <div className="text-left">
              <span className="block text-[#FFCC00] font-black leading-none text-[40px] lg:text-[52px]">03</span>
              <div className="hidden lg:block w-8 h-[3px] bg-[#FFCC00] mt-1" />
            </div>
            <div className="w-px h-10 bg-[#171717]" />
            <span className="text-[#171717] font-bold text-[13px] lg:text-[22px] tracking-wider lg:tracking-widest">WHAT'S THE PROBLEM?</span>
          </div>
          <div aria-hidden="true" className="hidden lg:block h-[2px] bg-gradient-to-r from-[#FFCC00] to-[#171717] mt-3 mb-5" />
          <h2 className="text-[#171717] font-black leading-[1.25] text-[30px] tracking-[-0.02em] lg:text-[52px] lg:leading-[1.2] lg:tracking-normal lg:mb-4">
            直請けを増やさないと、<br />
            <span className="inline-block bg-[linear-gradient(transparent_58%,#FFCC00_58%,#FFCC00_92%,transparent_92%)] lg:bg-none lg:border-b-[6px] lg:border-[#FFCC00] lg:pb-[2px]">会社は大きくならない。</span>
          </h2>
          <p className="text-[#333] font-medium text-[14px] lg:text-[16px] leading-[1.8] mt-4 lg:mt-0">多くの工事業者が、同じ悩みに直面しています。</p>
        </div>

        {/* ── SP: 縦タイムライン ── */}
        <ol className="mt-7 lg:hidden">
          {problems.map((p, i) => (
            <li key={i} className="relative flex items-center gap-[6px] py-5">
              <span className="absolute inset-x-0 bottom-0 h-px bg-[#E3E5E8]" />
              <span className="w-[30px] shrink-0 text-[#FFE27A] font-black leading-none text-[24px] tracking-tight">{p.num}</span>
              <span aria-hidden="true" className="relative self-stretch w-[14px] shrink-0">
                <span className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#FFDF70] ${i === 0 ? "top-1/2 -bottom-5" : i === problems.length - 1 ? "-top-5 bottom-1/2" : "-inset-y-5"}`} />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#FFCC00]" />
              </span>
              <span className="flex items-center justify-center w-[44px] h-[44px] shrink-0 rounded-full bg-[#F3F4F6]">
                <img src={p.icon} alt="" aria-hidden="true" className="w-[28px] h-[28px] object-contain" />
              </span>
              <div className="min-w-0 pl-1">
                <p className="text-[#171717] font-black text-[15px] leading-[1.4] mb-1.5">{p.title}</p>
                <p className="text-[#333] text-[14.5px] leading-[1.7] text-pretty [word-break:auto-phrase]">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* ── PC: 左に課題4項目 / 右に黒ペンキ ── */}
        <div className="hidden lg:flex lg:items-stretch lg:gap-12 lg:mt-12">

          <ol className="flex-1 flex flex-col justify-center">
            {problems.map((p, i) => (
              <li key={i}>
                <div className="flex items-start gap-4 py-7">
                  <div className="w-[56px] h-[56px] shrink-0 flex items-center justify-center">
                    <img src={p.icon} alt="" aria-hidden="true" className="w-[56px] h-[56px] object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#FFCC00] font-bold text-[14px]">{p.num}</span>
                      <span className="text-[#171717] font-black text-[20px]">{p.title}</span>
                    </div>
                    <p className="text-[#171717] text-[16px] leading-[1.8]">{p.body}</p>
                  </div>
                </div>
                {i < problems.length - 1 && (
                  <div aria-hidden="true" className="h-[2px] bg-gradient-to-r from-[#FFCC00] to-[#171717]" />
                )}
              </li>
            ))}
          </ol>

          <div className="relative w-[46%] shrink-0 min-h-[300px] overflow-hidden">
            <img src={paintRoller} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-right" />
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div aria-hidden="true" className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-black leading-[1.35] text-center px-8">
                <span className="block text-white text-[22px] mb-1">このままでは、</span>
                <span className="block text-[#FFCC00] text-[42px]">将来の不安は<br />消えません。</span>
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
