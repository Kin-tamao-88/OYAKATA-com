import { CONTRACTORS_PUBLIC } from "../../site";
import { IMG } from "./assets";
import { Arrow, BTN, BTN_BLACK, Label } from "./icons";

const POINTS = ["地域から探せる", "工事内容から探せる", "会社の魅力を紹介"];

export default function Partners() {
  return (
    <section id="partners" className="scroll-mt-[64px] lg:scroll-mt-[76px] relative overflow-hidden bg-[#ffd400] px-5 py-[72px] lg:pt-32 lg:pb-[120px] lg:px-[max(40px,calc((100vw-1280px)/2))]" aria-labelledby="partners-title">
      <div className="grid gap-11 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20 lg:items-center">
        <div>
          <Label en="PARTNERS" tone="ink" />
          <h2 id="partners-title" className="mt-5 lg:mt-[26px] font-['Noto_Serif_JP'] font-black text-[#111] text-[clamp(36px,10.2vw,42px)] lg:text-[clamp(44px,4.9vw,72px)] leading-[1.32]">
            あなたの会社を、<br />次のお客様へ。
          </h2>
          <p className="mt-[22px] lg:mt-[30px] text-[#111] font-black text-[20px] lg:text-[24px] leading-[1.7]">
            技術がある。経験もある。<br />あとは、知ってもらうだけ。
          </p>
          <div className="mt-5 space-y-[14px] max-w-[600px] text-[#111] text-[16px] lg:text-[17px] leading-[1.95] lg:leading-[2.05]">
            <p>親方ドットコム パートナーズは、地域や工事内容から施工会社を探せるサービスです。</p>
            <p>あなたの会社の得意分野や施工実績を掲載し、工事を検討しているお客様との新しい接点をつくります。</p>
            <p>
              <span className="inline-block">自社の魅力を伝える、</span>
              <span className="inline-block">もうひとつの</span>
              <span className="inline-block">集客窓口として</span>
              <span className="inline-block">ご活用いただけます。</span>
            </p>
          </div>
          <ul className="mt-8 flex flex-col md:flex-row border-y-2 border-[#111]">
            {POINTS.map((p, i) => (
              <li
                key={p}
                className={`flex-1 py-[13px] px-1 md:py-4 md:text-center text-[#111] font-black text-[17px] lg:text-[16px] xl:text-[17px] border-[#111] ${i > 0 ? "border-t md:border-t-0 md:border-l-2" : ""}`}
              >
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* 写真:右端まで裁ち落とし、左下に黒い面をずらして重ねる */}
        <div className="relative ml-6 -mr-5 lg:ml-0 lg:-mr-[max(40px,calc((100vw-1280px)/2))] before:content-[''] before:absolute before:bg-[#111] before:w-[70%] before:h-[70%] before:-left-3 before:-bottom-3 lg:before:-left-6 lg:before:-bottom-6">
          <img src={IMG.partners} alt="住宅が並ぶ街並み" loading="lazy" className="relative block w-full h-[260px] md:h-[380px] lg:h-[520px] object-cover" />
        </div>
      </div>

      <div className="mt-14 pt-8 lg:mt-[88px] lg:pt-11 border-t-2 border-[#111] flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <p className="text-[#111] font-black text-[23px] lg:text-[26px] xl:text-[30px] leading-[1.6]">
          その技術を、<br className="lg:hidden" />もっと多くのお客様に<br className="lg:hidden" />届けませんか。
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-4 lg:shrink-0">
          <a href="#contact-form" className={`${BTN} ${BTN_BLACK} lg:min-w-[230px] xl:min-w-[280px]`}>
            掲載について相談する
            <Arrow />
          </a>
          {CONTRACTORS_PUBLIC && (
            <a href="/contractors" className={`${BTN} border-[#111] bg-transparent text-[#111] hover:bg-white lg:min-w-[230px] xl:min-w-[280px]`}>
              パートナーズサイトを見る
              <Arrow />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
