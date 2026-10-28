import "./corporate.css";
import Contact from "./Contact";
import Fv from "./Fv";
import Header from "./Header";
import Mission from "./Mission";
import Partners from "./Partners";
import Service from "./Service";
import Strength from "./Strength";

/** 法人公式サイト /corporate。LP(/)とは別の見た目・別の部品で構成する。 */
export default function CorporateContent() {
  return (
    <div className="bg-white text-[#111] font-['Noto_Sans_JP'] [word-break:auto-phrase]">
      <Header />
      <main>
        <Fv />
        <Mission />
        <Service />
        <Strength />
        <Partners />
        <Contact />
      </main>
    </div>
  );
}
