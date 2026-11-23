import { IMG } from "./assets";
import { Label } from "./icons";

const SERVICES = [
  {
    no: "01",
    en: "MARKETING",
    title: "建設業特化型\nマーケティング支援",
    body: "Webサイト・LP制作から広告運用まで。建設業の商習慣と顧客ニーズを踏まえ、問い合わせ獲得につながる集客基盤を構築します。",
    img: IMG.service1,
  },
  {
    no: "02",
    en: "BUSINESS SUPPORT",
    title: "営業・事業成長支援",
    body: "問い合わせを獲得して終わりではなく、商談・成約までを見据えた導線づくりと営業活動を支援します。",
    img: IMG.service2,
  },
  {
    no: "03",
    en: "PARTNERS",
    title: "親方ドットコム\nパートナーズ",
    body: "工事を依頼したいお客様と、施工を担う事業者をつなぐサービス。工事会社の新たな受注機会を広げます。",
    img: IMG.service3,
  },
];

/** リード文にある支援の範囲(問い合わせの獲得→商談・成約→持続的な事業成長) */
const FLOW = ["問い合わせの獲得", "商談・成約", "持続的な事業成長"];

export default function Service() {
  return (
    <section id="service" className="scroll-mt-[64px] lg:scroll-mt-[76px] bg-white px-5 pt-[76px] pb-[72px] lg:pt-[136px] lg:pb-[120px] lg:px-[max(40px,calc((100vw-1280px)/2))]" aria-labelledby="service-title">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[72px] lg:items-end">
        <div>
          <Label en="OUR SERVICE" ja="事業紹介" />
          <h2 id="service-title" className="mt-5 lg:mt-[26px] text-[#111] font-black text-[clamp(34px,9.6vw,40px)] lg:text-[clamp(44px,5vw,74px)] leading-[1.36] lg:leading-[1.28]">
            集客から、その先の<br />
            <span className="bg-[linear-gradient(transparent_68%,#ffd400_68%,#ffd400_94%,transparent_94%)]">事業成長</span>まで。
          </h2>
        </div>
        <p className="text-[#111] text-[16px] lg:text-[17px] leading-[1.95] lg:leading-[2.05] lg:pb-[10px]">
          建設業に特化したマーケティングと営業支援で、問い合わせの獲得から商談・成約、そして持続的な事業成長までを支援します。
        </p>
      </div>

      {/* 支援の範囲:PCは矢印の線でつないだ横一列、SPは縦線と点 */}
      <ol className="mt-9 ml-[6px] border-l-2 border-[#111] lg:mt-[68px] lg:ml-0 lg:border-l-0 lg:flex lg:items-center lg:gap-7" aria-label="支援の範囲">
        {FLOW.map((text, i) => {
          const last = i === FLOW.length - 1;
          return (
            <li
              key={text}
              className={`relative py-[11px] pl-[26px] text-[#111] font-black text-[21px] leading-[1.4] lg:flex lg:items-center lg:gap-7 lg:p-0 lg:text-[clamp(22px,2vw,29px)] lg:whitespace-nowrap ${i > 0 ? "lg:flex-1" : ""}`}
            >
              <span className={`lg:hidden absolute -left-2 top-1/2 -translate-y-1/2 block w-[14px] h-[14px] ${last ? "bg-[#ffd400] outline outline-2 outline-[#111]" : "bg-[#111]"}`} aria-hidden="true" />
              {i > 0 && (
                <span
                  className="hidden lg:block flex-1 min-w-[48px] h-[13px] bg-[#111] [clip-path:polygon(0_5.5px,calc(100%-13px)_5.5px,calc(100%-13px)_0,100%_50%,calc(100%-13px)_100%,calc(100%-13px)_7.5px,0_7.5px)]"
                  aria-hidden="true"
                />
              )}
              <span className={last ? "bg-[linear-gradient(transparent_62%,#ffd400_62%,#ffd400_94%,transparent_94%)]" : ""}>{text}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-11 lg:mt-16 border-t-2 border-[#111]">
        {SERVICES.map(({ no, en, title, body, img }) => (
          <article
            key={no}
            id={`sv${Number(no)}`}
            className="scroll-mt-[64px] lg:scroll-mt-[76px] grid grid-cols-[auto_minmax(0,1fr)] gap-x-[18px] gap-y-[6px] items-start pt-[30px] pb-[34px] border-b border-[#111] lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1fr)_220px] lg:gap-6 lg:items-center lg:py-11 xl:grid-cols-[150px_minmax(0,5fr)_minmax(0,5fr)_320px] xl:gap-10"
          >
            <span className="font-['Montserrat'] font-extrabold text-[#111] text-[54px] lg:text-[64px] xl:text-[92px] leading-[0.9] tracking-[-0.02em] after:content-[''] after:block after:w-[30px] after:h-[5px] after:mt-[10px] after:bg-[#ffd400] xl:after:w-11 xl:after:h-[6px] xl:after:mt-4">
              {no}
            </span>
            <div>
              <p className="font-['Montserrat'] font-bold text-[#8a6400] text-[12px] tracking-[0.14em]">{en}</p>
              <h3 className="mt-1 lg:mt-2 text-[#111] font-black text-[23px] lg:text-[22px] xl:text-[30px] leading-[1.45] whitespace-pre-line">{title}</h3>
            </div>
            <p className="col-span-full lg:col-span-1 mt-3 lg:mt-0 text-[#111] text-[16px] leading-[1.95] lg:leading-[2]">{body}</p>
            <img
              src={img}
              alt=""
              loading="lazy"
              className="col-span-full lg:col-span-1 mt-[14px] lg:mt-0 w-[calc(100%+20px)] max-w-none h-[190px] md:h-[300px] object-cover lg:w-full lg:h-[150px] xl:h-[200px]"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
