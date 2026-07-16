export default function Section04() {
  const problems = [
    {
      num: "01",
      title: "利益が残らない",
      body: "下請け案件は単価が低く、人件費や材料費を引くと利益がほとんど残らない。",
      icon: (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <rect x="2" y="18" width="7" height="14" fill="white" />
          <rect x="12" y="12" width="7" height="20" fill="white" />
          <rect x="22" y="6" width="7" height="26" fill="white" />
          <path d="M4 30 L34 36" stroke="#D4A820" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M29 34 L34 36 L32 40" stroke="#D4A820" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "仕事が不安定",
      body: "元請けからの依頼が止まると、仕事が一気に減ってしまう。",
      icon: (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M8 26 Q8 10 18 9 Q28 10 28 26" stroke="white" strokeWidth="1.8" fill="none" />
          <line x1="5" y1="26" x2="31" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="27" cy="28" r="8" stroke="#D4A820" strokeWidth="1.8" fill="none" />
          <path d="M27 24 L27 29 L30 29" stroke="#D4A820" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "営業する時間がない",
      body: "現場が忙しく、見積りや事務作業に追われ、新しい元請けを探す時間が取れない。",
      icon: (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M4 18 Q10 8 18 8 Q24 8 28 14" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M8 22 Q12 28 18 28 Q24 28 28 22" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <line x1="6" y1="6" x2="30" y2="30" stroke="#D4A820" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "紹介・つながりに依存してしまう",
      body: "新しい出会いが生まれず、いつまでも同じ下請け案件の繰り返し。",
      icon: (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="12" cy="10" r="5" stroke="white" strokeWidth="1.8" />
          <path d="M2 28 C2 20 6 17 12 17 C18 17 22 20 22 28" stroke="white" strokeWidth="1.8" fill="none" />
          <circle cx="26" cy="10" r="5" stroke="white" strokeWidth="1.8" strokeDasharray="3 2" />
          <path d="M29 22 L35 28 M35 22 L29 28" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#f7f7f7] py-14 lg:py-[80px]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px]">

        {/* ── Section Header (centered) ── */}
        <div className="text-center mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[#D4A820] font-black text-[13px]">04</span>
            <div className="w-6 h-[2px] bg-[#D4A820]" />
            <span className="text-[#555] font-medium text-[12px] tracking-widest">WHAT'S THE PROBLEM?</span>
          </div>
          <h2 className="text-[#1a1a1a] font-black leading-[1.2] mb-4 text-[32px] lg:text-[52px]">
            下請けだけでは、<br />
            <span style={{ borderBottom: "6px solid #D4A820", paddingBottom: "2px" }}>会社は大きくならない。</span>
          </h2>
          <p className="text-[#555] text-[15px]">多くの工事業者が、同じ悩みに直面しています。</p>
        </div>

        {/* ── SP: Photo on top / PC: 2-column ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12 mt-8 lg:mt-12">

          {/* SP: image first for visual impact; PC: right side */}
          <div className="relative w-full lg:hidden" style={{ minHeight: "240px" }}>
            <img
              src="/images/problem-paintroller.jpg"
              alt="ペイントローラーで壁を塗る職人"
              className="w-full h-full object-cover"
              style={{ minHeight: "240px" }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <p className="font-black leading-[1.3] text-center px-6 text-[28px]">
                <span className="text-white">このままでは、</span><br />
                <span className="text-[#D4A820]">将来の不安は<br />消えません。</span>
              </p>
            </div>
          </div>

          {/* Left: Problem list */}
          <div className="flex-1 flex flex-col justify-center">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start gap-4 py-5 lg:py-7" style={{ borderBottom: i < problems.length - 1 ? "1px solid #ddd" : "none" }}>
                <div className="w-[52px] h-[52px] rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#D4A820] font-bold text-[12px]">{p.num}</span>
                    <span className="text-[#1a1a1a] font-black text-[17px] lg:text-[20px]">{p.title}</span>
                  </div>
                  <p className="text-[#1a1a1a] text-[14px] lg:text-[15px] leading-[1.8]">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Photo (PC only) */}
          <div className="hidden lg:block lg:w-[46%] lg:shrink-0 relative">
            <img
              src="/images/problem-paintroller.jpg"
              alt="ペイントローラーで壁を塗る職人"
              className="w-full h-full object-cover"
              style={{ minHeight: "500px" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-black leading-[1.3] text-center px-8" style={{ fontSize: "36px" }}>
                <span className="text-white">このままでは、</span><br />
                <span className="text-[#D4A820]">将来の不安は<br />消えません。</span>
              </p>
            </div>
          </div>

        </div>

        {/* ── Conclusion ── */}
        <div className="text-center mt-10 lg:mt-12">
          <div className="flex justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2 L10 16 M4 10 L10 16 L16 10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[#1a1a1a] font-black text-[16px] lg:text-[18px]">
            変わるためには、<span className="text-[#D4A820]">元請け案件を増やせる仕組み</span>が必要です。
          </p>
        </div>

      </div>
    </section>
  );
}
