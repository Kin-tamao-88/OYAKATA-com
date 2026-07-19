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
import Section09 from "./sections/Section09";
import Section10 from "./sections/Section10";
import ScrollCtaSp from "./sections/ScrollCtaSp";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <div id="s01" className="scroll-mt-[56px]"><Section01 /></div>
      <div id="s02" className="scroll-mt-[56px]"><Section02 /></div>
      <div id="scroll-cta-trigger" />
      <div id="s03" className="scroll-mt-[56px]"><Section03 /></div>
      <div id="s04" className="scroll-mt-[56px]"><Section04 /></div>
      <div id="s05" className="scroll-mt-[56px]"><Section05 /></div>
      <div id="s06" className="scroll-mt-[56px]"><Section06 /></div>
      <div id="s07" className="scroll-mt-[56px]"><Section07 /></div>
      <div id="s08" className="scroll-mt-[56px]"><Section08 /></div>
      <div id="scroll-cta-hide-trigger" />
      <div id="s09" className="scroll-mt-[56px]"><Section09 /></div>
      <div id="contact" className="scroll-mt-[56px]"><Section10 /></div>
      <ScrollCtaSp />
    </>
  );
}
