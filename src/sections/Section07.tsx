import brushYellow from "../assets/images/ui/brush-yellow.png";
import logoMark from "../assets/images/logos/logo-mark-trimmed.png";

const reasons = [
  {
    num: "01",
    title: "工事業界専門の\nマーケティング",
    body: "一般企業向けではなく、工事業界に特化した戦略で、元請け受注につながる集客を実現します。",
    checks: [
      "業界特有の商習慣・集客動向を理解",
      "工務店・リフォーム会社に特化した戦略設計",
      "元請け受注に直結する施策のみを提案",
    ],
    imageSrc: "/images/reasons-01.jpg",
    imageAlt: "建設現場を見る工事業者",
    imageLeft: false,
  },
  {
    num: "02",
    title: "2000社を超える\n実績データを活用",
    body: "蓄積された改善データをもとに、最短ルートで成果につながる施策をご提案します。",
    checks: [
      "2000社を超える支援実績から得た改善データ",
      "成果が出た施策を再現性高くご提供",
      "ムダを省き、投資対効果を最大化",
    ],
    imageSrc: "/images/reasons-02.jpg",
    imageAlt: "データ分析する様子",
    imageLeft: true,
  },
  {
    num: "03",
    title: "集客から改善まで\n一貫して伴走",
    body: "広告運用だけで終わらず、分析・改善まで一貫してサポートし、元請け受注の増加を実現します。",
    checks: [
      "専任担当が課題発見から改善まで伴走",
      "定期的な改善提案で成果を最大化",
      "目標達成まで一緒に走り続けます",
    ],
    imageSrc: "/images/reasons-03.jpg",
    imageAlt: "打ち合わせ・相談する様子",
    imageLeft: false,
  },
];

export default function Section07() {
  return (
    <section className="bg-white">

      {/* ── Section Header ── */}
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] pt-14 lg:pt-[80px] pb-10 lg:pb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-[#D4A820] font-black text-[13px]">07</span>
          <div className="w-6 h-[2px] bg-[#D4A820]" />
          <span className="text-[#555] text-[13px]">親方ドットコムが選ばれる理由</span>
        </div>
        <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-4 text-[30px] lg:text-[52px]">
          選ばれ続けるには、<span className="text-[#D4A820]">理由</span>があります。
        </h2>
        <p className="text-[#555] text-[14px] lg:text-[16px]">
          工事業界に特化した知見と実績で、<span className="font-bold text-[#1a1a1a]">元請け受注の増加</span>をサポートします。
        </p>
      </div>

      {/* ── Reason blocks ── */}
      {reasons.map((r, i) => (
        <div
          key={i}
          className="relative overflow-hidden"
          style={{ backgroundColor: i % 2 === 1 ? "#f7f7f7" : "#fff" }}
        >
          {i === 0 && (
            <img src={brushYellow} alt="" aria-hidden="true" className="absolute top-0 right-0 pointer-events-none opacity-15 hidden lg:block" style={{ width: "280px" }} />
          )}
          {i === 1 && (
            <img src={brushYellow} alt="" aria-hidden="true" className="absolute top-0 left-0 pointer-events-none opacity-15 hidden lg:block" style={{ width: "280px", transform: "scaleX(-1)" }} />
          )}

          <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] relative">

            {/* SP: stack (image top, text bottom) */}
            <div className="flex flex-col lg:hidden py-10">
              <div className="bg-[#1a1a1a] inline-flex items-center px-3 py-1 mb-5 self-start"
                style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)" }}>
                <span className="text-white font-black text-[12px] mr-2">理由</span>
                <span className="text-[#D4A820] font-black text-[12px]">{r.num}</span>
              </div>
              <h3 className="text-[#1a1a1a] font-black leading-[1.3] mb-4 text-[26px]">
                {r.title.split("\n").map((line, j) => (
                  <span key={j}>{line}{j < r.title.split("\n").length - 1 && <br />}</span>
                ))}
              </h3>
              <div className="w-12 h-[3px] bg-[#D4A820] mb-4" />
              <p className="text-[#1a1a1a] text-[15px] leading-[2] mb-5">{r.body}</p>
              <ul className="flex flex-col gap-3 mb-6">
                {r.checks.map((c, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
                      <circle cx="9" cy="9" r="8" fill="#D4A820" />
                      <path d="M5 9 L8 12 L13 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#1a1a1a] text-[14px] leading-[1.7]">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="overflow-hidden" style={{ height: "220px" }}>
                <img src={r.imageSrc} alt={r.imageAlt} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* PC: side by side */}
            <div className={`hidden lg:flex items-stretch ${r.imageLeft ? "flex-row-reverse" : ""}`}>
              <div className="w-[50%] shrink-0 overflow-hidden" style={{ minHeight: "440px" }}>
                <img src={r.imageSrc} alt={r.imageAlt} className="w-full h-full object-cover" />
              </div>
              <div className={`flex-1 flex flex-col justify-center py-14 ${r.imageLeft ? "pr-14" : "pl-14"}`}>
                <div className="bg-[#1a1a1a] inline-flex items-center px-4 py-1 mb-6 self-start"
                  style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)" }}>
                  <span className="text-white font-black text-[13px] mr-2">理由</span>
                  <span className="text-[#D4A820] font-black text-[13px]">{r.num}</span>
                </div>
                <h3 className="text-[#1a1a1a] font-black leading-[1.3] mb-5 text-[36px]">
                  {r.title.split("\n").map((line, j) => (
                    <span key={j}>{line}{j < r.title.split("\n").length - 1 && <br />}</span>
                  ))}
                </h3>
                <div className="w-16 h-[3px] bg-[#D4A820] mb-5" />
                <p className="text-[#1a1a1a] text-[15px] leading-[2] mb-6">{r.body}</p>
                <ul className="flex flex-col gap-3">
                  {r.checks.map((c, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
                        <circle cx="9" cy="9" r="8" fill="#D4A820" />
                        <path d="M5 9 L8 12 L13 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#1a1a1a] text-[14px] leading-[1.7]">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* ── Bottom bar ── */}
      <div className="bg-[#1a1a1a] max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-4 px-5 py-6 lg:flex-row lg:items-center lg:px-[68px] lg:py-7 lg:gap-8">
          <div className="flex items-center gap-3 flex-1">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="10" fill="#D4A820" />
              <path d="M5.5 11 L9 14.5 L16.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-white font-bold text-[14px]">
              すべては、<span className="text-[#D4A820]">元請け受注の増加</span>という成果のために。
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 border-l border-r border-[#444] px-8">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="7" r="4" stroke="#D4A820" strokeWidth="1.5" />
              <path d="M2 18 C2 13 5 11 10 11 C15 11 18 13 18 18" stroke="#D4A820" strokeWidth="1.5" fill="none" />
            </svg>
            <p className="text-[#aaa] text-[12px] text-center leading-tight">工事業界に特化した<br />マーケティングパートナー</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={logoMark} alt="親" className="w-7 h-7" />
            <span className="text-white font-black text-[15px]">親方ドットコム</span>
          </div>
        </div>
      </div>

    </section>
  );
}
