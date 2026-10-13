import type { CompanyFilter } from "../data";
import { CircleScene, MapPin, NeighborhoodScene, YellowBlob, BrushMarker } from "../art";
import { FV_BACKGROUND_PHOTO, FV_CIRCLES, FV_MAP } from "../fvAssets";
import { ArrowIcon, SearchIcon } from "../icons";
import FilterSelects from "./FilterSelects";

type Props = {
  filter: CompanyFilter;
  onFilterChange: (next: CompanyFilter) => void;
  onSearch: () => void;
};

const HAND_FONT = "font-['Klee_One',sans-serif] font-semibold";

function CircleImage({ index, className }: { index: 0 | 1 | 2; className: string }) {
  const slot = FV_CIRCLES[index];
  return (
    <div className={`absolute rounded-full overflow-hidden border-[6px] border-white bg-white shadow-[0_6px_18px_rgba(0,0,0,0.18)] ${className}`}>
      {slot.src ? (
        <img src={slot.src} alt={slot.alt} width={800} height={800} loading="lazy" className="w-full h-full object-cover" />
      ) : (
        <CircleScene index={index} className="w-full h-full" />
      )}
    </div>
  );
}

export default function Hero({ filter, onFilterChange, onSearch }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#faf8f4]">
      {/* 手書き風見出し用フォント(React 19 のスタイルシート巻き上げ) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Klee+One:wght@600&display=swap"
        precedence="default"
      />

      {/* 背景：住宅街(写真が用意できるまではSVGの仮ビジュアル) */}
      <div className="absolute inset-0">
        {FV_BACKGROUND_PHOTO ? (
          <img src={FV_BACKGROUND_PHOTO} alt="" width={2103} height={748} fetchPriority="high" className="w-full h-full object-cover object-[62%_60%]" />
        ) : (
          <NeighborhoodScene className="w-full h-full" />
        )}
        {/* コピーを読ませるための白系グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/15 lg:bg-gradient-to-r lg:from-white/85 lg:via-white/40 lg:to-white/0" />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-5 lg:px-10 pb-[72px] lg:pb-0 lg:min-h-[720px]">
        {/* パンくず */}
        <nav aria-label="パンくずリスト" className="pt-4 lg:pt-5">
          <ol className="inline-flex items-center gap-2 bg-white/80 px-3 py-1 text-[14px] text-[#555]">
            <li>
              <a href="/" className="text-[#555] underline underline-offset-2 hover:text-[#1a1a1a]">
                親方ドットコム
              </a>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="font-bold text-[#1a1a1a]">
              パートナーズ
            </li>
          </ol>
        </nav>

        {/* 左：コピー */}
        <div className="relative z-10 pt-6 lg:pt-10 lg:max-w-[760px]">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 lg:mb-4 text-[#444] lg:text-[#1a1a1a] font-semibold lg:font-bold text-[13px] lg:text-[15px]">
            <span className="block w-6 h-[3px] bg-[#FFD000]" />
            親方ドットコム パートナーズ
            <span className="hidden sm:inline font-semibold tracking-[0.14em] text-[#555] text-[13px]">OYAKATA.COM PARTNERS</span>
          </p>
          <p className={`${HAND_FONT} mt-1 lg:mt-0 -rotate-3 origin-left text-[#1a1a1a] leading-[1.6] text-[17px] lg:text-[26px]`}>
            <span className="block">地元で見つかる、</span>
            <span className="inline-block border-b-[3px] border-[#FFD000]">信頼できる工事会社。</span>
          </p>

          <h1 className="isolate mt-7 lg:mt-7 text-[#1a1a1a] font-black leading-[1.2] tracking-tight text-[clamp(32px,9.6vw,44px)] lg:text-[clamp(52px,5.4vw,84px)]">
            <span className="block whitespace-nowrap">あなたの街の</span>
            <span className="block whitespace-nowrap">
              <span className="relative inline-block">
                <BrushMarker className="absolute -z-10 left-[-2%] w-[104%] bottom-[-0.04em] h-[0.46em]" />
                工事屋さん
              </span>
              を探す。
            </span>
          </h1>

          <p className="mt-5 lg:mt-8 text-[#1a1a1a] text-[16px] lg:text-[18px] leading-[1.9] font-medium text-balance [word-break:auto-phrase] lg:text-left">
            外壁塗装・リフォーム・水道・電気・外構など
            <br className="hidden lg:block" />
            地域で活躍する工事会社を、エリアや工事内容から
            <br className="hidden lg:block" />
            探せるポータルサイトです。
          </p>
        </div>

        {/* SP〜タブレット：円形施工写真を1点だけ控えめに配置 */}
        <CircleImage index={0} className="xl:hidden right-5 lg:right-10 top-[112px] w-[92px] lg:w-[140px] aspect-square" />

        {/* 右：地図・ピン・円形施工写真(PC大画面のみ。位置はすべて地図コンテナ基準の%) */}
        <div className="hidden xl:block absolute right-10 top-[6px] w-[clamp(500px,44vw,680px)] aspect-square">
          <img src={FV_MAP} alt="" width={1000} height={1000} className="absolute inset-0 w-full h-full [filter:brightness(1.08)_drop-shadow(0_0_1.5px_rgba(70,70,70,0.85))_drop-shadow(0_8px_12px_rgba(0,0,0,0.25))]" />
          <CircleImage index={0} className="left-[53%] top-[5%] w-[30%] aspect-square" />
          <CircleImage index={1} className="left-[33%] top-[47%] w-[27%] aspect-square" />
          <CircleImage index={2} className="left-[72.5%] top-[38%] w-[23%] aspect-square" />
          <MapPin className="absolute left-[62%] top-[41%] w-[34px] h-[46px] -translate-x-1/2 -translate-y-full" />
          <MapPin className="absolute left-[90%] top-[22%] w-[26px] h-[35px] -translate-x-1/2 -translate-y-full" />
          <MapPin className="absolute left-[66%] top-[68%] w-[30px] h-[40px] -translate-x-1/2 -translate-y-full" />
          <MapPin className="absolute left-[30%] top-[78%] w-[24px] h-[32px] -translate-x-1/2 -translate-y-full" />
          <YellowBlob className="absolute left-[28%] top-[2%] w-[190px] h-[130px] -rotate-[12deg]">
            <p className={`${HAND_FONT} text-[#1a1a1a] text-[16px] leading-[1.45]`}>
              地元の
              <br />
              頼れる工事会社が
              <br />
              見つかる！
            </p>
          </YellowBlob>
          <YellowBlob className="absolute left-[72%] top-[63%] w-[150px] h-[130px] -rotate-[10deg]">
            <p className={`${HAND_FONT} text-[#1a1a1a] text-[15px] leading-[1.5]`}>
              住まいの
              <br />
              困りごとを
              <br />
              地域のプロに。
            </p>
          </YellowBlob>
        </div>

        {/* 検索フォーム：FV下部に重ねて配置 */}
        <form
          role="search"
          aria-label="工事会社を探す"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="relative z-20 mt-8 lg:mt-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-[44px] lg:w-[min(1040px,calc(100%-80px))] bg-white border border-[#e6e2d8] rounded-xl p-4 lg:p-5"
        >
          <div className="grid gap-3 lg:grid-cols-[1fr_1fr_300px] lg:gap-4">
            <FilterSelects filter={filter} onChange={onFilterChange} idPrefix="hero" variant="bar" />
            <button
              type="submit"
              className="h-[60px] w-full bg-[#FFD000] text-[#1a1a1a] font-black text-[18px] rounded-lg flex items-center justify-center gap-3 hover:brightness-95 transition-all"
            >
              <SearchIcon className="w-6 h-6" />
              工事会社を探す
              <ArrowIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* FV下端：白い次セクションへ緩やかな曲線 */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute left-0 bottom-[-1px] w-full h-[28px] lg:h-[56px]"
      >
        <path d="M0 0C240 24 480 30 720 30S1200 24 1440 0V60H0Z" fill="#faf8f4" />
      </svg>
    </section>
  );
}
