import { trackLineClick } from "../../lib/analytics";
import { buildLineCtaHref } from "../../lib/line";
import { ArrowIcon, LineIcon } from "../icons";

/**
 * 工事会社が親方ドットコムへ掲載を相談するための導線(親方ドットコム共通のLINE)。
 * 個別企業ページ内の、一般のお客様向け「この会社に問い合わせる」とは別物。
 */
export default function ListingConsult() {
  return (
    <section className="bg-[#1a1a1a] py-14 lg:py-20">
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div>
          <p className="flex items-center gap-3 mb-3 text-[#FFD000] font-bold text-[15px]">
            <span className="block w-8 h-[3px] bg-[#FFD000]" />
            掲載希望の工事会社様へ
          </p>
          <h2 className="text-white font-black leading-[1.4] text-[24px] lg:text-[34px]">
            <span className="inline-block">あなたの会社も、</span>
            <span className="inline-block">親方ドットコムの</span>
            <span className="inline-block">パートナーに。</span>
          </h2>
        </div>
        <a
          href={buildLineCtaHref()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackLineClick}
          className="mt-7 lg:mt-0 inline-flex items-center justify-center gap-3 h-[64px] lg:h-[68px] px-6 lg:px-8 bg-[#FFD000] text-[#1a1a1a] font-black text-[16px] sm:text-[18px] no-underline hover:brightness-95 transition-all w-full lg:w-auto whitespace-nowrap shrink-0"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0">
            <LineIcon className="w-[18px] h-[18px]" />
          </span>
          パートナー掲載について問い合わせる
          <ArrowIcon className="hidden sm:block w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
