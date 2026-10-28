import { IMG } from "./assets";
import { ChartIcon, HandshakeIcon, PeopleIcon } from "./icons";
import { SectionLabel } from "./Mission";

const STRENGTHS = [
  { Icon: PeopleIcon, title: "建設業に特化した専門知識", body: "建設業の商習慣・顧客特性を理解し、成果につながる施策を提案します。" },
  { Icon: ChartIcon, title: "集客から営業まで一気通貫で支援", body: "問い合わせ獲得だけでなく、商談・成約まで伴走します。" },
  { Icon: HandshakeIcon, title: "現場目線での実践的なサポート", body: "机上の理論ではなく、現場で使える実践的なサポートを提供します。" },
];

export default function Strength() {
  return (
    <section id="strength" className="scroll-mt-[64px] lg:scroll-mt-[76px] relative overflow-hidden bg-[#fafafa]" aria-labelledby="strength-title">
      <img src={IMG.strength} alt="" className="absolute right-0 top-0 h-full w-[48%] object-cover object-[85%_30%] [mask-image:linear-gradient(90deg,transparent,#000_30%)] hidden lg:block" />
      <img src={IMG.brush} alt="" className="pointer-events-none absolute -right-[14%] -top-[8%] w-[42%] lg:right-[-4%] lg:-top-[16%] lg:w-[22%] rotate-[-24deg]" aria-hidden="true" />

      <div className="relative px-5 py-14 lg:py-[56px] lg:px-[max(40px,calc((100vw-1320px)/2))]">
        <SectionLabel en="OUR STRENGTHS" ja="" />
        <h2 id="strength-title" className="mt-4 font-['Noto_Serif_JP'] font-black text-[#111] text-[30px] lg:text-[clamp(30px,2.8vw,40px)] leading-[1.4]">
          親方ドットコムの強み
        </h2>
        <ul className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 lg:max-w-[1020px]">
          {STRENGTHS.map(({ Icon, title, body }) => (
            <li key={title} className="bg-white border border-[#e6e6e6] border-t-[5px] border-t-[#f2b500] shadow-[0_10px_28px_rgba(0,0,0,0.12)] px-6 py-6">
              <div className="flex items-center gap-3">
                <Icon className="w-11 h-11 text-[#f2b500] shrink-0" />
                <h3 className="text-[#111] font-black text-[18px] lg:text-[19px] leading-[1.45]">{title}</h3>
              </div>
              <p className="mt-3 text-[#222] text-[16px] leading-[1.9]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
