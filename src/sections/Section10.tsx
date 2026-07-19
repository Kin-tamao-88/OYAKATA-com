export default function Section10() {
  return (
    <section className="bg-[#f5f5f5] py-16 lg:py-24">
      <div className="max-w-[960px] mx-auto px-5 lg:px-8">

        {/* ── カード ── */}
        <div className="bg-white border border-[#e0e0e0] rounded-2xl overflow-hidden">

          {/* ── カードヘッダー（黒帯） ── */}
          <div className="bg-[#1a1a1a] px-7 lg:px-12 py-6 lg:py-7 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 lg:gap-5 min-w-0 w-full lg:w-auto">
              <div className="min-w-0 text-center lg:text-left w-full lg:w-auto">
                <h2 className="text-white font-black leading-none text-[24px] lg:text-[36px] whitespace-nowrap">
                  無料相談フォーム
                </h2>
                <p className="text-[#aaaaaa] text-[11px] lg:text-[13px] mt-1.5 leading-none">
                  元請け案件を増やすための第一歩です。
                </p>
              </div>
            </div>
            <span className="hidden lg:block text-[#D4A820] font-medium text-[13px] whitespace-nowrap shrink-0">
              Marketing Consultation
            </span>
          </div>

          {/* ── フォームエリア ── */}
          <div className="px-7 lg:px-12 pt-8 pb-10 lg:pt-10 lg:pb-12">

            {/* リードテキスト */}
            <p className="text-[#1a1a1a] text-[14px] lg:text-[15px] leading-[1.85] mb-8 lg:mb-10">
              現在の集客状況やお悩みをお聞かせください。<br />
              元請け案件を増やすための改善ポイントを無料でご提案いたします。
            </p>

            {/* フォームグリッド */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-7">

              {/* 会社名 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px]">会社名</label>
                  <span className="bg-[#D4A820] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">必須</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="1" y="4" width="14" height="11" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M5 15V10h6v5" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="3.5" y="6.5" width="2.5" height="2" rx="0.4" stroke="currentColor" strokeWidth="1" />
                      <rect x="10" y="6.5" width="2.5" height="2" rx="0.4" stroke="currentColor" strokeWidth="1" />
                      <path d="M1 7.5h14" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="株式会社○○建設"
                    className="w-full pl-10 pr-4 py-3 border border-[#ddd] rounded-lg text-[14px] lg:text-[15px] text-[#1a1a1a] placeholder-[#c0c0c0] focus:outline-none focus:border-[#D4A820]"
                  />
                </div>
              </div>

              {/* ご担当者名 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px]">ご担当者名</label>
                  <span className="bg-[#D4A820] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">必須</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="5" r="2.8" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M2 14c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="例）山田 太郎"
                    className="w-full pl-10 pr-4 py-3 border border-[#ddd] rounded-lg text-[14px] lg:text-[15px] text-[#1a1a1a] placeholder-[#c0c0c0] focus:outline-none focus:border-[#D4A820]"
                  />
                </div>
              </div>

              {/* 電話番号 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px]">電話番号</label>
                  <span className="bg-[#D4A820] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">必須</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 2h3l1.5 3.5-1.8 1.8S7 10 9 11.3l1.8-1.8L14 11v3H13C7.5 14 2 8.5 2 3V2h1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    type="tel"
                    placeholder="例）090-1234-5678"
                    className="w-full pl-10 pr-4 py-3 border border-[#ddd] rounded-lg text-[14px] lg:text-[15px] text-[#1a1a1a] placeholder-[#c0c0c0] focus:outline-none focus:border-[#D4A820]"
                  />
                </div>
              </div>

              {/* メールアドレス */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px]">メールアドレス</label>
                  <span className="bg-[#D4A820] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">必須</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M1 5.5l7 5 7-5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="例）info@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-[#ddd] rounded-lg text-[14px] lg:text-[15px] text-[#1a1a1a] placeholder-[#c0c0c0] focus:outline-none focus:border-[#D4A820]"
                  />
                </div>
              </div>

              {/* お住まいの地域 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px]">お住まいの地域</label>
                  <span className="bg-[#D4A820] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">必須</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" stroke="currentColor" strokeWidth="1.3" />
                      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                  <select
                    defaultValue=""
                    className="w-full pl-10 pr-10 py-3 border border-[#ddd] rounded-lg text-[14px] lg:text-[15px] text-[#c0c0c0] appearance-none bg-white focus:outline-none focus:border-[#D4A820]"
                  >
                    <option value="" disabled>選択してください</option>
                    <option value="hokkaido" className="text-[#1a1a1a]">北海道</option>
                    <option value="tohoku" className="text-[#1a1a1a]">東北</option>
                    <option value="kanto" className="text-[#1a1a1a]">関東</option>
                    <option value="chubu" className="text-[#1a1a1a]">中部</option>
                    <option value="kinki" className="text-[#1a1a1a]">近畿</option>
                    <option value="chugoku" className="text-[#1a1a1a]">中国・四国</option>
                    <option value="kyushu" className="text-[#1a1a1a]">九州・沖縄</option>
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] pointer-events-none">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <path d="M2.5 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* ご相談内容 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px]">ご相談内容</label>
                  <span className="bg-[#999999] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">任意</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-[#c0c0c0] pointer-events-none">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                      <path d="M10 2l3 3-8.5 8.5H1v-3.5L10 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                      <path d="M8.5 3.5l3 3" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                  <textarea
                    rows={5}
                    placeholder={"現在の集客状況やお悩み、\nご相談したい内容をご自由にご記入ください。"}
                    className="w-full pl-10 pr-4 py-3 border border-[#ddd] rounded-lg text-[14px] lg:text-[15px] text-[#1a1a1a] placeholder-[#c0c0c0] resize-none focus:outline-none focus:border-[#D4A820]"
                  />
                </div>
              </div>

            </div>

            {/* 区切り線 */}
            <div className="border-t border-[#e8e8e8] mt-8 lg:mt-10 mb-7 lg:mb-8" />

            {/* CTAボタン */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full max-w-[600px] bg-[#D4A820] hover:bg-[#c49718] transition-colors text-white font-black text-[19px] lg:text-[22px] py-5 rounded-xl flex items-center justify-center gap-3"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <rect x="1" y="4" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8" />
                  <path d="M1 7.5l10 7 10-7" stroke="white" strokeWidth="1.8" />
                </svg>
                無料相談を申し込む
                <span className="text-[22px] leading-none">›</span>
              </button>
            </div>

            {/* サブテキスト */}
            <p className="text-center text-[#999] text-[12px] lg:text-[13px] mt-3">1営業日以内にご連絡します。</p>

          </div>
        </div>
      </div>
    </section>
  );
}
