import { IMG } from "./assets";
import { Arrow, BTN, BTN_OUTLINE, BTN_YELLOW } from "./icons";

const INDEX = [
  { no: "01", href: "#sv1", label: "建設業特化型\nマーケティング支援" },
  { no: "02", href: "#sv2", label: "営業・事業成長支援" },
  { no: "03", href: "#sv3", label: "親方ドットコム\nパートナーズ" },
];

export default function Fv() {
  return (
    <section id="fv" className="relative overflow-hidden bg-white" aria-labelledby="fv-title">
      <div className="relative px-5 pt-[26px] lg:flex lg:flex-col lg:justify-center lg:min-h-[clamp(600px,calc(100vh-174px),760px)] lg:pt-11 lg:pb-[60px] lg:px-[max(40px,calc((100vw-1280px)/2))]">
        <p className="relative z-[2] font-['Montserrat'] font-bold tracking-[0.14em] text-[#111] text-[11px] lg:text-[13px] leading-[1.9]">
          BUILD A STRONGER<br />CONSTRUCTION INDUSTRY
        </p>

        <h1 id="fv-title" className="relative z-[2] mt-[14px] lg:mt-5 text-[#111] font-black text-[clamp(50px,14.4vw,60px)] lg:text-[clamp(64px,8vw,124px)] leading-[1.16] lg:leading-[1.12] tracking-[0.005em]">
          <span className="block w-fit">建設業の</span>
          <span className="block w-fit">可能性を、</span>
          <span className="block w-fit bg-[linear-gradient(transparent_68%,#ffd400_68%,#ffd400_94%,transparent_94%)]">次の世代へ。</span>
        </h1>

        <p className="relative z-[2] mt-5 lg:mt-7 lg:max-w-[min(680px,calc(59vw-100px))] text-[#111] text-[16px] lg:text-[17px] leading-[1.95] lg:leading-[2]">
          親方ドットコムは、工事会社の集客と事業成長を支援するサービスです。Webサイト制作・広告運用を通じて、個人のお客様との出会いを増やし、安定した受注につながる仕組みづくりをサポートします。
        </p>

        <div className="relative z-[2] mt-[22px] lg:mt-[30px] flex flex-col lg:flex-row gap-[10px] lg:gap-4">
          <a href="#service" className={`${BTN} ${BTN_YELLOW} lg:min-w-[240px]`}>
            事業内容を見る
            <Arrow />
          </a>
          <a href="#contact" className={`${BTN} ${BTN_OUTLINE} lg:min-w-[240px]`}>
            お問い合わせ
            <Arrow />
          </a>
        </div>

        {/* 写真:SPは左をずらして右へ裁ち落とし、PCは右41%に縦長で配置 */}
        <div className="relative mt-7 ml-5 -mr-5 h-[300px] md:h-[420px] overflow-hidden lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:m-0 lg:h-auto lg:w-[41%]">
          <img src={IMG.fv} alt="" fetchPriority="high" className="w-full h-full object-cover object-[70%_30%] lg:object-[72%_35%]" />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0)_45%)]" aria-hidden="true" />
          <p className="absolute top-5 left-5 lg:top-11 lg:left-10 [writing-mode:vertical-rl] font-['Noto_Serif_JP'] font-bold text-white text-[19px] lg:text-[26px] leading-[1.8] lg:leading-[1.9] tracking-[0.12em] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
            つくる人が、<br />もっと報われる社会を。
          </p>
        </div>

        <div className="hidden lg:flex absolute left-[calc(max(40px,(100vw-1280px)/2)-30px)] bottom-0 z-[3] flex-col items-center gap-[10px] [writing-mode:vertical-rl] font-['Montserrat'] font-bold tracking-[0.14em] text-[#111] text-[11px]" aria-hidden="true">
          SCROLL
          <span className="block w-[2px] h-16 bg-[linear-gradient(#111_50%,#d9d5cb_50%)] bg-[length:100%_200%] animate-[corp-scroll_2s_cubic-bezier(0.6,0,0.3,1)_infinite] motion-reduce:animate-none" />
        </div>
      </div>

      {/* 事業インデックス:次のセクション以降への橋渡し */}
      <nav className="relative z-[3] grid lg:grid-cols-3 border-t-2 border-[#111] bg-white px-5 lg:px-[max(40px,calc((100vw-1280px)/2))]" aria-label="事業内容">
        {INDEX.map((item, i) => (
          <a
            key={item.no}
            href={item.href}
            className={`group flex items-center gap-4 lg:gap-5 py-[18px] lg:py-[26px] lg:pr-7 text-[#111] font-black text-[17px] lg:text-[18px] leading-[1.5] border-[#111] lg:hover:bg-[#ffd400] transition-colors ${i > 0 ? "border-t lg:border-t-0 lg:border-l lg:pl-7" : ""}`}
          >
            <span className="font-['Montserrat'] font-extrabold text-[24px] lg:text-[30px] leading-none w-[38px] lg:w-auto shrink-0">{item.no}</span>
            <span className="whitespace-pre-line">{item.label}</span>
            <span className="ml-auto mr-1 block w-3 h-3 shrink-0 border-r-[2.5px] border-b-[2.5px] border-[#111] rotate-45 -translate-y-[3px] group-hover:translate-y-0 transition-transform" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </section>
  );
}
