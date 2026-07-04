import Header from "./sections/Header";
import Hero from "./sections/Hero";

// 今後追加するセクションはここにimportして並べる
// import Section01 from "./sections/Section01";
// import Section02 from "./sections/Section02";

export default function App() {
  return (
    <div className="min-w-[960px]">
      <Header />
      <Hero
        // heroImageSrc="/images/craftsman_hero.jpg"  ← 写真が届いたらコメントアウト解除
      />
      {/* <Section01 /> */}
    </div>
  );
}
