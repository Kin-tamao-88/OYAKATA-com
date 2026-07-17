import logoMark from "../assets/images/logos/logo-mark-trimmed.webp";
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
        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] pt-14 lg:pt-[80px] pb-10 lg:pb-14 text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
            <div>
              <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">06</span>
              <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
            </div>
            <div className="w-px h-10 bg-[#1a1a1a]" />
            <span className="text-[#1a1a1a] font-bold text-[14px] lg:text-[16px]">親方ドットコムが選ばれる理由</span>
          </div>
          <div className="lg:hidden h-[2px] bg-gradient-to-r from-[#D4A820] to-[#1a1a1a] mt-3 mb-5" />
          <h2 className="text-[#1a1a1a] font-black leading-[1.15] mb-5 text-[27px] lg:text-[56px] text-balance">
            選ばれ続けるには、<span className="text-[#D4A820]">理由</span>があります。
          </h2>
          <p className="text-[#555] text-[14px] lg:text-[16px]">
            工事業界に特化した知見と実績で、<span className="font-bold text-[#1a1a1a]">元請け受注の増加</span>をサポートします。
          </p>
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
        <div className="flex flex-col gap-5 px-5 py-6 lg:flex-row lg:items-center lg:px-[68px] lg:py-7 lg:gap-10">
          <div className="flex items-start gap-3 flex-1">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
              <circle cx="11" cy="11" r="10" fill="#D4A820" />
              <path d="M5.5 11 L9 14.5 L16.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-white font-bold text-[14px] lg:text-[15px] leading-[1.8]">
              すべては、<span className="text-[#D4A820]">元請け受注の増加</span>という成果のために。
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 border-l border-[#444] pl-10">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="5" stroke="#D4A820" strokeWidth="1.5" />
              <path d="M2 28 C2 20 5 18 10 18 C15 18 18 20 18 28" stroke="#D4A820" strokeWidth="1.5" fill="none" />
              <circle cx="22" cy="10" r="5" stroke="#D4A820" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M18 28 C18 20 21 18 26 18" stroke="#D4A820" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
            </svg>
            <p className="text-white/70 text-[12px] leading-snug">工事業界に特化した<br />マーケティングパートナー</p>
          </div>
          <div className="hidden lg:flex items-center gap-2 border-l border-[#444] pl-10">
            <div className="w-8 h-8 bg-[#D4A820] flex items-center justify-center shrink-0">
              <span className="text-[#1a1a1a] font-black text-[12px]">親</span>
            </div>
            <img src={logoMark} alt="親方ドットコム" className="h-6 object-contain" />
          </div>
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
