import { useEffect, useState } from "react";

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
        href="#contact"
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
                カンタン&thinsp;
                <span style={{ color: "#D4A820", fontWeight: 900, fontSize: "13px" }}>1分</span>
                &thinsp;で入力完了
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
              className="flex items-center justify-center gap-1.5 bg-[#D4A820]"
              style={{ borderRadius: "6px", padding: "10px 8px" }}
            >
              <svg width="15" height="12" viewBox="0 0 28 22" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="25" height="19" rx="2.5" stroke="#111" strokeWidth="2.2" fill="none" />
                <polyline points="1.5,4.5 14,13.5 26.5,4.5" stroke="#111" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="font-black text-[#111]" style={{ fontSize: "13px", whiteSpace: "nowrap" }}>無料相談はこちら</span>
              <span className="font-black text-[#111]" style={{ fontSize: "12px" }}>›</span>
            </div>
          </div>

        </div>
      </a>
    </div>
  );
}
