const Y = "#f5a623";
const BK = "#1a1a1a";

// ── 月桂樹バッジ ─────────────────────────────────────────
const LEAVES = [
  { cx: 16, cy: 42, rx: 5, ry: 3, r: -50 },
  { cx: 20, cy: 28, rx: 5, ry: 3, r: -30 },
  { cx: 28, cy: 16, rx: 5, ry: 3, r: -10 },
  { cx: 40, cy: 10, rx: 5, ry: 3, r:  10 },
  { cx: 104, cy: 42, rx: 5, ry: 3, r:  50 },
  { cx: 100, cy: 28, rx: 5, ry: 3, r:  30 },
  { cx: 92,  cy: 16, rx: 5, ry: 3, r:  10 },
  { cx: 80,  cy: 10, rx: 5, ry: 3, r: -10 },
  { cx: 12,  cy: 58, rx: 5, ry: 3, r: -70 },
  { cx: 108, cy: 58, rx: 5, ry: 3, r:  70 },
];

function LaurelBadge({
  topLabel,
  bottomLabel,
  children,
}: {
  topLabel?: string;
  bottomLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-[120px] h-[120px] shrink-0">
      <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true"
        className="absolute inset-0">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#e8e0d0" strokeWidth="1" />
        {LEAVES.map((l, i) => (
          <ellipse key={i} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry} fill="#c8a030"
            transform={`rotate(${l.r} ${l.cx} ${l.cy})`} />
        ))}
        <line x1="42" y1="110" x2="78" y2="110" stroke="#c8a030" strokeWidth="1.5" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-px">
        {topLabel && <span className="text-[10px] text-[#888]">{topLabel}</span>}
        {children}
        {bottomLabel && <span className="text-[11px] font-bold text-[#1a1a1a]">{bottomLabel}</span>}
      </div>
    </div>
  );
}

// ── Heroメイン ────────────────────────────────────────────
interface HeroProps {
  heroImageSrc?: string;
}

export default function Hero({ heroImageSrc }: HeroProps) {
  return (
    <>
      {/* Hero本体 */}
      <section className="relative overflow-hidden bg-[#fafafa] flex min-h-[500px]">

        {/* 左エリア */}
        <div className="relative z-10 w-[58%] flex flex-col justify-center pl-16 pr-8 py-10">

          {/* タグ */}
          <div
            className="inline-flex items-center self-start text-[13px] font-bold mb-3.5"
            style={{
              background: BK, color: Y,
              padding: "5px 14px 5px 20px",
              clipPath: "polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%)",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 10,
                background: Y,
                clipPath: "polygon(0 0, 100% 0, 65% 100%, 0 100%)",
              }}
            />
            工事業者の味方
          </div>

          {/* 大見出し */}
          <h1 className="text-[56px] font-black leading-[1.2] tracking-tight mb-4"
            style={{ color: BK }}>
            元請け案件を、<br />
            もっと<span style={{ color: Y }}>増やす。</span>
          </h1>

          {/* サブコピー */}
          <p className="text-[19px] font-bold mb-2" style={{ color: BK }}>
            集客のプロが、御社の売上をブーストします。
          </p>

          {/* 補足 */}
          <p className="text-[13px] leading-[1.8] mb-7" style={{ color: "#666" }}>
            工務店・リフォーム・外壁塗装・設備・内装など<br />
            工事業者専門の集客支援サービス
          </p>

          {/* 実績バッジ */}
          <div className="flex items-center gap-4">
            <LaurelBadge topLabel="受注単価" bottomLabel="UP">
              <div className="flex items-baseline gap-0.5">
                <span className="text-[11px] font-bold text-[#1a1a1a]">平均</span>
                <span className="text-[30px] font-black leading-none text-[#1a1a1a]">40</span>
                <span className="text-[14px] font-black text-[#1a1a1a]">%</span>
              </div>
            </LaurelBadge>

            <LaurelBadge topLabel="問い合わせ数">
              <div className="flex items-baseline gap-0.5">
                <span className="text-[11px] font-bold text-[#1a1a1a]">平均</span>
                <span className="text-[30px] font-black leading-none text-[#1a1a1a]">3</span>
                <span className="text-[14px] font-black text-[#1a1a1a]">倍</span>
              </div>
            </LaurelBadge>

            <LaurelBadge topLabel="最短" bottomLabel="効果実感">
              <div className="flex items-baseline gap-1">
                <span className="text-[22px] font-black leading-none text-[#1a1a1a]">1ヶ月</span>
                <span className="text-[12px] font-bold text-[#1a1a1a]">で</span>
              </div>
            </LaurelBadge>
          </div>
        </div>

        {/* 右エリア：写真 */}
        <div className="absolute right-0 top-0 w-[52%] h-full">
          {heroImageSrc ? (
            <img
              src={heroImageSrc}
              alt="職人の写真"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#3a3a3a] to-[#888]
              flex items-center justify-center text-white/30 text-sm">
              [ 職人写真 ]
            </div>
          )}
          {/* 左端フェード */}
          <div
            className="absolute left-0 top-0 h-full w-[55%] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #fafafa 0%, rgba(250,250,250,0.75) 45%, transparent 100%)",
            }}
          />
        </div>
      </section>

      {/* 黒CTA帯 */}
      <div
        className="flex items-center justify-between px-16 min-h-[68px]"
        style={{ background: BK }}
      >
        <p className="text-[20px] font-bold text-white">
          下請けだけの経営から、<span style={{ color: Y }}>脱却</span>しませんか？
        </p>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] text-[#aaa]">相談・提案すべて無料</span>
          <button
            aria-label="無料相談はこちら"
            className="flex items-center gap-2 rounded-[4px] px-6 py-2.5"
            style={{ background: Y }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={BK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <div>
              <span className="block text-[15px] font-black text-[#1a1a1a]">
                無料相談はこちら ›
              </span>
              <span className="block text-[11px] text-[#1a1a1a] opacity-70">
                1分で簡単入力
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
