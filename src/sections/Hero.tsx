import heroBg from "../assets/images/hero/hero-new-background.webp";
import paintDark from "../assets/images/ui/hero-paint-dark2.webp";
import brushHeroText from "../assets/images/ui/brush-hero-text.webp";
import brushHeroYellow from "../assets/images/ui/brush-hero-yellow.webp";
import { trackLineClick } from "../lib/analytics";
import { buildLineCtaHref } from "../lib/line";

const HERO_POINTS = [
  { title: "反響", lead: "地域のお客さんから", result: "相談が入る" },
  { title: "直請け", lead: "紹介に頼らず", result: "直接受注" },
  { title: "売上", lead: "安定して", result: "伸ばしていく" },
];

// PC人物写真(1986×792の横長)の表示位置：写真の右端=メインコンテナ右端。高さ基準のcoverで人物サイズは高さ(105%)で決まり、幅では変わらない。
// 100%=右端合わせ、+39.5cqh=写真の右端側の背景余白を約15%(≒40px超)残す位置。
const PC_PHOTO_POSITION = "calc(100% + 39.5cqh) top";

// PC人物写真のマスク(コンテナ=セクション基準)：コピー・3カラム(内容の右端=640px)までは白基調、そこから住宅・人物へ立ち上げる。右端は不透明のままコンテナ右端で終了
const PC_PHOTO_MASK =
  "linear-gradient(to right, transparent 640px, rgba(0, 0, 0, 0.5) 750px, black 940px)";

// 結果部分の下に敷く、FVのブラシに馴染むラフなマーカー線
const MARKER_PATH =
  "M1 6.5 L3 4.2 L9 4.8 L18 3.6 L30 4.4 L44 3.4 L58 4.2 L72 3.2 L86 4 L96 3.4 L99 4.6 L97.5 6.6 L99 8.4 L88 8 L74 9 L60 8.2 L46 9.2 L32 8.4 L18 9.3 L8 8.6 L2 9 Z";

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
              style={{ position: "absolute", top: "-44px", left: "50%", transform: "translateX(calc(-66% + 22px))", height: "88%", width: "auto", maxWidth: "none" }}
            />
          </div>

          {/* 3ポイント手前から下へ白100%になるオーバーレイ（人物のサイズ・位置は不変） */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[236px] bg-gradient-to-t from-white from-[72%] to-transparent pointer-events-none"
          />

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
                left: "-86px",
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
                fontSize: "27px",
                letterSpacing: "-0.04em",
                marginTop: "4px",
                marginBottom: "-10px",
                zIndex: 10,
                transform: "translate(-6px, 8px) rotate(-6deg)",
                transformOrigin: "left center",
              }}
            >
              直請けの仕事を、
            </div>

            {/* H1：2行目（brushHeroText） */}
            <img
              src={brushHeroText}
              alt="もっと増やす。"
              className="relative block"
              style={{ width: "260px", height: "auto", marginLeft: "-4px", marginTop: "7px", zIndex: 2, transform: "translate(-6px, -21.5px)", clipPath: "inset(0 5% 0 0)" }}
            />

          </div>

          {/* サブコピー */}
          <div className="relative z-10 px-4 -mt-8 pb-[31px]">
            <p className="inline-block font-bold text-white bg-[#1a1a1a] text-[15px] leading-snug px-2 py-1">
              紹介・下請けに頼らず、<br />
              自社で仕事を取れる仕組みを。
            </p>
          </div>

          {/* 3ポイント */}
          <div className="relative z-10 px-4">
            <div className="flex h-[82px] items-center">
              {HERO_POINTS.map((point, i) => (
                <div
                  key={point.title}
                  className={`flex flex-1 flex-col items-center${i > 0 ? " border-l border-[#555]" : ""}`}
                >
                  <div className="w-fit pt-[9px]">
                    <p className="relative whitespace-nowrap text-[24px] font-black leading-[24px] text-[#1a1a1a]">
                      <span aria-hidden="true" className="absolute -left-[7px] top-1/2 h-5 w-1 -translate-y-1/2 bg-[#9FC9EC]" />
                      {point.title}
                    </p>
                  </div>
                  <p className="mt-1.5 whitespace-nowrap text-center text-[12px] leading-[1.6] text-[#444]">
                    <span className="font-bold text-[#1a1a1a]">{point.lead}</span>
                    <br />
                    <span className="relative inline-block text-[13px] font-black leading-[19.2px] text-[#1a1a1a]">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                        className="absolute -bottom-px -left-1.5 -z-10 h-[11px] w-[calc(100%+12px)]"
                      >
                        <path d={MARKER_PATH} fill="#FFD000" />
                      </svg>
                      {point.result}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* キャッチコピー */}
          <div className="relative z-10 px-4 pt-4 pb-[22.08px]">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-px flex-1 bg-[#1a1a1a]" />
              <p className="whitespace-nowrap text-[20px] font-black leading-[1.3] text-[#1a1a1a]">
                あなたの地域の反響を、
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-[#1a1a1a]" />
            </div>
            <p className="text-center text-[28px] font-black leading-[1.2] tracking-[-0.04em] text-[#1a1a1a]">
              <span className="relative inline-block whitespace-nowrap">
                <span aria-hidden="true" className="absolute -inset-x-2 -bottom-[5px] -z-10 h-[11px] -rotate-[1.5deg] bg-[#FFD000]" />
                丸ごと自社へ。
              </span>
            </p>
          </div>

        </section>

        {/* SP CTA帯 */}
        <div className="bg-[#111111] px-4 pt-[18px] pb-[18px]">
          <p className="text-white font-black text-[15px] leading-[1.35] mb-2.5 text-center">
            下請けだけの経営から、<span className="text-[#D4A820] border-b-2 border-[#D4A820]">脱却</span>しませんか？
          </p>
          <a
            href={buildLineCtaHref()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LINEで無料診断"
            onClick={trackLineClick}
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
            <span className="font-black text-[#1a1a1a] text-[16px]">LINEで無料診断 ›</span>
          </a>
        </div>
      </div>

      {/* ══ PC Hero ════════════════════════════════════════════════════ */}
      <section className="relative bg-white hidden lg:block" style={{ minHeight: "600px", maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}>

        {/* 人物写真レイヤー：メインコンテナ(1280px)内に収める。写真の右端=コンテナ右端 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none [container-type:size]"
          style={{ zIndex: 1, WebkitMaskImage: PC_PHOTO_MASK, maskImage: PC_PHOTO_MASK }}
        >
          <div style={{ position: "absolute", top: "-30px", height: "105%", left: "38%", right: 0 }}>
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: PC_PHOTO_POSITION }}
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
              style={{ fontSize: "78px", letterSpacing: "-0.04em", marginTop: "8px", marginBottom: "-32px", zIndex: 10, transform: "translateY(49px) rotate(-6deg)", transformOrigin: "left center", whiteSpace: "nowrap" }}
            >
              直請けの仕事を、
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

          <p className="font-bold text-[#1a1a1a] leading-snug text-[20px] mt-1 mb-[28px] whitespace-nowrap">
            紹介・下請けに頼らず、自社で仕事を取れる仕組みを。
          </p>

          {/* 3ポイント */}
          <div className="flex">
            {HERO_POINTS.map((point, i) => (
              <div
                key={point.title}
                className={`flex flex-1 flex-col items-center${i > 0 ? " border-l border-[#555]" : ""}`}
              >
                <div className="w-fit">
                  <p className="relative whitespace-nowrap text-[32px] font-black leading-[33.6px] text-[#1a1a1a]">
                    <span aria-hidden="true" className="absolute -left-[10px] top-1/2 h-7 w-[5px] -translate-y-1/2 bg-[#9FC9EC]" />
                    {point.title}
                  </p>
                </div>
                <p className="mt-1.5 whitespace-nowrap text-center text-[16px] leading-[1.5] text-[#444]">
                  <span className="font-bold text-[#1a1a1a]">{point.lead}</span>
                  <br />
                  <span className="relative inline-block text-[17px] font-black leading-[25.5px] text-[#1a1a1a]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                      className="absolute -bottom-px -left-2 -z-10 h-[14px] w-[calc(100%+16px)]"
                    >
                      <path d={MARKER_PATH} fill="#FFD000" />
                    </svg>
                    {point.result}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* キャッチコピー */}
          <div className="mt-[27.42px] flex items-center gap-3">
            <span aria-hidden="true" className="h-px flex-1 bg-[#1a1a1a]" />
            <p className="whitespace-nowrap text-[22px] font-black leading-[1.3] text-[#1a1a1a]">
              あなたの地域の反響を、
              <span className="relative inline-block text-[32px] leading-[1.2] tracking-[-0.04em]">
                <span aria-hidden="true" className="absolute -inset-x-2 -bottom-[6px] -z-10 h-3 -rotate-[1.5deg] bg-[#FFD000]" />
                丸ごと自社へ。
              </span>
            </p>
            <span aria-hidden="true" className="h-px flex-1 bg-[#1a1a1a]" />
          </div>

        </div>
      </section>

      {/* ══ PC 黒CTA帯 ══════════════════════════════════════════════════ */}
      <a
        href={buildLineCtaHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINEで無料診断"
        onClick={trackLineClick}
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
            <span className="font-black text-[#1a1a1a]" style={{ fontSize: "19px" }}>LINEで無料診断</span>
            <span className="font-black text-[#1a1a1a]" style={{ fontSize: "17px" }}>›</span>
          </div>
        </div>
      </a>
    </>
  );
}
