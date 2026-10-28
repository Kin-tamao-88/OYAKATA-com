import { CONTRACTORS_PUBLIC } from "../../site";
import { IMG } from "./assets";
import { ArrowRight, ChartIcon, HandshakeIcon, PeopleIcon } from "./icons";
import { SectionLabel } from "./Mission";

const SERVICES = [
  {
    no: "01",
    en: "MARKETING",
    title: "建設業特化型\nマーケティング支援",
    body: "Webサイト・LP制作から広告運用まで。建設業の商習慣と顧客ニーズを踏まえ、問い合わせ獲得につながる集客基盤を構築します。",
    img: IMG.service1,
    Icon: ChartIcon,
    href: undefined,
  },
  {
    no: "02",
    en: "BUSINESS SUPPORT",
    title: "営業・事業成長支援",
    body: "問い合わせを獲得して終わりではなく、商談・成約までを見据えた導線づくりと営業活動を支援します。",
    img: IMG.service2,
    Icon: PeopleIcon,
    href: undefined,
  },
  {
    no: "03",
    en: "PARTNERS",
    title: "親方ドットコム\nパートナーズ",
    body: "工事を依頼したいお客様と、施工を担う事業者をつなぐサービス。工事会社の新たな受注機会を広げます。",
    img: IMG.service3,
    Icon: HandshakeIcon,
    href: CONTRACTORS_PUBLIC ? "/contractors" : undefined,
  },
];

function Card({ item }: { item: (typeof SERVICES)[number] }) {
  const { no, en, title, body, img, Icon, href } = item;
  const arrow = (
    <span className="absolute right-3 top-1/2 -translate-y-1/2 lg:translate-y-0 lg:top-auto lg:right-4 lg:bottom-4 flex items-center justify-center w-9 h-9 rounded-full bg-[#ffd400] text-[#111]">
      <ArrowRight />
    </span>
  );
  const inner = (
    <>
      <img src={img} alt="" className="w-[104px] h-[84px] lg:w-full lg:h-[190px] object-cover shrink-0" />
      <div className="relative flex-1 pl-4 pr-14 py-2 lg:px-6 lg:pt-5 lg:pb-[64px]">
        <Icon className="hidden lg:block absolute right-5 top-5 w-10 h-10 text-[#e6e6e6]" />
        <div className="flex items-start gap-4">
          <span className="hidden lg:block font-['Montserrat'] font-semibold text-[#f2b500] text-[44px] leading-none">{no}</span>
          <div className="lg:pt-1">
            <p className="font-['Montserrat'] font-bold text-[#d99b00] text-[12px] tracking-[0.1em]">
              <span className="lg:hidden">{no} / </span>{en}
            </p>
            <h3 className="mt-1 text-[#111] font-black text-[18px] lg:text-[20px] leading-[1.45] whitespace-pre-line">{title}</h3>
          </div>
        </div>
        <span className="hidden lg:block w-[34px] h-[2px] bg-[#f2b500] mt-3" aria-hidden="true" />
        <p className="hidden lg:block mt-3 text-[#333] text-[16px] leading-[1.85]">{body}</p>
      </div>
      {arrow}
    </>
  );
  const cls = "relative flex lg:block items-center bg-white border border-[#eeeeee] shadow-[0_6px_20px_rgba(0,0,0,0.07)]";
  return href ? (
    <a href={href} className={`${cls} hover:-translate-y-[2px] transition-transform`}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function Service() {
  return (
    <section id="service" className="scroll-mt-[64px] lg:scroll-mt-[76px] bg-white px-5 py-14 lg:py-[70px] lg:px-[max(40px,calc((100vw-1320px)/2))]" aria-labelledby="service-title">
      <SectionLabel en="OUR SERVICE" ja="事業紹介" />
      <h2 id="service-title" className="mt-5 lg:mt-6 font-['Noto_Serif_JP'] font-black text-[#111] leading-[1.3] text-[34px] lg:text-[clamp(40px,4.4vw,64px)]">
        集客から、その先の<br className="lg:hidden" />
        <span className="text-[#d49a00]">事業成長</span>まで。
      </h2>
      <p className="mt-5 lg:mt-6 text-[#222] text-[16px] lg:text-[17px] leading-[2] lg:leading-[1.9] max-w-[760px]">
        建設業に特化したマーケティングと営業支援で、問い合わせの獲得から商談・成約、そして持続的な事業成長までを支援します。
      </p>
      <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-8">
        {SERVICES.map((item) => (
          <Card key={item.no} item={item} />
        ))}
      </div>
    </section>
  );
}
