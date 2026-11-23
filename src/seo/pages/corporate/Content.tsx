import { useEffect, useState } from "react";
import "./corporate.css";
import Contact from "./Contact";
import Footer from "./Footer";
import Fv from "./Fv";
import Header from "./Header";
import Mission from "./Mission";
import Partners from "./Partners";
import Service from "./Service";
import Strength from "./Strength";

/**
 * SP下部の固定CTA。
 * FVを通過したら表示し、問い合わせフォームが画面内にある間と、SPメニューを開いている間は隠す。
 */
function StickyCta({ menuOpen }: { menuOpen: boolean }) {
  // 表示条件(FV通過後・フォームが画面外)は、スクロール位置から毎回直接計算する。
  // IntersectionObserver は通知の遅れで表示が揺れることがあったため使わない。
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    const fv = document.getElementById("fv");
    const form = document.getElementById("contact-form");
    if (!fv || !form) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const pastFv = fv.getBoundingClientRect().bottom <= 0;
      const formRect = form.getBoundingClientRect();
      const formInView = formRect.top < window.innerHeight && formRect.bottom > 0;
      setInRange(pastFv && !formInView);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // 画像の読み込みでレイアウトが動いた場合も判定し直す
    window.addEventListener("load", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, []);

  const visible = inRange && !menuOpen;

  return (
    <div
      aria-hidden={!visible}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 flex items-center gap-[10px] bg-[#111] px-3 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] transition-transform duration-200 ${visible ? "translate-y-0" : "translate-y-[110%]"}`}
    >
      <p className="shrink-0 text-white font-bold text-[13px] leading-[1.45]">
        法人・企業の<br />ご相談はこちら
      </p>
      <a
        href="#contact-form"
        tabIndex={visible ? 0 : -1}
        className="flex flex-1 items-center justify-center h-[50px] bg-[#ffd400] text-[#111] font-black text-[16px]"
      >
        お問い合わせ
      </a>
    </div>
  );
}

/** 法人公式サイト /corporate。LP(/)とは別の見た目・別の部品で構成する。 */
export default function CorporateContent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="corp-root bg-white text-[#111] font-['Noto_Sans_JP'] font-medium [word-break:auto-phrase] [&_p]:[text-wrap:pretty]">
      <Header open={menuOpen} onOpenChange={setMenuOpen} />
      <main>
        <Fv />
        <Mission />
        <Service />
        <Strength />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <StickyCta menuOpen={menuOpen} />
    </div>
  );
}
