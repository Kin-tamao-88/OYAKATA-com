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
    body: "元請け案件が取れず、下請けや単価の安い仕事に頼らざるを得ない。",
    gold: false,
    icon: <img src={iconWork} alt="" className="w-[122px] h-[122px] object-contain" aria-hidden="true" />,
  },
  {
    num: "02",
    title: "利益が減る",
    body: "利益率が下がり、人件費や材料費の高騰でさらに経営を圧迫する。",
    gold: false,
    icon: <img src={iconProfit} alt="" className="w-[122px] h-[122px] object-contain" aria-hidden="true" />,
  },
  {
    num: "03",
    title: "広告を出せない",
    body: "広告や集客に予算をかけられず、新たな仕事が獲得できない。",
    gold: false,
    icon: <img src={iconAd} alt="" className="w-[122px] h-[122px] object-contain" aria-hidden="true" />,
  },
  {
    num: "04",
    title: "さらに仕事が減る",
    body: "身動きが取れず元請け案件も増えず、また仕事が減っていく。",
    gold: false,
    icon: <img src={iconConnect} alt="" className="w-[122px] h-[122px] object-contain" aria-hidden="true" />,
  },
];

export default function Section03() {
  return (
    <section className="bg-white pt-8 pb-4 lg:pt-[80px] lg:pb-[40px]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        {/* ── Section Header ── */}
        <div className="flex items-center gap-4 mb-2">
          <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
          <div>
            <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">02</span>
            <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
          </div>
          <div className="w-px h-10 bg-[#1a1a1a]" />
          <span className="text-[#1a1a1a] font-bold text-[19px] lg:text-[22px]">課題</span>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-[#D4A820] to-[#1a1a1a] mt-3 mb-5" />

        {/* ── Main 2-column ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 mb-4 lg:mb-8">

          {/* Left: Heading + body */}
          <div className="flex-1">
            <h2 className="text-[#1a1a1a] font-black leading-[1.25] mb-6 text-[30px] lg:text-[54px]">
              下請けばかりの経営、<br />
              <span className="border-b-[4px] lg:border-b-[6px] border-[#D4A820] pb-[2px]">続けていませんか？</span>
            </h2>
            <p className="text-[#1a1a1a] text-[14px] lg:text-[16px] leading-[2]">
              元請けを増やしたいと思いながらも、<br />
              日々の業務に追われて、なかなか前に進めない。<br />
              そんな工事業者様からのご相談が増えています。
            </p>
          </div>

          {/* Right: Photo */}
          <div className="relative w-full lg:w-[46%] lg:shrink-0">
            <img
              src={painWorker}
              alt="悩む工事業者"
              className="w-full object-cover"
            />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          </div>
        </div>


        {/* SP: 2×2 grid */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {cards.map((c, i) => (
            <div key={i} className="border border-[#ccc] flex flex-col overflow-hidden">
              <div className={`px-3 pt-2 pb-2 text-center border-b ${c.gold ? "bg-[#D4A820] border-[#c49810]" : "bg-[#111] border-[#333]"}`}>
                <span className={`font-bold text-[10px] block ${c.gold ? "text-[#1a1a1a]" : "text-[#D4A820]"}`}>{c.num}</span>
                <p className={`font-black text-[14px] leading-tight ${c.gold ? "text-[#1a1a1a]" : "text-white"}`}>{c.title}</p>
              </div>
              <div className="flex-1 bg-white flex flex-col items-center justify-center px-3 py-2">
                <div className="scale-75 origin-top -mb-7">{c.icon}</div>
                <p className="text-[#1a1a1a] font-medium text-[12px] leading-[1.8] text-center">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PC: flex with arrows */}
        <div className="hidden lg:flex items-stretch gap-0">
          {cards.map((c, i) => (
            <div key={i} className="contents">
              <div className="flex-1 border border-[#ccc] flex flex-col overflow-hidden">
                <div className={`px-4 pt-3 pb-3 text-center border-b ${c.gold ? "bg-[#D4A820] border-[#c49810]" : "bg-[#111] border-[#333]"}`}>
                  <span className={`font-bold text-[11px] block ${c.gold ? "text-[#1a1a1a]" : "text-[#D4A820]"}`}>{c.num}</span>
                  <p className={`font-black text-[18px] leading-tight ${c.gold ? "text-[#1a1a1a]" : "text-white"}`}>{c.title}</p>
                </div>
                <div className="flex-1 bg-white flex flex-col items-center justify-center px-4 py-8">
                  {c.icon}
                  <p className="text-[#1a1a1a] font-medium text-[13px] leading-[1.8] text-center mt-5">{c.body}</p>
                </div>
              </div>
              {i < 3 && (
                <div className="flex items-center px-2 bg-white">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    <path d="M2 11 H16 M11 5 L18 11 L11 17" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Conclusion ── */}
        <div className="mt-6 relative overflow-hidden -mx-5 lg:mx-0 px-5 py-5 text-center">
          <img src={paintDark} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-x-[1.4] pointer-events-none" />
          <p className="relative z-10 text-white font-black text-[16px] lg:text-[18px] leading-[2]">
            負の連鎖から抜け出し、<br />
            <span className="text-[#D4A820]">元請け案件を増やす仕組み</span><span className="text-white lg:text-[#D4A820]">が必要です。</span>
          </p>
        </div>

      </div>
    </section>
  );
}
