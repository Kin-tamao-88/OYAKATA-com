import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";
import imgCase01 from "../assets/images/OC07/results-case01-30.png";
import imgCase02 from "../assets/images/OC07/results-case02-50.png";
import brushYellow from "../assets/images/ui/brush-yellow.webp";

const cases = [
  {
    num: "01",
    type: "外壁塗装会社",
    location: "埼玉県さいたま市",
    imageSrc: imgCase01,
    imageAlt: "外壁塗装会社の事例",
    inquiryBefore: "月 6",
    inquiryAfter: "月 14",
    salesBefore: "320",
    salesAfter: "715",
    period: "3ヶ月",
    comment: "元請け受注が安定して入るようになり、以前のような",
    commentUnderline: "仕事探しの不安がなくなりました。",
  },
  {
    num: "02",
    type: "内装リフォーム会社",
    location: "神奈川県横浜市",
    imageSrc: imgCase02,
    imageAlt: "内装リフォーム会社の事例",
    inquiryBefore: "月 10",
    inquiryAfter: "月 19",
    salesBefore: "420",
    salesAfter: "1050",
    period: "4ヶ月",
    comment: <>継続的に元請けの案件が入るようになり、<br /></>,
    commentUnderline: "売上が安定して、会社の体力がつきました。",
  },
];

export default function Section08() {
  return (
    <>
      <section className="bg-white pt-14 pb-12 lg:pt-[70px] lg:pb-[60px] relative overflow-hidden">

        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] relative z-10">

          {/* ── Header ── */}
          <div className="text-center mb-5 lg:mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src={logoHorizontal} alt="" aria-hidden="true" className="h-[52px] lg:h-[64px] w-auto object-contain mix-blend-multiply shrink-0" />
              <div>
                <span className="block text-[#D4A820] font-black leading-none text-[36px] lg:text-[52px]">07</span>
                <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
              </div>
              <div className="w-px h-10 bg-[#1a1a1a]" />
              <span className="text-[#1a1a1a] font-bold text-[16px]">導入実績・成果</span>
            </div>
            <div className="h-[2px] bg-gradient-to-r from-[#D4A820] to-[#1a1a1a] mt-3 mb-5" />
            <div className="relative overflow-hidden mb-4">
              <img src={brushYellow} alt="" aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[300%] object-cover pointer-events-none opacity-60" />
              <h2 className="relative z-10 text-[#1a1a1a] font-black leading-[1.2] text-[22px] lg:text-[46px]">
                元請け受注が安定すると、<br />
                経営はここまで変わります。
              </h2>
            </div>
            <p className="text-[#333] text-[13px] lg:text-[15px]">
              問い合わせが増えるだけではなく、<br className="lg:hidden" /><span className="text-[#D4A820] font-bold">継続的な元請け受注と売上アップ</span>を<br className="lg:hidden" />実現した事例をご紹介します。
            </p>
          </div>

          {/* ── Cases ── */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {cases.map((c, i) => (
              <div key={i} className="flex-1 border border-[#e0e0e0]">

                {/* SP: photo on top full width */}
                <div className="lg:hidden overflow-hidden h-[200px]">
                  <img src={c.imageSrc} alt={c.imageAlt} className="w-full h-full object-cover object-top" />
                </div>

                {/* PC: photo on left */}
                <div className="flex items-stretch">
                  <div className="hidden lg:block w-[42%] shrink-0 overflow-hidden">
                    <img src={c.imageSrc} alt={c.imageAlt} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 p-5 lg:p-7">

                    {/* Card header (shared) */}
                    <div className="flex items-center gap-3 mb-1">
                      <div className="bg-[#1a1a1a] px-2 py-0.5">
                        <span className="text-white font-black text-[10px]">事例{c.num}</span>
                      </div>
                      <span className="text-[#1a1a1a] font-black text-[16px] lg:text-[18px]">{c.type}</span>
                    </div>
                    <p className="text-[#333] font-bold text-[12px] lg:text-[13px] mb-4">{c.location}</p>

                    {/* ── SP metrics: big red numbers ── */}
                    <div className="lg:hidden">
                      <div className="border border-[#e0e0e0] overflow-hidden mb-3">
                        <div className="bg-[#1a1a1a] flex items-center gap-1.5 px-3 py-2">
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="8" cy="6" r="3" stroke="#D4A820" strokeWidth="1.3" />
                            <path d="M2 14 C2 10 4 9 8 9 C12 9 14 10 14 14" stroke="#D4A820" strokeWidth="1.3" fill="none" />
                          </svg>
                          <span className="text-[#D4A820] font-bold text-[11px]">問い合わせ数</span>
                        </div>
                        <div className="px-4 py-3 flex items-end gap-3">
                          <div>
                            <p className="text-[#aaa] text-[10px] font-bold mb-0.5">導入前</p>
                            <p className="text-[#aaa] font-black text-[18px] leading-none">{c.inquiryBefore}<span className="text-[11px] ml-0.5">件</span></p>
                          </div>
                          <span className="text-[#ccc] font-bold text-[20px] mb-1">→</span>
                          <div>
                            <p className="text-[#e33] text-[10px] font-bold mb-0.5">導入後</p>
                            <p className="text-[#e33] font-black text-[42px] leading-none">{c.inquiryAfter}<span className="text-[13px] ml-1">件</span></p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-[#e0e0e0] overflow-hidden mb-3">
                        <div className="bg-[#1a1a1a] flex items-center gap-1.5 px-3 py-2">
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="8" cy="8" r="6" stroke="#D4A820" strokeWidth="1.3" />
                            <path d="M4 8 L7 11 L12 5" stroke="#D4A820" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[#D4A820] font-bold text-[11px]">月商</span>
                        </div>
                        <div className="px-4 py-3 flex items-end gap-3">
                          <div>
                            <p className="text-[#aaa] text-[10px] font-bold mb-0.5">導入前</p>
                            <p className="text-[#aaa] font-black text-[18px] leading-none">{c.salesBefore}<span className="text-[11px] ml-0.5">万円</span></p>
                          </div>
                          <span className="text-[#ccc] font-bold text-[20px] mb-1">→</span>
                          <div>
                            <p className="text-[#e33] text-[10px] font-bold mb-0.5">導入後</p>
                            <p className="text-[#e33] font-black text-[42px] leading-none">{c.salesAfter}<span className="text-[13px] ml-1">万円</span></p>
                          </div>
                        </div>
                      </div>

                      <p className="text-[#555] text-[12px] font-bold text-right mb-3">
                        導入から <span className="text-[#D4A820] font-black text-[14px]">{c.period}</span> で達成
                      </p>
                    </div>

                    {/* ── PC metrics: original style ── */}
                    <div className="hidden lg:block">
                      <div className="border border-[#e0e0e0] p-3 lg:p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="8" cy="6" r="3" stroke="#1a1a1a" strokeWidth="1.3" />
                            <path d="M2 14 C2 10 4 9 8 9 C12 9 14 10 14 14" stroke="#1a1a1a" strokeWidth="1.3" fill="none" />
                          </svg>
                          <span className="text-[#1a1a1a] font-bold text-[12px]">問い合わせ数</span>
                        </div>
                        <div className="flex items-end gap-2">
                          <div>
                            <p className="text-[#555] text-[11px] font-bold">導入前</p>
                            <p className="text-[#1a1a1a] font-black text-[22px] lg:text-[26px]">{c.inquiryBefore}<span className="text-[12px] ml-1">件</span></p>
                          </div>
                          <span className="text-[#1a1a1a] font-bold text-[18px] mb-1">→</span>
                          <div>
                            <p className="text-[#e33] text-[10px] font-bold">導入後</p>
                            <p className="text-[#e33] font-black text-[30px] lg:text-[36px]">{c.inquiryAfter}<span className="text-[13px] ml-1">件</span></p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-[#e0e0e0] p-3 lg:p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="8" cy="8" r="6" stroke="#1a1a1a" strokeWidth="1.3" />
                            <path d="M4 8 L7 11 L12 5" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[#1a1a1a] font-bold text-[12px]">月商</span>
                        </div>
                        <div className="flex items-end gap-2">
                          <div>
                            <p className="text-[#555] text-[11px] font-bold">導入前</p>
                            <p className="text-[#1a1a1a] font-black text-[18px] lg:text-[22px]">{c.salesBefore}<span className="text-[12px] ml-0.5">万円</span></p>
                          </div>
                          <span className="text-[#1a1a1a] font-bold text-[18px] mb-1">→</span>
                          <div>
                            <p className="text-[#e33] text-[10px] font-bold">導入後</p>
                            <p className="text-[#e33] font-black text-[30px] lg:text-[40px]">{c.salesAfter}<span className="text-[14px] ml-0.5">万円</span></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comment (shared) */}
                    <p className="text-[#1a1a1a] text-[13px] leading-[1.8]">
                      {c.comment}
                      <span className="border-b-2 border-[#D4A820]">{c.commentUnderline}</span>
                    </p>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Bottom CTA bar ── */}
      <div className="bg-[#1a1a1a] max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-5 px-5 py-7 lg:flex-row lg:items-center lg:px-[68px] lg:py-8 lg:gap-8">
          <p className="text-white font-bold text-[17px] lg:text-[20px] flex-1 leading-[1.7]">
            2000社を超える支援実績から、<br />
            業種や地域に合わせた<span className="text-[#D4A820]">最適な施策</span>をご提案します。
          </p>
          <a href="#contact" className="flex flex-col items-center bg-[#D4A820] px-8 py-4 no-underline self-start lg:self-auto">
            <span className="text-[#1a1a1a] text-[11px] font-bold mb-1">毎月5社まで</span>
            <div className="flex items-center gap-2">
              <span className="text-[#1a1a1a] font-black text-[16px] whitespace-nowrap">まずは無料相談する</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9 H14 M9 4 L14 9 L9 14" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
