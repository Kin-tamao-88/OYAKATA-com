import paintDark from "../assets/images/ui/hero-paint-dark.webp";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";
import imgMarketing from "../assets/images/OC06/reason-industry-marketing.webp";
import imgData from "../assets/images/OC06/reason-data-analysis.webp";
import imgConsulting from "../assets/images/OC06/reason-consulting.webp";

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
    img: imgMarketing,
    imgAlt: "建設現場を見る工事業者",
    imgLeft: true,
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
    img: imgData,
    imgAlt: "データ分析する様子",
    imgLeft: false,
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
    img: imgConsulting,
    imgAlt: "打ち合わせ・相談する様子",
    imgLeft: true,
  },
];

export default function Section07() {
  return (
    <>
      <section className="bg-white">

        {/* ── Section Header ── */}
        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] pt-14 lg:pt-[80px] pb-6 lg:pb-8 text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
            <div>
              <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">06</span>
              <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
            </div>
            <div className="w-px h-10 bg-[#1a1a1a]" />
            <span className="text-[#1a1a1a] font-bold text-[14px] lg:text-[22px]">親方ドットコムが選ばれる理由</span>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-[#D4A820] to-[#1a1a1a] mt-3 mb-5" />
          <h2 className="text-[#1a1a1a] font-black leading-[1.15] mb-5 text-[27px] lg:text-[56px] text-balance">
            選ばれ続けるには、<span className="border-b-[4px] lg:border-b-[6px] border-[#D4A820] pb-[2px]"><span className="text-[#D4A820]">理由</span>があります。</span>
          </h2>
        </div>

        {/* ── Reason blocks ── */}
        {reasons.map((r, i) => (
          <div key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#1a1a1a]"}>
            <div className="max-w-[1280px] mx-auto">

              {/* SP */}
              <div className="flex flex-col lg:hidden">
                <div className="h-[240px] overflow-hidden">
                  <img src={r.img} alt={r.imgAlt} className="w-full h-full object-cover object-top" />
                </div>
                <div className="px-5 py-8">
                  <ReasonLabel num={r.num} dark={i % 2 !== 0} />
                  <h3 className={`font-black leading-[1.3] mb-3 text-[26px] text-balance ${i % 2 !== 0 ? "text-white" : "text-[#1a1a1a]"}`}>
                    {r.title.split("\n").map((line, j) => <span key={j}>{line}{j === 0 && <br />}</span>)}
                  </h3>
                  <p className={`text-[14px] leading-[1.9] mb-5 ${i % 2 !== 0 ? "text-white/80" : "text-[#1a1a1a]"}`}>{r.body}</p>
                  <CheckList checks={r.checks} dark={i % 2 !== 0} />
                </div>
              </div>

              {/* PC */}
              <div className={`hidden lg:flex items-stretch ${r.imgLeft ? "" : "flex-row-reverse"}`}>
                <div className="w-[50%] shrink-0 overflow-hidden min-h-[420px]">
                  <img src={r.img} alt={r.imgAlt} className="w-full h-full object-cover" />
                </div>
                <div className={`flex-1 flex flex-col justify-center py-14 ${r.imgLeft ? "pl-14 pr-10" : "pr-14 pl-10"} ${i % 2 !== 0 ? "bg-[#1a1a1a]" : "bg-white"} relative overflow-hidden`}>
                  <ReasonLabel num={r.num} dark={i % 2 !== 0} />
                  <h3 className={`font-black leading-[1.3] mb-4 text-[34px] text-balance ${i % 2 !== 0 ? "text-white" : "text-[#1a1a1a]"}`}>
                    {r.title.split("\n").map((line, j) => <span key={j}>{line}{j === 0 && <br />}</span>)}
                  </h3>
                  <p className={`text-[15px] leading-[2] mb-6 ${i % 2 !== 0 ? "text-white/80" : "text-[#1a1a1a]"}`}>{r.body}</p>
                  <CheckList checks={r.checks} dark={i % 2 !== 0} />
                </div>
              </div>

            </div>
          </div>
        ))}

      </section>

      {/* ── Bottom Bar ── */}
      <div className="bg-[#1a1a1a] max-w-[1280px] mx-auto">
        {/* SP */}
        <div className="lg:hidden relative overflow-hidden -mx-0 px-5 py-5 text-center">
          <img src={paintDark} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-x-[1.4] pointer-events-none" />
          <p className="relative z-10 text-white font-black text-[16px] leading-[2]">
            すべては元請けとしての<br /><span className="text-[#D4A820]">受注を得るために。</span>
          </p>
        </div>
        {/* PC */}
        <div className="hidden lg:flex items-stretch relative overflow-hidden border-t-2 border-t-[#D4A820] min-h-[108px]">
          <img src={paintDark} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-x-[1.4] pointer-events-none" />
          <div className="flex-1 py-7" />
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <p className="text-white font-black text-[18px] leading-[2] text-center">
              すべては元請けとしての<span className="text-[#D4A820]">受注を得るために。</span>
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

function ReasonLabel({ num, dark }: { num: string; dark: boolean }) {
  return (
    <div className="relative inline-flex items-center mb-4">
      <img
        src={dark
          ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='36'%3E%3Crect width='120' height='36' rx='2' fill='%23D4A820'/%3E%3C/svg%3E"
          : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='36'%3E%3Crect width='120' height='36' rx='2' fill='%231a1a1a'/%3E%3C/svg%3E"
        }
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill opacity-0"
      />
      <span className={`relative font-bold text-[12px] pr-2 ${dark ? "text-[#D4A820]" : "text-[#D4A820]"}`}>Point</span>
      <span className={`relative font-black text-[28px] leading-none ${dark ? "text-white" : "text-[#1a1a1a]"}`}>{num}</span>
    </div>
  );
}

function CheckList({ checks, dark }: { checks: string[]; dark: boolean }) {
  return (
    <ul className="flex flex-col gap-2">
      {checks.map((c, i) => (
        <li key={i} className="flex items-start gap-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
            <circle cx="9" cy="9" r="8" fill="#D4A820" />
            <path d="M5 9 L8 12 L13 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`text-[13px] lg:text-[14px] leading-[1.7] ${dark ? "text-white/80" : "text-[#1a1a1a]"}`}>{c}</span>
        </li>
      ))}
    </ul>
  );
}
