import React from "react";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";
import paintDark from "../assets/images/ui/hero-paint-dark.webp";
import imgGenba from "../assets/images/OC08/better08-genba.webp";
import imgWakate from "../assets/images/OC08/better08-wakate.webp";

const voices = [
  {
    labelColor: "現場社員",
    labelIcon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2 Q12 2 12 6 Q12 8 10 9 L10 11 L6 11 L6 9 Q4 8 4 6 Q4 2 8 2 Z" stroke="white" strokeWidth="1.3" fill="none" />
        <line x1="6" y1="13" x2="10" y2="13" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    subTitle: "毎日の現場に、安心して集中できるように。",
    imageSrc: imgGenba,
    imageAlt: "現場社員",
    before: [
      "予定がコロコロ変わり、段取りが立てにくい",
      "材料や人の手配が直前になりがち",
      "社長が仕事探しで忙しく、相談しづらい",
    ],
    after: [
      "予定が安定し、段取りがしやすくなった",
      "材料や人の手配に余裕ができた",
      "現場に集中でき、品質の向上にもつながった",
    ],
    afterHighlight: -1,
    quoteNode: <>仕事の見通しが立つようになって、<br className="lg:hidden" />安心して仕事に集中出来ています。<br className="lg:hidden" /><br className="hidden lg:block" /><span className="hidden lg:inline">正直、</span>不安で転職を検討していた時期もあります。</>,
    attribution: "（塗装職人・30代）",
  },
  {
    labelColor: "若手社員",
    labelIcon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="5" r="3" stroke="white" strokeWidth="1.3" />
        <path d="M2 14 C2 10 4 9 8 9 C12 9 14 10 14 14" stroke="white" strokeWidth="1.3" fill="none" />
      </svg>
    ),
    subTitle: <>将来に希望が持てる会社で、<br className="lg:hidden" />自分も成長していきたい。</>,
    imageSrc: imgWakate,
    imageAlt: "若手社員",
    before: [
      "仕事が少なく、将来が不安だった",
      "頑張っても評価されにくかった",
      "ボーナスも思うように増えなかった",
    ],
    after: [
      "仕事が安定して将来に希望が持てる",
      "頑張りが評価され、収入もアップ",
      <>親方ドットコムを始めたと聞いてから、<br className="lg:hidden" />ボーナスも増えて嬉しいです。</>,
    ],
    afterHighlight: 2,
    quoteNode: <>会社の未来が明るくなって、自分の未来にも<br className="lg:hidden" /><span className="border-b-[2px] border-[#D4A820]">希望が持てる</span>ようになりました。<br className="lg:hidden" />ボーナスも増えて、もっと頑張りたいです！</>,
    attribution: "（設備工事スタッフ・20代）",
  },
];

function BeforeBox({ items }: { items: string[] }) {
  return (
    <div className="border border-[#1a1a1a]">
      <div className="bg-[#1a1a1a] px-4 py-2">
        <span className="text-white font-black text-[13px] tracking-wide">導入前</span>
      </div>
      <ul className="px-4 py-3 flex flex-col gap-2">
        {items.map((b, j) => (
          <li key={j} className="flex items-start gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-[4px]">
              <path d="M4 4 L12 12 M12 4 L4 12" stroke="#e33" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-[#333] text-[13px] lg:text-[14px] font-bold leading-[1.7]">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AfterBox({ items, highlight }: { items: React.ReactNode[]; highlight: number }) {
  return (
    <div className="border border-[#D4A820]">
      <div className="bg-[#D4A820] px-4 py-2">
        <span className="text-[#1a1a1a] font-black text-[13px] tracking-wide">導入後</span>
      </div>
      <ul className="bg-[#FFF8E7] px-4 py-3 flex flex-col gap-2">
        {items.map((a, j) => (
          <li key={j} className="flex items-start gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-[4px]">
              <path d="M3 8 L6.5 11.5 L13 5" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`text-[#1a1a1a] text-[13px] lg:text-[14px] font-bold leading-[1.7]${highlight === j ? " border-b-[2px] border-[#D4A820]" : ""}`}>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DoubleChevron = () => (
  <div className="flex justify-center py-1">
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
      <path d="M4 2 L11 7 L18 2" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 10 L11 15 L18 10" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function Section09() {
  return (
    <>
      <section className="bg-white pt-10 pb-12 lg:pt-[70px] lg:pb-[60px]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px]">

          {/* ── Header ── */}
          <div className="text-center mb-10 lg:mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
              <div>
                <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">08</span>
                <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
              </div>
              <div className="w-px h-10 bg-[#1a1a1a]" />
              <span className="text-[#1a1a1a] font-bold text-[16px] lg:text-[22px]">導入後の変化・現場の声</span>
            </div>
            <div className="h-[2px] bg-gradient-to-r from-[#D4A820] to-[#1a1a1a] mt-3 mb-5" />
            <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-5 text-[24px] lg:text-[50px]">
              会社が変わると、<br className="lg:hidden" />
              <span className="border-b-[4px] lg:border-b-[6px] border-[#D4A820] pb-[2px]">働く人も変わります。</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
                <rect x="4" y="1" width="6" height="9" rx="3" fill="#D4A820" />
                <path d="M1 9 C1 14 13 14 13 9" stroke="#D4A820" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <line x1="7" y1="14" x2="7" y2="17" stroke="#D4A820" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="4" y1="17" x2="10" y2="17" stroke="#D4A820" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-[#1a1a1a] font-bold text-[14px] lg:text-[16px]">親方ドットコムご利用企業様の社員さんにインタビューしました！</p>
            </div>
            <p className="text-[#555] text-[13px] lg:text-[14px]">元請け受注が安定すると、現場の働きやすさや、<br className="lg:hidden" />若手の未来にも変化が生まれます。</p>
          </div>

          {/* ── Cards ── */}
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            {voices.map((v, i) => (
              <div key={i} className="flex-1 border border-[#ddd] flex flex-col">

                {/* Photo */}
                <div className="h-[220px] lg:h-[280px] overflow-hidden">
                  <img src={v.imageSrc} alt={v.imageAlt} className="w-full h-full object-cover object-top" />
                </div>

                {/* Label + subtitle */}
                <div className="px-5 pt-5 pb-4 lg:px-6 border-b border-[#ddd]">
                  <div className="bg-[#1a1a1a] inline-flex items-center gap-2 px-3 py-2 mb-3">
                    {v.labelIcon}
                    <span className="text-white font-black text-[13px]">
                      <span className="text-[#D4A820]">{v.labelColor.slice(0, 2)}</span>{v.labelColor.slice(2)}の声
                    </span>
                  </div>
                  <p className="text-[#1a1a1a] font-bold text-[13px] lg:text-[14px] leading-[1.7] italic">{v.subTitle}</p>
                </div>

                {/* Before / After */}
                <div className="py-5 lg:px-6 flex flex-col gap-3 flex-1">
                  <BeforeBox items={v.before} />
                  <DoubleChevron />
                  <AfterBox items={v.after} highlight={v.afterHighlight} />
                </div>

                {/* Quote */}
                <div className="bg-[#f7f7f7] border-t border-[#ddd] px-5 py-4 lg:px-6">
                  <p className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px] leading-[1.9] mb-2">
                    {v.quoteNode}
                  </p>
                  <div className="flex items-center justify-end gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 22" fill="none" aria-hidden="true">
                      <path d="M3 1 H21 Q23 1 23 3 V13 Q23 15 21 15 H13 L8 21 V15 H3 Q1 15 1 13 V3 Q1 1 3 1 Z" fill="#D4A820" fillOpacity="0.15" stroke="#D4A820" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[#888] text-[12px]">{v.attribution}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Bottom Bar ── */}
      <div className="bg-[#1a1a1a] max-w-[1280px] mx-auto">
        {/* SP */}
        <div className="lg:hidden relative overflow-hidden -mx-0 px-5 py-5 text-center">
          <img src={paintDark} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-x-[1.4] pointer-events-none" />
          <p className="relative z-10 text-white font-black text-[14px] leading-[2]">
            2000社を超える支援実績で<br />あなたの会社に<span className="text-[#D4A820]">"何が必要か"</span>ご提案します！
          </p>
        </div>
        {/* PC */}
        <div className="hidden lg:flex items-stretch relative overflow-hidden border-t-2 border-t-[#D4A820] min-h-[108px]">
          <img src={paintDark} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-x-[1.4] pointer-events-none" />
          <div className="flex-1 py-7" />
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <p className="text-white font-black text-[18px] leading-[2] text-center">
              2000社を超える支援実績で、あなたの会社に<span className="text-[#D4A820]">"何が必要か"</span>ご提案します！
            </p>
          </div>
          <a
            href="#contact"
            aria-label="無料相談はこちら"
            className="relative z-10 shrink-0 flex flex-col items-center justify-center no-underline gap-[10px] px-12"
          >
            <div className="relative">
              <div style={{ backgroundColor: "#252525", color: "#fff", fontSize: "11px", fontWeight: 500, padding: "4px 14px", borderRadius: "4px", whiteSpace: "nowrap", lineHeight: 1.4 }}>
                無料相談はカンタン&thinsp;<span style={{ color: "#D4A820", fontSize: "14px", fontWeight: 900 }}>1分</span>&thinsp;で入力完了
              </div>
              <div className="absolute left-1/2" style={{ bottom: "-7px", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #252525" }} />
            </div>
            <div className="flex items-center" style={{ gap: "10px", borderRadius: "6px", padding: "11px 22px", whiteSpace: "nowrap", border: "2px solid #D4A820" }}>
              <svg width="18" height="14" viewBox="0 0 28 22" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="25" height="19" rx="2.5" stroke="#fff" strokeWidth="2.2" fill="none" />
                <polyline points="1.5,4.5 14,13.5 26.5,4.5" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="font-black text-white" style={{ fontSize: "15px" }}>無料相談はこちら</span>
              <span className="font-black text-white" style={{ fontSize: "13px" }}>›</span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
