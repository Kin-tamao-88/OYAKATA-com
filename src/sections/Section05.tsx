import type { ReactNode } from "react";
import logoHexMark from "../assets/images/OC05/logo-hex-mark.webp";
import heroPc from "../assets/images/OC05/hero-pc.webp";
import heroSp from "../assets/images/OC05/hero-sp.webp";
import bandPc from "../assets/images/OC05/band-pc.webp";
import bandSp from "../assets/images/OC05/band-sp.webp";
import brushYellow from "../assets/images/ui/brush-yellow.webp";

/* ── 小さなヘルパー ── */
function Hl({ children }: { children: ReactNode }) {
  return <span className="font-bold bg-[linear-gradient(transparent_62%,#FFCC00_62%)]">{children}</span>;
}

/** 文節単位で改行させるためのかたまり */
function Ph({ children }: { children: ReactNode }) {
  return <span className="inline-block">{children}</span>;
}

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

const IconCoins = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
    <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
  </Svg>
);

const IconWindow = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M7 13h6M7 16h4" />
  </Svg>
);

const IconPage = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h3M8 16h3" />
    <rect x="13" y="12" width="3" height="5" />
  </Svg>
);

const IconTarget = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    <path d="M12 12 20 4M16 4h4v4" />
  </Svg>
);

const IconChart = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="M18 17V9M13 17V5M8 17v-3" />
  </Svg>
);

const IconUsers = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

/* ── データ ── */
const cases = [
  {
    num: "01",
    label: (
      <>
        <Ph>広告運用を依頼した</Ph><br className="lg:hidden" />
        <Ph>経営者の声</Ph>
      </>
    ),
    title: (
      <>
        <Ph>「広告費を30万円使っても</Ph>
        <Ph><Hl>売り上げに繋がらなかった。</Hl>」</Ph>
      </>
    ),
    body: <><Ph>反響が獲れるだろうと思い、言われた通り</Ph><Ph>広告費を出していたけど、気付けば30万円</Ph><Ph>使っても売り上げに繋がらなかった。</Ph></>,
  },
  {
    num: "02",
    label: (
      <>
        <Ph>ホームページ制作を依頼した</Ph><br className="lg:hidden" />
        <Ph>経営者の声</Ph>
      </>
    ),
    title: (
      <>
        <Ph>「1か月で結果が出せると</Ph>
        <Ph>言われたが、</Ph>
        <Ph>納期に</Ph>
        <Ph><Hl>3カ月以上も待たされた。</Hl>」</Ph>
      </>
    ),
    body: <><Ph>1か月で結果が出ると言われたが、</Ph><Ph>制作だけで3カ月以上も</Ph><Ph>待たされて結局解約した。</Ph></>,
  },
];

const others = [
  {
    num: "03",
    icon: <IconCoins className="w-12 h-12 lg:w-[52px] lg:h-[52px]" />,
    title: (
      <>
        <Ph>お金を支払ってからは</Ph>
        <Ph>聞いていた話とまったく違い</Ph>
        <Ph><Hl>サポートに不満</Hl>を感じた。</Ph>
      </>
    ),
  },
  {
    num: "04",
    icon: <IconWindow className="w-12 h-12 lg:w-[52px] lg:h-[52px]" />,
    title: (
      <>
        <Ph>ホームページを作って</Ph>
        <Ph>くれたが、素人目でも</Ph>
        <Ph><Hl>クオリティが低い</Hl>と感じた。</Ph>
      </>
    ),
  },
  {
    num: "05",
    icon: <IconPage className="w-12 h-12 lg:w-[52px] lg:h-[52px]" />,
    title: (
      <>
        <Ph>使いまわしのデザインで</Ph>
        <Ph><Hl>オリジナリティが無く</Hl>、</Ph>
        <Ph>強みを出せてない</Ph>
        <Ph>集客ページを納品された。</Ph>
      </>
    ),
  },
];

const strengths = [
  {
    icon: <IconTarget className="w-12 h-12" />,
    label: "市場・競合の分析",
    sub: (
      <>
        <Ph>エリアや工事種別ごとの</Ph>
        <Ph>需要を分析</Ph>
      </>
    ),
  },
  {
    icon: <IconWindow className="w-12 h-12" />,
    label: (
      <>
        <Ph>成果につながる</Ph>
        <Ph>ホームページ制作</Ph>
      </>
    ),
    sub: (
      <>
        <Ph>問い合わせを獲得する</Ph>
        <Ph>設計・デザイン</Ph>
      </>
    ),
  },
  {
    icon: <IconChart className="w-12 h-12" />,
    label: "広告運用・改善",
    sub: (
      <>
        <Ph>データに基づく</Ph>
        <Ph>継続的な改善</Ph>
      </>
    ),
  },
  {
    icon: <IconUsers className="w-12 h-12" />,
    label: "実績に基づく継続サポート",
    sub: (
      <>
        <Ph>運用後も伴走し、</Ph>
        <Ph>成果の最大化を支援</Ph>
      </>
    ),
  },
];

/* ── 吹き出し + 78%ドーナツ(78%は仮置き。公開前に根拠確認) ── */
function StatBlock({ className }: { className?: string }) {
  return (
    <div className={`flex items-end ${className ?? ""}`}>
      <div className="relative z-10 bg-[#0F1D33] text-white font-bold rounded-2xl px-3.5 py-4 lg:px-6 lg:py-5 w-[222px] lg:w-[290px] text-[15px] lg:text-[17px] leading-[1.6]">
        広告を頼んでみたけど<br />
        思った成果が出なかった<br />
        ご経験があるオーナーは…
      </div>
      <div className="relative -ml-6 lg:-ml-8 shrink-0 w-[146px] lg:w-[220px] aspect-square rounded-full bg-white p-[6px] lg:p-2">
        <svg viewBox="0 0 100 100" className="absolute inset-[6px] lg:inset-2 w-[calc(100%-12px)] lg:w-[calc(100%-16px)] h-[calc(100%-12px)] lg:h-[calc(100%-16px)] -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#D9D9D9" strokeWidth="20" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FFCC00" strokeWidth="20" pathLength="100" strokeDasharray="78 22" />
        </svg>
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="w-[68%] aspect-square rounded-full bg-white flex flex-col items-center justify-center">
            <span className="text-[#171717] font-bold text-[14px] lg:text-[17px] leading-none">なんと</span>
            <span className="text-[#171717] font-black leading-none text-[40px] lg:text-[58px] mt-1">
              78<span className="text-[22px] lg:text-[32px]">%</span>
            </span>
            <span className="text-[#171717] font-bold text-[13px] lg:text-[14px] leading-none mt-1.5">当社調べ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section05() {
  return (
    <section className="bg-white overflow-hidden">

      {/* ══ ヒーロー ══ */}
      <div className="relative">
        {/* PC背景写真 */}
        <div className="hidden lg:block absolute right-[60px] top-0 w-[80%] max-w-[1280px]">
          <img src={heroPc} alt="" aria-hidden="true" className="block w-full h-auto" />
          <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white from-10% via-white/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-white to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-white to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-white to-transparent" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-5 lg:px-[68px] pt-10 lg:pt-[56px] lg:pb-[60px]">
          <div className="lg:w-[56%]">
            {/* 見出し行 */}
            <div className="flex items-center gap-3 lg:gap-4">
              <img src={logoHexMark} alt="" aria-hidden="true" className="h-[56px] lg:h-[72px] w-auto shrink-0" />
              <div className="shrink-0">
                <span className="block text-[#FFCC00] font-black leading-none text-[44px] lg:text-[60px]">05</span>
                <div className="w-9 h-[3px] bg-[#FFCC00] mt-1" />
              </div>
              <div className="flex-1 border-b border-[#171717] pl-3 lg:pl-4 pb-1 ml-1 border-l-0">
                <p className="text-[#171717] font-bold text-[15px] lg:text-[16px] leading-[1.5]">
                  <Ph>広告運用で後悔した</Ph><Ph>経験はありませんか？</Ph>
                </p>
              </div>
            </div>

            {/* H2 */}
            <h2 className="mt-8 lg:mt-10 text-[#171717] font-black leading-[1.35] text-[26px] lg:text-[42px] xl:text-[50px]">
              すでに広告運用を<br />
              導入したことがあり<br />
              <span className="relative isolate inline-block leading-[1.15] my-1 text-[34px] lg:text-[52px] xl:text-[64px]">
                <img src={brushYellow} alt="" aria-hidden="true" className="absolute -z-10 -left-[4%] top-[-0.23em] w-[108%] max-w-none h-[1.4em]" />
                後悔した経験
              </span>
              <br />
              ありませんか？
            </h2>

            {/* 本文 */}
            <p className="mt-6 lg:mt-8 lg:max-w-[540px] text-[#222] font-medium text-[15px] lg:text-[16px] leading-[1.9]">
              <Ph>実は親方ドットコムのお客様の</Ph><Ph>ほとんどが、</Ph>
              <Ph>過去に別の会社へ集客を</Ph><Ph>依頼したことがあるけど</Ph>
              <Ph><Hl>結果が伴わなかった</Hl></Ph><Ph>という経験をお持ちです。</Ph>
            </p>
          </div>

          {/* PC: 吹き出し + ドーナツ */}
          <StatBlock className="hidden lg:flex lg:absolute lg:right-[128px] lg:bottom-0 lg:-translate-y-[20px]" />
        </div>

        {/* SP: ノートPC写真 + 吹き出し + ドーナツ */}
        <div className="lg:hidden relative mt-6 h-[330px] overflow-hidden">
          <img src={heroSp} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-[50%_62%]" />
          <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-white to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-white to-transparent" />
          <StatBlock className="absolute left-5 bottom-3" />
        </div>
      </div>

      {/* ══ 失敗経験 ══ */}
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] pt-5 lg:pt-[56px]">
        <div className="hidden lg:flex items-center gap-5 lg:gap-8">
          <div className="flex-1 h-px bg-[#171717]" />
          <h3 className="text-[#171717] font-black text-center text-[26px] lg:text-[28px] leading-[1.4]">
            <Ph>こんなご経験は</Ph><Ph>ありませんか？</Ph>
          </h3>
          <div className="flex-1 h-px bg-[#171717]" />
        </div>

        {/* 事例 01 / 02 */}
        <div className="mt-0 lg:mt-10 grid auto-rows-fr gap-5 lg:grid-cols-2 lg:gap-8">
          {cases.map((c) => (
            <article key={c.num} className="relative bg-[#F3F5F8] rounded-lg px-3.5 py-6 lg:px-8 lg:py-8">
              <svg viewBox="0 0 48 36" fill="#D5DAE2" aria-hidden="true" className="absolute right-4 top-4 lg:right-7 lg:top-6 w-[38px] lg:w-[54px] rotate-180">
                <path d="M2 22C2 11 8 4 18 1l2 5c-5 2-7 5-7 9h8v21H2zM28 22c0-11 6-18 16-21l2 5c-5 2-7 5-7 9h8v21H28z" />
              </svg>
              <div className="flex items-center gap-3 pr-14 lg:pr-20">
                <span className="w-8 h-8 shrink-0 rounded-full bg-[#171717] text-white font-black text-[14px] flex items-center justify-center">{c.num}</span>
                <p className="text-[#555] font-bold text-[13px] lg:text-[14px] leading-[1.5]">{c.label}</p>
              </div>
              <h4 className="mt-5 text-[#171717] font-black text-[18px] lg:text-[22px] leading-[1.65]">{c.title}</h4>
              <p className="mt-4 lg:max-w-[22em] text-[#666] text-[14px] lg:text-[15px] leading-[1.85]">{c.body}</p>
            </article>
          ))}
        </div>

        {/* その他のお悩み */}
        <p className="mt-10 lg:mt-12 inline-block bg-[#0F1D33] text-white font-bold rounded-2xl lg:rounded-full px-5 lg:px-6 py-2.5 leading-[1.6] text-[15px] lg:text-[16px]">
          その他にも、<br className="lg:hidden" />こんなお悩みがありました…
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {others.map((o) => (
            <div key={o.num} className="flex gap-3 lg:gap-5 border border-[#DCE1E8] bg-white p-4 lg:px-5 lg:py-4">
              <div className="flex flex-col items-center gap-3 w-[48px] lg:w-[56px] shrink-0 text-[#171717]">
                <span className="w-8 h-8 rounded-full bg-[#171717] text-white font-black text-[14px] flex items-center justify-center">{o.num}</span>
                {o.icon}
              </div>
              <div>
                <h4 className="text-[#171717] font-bold text-[16px] lg:text-[17px] leading-[1.7]">{o.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ ダーク帯 ══ */}
      <div className="relative isolate mt-14 lg:mt-[72px] text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0B1626] [clip-path:polygon(0_24px,100%_0,100%_100%,0_100%)] lg:[clip-path:none]">
          <img src={bandSp} alt="" aria-hidden="true" className="lg:hidden absolute top-0 left-0 w-full h-[640px] object-cover object-[78%_center]" />
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#0B1626]/55 via-[#0B1626]/88 via-45% to-[#0B1626]" />
          <img src={bandPc} alt="" aria-hidden="true" className="hidden lg:block absolute inset-0 w-full h-full object-cover object-right" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0B1626] from-30% via-[#0B1626]/75 to-[#0B1626]/10" />
          <div className="lg:hidden absolute bottom-0 left-0 w-full h-10 bg-[#FFCC00] [clip-path:polygon(0_0,40%_100%,0_100%)]" />
        </div>
        <div className="lg:hidden absolute left-1/2 -top-[12px] -translate-x-1/2 w-0 h-0 border-x-[18px] border-x-transparent border-t-[18px] border-t-[#FFCC00]" aria-hidden="true" />

        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] pt-16 pb-16 lg:pt-[72px] lg:pb-[80px]">
          <p className="text-[#FFCC00] font-bold text-[15px] lg:text-[16px]">＼ だから私たちは、</p>
          <h2 className="mt-3 font-black leading-[1.35] max-lg:whitespace-nowrap text-[21px] lg:text-[42px] xl:text-[50px]">
            広告を「費用」ではなく<br />
            <span className="text-[#FFCC00]">「受注につながる投資」</span>にする。
          </h2>
          <p className="mt-6 lg:mt-8 text-white font-medium text-[15px] lg:text-[16px] leading-[1.9]">
            <Ph>親方ドットコムは、</Ph><Ph>工事会社の集客に特化し、</Ph><br className="hidden lg:block" />
            <span className="bg-[#1B2E4D]">
              <Ph>戦略設計から</Ph><Ph>制作・広告運用・改善まで</Ph><Ph>一貫して支援します。</Ph>
            </span>
          </p>

          {/* 4つの支援 */}
          <div className="mt-10 lg:mt-14 flex flex-col lg:grid lg:grid-cols-4 border-t border-white/25 lg:border-t-0">
            {strengths.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-5 py-5 border-b border-white/25 lg:border-b-0 lg:flex-col lg:text-center lg:gap-4 lg:py-2 lg:px-6 ${i > 0 ? "lg:border-l lg:border-white/25" : ""}`}
              >
                <span className="shrink-0 text-white">{s.icon}</span>
                <div>
                  <p className="font-bold text-[16px] lg:text-[17px] leading-[1.5]">{s.label}</p>
                  <p className="mt-1 text-[#D5DCE8] text-[14px] lg:text-[15px] leading-[1.7]">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            aria-label="無料診断フォームへ進む"
            className="mt-10 lg:mt-14 mx-auto flex items-center gap-3 lg:gap-5 bg-[#FFCC00] rounded-full no-underline text-[#171717] pl-3.5 pr-4 py-4 lg:pl-5 lg:pr-8 lg:py-5 w-full lg:w-[560px]"
          >
            <span className="flex items-center justify-center shrink-0 rounded-full bg-[#171717] text-white w-[44px] h-[44px] lg:w-[60px] lg:h-[60px]">
              <Svg className="w-6 h-6 lg:w-8 lg:h-8">
                <rect x="8" y="2" width="8" height="4" rx="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="m9 14 2 2 4-4" />
              </Svg>
            </span>
            <span className="flex-1 leading-[1.3]">
              <span className="block font-bold text-[14px] lg:text-[16px]">現在の広告運用について</span>
              <span className="block font-black text-[18px] lg:text-[28px]">無料診断フォームへ進む</span>
            </span>
            <span className="font-black text-[24px] lg:text-[28px] leading-none" aria-hidden="true">›</span>
          </a>
        </div>
      </div>
    </section>
  );
}
