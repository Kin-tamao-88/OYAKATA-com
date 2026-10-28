import { IMG } from "./assets";
import { ArrowRight } from "./icons";

export default function Fv() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#e8f1fa_0%,#d3e6f6_100%)] lg:bg-[#eaf3fb]" aria-labelledby="fv-title">
      {/* 写真:SPは下部、PCは全面 */}
      <img
        src={IMG.fv}
        alt=""
        className="absolute bottom-0 inset-x-0 w-full h-[380px] object-cover object-[72%_30%] lg:inset-0 lg:h-full lg:object-[70%_40%]"
      />
      <div className="absolute bottom-0 inset-x-0 h-[380px] bg-[linear-gradient(180deg,#d9e9f7_0%,rgba(217,233,247,0.9)_28%,rgba(217,233,247,0)_58%)] lg:inset-0 lg:h-auto lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.7)_38%,rgba(255,255,255,0)_64%)]" aria-hidden="true" />

      <div className="relative px-5 pt-8 pb-[290px] lg:pt-[76px] lg:pb-[100px] lg:min-h-[686px] lg:px-[max(40px,calc((100vw-1320px)/2))]">
        <p className="font-['Montserrat'] font-semibold text-[#111] text-[12px] lg:text-[13px] tracking-[0.22em] leading-[1.8]">
          BUILD A STRONGER<br />CONSTRUCTION INDUSTRY
        </p>

        <h1 id="fv-title" className="mt-5 lg:mt-7 text-[#111] font-black leading-[1.18] text-[48px] lg:text-[clamp(64px,6.1vw,88px)] tracking-[0.01em]">
          建設業の<br />可能性を、<br />
          <span className="bg-[linear-gradient(transparent_74%,#ffd400_74%,#ffd400_92%,transparent_92%)]">次の世代へ。</span>
        </h1>

        <p className="mt-7 lg:mt-9 text-[#111] font-medium text-[16px] lg:text-[17px] leading-[1.95] max-w-[720px]">
          親方ドットコムは、工事会社の集客と事業成長を支援するサービスです。
          Webサイト制作・広告運用を通じて、個人のお客様との出会いを増やし、安定した受注につながる仕組みづくりをサポートします。
        </p>

        <div className="mt-8 lg:mt-10">
          <a
            href="#service"
            className="flex items-center justify-between gap-6 w-[220px] lg:w-[256px] h-[54px] lg:h-[60px] px-7 rounded-full bg-[#ffd400] text-[#111] font-black text-[16px] hover:brightness-95 transition"
          >
            事業内容を見る
            <ArrowRight />
          </a>
        </div>

        <p className="hidden lg:block absolute right-[max(40px,calc((100vw-1320px)/2))] bottom-[90px] text-white text-right font-['Noto_Serif_JP'] font-bold text-[clamp(22px,2.1vw,30px)] leading-[1.7]">
          つくる人が、<br />もっと報われる社会を。
          <span className="block mt-4 font-['Montserrat'] font-semibold text-[12px] tracking-[0.2em] leading-[1.8]">
            MORE OPPORTUNITIES<br />FOR BUILDERS.
          </span>
        </p>
      </div>
    </section>
  );
}
