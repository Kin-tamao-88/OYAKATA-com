import { IMG } from "./assets";
import { ChartIcon, HandshakeIcon, PeopleIcon } from "./icons";

const POINTS = [
  { Icon: ChartIcon, text: "集客で\n仕事を増やす" },
  { Icon: PeopleIcon, text: "営業支援で\n成約につなげる" },
  { Icon: HandshakeIcon, text: "新たな受注機会で\n事業を広げる" },
];

function SectionLabel({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="flex items-stretch gap-3">
      <span className="block w-[4px] bg-[#f2b500] shrink-0" aria-hidden="true" />
      <div className="leading-[1.5]">
        <p className="font-['Montserrat'] font-bold text-[#d99b00] text-[14px] tracking-[0.12em]">{en}</p>
        <p className="text-[#111] font-bold text-[14px]">{ja}</p>
      </div>
    </div>
  );
}

export { SectionLabel };

export default function Mission() {
  return (
    <section id="mission" className="scroll-mt-[64px] lg:scroll-mt-[76px] relative overflow-hidden bg-white" aria-labelledby="mission-title">
      {/* 黄色の筆跡(左下・右上) */}
      <img src={IMG.brush} alt="" className="pointer-events-none absolute -right-[18%] -top-[6%] w-[60%] lg:-right-[8%] lg:-top-[7%] lg:w-[34%] rotate-[-28deg]" aria-hidden="true" />
      <img src={IMG.brush} alt="" className="pointer-events-none hidden lg:block absolute -left-[6%] bottom-[2%] w-[36%] rotate-[-9deg]" aria-hidden="true" />

      {/* 写真(右側・左辺が斜め) */}
      <div className="hidden lg:block absolute top-0 right-0 w-[56%] h-full [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]">
        <img src={IMG.mission} alt="" className="w-full h-full object-cover object-[78%_30%]" />
      </div>

      <div className="relative px-5 pt-12 pb-10 lg:px-[max(40px,calc((100vw-1320px)/2))] lg:pt-[70px] lg:pb-[150px] lg:min-h-[620px]">
        <SectionLabel en="OUR MISSION" ja="私たちの使命" />
        <h2 id="mission-title" className="mt-5 lg:mt-7 font-['Noto_Serif_JP'] font-black leading-[1.22] text-[40px] lg:text-[clamp(52px,5.2vw,76px)] text-[#111]">
          建設業の<br className="lg:hidden" />可能性を、<br />
          <span className="text-[#d49a00]">もっと先へ。</span>
        </h2>

        <div className="mt-6 lg:mt-8 text-[#222] text-[16px] lg:text-[17px] leading-[2] lg:leading-[1.95] lg:max-w-[560px] space-y-5 lg:space-y-4">
          <p>建設業には、優れた技術と経験を持ちながら、その価値を十分に届けられていない会社が数多くあります。</p>
          <p>私たちは、マーケティングと営業支援の力で、技術と仕事が正しく出会う仕組みをつくります。</p>
          <p>仕事を待つ経営から、選ばれる経営へ。</p>
          <p className="text-[#111] font-bold">
            <span className="bg-[linear-gradient(transparent_64%,#ffd400_64%)]">建設業の事業成長を、仕組みから支えていきます。</span>
          </p>
        </div>

        {/* 手書きコピー(写真の上) */}
        <p className="hidden lg:block absolute right-[1.5%] top-[22px] -rotate-[12deg] font-['Zen_Kurenaido'] text-[#111] text-[clamp(24px,2.1vw,30px)] leading-[1.5]">
          建設の<br />これからを、<br />もっと面白く。
        </p>
      </div>

      {/* SP:写真+手書きコピー */}
      <div className="relative lg:hidden h-[210px]">
        <img src={IMG.mission} alt="" className="absolute inset-0 w-full h-full object-cover object-[80%_30%] [clip-path:polygon(0_28%,100%_0,100%_100%,0_100%)]" />
        <p className="absolute left-5 top-[40px] -rotate-[12deg] font-['Zen_Kurenaido'] text-[#111] text-[19px] leading-[1.5]">
          建設の<br />これからを、<br />もっと面白く。
        </p>
      </div>

      {/* 黒い帯(3つの価値) */}
      <div className="relative lg:absolute lg:right-0 lg:bottom-0 lg:w-[62%] bg-[#1a1a1a] lg:bg-transparent">
        <div className="hidden lg:block absolute inset-0 bg-[#1a1a1a] [clip-path:polygon(0_72%,100%_0,100%_100%,0_100%)]" aria-hidden="true" />
        <ul className="relative grid grid-cols-3 lg:pt-[44px] lg:pb-7 lg:pl-[8%]">
          {POINTS.map(({ Icon, text }, i) => (
            <li key={text} className={`flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 px-2 py-4 lg:py-0 text-white text-center lg:text-left ${i > 0 ? "border-l border-[#444]" : ""}`}>
              <Icon className="w-7 h-7 lg:w-11 lg:h-11 text-[#f2b500] shrink-0" />
              <span className="font-bold text-[13px] lg:text-[16px] leading-[1.5] whitespace-pre-line">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
