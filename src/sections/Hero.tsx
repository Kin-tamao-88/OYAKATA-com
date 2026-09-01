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
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 55%, black 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 55%, black 100%)",
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
          <div className="relative z-10 pl-4 pt-16 pb-8">

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
                transform: "translateY(-3px) rotate(-6deg)",
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
              style={{ width: "260px", height: "auto", marginLeft: "-4px", marginTop: "7px", zIndex: 2, transform: "translateY(-25px)" }}
            />

          </div>

          {/* サブコピー */}
          <div className="relative z-10 px-4 pt-4 pb-6">
            <p className="inline-block font-bold text-white bg-[#1a1a1a] text-[13px] leading-snug mb-1 px-2 py-1">
              集客のプロが、御社の売上を後押しします。
            </p>
            <p className="text-[#1a1a1a] font-bold text-[12px] leading-relaxed">
              工務店・リフォーム・外壁塗装・設備・内装など<br />
              工事業者専門の集客支援サービス
            </p>
          </div>

          {/* 実績バッジ */}
          <div className="relative z-10 grid grid-cols-3 gap-2 px-4 pb-9">
            <img src={badge1} alt="受注単価 平均40%UP" className="w-full h-auto" />
            <img src={badge2} alt="問い合わせ数 平均3倍" className="w-full h-auto" />
            <img src={badge3} alt="最短1ヶ月で効果実感" className="w-full h-auto" />
          </div>

        </section>

        {/* SP CTA帯 */}
        <div className="bg-[#111111] px-4 pt-[18px] pb-[18px]">
          <p className="text-white font-black text-[15px] leading-[1.35] mb-2.5 text-center">
            下請けだけの経営から、<span className="text-[#D4A820] border-b-2 border-[#D4A820]">脱却</span>しませんか？
          </p>
          <a
            href="#contact"
            aria-label="LINEで無料相談"
            className="flex items-center justify-center gap-2.5 bg-[#FFD000] hover:brightness-95 active:brightness-95 transition-all no-underline rounded-lg py-3 w-full"
          >
            <span
              className="flex items-center justify-center flex-shrink-0 rounded-full"
              style={{ width: "20px", height: "20px", backgroundColor: "#fff" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" role="img" aria-label="LINE" fill="#06C755">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </span>
            <span className="font-black text-[#1a1a1a] text-[16px]">LINEで無料相談 ›</span>
          </a>
        </div>
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
              style={{ fontSize: "78px", letterSpacing: "-0.04em", marginTop: "8px", marginBottom: "-32px", zIndex: 10, transform: "translateY(49px) rotate(-6deg)", transformOrigin: "left center" }}
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
        aria-label="LINEで無料相談"
        className="hidden lg:flex items-center justify-center gap-[180px] bg-[#111111] no-underline hover:bg-[#1a1a1a] transition-colors"
        style={{ minHeight: "120px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto", textDecoration: "none", cursor: "pointer" }}
      >
        {/* 左：テキスト */}
        <div className="flex flex-col justify-center">
          <p className="text-white font-black leading-tight m-0" style={{ fontSize: "26px" }}>
            下請けだけの経営から、
            <span style={{ color: "#D4A820", borderBottom: "2px solid #D4A820", paddingBottom: "1px" }}>脱却</span>
            しませんか？
          </p>
          <p className="text-white font-black m-0" style={{ fontSize: "26px", marginTop: "6px" }}>
            まずはお気軽にご相談ください。
          </p>
        </div>

        {/* 右：バッジ＋ボタン */}
        <div
          className="relative flex flex-col items-center justify-center flex-shrink-0"
          style={{ gap: "10px", paddingTop: "22px", paddingBottom: "22px" }}
        >
          {/* バッジ（スピーチバブル） */}
          <div className="relative">
            <div
              className="text-white"
              style={{ backgroundColor: "#252525", fontSize: "12px", fontWeight: 500, padding: "6px 16px", borderRadius: "5px", whiteSpace: "nowrap", lineHeight: 1.4 }}
            >
              LINEならカンタン&thinsp;
              <span style={{ color: "#f5a623", fontSize: "16px", fontWeight: 900 }}>1分</span>
              &thinsp;で相談
            </div>
            <div
              className="absolute left-1/2"
              style={{ bottom: "-8px", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "9px solid #252525" }}
            />
          </div>

          {/* CTAボタン */}
          <div
            className="flex items-center bg-[#FFD000] hover:brightness-95 transition-all"
            style={{ gap: "12px", borderRadius: "7px", padding: "15px 28px", whiteSpace: "nowrap" }}
          >
            <span
              className="flex items-center justify-center flex-shrink-0 rounded-full"
              style={{ width: "30px", height: "30px", backgroundColor: "#fff" }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" role="img" aria-label="LINE" fill="#06C755">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </span>
            <span className="font-black text-[#1a1a1a]" style={{ fontSize: "19px" }}>LINEで無料相談</span>
            <span className="font-black text-[#1a1a1a]" style={{ fontSize: "17px" }}>›</span>
          </div>
        </div>
      </a>
    </>
  );
}
