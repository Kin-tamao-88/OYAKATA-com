import painWorker from "../assets/images/OC02/03-pain-worker.webp";
import paintDark from "../assets/images/ui/hero-paint-dark.webp";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";
import iconWork from "../assets/images/OC02/issue-work-decrease.webp";
import iconProfit from "../assets/images/OC02/issue-profit-decrease.webp";
import iconAd from "../assets/images/OC02/issue-no-advertising.webp";
import iconConnect from "../assets/images/OC02/issue-no-connections.webp";

const cards = [
  {
    num: "01",
    title: "売上が減る",
    body: "直請け案件が取れず、下請けや単価の安い仕事に頼らざるを得ない。",
    icon: iconWork,
  },
  {
    num: "02",
    title: "利益が減る",
    body: "利益率が下がり、人件費や材料費の高騰でさらに経営を圧迫する。",
    icon: iconProfit,
  },
  {
    num: "03",
    title: "広告を出せない",
    body: "広告や集客に予算をかけられず、新たな仕事が獲得できない。",
    icon: iconAd,
  },
  {
    num: "04",
    title: "さらに仕事が減る",
    body: "身動きが取れず直請け案件も増えず、また仕事が減っていく。",
    icon: iconConnect,
  },
];

export default function Section03() {
  return (
    <section className="bg-gradient-to-b from-white via-white to-[#FFF9E6] pt-8 lg:pt-[80px]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        {/* ── Section Header ── */}
        <div className="flex items-center gap-4 mb-3 lg:mb-5">
          <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
          <span className="block text-[#FFCC00] font-black leading-none text-[40px] lg:text-[56px]">02</span>
          <div className="w-px h-10 bg-[#171717]" />
          <span className="text-[#171717] font-bold text-[19px] lg:text-[22px]">課題</span>
        </div>

        {/* ── Heading / photo / body ── */}
        <div className="grid grid-cols-1 -mx-5 lg:mx-0 lg:grid-cols-[1fr_46%] lg:gap-x-10">

          <h2 className="relative z-10 row-start-1 col-start-1 self-start px-5 pt-2 lg:px-0 lg:pt-0 lg:self-end lg:mb-6 text-[#171717] font-black leading-[1.3] text-[25px] lg:text-[54px] lg:leading-[1.25]">
            下請けばかりの経営、<br />
            <span className="inline-block border-b-[5px] lg:border-b-[8px] border-[#FFCC00] pb-[2px]">続けていませんか？</span>
          </h2>

          <div className="relative row-start-1 col-start-1 lg:col-start-2 lg:row-span-2 h-[150px] overflow-hidden lg:h-auto lg:overflow-visible">
            <img
              src={painWorker}
              alt="悩む工事業者"
              className="absolute left-[166px] top-0 w-[325px] max-w-none lg:static lg:w-full"
            />
            <div className="absolute inset-y-0 left-0 w-[75%] bg-gradient-to-r from-white from-[62%] via-white/60 via-[85%] to-transparent pointer-events-none lg:w-24 lg:via-transparent" />
          </div>

          <p className="row-start-2 col-start-1 px-5 pt-4 lg:px-0 lg:pt-0 lg:self-start text-[#333] text-[15px] lg:text-[16px] leading-[2]">
            直請けを増やしたいと思いながらも、<br />
            日々の業務に追われて、なかなか前に進めない。<br />
            そんな工事業者様からのご相談が増えています。
          </p>
        </div>

        {/* ── Cards: SP 2x2 ── */}
        <div className="grid grid-cols-2 gap-2 -mx-1 mt-6 lg:hidden">
          {cards.map((c, i) => (
            <div key={i} className="bg-white border border-[#E3E5E8] rounded-[6px] flex flex-col overflow-hidden">
              <div className="flex items-center gap-[6px] px-2 py-[9px] bg-[#171717] border-b-[3px] border-[#FFCC00]">
                <span className="text-[#FFCC00] font-black text-[18px] leading-none">{c.num}</span>
                <span className="w-px h-4 bg-white/40 shrink-0" />
                <p className="text-white font-black text-[13px] leading-none whitespace-nowrap">{c.title}</p>
              </div>
              <div className="flex-1 flex flex-col items-center px-2 pt-3 pb-3">
                <img src={c.icon} alt="" aria-hidden="true" className="w-[68px] h-[68px] object-contain" />
                <p className="text-[#333] font-medium text-[13px] leading-[1.7] text-center [word-break:auto-phrase] mt-1">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Cards: PC with arrows ── */}
        <div className="hidden lg:flex items-stretch mt-12">
          {cards.map((c, i) => (
            <div key={i} className="contents">
              <div className="flex-1 bg-white border border-[#E3E5E8] rounded-[6px] flex flex-col overflow-hidden">
                <div className="flex items-center justify-center gap-3 px-4 py-3 bg-[#171717] border-b-[4px] border-[#FFCC00]">
                  <span className="text-[#FFCC00] font-black text-[26px] leading-none">{c.num}</span>
                  <span className="w-px h-6 bg-white/40" />
                  <p className="text-white font-black text-[19px] leading-none whitespace-nowrap">{c.title}</p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-5 py-7">
                  <img src={c.icon} alt="" aria-hidden="true" className="w-[110px] h-[110px] object-contain" />
                  <p className="text-[#333] font-medium text-[14px] leading-[1.8] text-center [word-break:auto-phrase] mt-4">{c.body}</p>
                </div>
              </div>
              {i < 3 && (
                <div className="flex items-center px-2">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    <path d="M2 11 H16 M11 5 L18 11 L11 17" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* ── Conclusion (compact) ── */}
      <div className="mt-5 lg:mt-10 relative overflow-hidden bg-[#171717]">
        <img src={paintDark} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-x-[1.4] opacity-70 pointer-events-none" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 py-5 lg:px-[68px] lg:py-8 flex items-start lg:items-center lg:justify-center gap-3 lg:gap-5">
          <span className="block w-8 lg:w-14 h-[2px] bg-[#FFCC00] mt-[13px] lg:mt-0 shrink-0" />
          <p className="text-white font-black text-[14px] lg:text-[20px] leading-[1.6]">
            負の連鎖から抜け出し、<br />
            <span className="text-[#FFCC00] text-[21px] lg:text-[34px] leading-[1.4]">直請け案件を増やす仕組み</span>
            <span className="text-white text-[21px] lg:text-[34px] leading-[1.4]">が<br className="lg:hidden" />必要です。</span>
          </p>
        </div>
      </div>
    </section>
  );
}
