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
  const [pastFv, setPastFv] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const fv = document.getElementById("fv");
    const form = document.getElementById("contact-form");
    if (!fv || !form || typeof IntersectionObserver === "undefined") return;
    const fvObserver = new IntersectionObserver(([entry]) => setPastFv(!entry.isIntersecting));
    const formObserver = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting));
    fvObserver.observe(fv);
    formObserver.observe(form);
    return () => {
      fvObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  const visible = pastFv && !formInView && !menuOpen;

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
