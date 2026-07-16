import heroBg from "../assets/images/hero/hero-right-background.png";
import paintDark from "../assets/images/ui/hero-paint-dark2.png";
import brushHeroText from "../assets/images/ui/brush-hero-text.png";
import brushHeroYellow from "../assets/images/ui/brush-hero-yellow.png";
import badge1 from "../assets/images/ui/badge-1-unit-price.png";
import badge2 from "../assets/images/ui/badge-2-inquiry.png";
import badge3 from "../assets/images/ui/badge-3-speed.png";

export default function Hero() {
  return (
    <>
      {/* ══ Hero ══════════════════════════════════════════════════════ */}
      <section className="relative bg-white" style={{ minHeight: "600px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}>

        {/* 右：職人＋現場背景（overflow-hiddenをこのラッパーに限定 → section横方向は開放） */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", left: "-320px", top: 0, height: "175%", width: "auto", maxWidth: "none" }}
          />
        </div>

        {/* ── コンテンツカラム ── */}
        <div
          className="relative flex flex-col justify-center"
          style={{ minHeight: "600px", paddingLeft: "68px", paddingTop: "40px", paddingBottom: "24px", maxWidth: "640px", zIndex: 10 }}
        >

          {/* ── H1ブロック ── */}
          <div className="relative" style={{ marginBottom: "28px" }}>

            {/* 黒ペイント（hero-paint-dark2） */}
            <img
              src={paintDark}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "38%",
                left: "-230px",
                transform: "translateY(-50%)",
                width: "940px",
                height: "730px",
                maxWidth: "none",
                objectFit: "fill",
                zIndex: 0,
                pointerEvents: "none",
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
              style={{ fontSize: "78px", letterSpacing: "-0.04em", marginTop: "8px", marginBottom: "-32px", zIndex: 10, transform: "translateY(64px) rotate(-6deg)", transformOrigin: "left center" }}
            >
              元請け案件を、
            </div>

            {/* 黄色ブラシ：「もっと増やす。」の背面（DOM順で前 → 背面に描画）
                mixBlendMode:"screen" により白背景では消え、黒ペイント上でのみ黄金色に発光 */}
            <img
              src={brushHeroYellow}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "-20px",
                width: "640px",
                height: "auto",
                maxWidth: "none",
                zIndex: 1,
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />

            {/* H1：2行目（brush-hero-text.png） */}
            <img
              src={brushHeroText}
              alt="もっと増やす。"
              className="relative block"
              style={{ width: "580px", height: "auto", marginLeft: "-12px", marginTop: "18px", zIndex: 2 }}
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
            <img src={badge1} alt="受注単価 平均40%UP" style={{ width: "150px", height: "auto" }} />
            <img src={badge2} alt="問い合わせ数 平均3倍" style={{ width: "150px", height: "auto" }} />
            <img src={badge3} alt="最短1ヶ月で効果実感" style={{ width: "150px", height: "auto" }} />
          </div>

        </div>
      </section>

      {/* ══ 黒CTA帯（全体がリンクボタン） ══════════════════════════ */}
      <a
        href="#contact"
        aria-label="無料相談はこちら"
        className="flex items-stretch bg-[#111111] no-underline"
        style={{ minHeight: "108px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto", display: "flex", textDecoration: "none" }}
      >
        {/* 左：コピー */}
        <div className="flex items-center flex-1" style={{ paddingLeft: "68px", paddingRight: "40px" }}>
          <p className="text-white font-black leading-tight m-0" style={{ fontSize: "26px" }}>
            下請けだけの経営から、
            <span style={{ color: "#D4A820", borderBottom: "2px solid #D4A820", paddingBottom: "1px" }}>脱却</span>
            しませんか？
          </p>
        </div>

        {/* 右：CTAパネル（ゴールド） */}
        <div
          className="flex flex-col items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#D4A820", paddingLeft: "52px", paddingRight: "52px", gap: "5px" }}
        >
          <span className="font-bold text-[#1a1a1a]" style={{ fontSize: "11px", opacity: 0.65, letterSpacing: "0.04em" }}>相談・提案すべて無料</span>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="font-black text-[#1a1a1a]" style={{ fontSize: "17px", whiteSpace: "nowrap" }}>無料相談はこちら ›</span>
          </div>
          <span className="text-[#1a1a1a]" style={{ fontSize: "11px", opacity: 0.55 }}>1分で簡単入力</span>
        </div>
      </a>
    </>
  );
}
