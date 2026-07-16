import { useId } from "react";
import heroBg from "../assets/images/hero/hero-right-background.png";
import paintDark from "../assets/images/ui/hero-paint-dark.png";
import brushHeroText from "../assets/images/ui/brush-hero-text.png";
import badge1 from "../assets/images/ui/badge-1-unit-price.png";
import badge2 from "../assets/images/ui/badge-2-inquiry.png";
import badge3 from "../assets/images/ui/badge-3-speed.png";

function BrushMark({
  color = "#D4A820",
  opacity = 0.72,
  rotate = -2,
}: {
  color?: string;
  opacity?: number;
  rotate?: number;
}) {
  const uid = useId().replace(/:/g, "x");
  const filterId = `bm_${uid}`;
  return (
    <span
      aria-hidden="true"
      className="absolute pointer-events-none block"
      style={{ top: "4%", bottom: "-8%", left: "-8px", right: "-8px", zIndex: 0 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 400 64" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <filter id={filterId} x="-8%" y="-50%" width="116%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.6 0.3" numOctaves="4" seed="9" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <rect x="2" y="10" width="396" height="46" rx="2"
          fill={color} opacity={opacity}
          filter={`url(#${filterId})`}
          transform={`rotate(${rotate} 200 33)`}
        />
      </svg>
    </span>
  );
}

function GoldText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "linear-gradient(180deg, #F6D840 0%, #D4A010 50%, #B07800 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        display: "inline",
      }}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <>
      {/* ══ Hero ══════════════════════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden" style={{ minHeight: "600px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}>

        {/* 右：職人＋現場背景 */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute top-0 pointer-events-none"
          style={{ left: "-400px", top: 0, height: "175%", width: "auto", maxWidth: "none", zIndex: 1 }}
        />

        {/* ── コンテンツカラム ── */}
        <div
          className="relative flex flex-col justify-center"
          style={{ minHeight: "600px", paddingLeft: "68px", paddingTop: "40px", paddingBottom: "52px", maxWidth: "640px", zIndex: 10 }}
        >

          {/* ── H1ブロック ── */}
          <div className="relative" style={{ marginBottom: "28px" }}>

            {/*
              黒ペイント：wrapper内 position:absolute
              left=-250px で画像中心がテキスト範囲（wrapper x:0〜500）の中央 x=250px に一致。
              width=1000px で左右とも余裕を持たせてグラデーション端を見せない。
            */}
            <img
              src={paintDark}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "50%",
                left: "-100px",
                transform: "translateY(-50%)",
                width: "1440px",
                height: "352px",
                objectFit: "fill",
                zIndex: 0,
                pointerEvents: "none",
                maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
            />

            {/* 「工事業者の味方」ラベル */}
            <div
              className="relative inline-flex items-center"
              style={{
                backgroundColor: "#1a1a1a",
                color: "#D4A820",
                fontSize: "13px",
                fontWeight: 700,
                paddingLeft: "22px",
                paddingRight: "18px",
                paddingTop: "5px",
                paddingBottom: "5px",
                marginBottom: "14px",
                clipPath: "polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)",
                zIndex: 1,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: "12px",
                  backgroundColor: "#D4A820",
                  clipPath: "polygon(0 0, 100% 0, 55% 100%, 0 100%)",
                }}
              />
              工事業者の味方
            </div>

            {/* H1：1行目（HTMLテキスト） */}
            <div
              className="relative font-black text-white leading-none"
              style={{ fontSize: "78px", letterSpacing: "-0.04em", marginTop: "8px", marginBottom: "-32px", zIndex: 10, transform: "translateY(60px) rotate(-6deg)", transformOrigin: "left center" }}
            >
              元請け案件を、
            </div>

            {/* H1：2行目（brush-hero-text.png） */}
            <img
              src={brushHeroText}
              alt="もっと増やす。"
              className="relative block"
              style={{ width: "580px", height: "auto", marginLeft: "-12px", zIndex: 1 }}
            />

          </div>
          {/* ── /H1ブロック ── */}

          {/* サブコピー */}
          <p
            className="font-bold text-[#1a1a1a] leading-snug"
            style={{ fontSize: "20px", marginBottom: "8px" }}
          >
            集客のプロが、御社の売上をブーストします。
          </p>

          {/* 補足テキスト */}
          <p className="text-[#555] leading-relaxed" style={{ fontSize: "14px" }}>
            工務店・リフォーム・外壁塗装・設備・内装など<br />
            工事業者専門の集客支援サービス
          </p>

          {/* 実績バッジ */}
          <div
            className="flex items-center gap-4 mt-5 pt-4"
            style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}
          >
            <img src={badge1} alt="受注単価 平均40%UP" style={{ width: "200px", height: "auto" }} />
            <img src={badge2} alt="問い合わせ数 平均3倍" style={{ width: "200px", height: "auto" }} />
            <img src={badge3} alt="最短1ヶ月で効果実感" style={{ width: "200px", height: "auto" }} />
          </div>

        </div>
      </section>

      {/* ══ 黒CTA帯 ══════════════════════════════════════════════════ */}
      <div
        className="flex items-center justify-between bg-[#111111]"
        style={{ minHeight: "108px", paddingLeft: "68px", paddingRight: "48px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}
      >
        <p className="text-white font-black leading-tight m-0" style={{ fontSize: "26px" }}>
          下請けだけの経営から、
          <span className="relative inline-block">
            <BrushMark color="#D4A820" opacity={0.55} rotate={-1.5} />
            <GoldText>脱却</GoldText>
          </span>
          しませんか？
        </p>

        <div className="flex flex-col items-center flex-shrink-0">
          <span className="text-white" style={{ fontSize: "11px", opacity: 0.8, marginBottom: "6px" }}>
            相談・提案すべて無料
          </span>
          <button
            aria-label="無料相談はこちら"
            className="flex items-center gap-3 rounded-[4px]"
            style={{ backgroundColor: "#D4A820", padding: "13px 28px", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <div className="text-left">
              <span className="block font-black text-[#1a1a1a]" style={{ fontSize: "15px", lineHeight: 1.2 }}>無料相談はこちら ›</span>
              <span className="block text-[#1a1a1a]" style={{ fontSize: "11px", opacity: 0.75, lineHeight: 1.4 }}>1分で簡単入力</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
