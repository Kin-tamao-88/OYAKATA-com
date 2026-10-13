import consultImage from "../../assets/images/OC09/oc09-consal.webp";
import { trackLineClick } from "../../lib/analytics";
import { buildLineCtaHref } from "../../lib/line";
import { COMPANIES, getCategoryLabel } from "../data";
import { getCompanyDetail } from "../companyDetails";
import { ArrowIcon, CheckIcon } from "../icons";

const POINTS = [
  "自社の強みや施工実績を、写真とともに紹介",
  "地域や工事内容から探すお客様に、情報が届く",
  "企業ごとの紹介ページで、技術力と専門性を発信",
];

export default function ListingCta() {
  return (
    <section id="listing" className="scroll-mt-[72px] lg:scroll-mt-[90px] relative bg-[#f4f1ea]">
      {/* 上端のウェーブ装飾 */}
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="block w-full h-[24px] lg:h-[48px]"
      >
        <path d="M0 24C180 4 360 4 540 22s360 26 540 8 270-18 360-10V48H0Z" fill="#FFD000" />
        <path d="M0 34C180 14 360 14 540 32s360 16 540-2 270-12 360-4V48H0Z" fill="#1a1a1a" />
      </svg>

      <div className="bg-[#1a1a1a] pb-16 lg:pb-28">
        <div className="max-w-[1240px] mx-auto px-5 lg:px-10 pt-6 lg:pt-12 lg:grid lg:grid-cols-[1fr_480px] lg:gap-20 lg:items-center">
          <div>
            <p className="flex items-center gap-3 mb-5 text-[#FFD000] font-bold text-[15px] lg:text-[16px]">
              <span className="block w-8 h-[3px] bg-[#FFD000]" />
              掲載希望の工事会社様へ
            </p>
            <h2 className="text-white font-black leading-[1.4] text-[28px] min-[400px]:text-[30px] lg:text-[40px] text-balance">
              <span className="inline-block">あなたの会社も、</span>
              <span className="inline-block">親方ドットコムの</span>
              <span className="inline-block">パートナーに。</span>
            </h2>

            <div className="mt-7 lg:mt-9 text-[#e8e4da] text-[16px] lg:text-[18px] leading-[2] space-y-4">
              <p className="text-pretty [word-break:auto-phrase]">
                技術力や専門性、地域で培ってきた実績を、もっと多くのお客様へ。親方ドットコムでは、工事会社の魅力を伝えるパートナー企業紹介を行っています。
              </p>
            </div>

            <ul className="mt-8 lg:mt-10 border-t border-[#444]">
              {POINTS.map((text) => (
                <li key={text} className="flex items-start gap-3 py-3 border-b border-[#444] text-white text-[16px] font-bold leading-[1.7]">
                  <CheckIcon className="w-6 h-6 mt-[2px] shrink-0 text-[#FFD000]" />
                  <span className="text-pretty [word-break:auto-phrase]">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 lg:mt-12 flex flex-col gap-4 lg:max-w-[460px]">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 h-[64px] lg:h-[68px] px-4 sm:px-6 bg-[#FFD000] whitespace-nowrap text-[#1a1a1a] font-black text-[16px] sm:text-[18px] lg:text-[19px] no-underline hover:brightness-95 transition-all"
              >
                パートナー掲載について問い合わせる
                <ArrowIcon className="hidden sm:block w-6 h-6" />
              </a>
              <a
                href={buildLineCtaHref()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLineClick}
                className="inline-flex items-center justify-center h-[64px] lg:h-[68px] px-8 border-2 border-white text-white font-bold text-[16px] lg:text-[17px] no-underline hover:bg-white hover:text-[#1a1a1a] transition-colors"
              >
                LINEで問い合わせる
              </a>
            </div>
          </div>

          <div className="relative mt-12 lg:mt-0 ml-4 mr-0 lg:mx-0">
            <span className="absolute -left-4 -bottom-4 lg:-left-6 lg:-bottom-6 w-full h-full border-[3px] border-[#FFD000]" />
            <img
              src={consultImage}
              alt="ノートパソコンと資料を前に、集客の施策を検討する様子"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="relative w-full aspect-[4/3] lg:aspect-[4/5] object-cover object-[60%_50%]"
            />
          </div>
        </div>

        <DemoPages />
      </div>
    </section>
  );
}

/** 掲載後の企業紹介ページのイメージ。営業時に業種別のデモページへすぐ移動できる。 */
function DemoPages() {
  const demos = COMPANIES.filter((c) => getCompanyDetail(c.slug));
  if (demos.length === 0) return null;

  return (
    <div className="max-w-[1240px] mx-auto px-5 lg:px-10 mt-16 lg:mt-24">
      <div className="border-t border-[#444] pt-10 lg:pt-14">
        <p className="flex items-center gap-3 mb-3 text-[#FFD000] font-bold text-[15px] lg:text-[16px]">
          <span className="block w-8 h-[3px] bg-[#FFD000]" />
          掲載ページのイメージ
        </p>
        <h3 className="text-white font-black leading-[1.4] text-[22px] lg:text-[32px]">
          掲載後は、このような企業紹介ページになります。
        </h3>
        <p className="mt-3 text-[#e8e4da] text-[16px] leading-[1.9]">業種ごとの紹介ページ例をご覧いただけます。</p>

        <ul className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {demos.slice(0, 4).map((c) => (
            <li key={c.slug}>
              <a
                href={`/contractors/${c.slug}`}
                className="group block no-underline bg-white border border-[#444] hover:border-[#FFD000] transition-colors"
              >
                <img
                  src={c.image}
                  alt={c.imageAlt}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="block w-full aspect-[3/2] object-cover"
                />
                <span className="flex items-center justify-between gap-2 px-3 py-3 lg:px-4 lg:py-4 bg-[#1a1a1a]">
                  <span className="min-w-0">
                    <span className="block text-white font-black text-[16px] lg:text-[18px] leading-[1.4]">{c.name}</span>
                    <span className="block mt-0.5 text-[#cfcabd] text-[14px] leading-[1.5]">
                      {c.categories.map(getCategoryLabel).join("・")}
                    </span>
                  </span>
                  <ArrowIcon className="w-5 h-5 shrink-0 text-[#FFD000] group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
