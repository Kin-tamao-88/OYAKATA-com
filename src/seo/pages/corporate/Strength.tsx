import { IMG } from "./assets";
import { Label } from "./icons";

const STRENGTHS = [
  { no: "01", title: ["建設業に特化した専門知識"], body: "建設業の商習慣・顧客特性を理解し、成果につながる施策を提案します。" },
  { no: "02", title: ["集客から営業まで", "一気通貫で支援"], body: "問い合わせ獲得だけでなく、商談・成約まで伴走します。" },
  { no: "03", title: ["現場目線での", "実践的なサポート"], body: "机上の理論ではなく、現場で使える実践的なサポートを提供します。" },
];

export default function Strength() {
  return (
    <section id="strength" className="scroll-mt-[64px] lg:scroll-mt-[76px] bg-[#f4f2ec] pb-[68px] lg:pb-0 lg:grid lg:grid-cols-[44%_minmax(0,1fr)]" aria-labelledby="strength-title">
      {/* 写真:PCは左端・上下いっぱいに裁ち落とし。境目に黄色の帯を1本かける */}
      <div className="relative h-[290px] md:h-[420px] mr-7 lg:mr-0 lg:h-auto lg:min-h-[780px] after:content-[''] after:absolute after:bg-[#ffd400] after:-right-7 after:bottom-0 after:w-7 after:h-[120px] lg:after:-right-6 lg:after:bottom-24 lg:after:w-12 lg:after:h-[200px]">
        <img src={IMG.strength} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[60%_22%] lg:object-[60%_30%]" />
      </div>

      <div className="px-5 pt-11 lg:py-[124px] lg:pl-16 xl:pl-[104px] lg:pr-[max(40px,calc((100vw-1280px)/2))]">
        <Label en="OUR STRENGTHS" />
        <h2 id="strength-title" className="mt-4 lg:mt-6 font-['Noto_Serif_JP'] font-black text-[#111] text-[clamp(34px,9.6vw,40px)] lg:text-[clamp(40px,4.3vw,62px)] leading-[1.3]">
          親方ドットコムの<br className="md:hidden" />強み
        </h2>
        <ol className="mt-8 lg:mt-[52px] border-t-2 border-[#111]">
          {STRENGTHS.map(({ no, title, body }) => (
            <li
              key={no}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 items-baseline pt-[26px] pb-7 border-b border-[#111] lg:grid-cols-[80px_minmax(0,1fr)] lg:gap-x-5 lg:gap-y-2 lg:items-start lg:pt-[34px] lg:pb-9 xl:grid-cols-[104px_minmax(0,1fr)]"
            >
              <span className="font-['Montserrat'] font-extrabold text-[#111] text-[34px] lg:text-[44px] xl:text-[56px] leading-none lg:row-span-2">{no}</span>
              <h3 className="text-[#111] font-black text-[21px] lg:text-[22px] xl:text-[26px] leading-[1.5]">
                {title.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br className="md:hidden" />}
                    {line}
                  </span>
                ))}
              </h3>
              <p className="col-span-full lg:col-span-1 lg:col-start-2 text-[#111] text-[16px] leading-[1.95] lg:leading-[2]">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
