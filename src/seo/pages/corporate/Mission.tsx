import { IMG } from "./assets";
import { Label } from "./icons";

const VALUES = [
  { no: "01", text: "集客で\n受注を増やす" },
  { no: "02", text: "営業支援で\n成約につなげる" },
  { no: "03", text: "新たな受注機会で\n事業を広げる" },
];

export default function Mission() {
  return (
    <section id="mission" className="scroll-mt-[64px] lg:scroll-mt-[76px] bg-[#111] text-white pt-[72px] lg:pt-[132px]" aria-labelledby="mission-title">
      <div className="px-5 lg:px-[max(40px,calc((100vw-1280px)/2))] grid gap-7 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[72px] lg:items-end">
        <div>
          <Label en="OUR MISSION" ja="私たちの使命" />
          <h2 id="mission-title" className="mt-[22px] lg:mt-[30px] font-['Noto_Serif_JP'] font-black text-[clamp(40px,11.4vw,48px)] lg:text-[clamp(48px,5.3vw,82px)] leading-[1.34] lg:leading-[1.3] lg:whitespace-nowrap">
            建設業の<br className="lg:hidden" />可能性を、
            <em className="block not-italic text-[#ffd400]">もっと先へ。</em>
          </h2>
        </div>
        <div className="space-y-4 text-[#f1f1f1] text-[16px] lg:text-[17px] leading-[2] lg:leading-[2.1]">
          <p>建設業には、優れた技術と経験を持ちながら、その価値を十分に届けられていない会社が数多くあります。</p>
          <p>私たちは、マーケティングと営業支援の力で、技術と仕事が正しく出会う仕組みをつくります。</p>
          <p>仕事を待つ経営から、選ばれる経営へ。</p>
          <p>
            <strong className="text-white font-black bg-[linear-gradient(transparent_calc(100%-3px),#ffd400_calc(100%-3px))]">建設業の事業成長を、仕組みから支えていきます。</strong>
          </p>
        </div>
      </div>

      {/* 横長の写真(右端まで裁ち落とし)+手書きコピー */}
      <div className="relative mt-12 lg:mt-24 ml-5 lg:ml-[max(40px,calc((100vw-1280px)/2))] h-[300px] md:h-[380px] lg:h-[480px] overflow-hidden">
        <img src={IMG.mission} alt="" loading="lazy" className="w-full h-full object-cover object-[78%_20%] lg:object-[70%_22%]" />
        <p className="absolute left-5 bottom-[22px] lg:left-14 lg:bottom-11 -rotate-[5deg] font-['Zen_Kurenaido'] font-bold text-white text-[25px] lg:text-[40px] leading-[1.5] [text-shadow:0_2px_4px_rgba(0,0,0,0.55),0_2px_22px_rgba(0,0,0,0.7)]">
          建設の<br />これからを、<br />もっと面白く。
        </p>
      </div>

      <ul className="grid lg:grid-cols-3 px-5 pt-2 pb-7 lg:py-0 lg:px-[max(40px,calc((100vw-1280px)/2))]">
        {VALUES.map(({ no, text }, i) => (
          <li
            key={no}
            className={`flex items-baseline gap-4 lg:gap-5 py-[18px] lg:pt-11 lg:pb-[52px] lg:pr-8 font-black text-[19px] lg:text-[22px] leading-[1.55] border-[#555] ${i > 0 ? "border-t lg:border-t-0 lg:border-l lg:pl-8" : ""}`}
          >
            <span className="font-['Montserrat'] font-bold text-[#ffd400] text-[15px] tracking-[0.1em]">{no}</span>
            <span className="whitespace-pre-line">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
