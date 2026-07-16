import brushYellow from "../assets/images/ui/brush-yellow.webp";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";

const voices = [
  {
    label: "現場社員の声",
    labelColor: "現場社員",
    labelIcon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2 Q12 2 12 6 Q12 8 10 9 L10 11 L6 11 L6 9 Q4 8 4 6 Q4 2 8 2 Z" stroke="white" strokeWidth="1.3" fill="none" />
        <line x1="6" y1="13" x2="10" y2="13" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    subTitle: "毎日の現場に、安心して集中できるように。",
    imageSrc: "/images/voice-field.jpg",
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
    quote: "仕事の見通しが立つようになって、",
    quoteUnderline: "毎日安心して現場に向かえる",
    quoteEnd: "ようになりました。",
    attribution: "（塗装職人・30代）",
  },
  {
    label: "若手社員の声",
    labelColor: "若手社員",
    labelIcon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="5" r="3" stroke="white" strokeWidth="1.3" />
        <path d="M2 14 C2 10 4 9 8 9 C12 9 14 10 14 14" stroke="white" strokeWidth="1.3" fill="none" />
      </svg>
    ),
    subTitle: "将来に希望が持てる会社で、自分も成長していきたい。",
    imageSrc: "/images/voice-young.jpg",
    imageAlt: "若手社員",
    before: [
      "仕事が少なく、将来が不安だった",
      "頑張っても評価されにくかった",
      "ボーナスも思うように増えなかった",
    ],
    after: [
      "仕事が安定して将来に希望が持てる",
      "頑張りが評価され、収入もアップ",
      "親方ドットコムを始めたと聞いてから、ボーナスも増えて嬉しいです。",
    ],
    afterHighlight: 2,
    quote: "会社の未来が明るくなって、自分の未来にも",
    quoteUnderline: "希望が持てる",
    quoteEnd: "ようになりました。ボーナスも増えて、もっと頑張りたいです！",
    attribution: "（設備工事スタッフ・20代）",
  },
];

export default function Section09() {
  return (
    <>
      <section className="bg-white pt-14 pb-12 lg:pt-[70px] lg:pb-[60px] relative overflow-hidden">
        <img src={brushYellow} alt="" aria-hidden="true" className="absolute top-0 left-0 pointer-events-none opacity-20 hidden lg:block" style={{ width: "240px", filter: "brightness(0)" }} />
        <img src={brushYellow} alt="" aria-hidden="true" className="absolute top-0 right-0 pointer-events-none opacity-70" style={{ width: "220px" }} />

        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] relative">

          {/* ── Header ── */}
          <div className="text-center mb-10 lg:mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
              <div>
                <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">08</span>
                <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
              </div>
              <div className="w-px h-10 bg-[#1a1a1a]" />
              <span className="text-[#1a1a1a] font-bold text-[14px] lg:text-[16px]">導入後の変化・現場の声</span>
            </div>
            <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-5 text-[28px] lg:text-[50px]">
              会社が変わると、<br className="lg:hidden" />
              <span style={{ backgroundColor: "#D4A820", padding: "0 6px" }}>働く人も変わります。</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7" stroke="#D4A820" strokeWidth="1.5" />
                <circle cx="9" cy="9" r="2.5" fill="#D4A820" />
              </svg>
              <p className="text-[#1a1a1a] font-bold text-[14px] lg:text-[16px]">親方ドットコムご利用企業様の社員さんにインタビューしました！</p>
            </div>
            <p className="text-[#555] text-[13px] lg:text-[14px]">元請け受注が安定すると、現場の働きやすさや、若手の未来にも変化が生まれます。</p>
          </div>

          {/* ── Voice columns: SP stacked / PC side-by-side ── */}
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            {voices.map((v, i) => (
              <div key={i} className="flex-1">

                {/* Label */}
                <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 mb-4 self-start inline-flex">
                  {v.labelIcon}
                  <span className="text-white font-black text-[13px]">
                    <span className="text-[#D4A820]">{v.labelColor.slice(0, 2)}</span>{v.labelColor.slice(2)}の声
                  </span>
                </div>

                <p className="text-[#1a1a1a] font-bold text-[13px] mb-5 leading-[1.7]">{v.subTitle}</p>

                {/* Photo */}
                <div className="overflow-hidden mb-6" style={{ height: "200px" }}>
                  <img src={v.imageSrc} alt={v.imageAlt} className="w-full h-full object-cover object-top" />
                </div>

                {/* Before */}
                <div className="bg-[#1a1a1a] px-3 py-1.5 mb-3 inline-block">
                  <span className="text-white font-bold text-[11px]">導入前</span>
                </div>
                <ul className="mb-5 flex flex-col gap-2">
                  {v.before.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
                        <path d="M4 4 L12 12 M12 4 L4 12" stroke="#e33" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      <span className="text-[#1a1a1a] text-[13px] leading-[1.7]">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-center mb-4">
                  <svg width="18" height="22" viewBox="0 0 20 24" fill="none" aria-hidden="true">
                    <path d="M10 2 L10 20 M4 14 L10 20 L16 14" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* After */}
                <div className="bg-[#D4A820] px-3 py-1.5 mb-3 inline-block">
                  <span className="text-[#1a1a1a] font-bold text-[11px]">導入後</span>
                </div>
                <ul className="mb-6 flex flex-col gap-2">
                  {v.after.map((a, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
                        <path d="M3 8 L6.5 11.5 L13 5" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span
                        className="text-[#1a1a1a] text-[13px] leading-[1.7]"
                        style={v.afterHighlight === j ? { borderBottom: "2px solid #D4A820" } : {}}
                      >{a}</span>
                    </li>
                  ))}
                </ul>

                {/* Quote */}
                <div className="border-l-4 border-[#D4A820] pl-4 py-1">
                  <p className="text-[#888] font-bold text-[24px] leading-none mb-1">"</p>
                  <p className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px] leading-[1.8]">
                    {v.quote}
                    <span style={{ borderBottom: "2px solid #D4A820" }}>{v.quoteUnderline}</span>
                    {v.quoteEnd}
                  </p>
                  <p className="text-[#888] text-[12px] mt-2">{v.attribution}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Bottom CTA bar ── */}
      <div className="bg-[#1a1a1a] max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-5 px-5 py-7 lg:flex-row lg:items-center lg:px-[68px] lg:py-7 lg:gap-8">
          {/* Badge */}
          <div className="shrink-0 flex flex-col items-center border-2 border-[#D4A820] px-4 py-3 self-start">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="mb-1">
              <path d="M14 2 L16 8 L22 8 L17.5 12 L19.5 18 L14 14.5 L8.5 18 L10.5 12 L6 8 L12 8 Z" fill="#D4A820" />
              <line x1="9" y1="20" x2="9" y2="26" stroke="#D4A820" strokeWidth="1.5" />
              <line x1="19" y1="20" x2="19" y2="26" stroke="#D4A820" strokeWidth="1.5" />
              <line x1="9" y1="26" x2="19" y2="26" stroke="#D4A820" strokeWidth="1.5" />
            </svg>
            <span className="text-[#D4A820] font-bold text-[10px] text-center">支援実績</span>
            <span className="text-[#D4A820] font-black text-[16px]">2000社</span>
            <span className="text-[#D4A820] font-bold text-[10px]">突破！</span>
          </div>
          <p className="text-white font-bold text-[15px] lg:text-[16px] leading-[1.8] flex-1">
            2000社を超える支援実績があるからこそ、<br />業種や地域に合わせた<span className="text-[#D4A820]">最適な施策</span>で成果を実現します。
          </p>
          <a href="#contact" className="flex flex-col items-center bg-[#D4A820] px-8 py-4 no-underline self-start lg:self-auto">
            <span className="text-[#1a1a1a] text-[11px] font-bold mb-1">相談は無料・オンライン対応OK</span>
            <div className="flex items-center gap-2">
              <span className="text-[#1a1a1a] font-black text-[15px] whitespace-nowrap">まずは無料相談する</span>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9 H14 M9 4 L14 9 L9 14" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
