import heroBg from "../assets/images/hero/hero-right-background2.webp";
import paintDark from "../assets/images/ui/hero-paint-dark2.webp";
import brushHeroText from "../assets/images/ui/brush-hero-text.webp";
import brushHeroYellow from "../assets/images/ui/brush-hero-yellow.webp";
import badge1 from "../assets/images/ui/badge-1-unit-price.webp";
import badge2 from "../assets/images/ui/badge-2-inquiry.webp";
import badge3 from "../assets/images/ui/badge-3-speed.webp";

export default function Hero() {
  return (
    <>
      {/* ══ SP Hero ════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        <section className="relative bg-white overflow-hidden" style={{ minHeight: "340px" }}>

          {/* 右：人物画像（PCと同じマスクフェード） */}
          <div
            className="absolute inset-y-0 right-0 overflow-hidden pointer-events-none"
            style={{
              width: "46%",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
            }}
          >
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-55%)", height: "120%", width: "auto", maxWidth: "none" }}
            />
          </div>

          {/* 左：テキストコンテンツ */}
          <div className="relative z-10 pl-4 pt-6 pb-4">

            {/* 黒ペイント */}
            <img
              src={paintDark}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "45%",
                left: "-80px",
                transform: "translateY(-50%)",
                width: "360px",
                height: "auto",
                maxWidth: "none",
                objectFit: "fill",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            {/* ラベル */}
            <div
              className="relative inline-flex items-center"
              style={{
                backgroundColor: "#1a1a1a",
                color: "#D4A820",
                fontSize: "11px",
                fontWeight: 700,
                paddingLeft: "14px",
                paddingRight: "10px",
                paddingTop: "5px",
                paddingBottom: "5px",
                marginBottom: "8px",
                marginLeft: "-8px",
                clipPath: "polygon(8px 0%, 100% 0%, 100% 100%, 0% 100%)",
                zIndex: 1,
                transform: "rotate(-6deg)",
                transformOrigin: "left center",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: "8px",
                  backgroundColor: "#D4A820",
                  clipPath: "polygon(0 0, 100% 0, 55% 100%, 0 100%)",
                }}
              />
              すべての工事業者様のために
            </div>

            {/* H1：1行目 */}
            <div
              className="relative font-black text-white leading-none"
              style={{
                fontSize: "34px",
                letterSpacing: "-0.04em",
                marginTop: "4px",
                marginBottom: "-17px",
                zIndex: 10,
                transform: "translateY(22px) rotate(-6deg)",
                transformOrigin: "left center",
              }}
            >
              元請け案件を、
            </div>

            {/* 黄色ブラシ */}
            <img
              src={brushHeroYellow}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "0px",
                left: "-10px",
                width: "300px",
                height: "auto",
                maxWidth: "none",
                zIndex: 1,
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />

            {/* H1：2行目（brushHeroText） */}
            <img
              src={brushHeroText}
              alt="もっと増やす。"
              className="relative block"
              style={{ width: "260px", height: "auto", marginLeft: "-4px", marginTop: "7px", zIndex: 2 }}
            />

          </div>

          {/* サブコピー */}
          <div className="relative z-10 px-4 pt-1 pb-3">
            <p className="font-bold text-[#1a1a1a] text-[12px] leading-snug mb-1">
              集客のプロが、御社の売上を後押しします。
            </p>
            <p className="text-[#1a1a1a] text-[11px] leading-relaxed">
              工務店・リフォーム・外壁塗装・設備・内装など<br />
              工事業者専門の集客支援サービス
            </p>
          </div>

          {/* 実績バッジ */}
          <div className="relative z-10 grid grid-cols-3 gap-2 px-4 pb-5">
            <img src={badge1} alt="受注単価 平均40%UP" className="w-full h-auto" />
            <img src={badge2} alt="問い合わせ数 平均3倍" className="w-full h-auto" />
            <img src={badge3} alt="最短1ヶ月で効果実感" className="w-full h-auto" />
          </div>

        </section>

        {/* SP CTA帯 */}
        <a
          href="#contact"
          aria-label="無料相談はこちら"
          className="block bg-[#111111] no-underline"
        >
          <div className="px-5 py-5">
            <p className="text-white font-black text-[20px] leading-tight">
              下請けだけの経営から、<br />
              <span className="text-[#D4A820] border-b-2 border-[#D4A820]">脱却</span>しませんか？
            </p>
          </div>
          <div className="bg-[#D4A820] flex flex-col items-center py-4 gap-1">
            <span className="text-[#1a1a1a] text-[11px] font-bold opacity-65 tracking-wide">相談・提案すべて無料</span>
            <div className="flex items-center gap-2">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="font-black text-[#1a1a1a] text-[15px] whitespace-nowrap">無料相談はこちら ›</span>
            </div>
            <span className="text-[#1a1a1a] text-[11px] opacity-55">1分で簡単入力</span>
          </div>
        </a>
      </div>

      {/* ══ PC Hero ════════════════════════════════════════════════════ */}
      <section className="relative bg-white hidden lg:block" style={{ minHeight: "600px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}>

        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <div style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "62%",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%, black 80%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 28%, black 80%, transparent 100%)",
          }}>
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                height: "130%",
                width: "auto",
                maxWidth: "none",
              }}
            />
          </div>
        </div>

        <div
          className="relative flex flex-col justify-center"
          style={{ minHeight: "600px", paddingLeft: "68px", paddingTop: "40px", paddingBottom: "24px", maxWidth: "640px", zIndex: 10 }}
        >
          <div className="relative" style={{ marginBottom: "28px" }}>

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

            <div
              className="relative inline-flex items-center"
              style={{
                backgroundColor: "#1a1a1a",
                color: "#D4A820",
                fontSize: "16px",
                fontWeight: 700,
                paddingLeft: "28px",
                paddingRight: "22px",
                paddingTop: "8px",
                paddingBottom: "8px",
                marginBottom: "14px",
                marginLeft: "-20px",
                clipPath: "polygon(14px 0%, 100% 0%, 100% 100%, 0% 100%)",
                zIndex: 1,
                transform: "rotate(-6deg)",
                transformOrigin: "left center",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: "14px",
                  backgroundColor: "#D4A820",
                  clipPath: "polygon(0 0, 100% 0, 55% 100%, 0 100%)",
                }}
              />
              すべての工事業者様のために
            </div>

            <div
              className="relative font-black text-white leading-none"
              style={{ fontSize: "78px", letterSpacing: "-0.04em", marginTop: "8px", marginBottom: "-32px", zIndex: 10, transform: "translateY(64px) rotate(-6deg)", transformOrigin: "left center" }}
            >
              元請け案件を、
            </div>

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

            <img
              src={brushHeroText}
              alt="もっと増やす。"
              className="relative block"
              style={{ width: "580px", height: "auto", marginLeft: "-12px", marginTop: "18px", zIndex: 2 }}
            />

          </div>

          <p
            className="font-bold text-[#1a1a1a] leading-snug"
            style={{ fontSize: "20px", marginBottom: "8px" }}
          >
            集客のプロが、御社の売上を後押しします。
          </p>

          <p className="text-[#1a1a1a] leading-relaxed" style={{ fontSize: "14px" }}>
            工務店・リフォーム・外壁塗装・設備・内装など<br />
            工事業者専門の集客支援サービス
          </p>

          <div className="flex items-center gap-4 mt-5">
            <img src={badge1} alt="受注単価 平均40%UP" style={{ width: "150px", height: "auto" }} />
            <img src={badge2} alt="問い合わせ数 平均3倍" style={{ width: "150px", height: "auto" }} />
            <img src={badge3} alt="最短1ヶ月で効果実感" style={{ width: "150px", height: "auto" }} />
          </div>

        </div>
      </section>

      {/* ══ PC 黒CTA帯 ══════════════════════════════════════════════════ */}
      <a
        href="#contact"
        aria-label="無料相談はこちら"
        className="hidden lg:flex items-stretch bg-[#111111] no-underline"
        style={{ minHeight: "108px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto", textDecoration: "none" }}
      >
        <div className="flex items-center flex-1" style={{ paddingLeft: "68px", paddingRight: "40px" }}>
          <p className="text-white font-black leading-tight m-0" style={{ fontSize: "26px" }}>
            下請けだけの経営から、
            <span style={{ color: "#D4A820", borderBottom: "2px solid #D4A820", paddingBottom: "1px" }}>脱却</span>
            しませんか？
          </p>
        </div>

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
