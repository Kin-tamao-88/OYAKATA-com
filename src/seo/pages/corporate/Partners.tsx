import { CONTRACTORS_PUBLIC } from "../../site";
import { IMG } from "./assets";
import { ArrowRight } from "./icons";
import { SectionLabel } from "./Mission";

const POINTS = ["地域から探せる", "工事内容から探せる", "会社の魅力を紹介"];

export default function Partners() {
  return (
    <section id="partners" className="scroll-mt-[64px] lg:scroll-mt-[76px] bg-white" aria-labelledby="partners-title">
      <div className="px-5 py-14 lg:py-[88px] lg:px-[max(40px,calc((100vw-1320px)/2))] lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 lg:items-center">
        <div>
          <SectionLabel en="PARTNERS" ja="" />
          <h2 id="partners-title" className="mt-4 font-['Noto_Serif_JP'] font-black text-[#111] text-[26px] lg:text-[clamp(30px,2.8vw,40px)] leading-[1.45]">
            あなたの会社を、<br />次のお客様へ。
          </h2>
          <p className="mt-6 text-[#111] font-black text-[19px] lg:text-[22px] leading-[1.7]">
            技術がある。経験もある。<br />あとは、知ってもらうだけ。
          </p>
          <div className="mt-5 space-y-5 text-[#222] text-[16px] leading-[1.95]">
            <p>親方ドットコム パートナーズは、地域や工事内容から施工会社を探せるサービスです。</p>
            <p>あなたの会社の得意分野や施工実績を掲載し、工事を検討しているお客様との新しい接点をつくります。</p>
            <p>自社の魅力を伝える、もうひとつの集客窓口としてご活用いただけます。</p>
          </div>
          <ul className="mt-7 flex flex-col lg:flex-row gap-3 lg:gap-8">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[#111] font-bold text-[16px]">
                <span className="w-[5px] h-[22px] bg-[#f2b500]" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 lg:mt-0">
          <div className="border border-[#d9d9d9] bg-white overflow-hidden">
            <div className="h-[28px] bg-[#f0f0f0] border-b border-[#d9d9d9] flex items-center gap-[6px] px-3" aria-hidden="true">
              <span className="w-[9px] h-[9px] rounded-full bg-[#c9c9c9]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#c9c9c9]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#c9c9c9]" />
            </div>
            <img src={IMG.partnersScreen} alt="親方ドットコム パートナーズのサイト画面" className="w-full h-auto block" loading="lazy" />
          </div>
        </div>

        <div className="mt-10 lg:mt-12 lg:col-span-2 lg:text-center">
          <p className="text-[#111] font-black text-[19px] lg:text-[24px] leading-[1.6]">その技術を、<br className="lg:hidden" />もっと多くのお客様に届けませんか。</p>
          <div className="mt-6 flex flex-col lg:flex-row lg:justify-center gap-4 lg:gap-6">
            <a
              href="#contact-form"
              className="flex items-center justify-between gap-6 h-[56px] lg:h-[60px] px-8 rounded-full bg-[#f5b800] text-[#111] font-black text-[16px] hover:brightness-95 transition lg:min-w-[300px]"
            >
              掲載について相談する
              <ArrowRight />
            </a>
            {CONTRACTORS_PUBLIC && (
              <a
                href="/contractors"
                className="flex items-center justify-between gap-6 h-[56px] lg:h-[60px] px-8 rounded-full border-2 border-[#111] bg-white text-[#111] font-black text-[16px] hover:bg-[#f5f5f5] transition lg:min-w-[300px]"
              >
                パートナーズサイトを見る
                <ArrowRight />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
