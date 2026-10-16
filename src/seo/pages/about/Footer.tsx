import logoMark from "../../../assets/images/logos/logo-mark2.webp";
import { CONTRACTORS_LINK, NAV_ITEMS, OPERATOR_NAME } from "./data";

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f1] border-t-[6px] border-[#FFCC00]">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-10 pt-12 lg:pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-10 lg:gap-16">
          <div>
            <span className="block overflow-hidden w-[200px] h-[52px] relative">
              <img
                src={logoMark}
                alt="親方ドットコム"
                width={1536}
                height={1024}
                loading="lazy"
                className="absolute max-w-none h-[196px] w-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-[47%]"
              />
            </span>
            <p className="mt-5 text-[#333] text-[16px] leading-[1.9]">
              工事会社の集客を専門に支援する、
              <br />
              マーケティングサービスです。
            </p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <p className="text-[#111] font-black text-[16px] mb-4">サイトメニュー</p>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[#333] text-[16px] no-underline hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[#111] font-black text-[16px] mb-4">関連サイト</p>
            <ul className="space-y-3">
              {CONTRACTORS_LINK && (
                <li>
                  <a href={CONTRACTORS_LINK.href} className="text-[#333] text-[16px] no-underline hover:underline">
                    {CONTRACTORS_LINK.label}
                  </a>
                </li>
              )}
              <li>
                <a href="/" className="text-[#333] text-[16px] no-underline hover:underline">
                  無料診断のご案内
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-[#333] text-[16px] no-underline hover:underline">
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 pt-6 border-t border-[#d8d8d3] text-[#555] text-[16px]">
          運営会社：{OPERATOR_NAME}
        </p>
      </div>
    </footer>
  );
}
