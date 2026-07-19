const consultItems = [
  {
    label: "元請け案件が\n増えない原因",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="12" stroke="#D4A820" strokeWidth="2.5" />
        <line x1="29" y1="29" x2="41" y2="41" stroke="#D4A820" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="15" y1="20" x2="25" y2="20" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="15" x2="20" y2="25" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "地域・競合の\n集客状況",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="30" width="8" height="12" fill="#D4A820" />
        <rect x="20" y="22" width="8" height="20" fill="#D4A820" />
        <rect x="34" y="14" width="8" height="28" fill="#D4A820" />
        <path d="M10 30 L24 22 L38 14" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" />
        <path d="M36 10 L42 6 M39 10 L42 6 L42 13" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "優先して取り組む\nべき施策",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="10" width="32" height="22" rx="2" stroke="#D4A820" strokeWidth="2.5" />
        <line x1="20" y1="32" x2="28" y2="32" stroke="#D4A820" strokeWidth="2.5" />
        <line x1="24" y1="32" x2="24" y2="38" stroke="#D4A820" strokeWidth="2.5" />
        <rect x="14" y="17" width="5" height="10" rx="1" fill="#D4A820" opacity="0.6" />
        <rect x="21" y="21" width="5" height="6" rx="1" fill="#D4A820" opacity="0.7" />
        <rect x="28" y="14" width="5" height="13" rx="1" fill="#D4A820" />
      </svg>
    ),
  },
  {
    label: "今後の集客戦略の\n方向性",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="15" stroke="#D4A820" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="9" stroke="#D4A820" strokeWidth="1.5" opacity="0.55" />
        <circle cx="24" cy="24" r="3.5" fill="#D4A820" />
        <path d="M30 14 L37 8" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" />
        <path d="M33 8 L37 8 L37 12" stroke="#D4A820" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const trustItems = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3 C14 3 6 6.5 6 12.5 L6 18 C6 22 9.5 25.5 14 27 C18.5 25.5 22 22 22 18 L22 12.5 C22 6.5 14 3 14 3 Z" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M9.5 14 L13 17.5 L19 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "相談無料",
    detail: "無理な営業は一切しません",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="22" height="14" rx="2" stroke="white" strokeWidth="1.5" />
        <line x1="9" y1="23" x2="19" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="19" x2="14" y2="23" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    title: "オンライン対応",
    detail: "全国どこからでもご相談いただけます",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 5 H23 Q25 5 25 7 V16 Q25 18 23 18 H16 L12 22 V18 H5 Q3 18 3 16 V7 Q3 5 5 5 Z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <text x="14" y="14.5" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">24h</text>
      </svg>
    ),
    title: "下記フォーム送信後",
    detail: <span className="inline-block bg-[#06C755] text-white font-black text-[13px] lg:text-[14px] px-3 py-[3px] mt-0.5">LINEで24時間相談可能</span>,
  },
];

import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";
import sectionPhoto from "../assets/images/OC09/oc09-consal.webp";

export default function Section09() {
  return (
    <section className="bg-white overflow-hidden">

      {/* ── 上部：テキスト左 ＋ 写真右 ── */}
      <div>

        {/* SP：写真バナー */}
        <div className="lg:hidden relative h-[200px] overflow-hidden">
          <img src={sectionPhoto} alt="" aria-hidden="true" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        {/* PC：コンテナ内で絶対配置（コンテナ幅に収める） */}
        <div className="max-w-[1280px] mx-auto relative lg:min-h-[500px]">

          {/* 写真（右・絶対配置） */}
          <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[50%] z-0">
            <img src={sectionPhoto} alt="" aria-hidden="true" className="w-full h-full object-cover object-[40%_center]" />
            <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-white to-transparent pointer-events-none" />
          </div>

          {/* テキストコンテンツ */}
          <div className="px-5 pt-8 pb-10 lg:pl-[68px] lg:pr-8 lg:pt-[70px] lg:pb-[80px] lg:max-w-[57%] relative z-10">

            {/* セクションヘッダー（他セクション同様ロゴ配置） */}
            <div className="flex items-center gap-4 mb-8 lg:mb-10">
              <img
                src={logoHorizontal}
                alt=""
                aria-hidden="true"
                className="h-[44px] lg:h-[56px] w-auto object-contain mix-blend-multiply shrink-0"
              />
              <div>
                <span className="block text-[#D4A820] font-black leading-none text-[30px] lg:text-[44px]">09</span>
                <div className="w-8 h-[3px] bg-[#D4A820] mt-1" />
              </div>
              <div className="w-px h-9 bg-[#1a1a1a]" />
              <span className="text-[#1a1a1a] font-bold text-[13px] lg:text-[15px]">ご相談後のサポート体制</span>
            </div>
            <div className="h-[2px] bg-gradient-to-r from-[#D4A820] to-[#1a1a1a] mt-3 mb-5" />

            {/* H2 */}
            <h2 className="text-[#1a1a1a] font-black leading-[1.25] mb-6 text-[22px] lg:text-[42px]">
              何から始めるべきか<br />
              <span className="text-[#D4A820] border-b-[4px] lg:border-b-[6px] border-[#D4A820] pb-[2px]">無料でご提案</span>します。
            </h2>

            {/* ボディ */}
            <p className="text-[#1a1a1a] text-[13px] lg:text-[16px] leading-[1.9]">
              現在抱える貴社の課題、集客状況や地域性を確認し、<br />
              受注を増やすための改善策をご提案します。
            </p>

          </div>
        </div>

      </div>

      {/* ── 無料相談で分かること ── */}
      <div className="bg-[#1a1a1a] relative">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] py-10 lg:py-14">

          {/* 上端ゴールドライン */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400" />
          {/* 下端ゴールドライン */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400" />

          {/* ヘッダー */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-[#D4A820] opacity-50" />
            <span className="text-white font-bold text-[14px] lg:text-[16px] whitespace-nowrap">無料相談で分かること</span>
            <div className="flex-1 h-px bg-[#D4A820] opacity-50" />
          </div>

          {/* 4カラム */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-[#333] lg:divide-y-0 lg:divide-x lg:divide-[#333]">
            {consultItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-5 px-4 py-8 lg:px-8 lg:py-2">
                <div>{item.icon}</div>
                <p className="text-white text-[13px] lg:text-[14px] text-center leading-[1.85] whitespace-pre-line">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── 安心してご相談ください ── */}
      <div className="bg-white">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-[68px] pt-7 pb-3 lg:py-10">

          {/* ヘッダー */}
          <div className="flex items-center gap-4 mb-6 lg:mb-8">
            <div className="flex-1 h-px bg-[#D4A820] opacity-50" />
            <span className="text-[#D4A820] font-bold text-[14px] lg:text-[16px] whitespace-nowrap">安心してご相談ください</span>
            <div className="flex-1 h-px bg-[#D4A820] opacity-50" />
          </div>

          {/* 3アイテム */}
          <div className="flex flex-col lg:flex-row divide-y divide-[#e8e8e8] lg:divide-y-0 lg:divide-x lg:divide-[#e8e8e8]">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-5 py-5 lg:flex-col lg:items-center lg:text-center lg:px-10 lg:py-3 flex-1">
                <div className="w-[52px] h-[52px] bg-[#1a1a1a] rounded-full border-2 border-[#D4A820] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[#1a1a1a] font-black text-[15px] lg:text-[16px] leading-[1.6]">{item.title}</p>
                  <p className="text-[#1a1a1a] font-black text-[14px] lg:text-[15px] mt-1 leading-[1.6]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
