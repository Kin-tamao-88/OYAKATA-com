import { useCallback, useState } from "react";
import { getCategoryLabel } from "../data";
import type { Company } from "../data";
import type { CompanyDetail } from "../companyDetails";
import type { CompanyTheme } from "../companyTheme";
import ImageLightbox from "../ImageLightbox";
import { ArrowIcon, PinIcon } from "../icons";
import PartnerBadge from "../PartnerBadge";

type Props = {
  company: Company;
  detail: CompanyDetail;
  theme: CompanyTheme;
  /** 問い合わせ手段が1つ以上登録されているか */
  hasContact: boolean;
};

function ZoomIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5M11 8.5v5M8.5 11h5" />
    </svg>
  );
}

function Breadcrumb({ company }: { company: Company }) {
  return (
    <nav aria-label="パンくずリスト" className="pt-4 lg:pt-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-[#555]">
        <li>
          <a href="/" className="text-[#555] underline underline-offset-2 hover:text-[#1a1a1a]">
            親方ドットコム
          </a>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <a href="/contractors" className="text-[#555] underline underline-offset-2 hover:text-[#1a1a1a]">
            パートナーズ
          </a>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page" className="font-bold text-[#1a1a1a]">
          {company.name}
        </li>
      </ol>
    </nav>
  );
}

/** 企業名・キャッチ・対応工事・問い合わせボタン(ファーストビューの文字情報) */
function HeroText({ company, detail, theme, hasContact }: Props) {
  return (
    <div className="flex flex-col">
      <PartnerBadge className="self-start" />

      <p className="mt-6 flex items-center gap-2 text-[#1a1a1a] font-bold text-[16px]">
        <PinIcon className="w-5 h-5 shrink-0" />
        {company.location}
      </p>

      <h1 className="mt-3 text-[#1a1a1a] font-black leading-[1.2] tracking-tight text-[32px] min-[400px]:text-[36px] lg:text-[clamp(34px,3.5vw,56px)] [word-break:keep-all]">
        {company.name}
      </h1>

      <p className={`mt-5 pl-4 border-l-[5px] ${theme.accentBorder} text-[#1a1a1a] font-bold leading-[1.65] text-[18px] lg:text-[22px] text-balance [word-break:auto-phrase]`}>
        {detail.tagline}
      </p>

      <dl className="mt-7 text-[16px] leading-[1.8]">
        <dt className="font-bold text-[#555] text-[14px]">対応工事</dt>
        <dd className="font-bold text-[#1a1a1a]">
          {company.categories.map((id, i) => (
            <span key={id} className="inline-block whitespace-nowrap">
              {i > 0 && <span className="mx-2 text-[#8a867c]">／</span>}
              {getCategoryLabel(id)}
            </span>
          ))}
        </dd>
      </dl>

      {hasContact && (
        <div className="mt-8">
          <a
            href="#contact"
            className={`inline-flex items-center justify-center gap-3 h-[64px] px-8 ${theme.heroButton} font-black text-[18px] no-underline hover:brightness-95 transition-all w-full sm:w-auto`}
          >
            この会社に問い合わせる
            <ArrowIcon className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function CompanyHero(props: Props) {
  const { company, detail, theme } = props;
  const photo = detail.heroPhoto;
  const [zoomed, setZoomed] = useState(false);
  const close = useCallback(() => setZoomed(false), []);

  /* ── ファーストビューが企業ページのデザイン画像(mockup)の場合：画像全体を大きく見せる ── */
  if (detail.heroKind === "mockup") {
    return (
      <section className={`relative ${theme.warmBg} overflow-hidden`}>
        <div className="max-w-[1340px] mx-auto px-5 lg:px-10">
          <Breadcrumb company={company} />

          <div className="py-8 lg:py-14 lg:grid lg:grid-cols-[minmax(0,4.4fr)_minmax(0,7fr)] lg:gap-12 lg:items-center">
            <HeroText {...props} />

            <div className="relative mt-10 lg:mt-0">
              <span className={`absolute -right-3 -bottom-3 lg:-right-5 lg:-bottom-5 w-[70%] h-[70%] ${theme.frameBlock}`} />
              <button
                type="button"
                onClick={() => setZoomed(true)}
                aria-label={`${company.name}の紹介ページのイメージを拡大して見る`}
                className="group relative block w-full text-left bg-white border border-[#d8d4ca]"
              >
                <span className="flex items-center gap-2 h-8 lg:h-9 px-4 bg-[#2a2a2a]">
                  <span className="block w-2.5 h-2.5 rounded-full bg-[#777]" />
                  <span className="block w-2.5 h-2.5 rounded-full bg-[#777]" />
                  <span className="block w-2.5 h-2.5 rounded-full bg-[#777]" />
                </span>
                <span className="relative block">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    fetchPriority="high"
                    className="block w-full h-auto"
                  />
                  <span className="absolute right-3 bottom-3 flex items-center gap-1.5 bg-[#1a1a1a] text-white font-bold text-[13px] px-3 py-2 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 transition-opacity">
                    <ZoomIcon />
                    拡大して見る
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
        {zoomed && <ImageLightbox photo={photo} label={`${company.name} 紹介ページのイメージ`} onClose={close} />}
      </section>
    );
  }

  /* ── 施工写真をファーストビューにする場合 ── */
  return (
    <section className={`relative ${theme.warmBg} overflow-hidden`}>
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[54vw]">
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
          className="w-full h-full object-cover object-[60%_50%]"
        />
        <span className={`absolute left-0 bottom-0 w-[18px] h-[42%] ${theme.accentBg}`} />
      </div>

      <div className="relative max-w-[1340px] mx-auto px-5 lg:px-10">
        <Breadcrumb company={company} />
        <div className="lg:min-h-[600px] lg:w-[44%] flex flex-col justify-center py-8 lg:py-14">
          <HeroText {...props} />
        </div>
      </div>

      <div className="lg:hidden relative">
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
          className="w-full aspect-[4/3] object-cover object-[62%_50%]"
        />
        <span className={`absolute left-0 bottom-0 w-[10px] h-[40%] ${theme.accentBg}`} />
      </div>
    </section>
  );
}
