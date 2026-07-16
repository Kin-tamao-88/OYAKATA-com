export default function Section03() {
  return (
    <section className="bg-white py-14 lg:py-[80px]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        {/* ── Section Header ── */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[#D4A820] font-black text-[13px]">03</span>
          <div className="w-6 h-[2px] bg-[#D4A820]" />
          <span className="text-[#555] font-medium text-[13px]">共感</span>
        </div>

        {/* ── Main 2-column ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 mb-12 lg:mb-16">
          {/* Left: Heading + body */}
          <div className="flex-1">
            <h2 className="text-[#1a1a1a] font-black leading-[1.25] mb-6 text-[36px] lg:text-[54px]">
              下請けばかりの経営、<br />
              <span style={{ borderBottom: "6px solid #D4A820", paddingBottom: "2px" }}>続けていませんか？</span>
            </h2>
            <p className="text-[#1a1a1a] text-[16px] leading-[2]">
              元請けを増やしたいと思いながらも、<br />
              日々の業務に追われて、なかなか前に進めない。<br />
              そんな工事業者様からのご相談が増えています。
            </p>
          </div>
          {/* Right: Photo */}
          <div className="relative w-full lg:w-[46%] lg:shrink-0">
            <img
              src="/images/empathy-craftsman.jpg"
              alt="悩む工事業者"
              className="w-full object-cover"
              style={{ minHeight: "240px" }}
            />
            <div
              className="absolute top-4 right-4 bg-white font-bold text-[#1a1a1a] text-[14px] leading-snug px-4 py-2"
              style={{ border: "1px solid #ddd" }}
            >
              このままだと、<br />
              先が見えない…
            </div>
          </div>
        </div>

        {/* ── Pain Points ── */}
        <h3 className="text-[#1a1a1a] font-black text-[20px] lg:text-[22px] mb-6">
          こんな<span className="text-[#D4A820]">お悩み</span>はありませんか？
        </h3>

        {/* SP: 2×2 grid / PC: 4-col flex with arrows */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {[
            { num: "01", title: "仕事が減る", body: "元請け案件が取れず、下請けや単価の安い仕事に頼らざるを得ない。" },
            { num: "02", title: "利益が減る", body: "利益率が下がり、人件費や材料費の高騰でさらに経営を圧迫する。" },
            { num: "03", title: "広告を出せない", body: "広告や集客に予算をかけられず、新しい出会いが生まれない。", gold: true },
            { num: "04", title: "さらに仕事が減る", body: "出会いがないから元請け案件も増えず、また仕事が減っていく。" },
          ].map((c, i) => (
            <div key={i} className="bg-[#1a1a1a] flex flex-col">
              <div
                className="px-3 pt-2 pb-2 text-center"
                style={{ backgroundColor: c.gold ? "#D4A820" : "#111", borderBottom: c.gold ? "1px solid #c49810" : "1px solid #333" }}
              >
                <span className={`font-bold text-[10px] block ${c.gold ? "text-[#1a1a1a]" : "text-[#D4A820]"}`}>{c.num}</span>
                <p className={`font-black text-[14px] leading-tight ${c.gold ? "text-[#1a1a1a]" : "text-white"}`}>{c.title}</p>
              </div>
              <div className="flex-1 px-3 py-4">
                <p className="text-white text-[12px] leading-[1.8]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PC: flex with arrows */}
        <div className="hidden lg:flex items-stretch gap-0">

          {[
            { num: "01", title: "仕事が減る", body: "元請け案件が取れず、下請けや単価の安い仕事に頼らざるを得ない。", gold: false },
            { num: "02", title: "利益が減る", body: "利益率が下がり、人件費や材料費の高騰でさらに経営を圧迫する。", gold: false },
            { num: "03", title: "広告を出せない", body: "広告や集客に予算をかけられず、新しい出会いが生まれない。", gold: true },
            { num: "04", title: "さらに仕事が減る", body: "出会いがないから元請け案件も増えず、また仕事が減っていく。", gold: false },
          ].map((c, i) => (
            <div key={i} className="contents">
              <div className="flex-1 bg-[#1a1a1a] flex flex-col">
                <div
                  className="px-4 pt-3 pb-3 text-center"
                  style={{ backgroundColor: c.gold ? "#D4A820" : "#111", borderBottom: c.gold ? "1px solid #c49810" : "1px solid #333" }}
                >
                  <span className={`font-bold text-[11px] block ${c.gold ? "text-[#1a1a1a]" : "text-[#D4A820]"}`}>{c.num}</span>
                  <p className={`font-black text-[18px] leading-tight ${c.gold ? "text-[#1a1a1a]" : "text-white"}`}>{c.title}</p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                  <p className="text-white text-[13px] leading-[1.8] text-center">{c.body}</p>
                </div>
              </div>
              {i < 3 && (
                <div className="flex items-center px-2 bg-white">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    <path d="M2 11 H16 M11 5 L18 11 L11 17" stroke="#D4A820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}

        </div>

        {/* ── Conclusion ── */}
        <div className="text-center mt-8">
          <div className="flex justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2 L10 16 M4 10 L10 16 L16 10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[#1a1a1a] font-black text-[16px] lg:text-[18px]">
            負の連鎖から抜け出し、<span className="text-[#D4A820]">元請け案件を増やす仕組み</span>が必要です。
          </p>
        </div>

      </div>
    </section>
  );
}
