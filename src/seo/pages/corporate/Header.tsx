import { IMG } from "./assets";
import { Arrow } from "./icons";

const NAV_ITEMS = [
  { label: "私たちについて", href: "#mission" },
  { label: "事業内容", href: "#service" },
  { label: "選ばれる理由", href: "#strength" },
];

/** ロゴ(横組み・余白付き画像)を本体部分だけ切り出して表示する */
export function Logo() {
  return (
    <a href="/corporate" className="block relative h-[40px] w-[157px] lg:h-[46px] lg:w-[181px] overflow-hidden shrink-0" aria-label="親方ドットコム">
      <img
        src={IMG.logo}
        alt="親方ドットコム"
        className="absolute max-w-none h-auto w-[234px] -left-[37px] -top-[51px] lg:w-[270px] lg:-left-[43px] lg:-top-[59px]"
      />
    </a>
  );
}

type Props = {
  /** SPメニューの開閉。SP固定CTAと重ならないよう、状態は親(Content)が持つ */
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function Header({ open, onOpenChange }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#111]">
      <div className="flex items-center justify-between h-[64px] lg:h-[76px] pl-5 lg:pl-[max(40px,calc((100vw-1280px)/2))]">
        <Logo />

        <nav className="hidden lg:flex items-center gap-11" aria-label="メインメニュー">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 text-[#111] font-bold text-[16px] border-b-[3px] border-transparent hover:border-[#ffd400] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden lg:flex self-stretch items-center gap-5 px-9 bg-[#111] text-white font-black text-[16px] hover:bg-[#ffd400] hover:text-[#111] transition-colors"
        >
          お問い合わせ
          <Arrow className="w-5" />
        </a>

        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          aria-expanded={open}
          aria-controls="corp-sp-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          className="lg:hidden flex flex-col items-stretch justify-center gap-[6px] w-16 h-16 px-5 bg-[#111]"
        >
          <span className={`block h-[2px] bg-white transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`} />
          <span className={`block h-[2px] bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] bg-white transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav
          id="corp-sp-menu"
          className="lg:hidden absolute top-full inset-x-0 max-h-[calc(100vh-64px)] overflow-y-auto bg-[#111] px-5 pt-2 pb-7"
          aria-label="モバイルメニュー"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-between min-h-[60px] border-b border-[#555] text-white font-black text-[18px]"
            >
              {item.label}
              <Arrow className="text-[#ffd400]" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => onOpenChange(false)}
            className="mt-6 flex items-center justify-between h-[58px] px-7 bg-[#ffd400] text-[#111] font-black text-[16px]"
          >
            お問い合わせ
            <Arrow />
          </a>
        </nav>
      )}
    </header>
  );
}
