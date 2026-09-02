import { useEffect, useState } from "react";
import { trackLineClick } from "../lib/analytics";

export default function ScrollCtaSp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTrigger = document.getElementById("scroll-cta-trigger");
    const hideTrigger = document.getElementById("scroll-cta-hide-trigger");
    if (!showTrigger || !hideTrigger) return;

    let pastSection02 = false;
    let nearSection09 = false;
    const update = () => setVisible(pastSection02 && !nearSection09);

    const showObserver = new IntersectionObserver(
      ([entry]) => {
        pastSection02 = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 }
    );

    const hideObserver = new IntersectionObserver(
      ([entry]) => {
        // トリガーが画面内 or すでに上に通過済み → 非表示維持
        nearSection09 = entry.isIntersecting || entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 }
    );

    showObserver.observe(showTrigger);
    hideObserver.observe(hideTrigger);
    return () => {
      showObserver.disconnect();
      hideObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="https://lin.ee/yFZ5vjU"
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackLineClick}
        className="relative block bg-[#111] rounded-xl overflow-hidden no-underline"
        style={{ textDecoration: "none" }}
      >
        {/* 四隅ゴールド三角 */}
        <div
          className="absolute top-0 left-0 w-[36px] h-[36px] bg-[#D4A820] pointer-events-none"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[36px] h-[36px] bg-[#D4A820] pointer-events-none"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />

        {/* 本体 */}
        <div className="relative z-10 flex items-center gap-3 px-4 py-4">

          {/* 左：ロゴ＋見出し */}
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <svg width="34" height="34" viewBox="0 0 54 54" fill="none" className="flex-shrink-0 mt-0.5">
              <polygon
                points="27,3.5 49.5,15.5 49.5,38.5 27,50.5 4.5,38.5 4.5,15.5"
                stroke="#D4A820" strokeWidth="2.2" fill="none"
              />
              <text
                x="27" y="34" textAnchor="middle" fill="#fff"
                fontSize="19" fontWeight="900"
                fontFamily="Hiragino Kaku Gothic ProN,Hiragino Sans,Yu Gothic,sans-serif"
              >親</text>
            </svg>
            <div>
              <p className="text-white font-black leading-tight m-0" style={{ fontSize: "14px" }}>
                まずはお気軽に<br />ご相談ください。
              </p>
              <div className="bg-[#D4A820] mt-1.5" style={{ width: "100%", height: "2px" }} />
            </div>
          </div>

          {/* 右：バッジ＋ボタン */}
          <div className="flex flex-col items-stretch flex-shrink-0 gap-2" style={{ width: "148px" }}>
            {/* バッジ */}
            <div className="relative flex justify-center">
              <div
                className="text-center"
                style={{
                  backgroundColor: "#252525",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  lineHeight: 1.4,
                }}
              >
                LINEならカンタン&thinsp;
                <span style={{ color: "#f5a623", fontWeight: 900, fontSize: "13px" }}>1分</span>
                &thinsp;で相談
              </div>
              <div
                className="absolute left-1/2"
                style={{
                  bottom: "-6px",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "6px solid #252525",
                }}
              />
            </div>

            {/* CTAボタン */}
            <div
              className="flex items-center justify-center gap-1.5 bg-[#FFD000] hover:brightness-95 active:brightness-95 transition-all"
              style={{ borderRadius: "6px", padding: "10px 8px" }}
            >
              <span
                className="flex items-center justify-center flex-shrink-0 rounded-full"
                style={{ width: "18px", height: "18px", backgroundColor: "#fff" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" role="img" aria-label="LINE" fill="#06C755">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </span>
              <span className="font-black text-[#1a1a1a]" style={{ fontSize: "13px", whiteSpace: "nowrap" }}>LINEで無料相談</span>
              <span className="font-black text-[#1a1a1a]" style={{ fontSize: "12px" }}>›</span>
            </div>
          </div>

        </div>
      </a>
    </div>
  );
}
