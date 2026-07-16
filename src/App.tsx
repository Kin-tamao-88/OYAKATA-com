import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Section01 from "./sections/Section01";
import Section02 from "./sections/Section02";
import Section03 from "./sections/Section03";
import Section04 from "./sections/Section04";
import Section05 from "./sections/Section05";
import Section06 from "./sections/Section06";
import Section07 from "./sections/Section07";
import Section08 from "./sections/Section08";

export default function App() {
  return (
    <>
      {/* Hero・HeaderはPC固定レイアウト維持 */}
      <div className="min-w-[960px]">
        <Header />
        <Hero />
      </div>
      {/* Section01以降はSP対応 */}
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Section06 />
      <Section07 />
      <Section08 />
    </>
  );
}
