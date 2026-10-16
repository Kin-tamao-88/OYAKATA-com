import { buildLineCtaHref } from "../../../lib/line";
import imgHero from "../../../assets/images/OC08/better08-genba.webp";
import imgApproach from "../../../assets/images/OC06/reason-consulting.webp";
import CorporateInquiryForm from "./CorporateInquiryForm";
import Footer from "./Footer";
import Header from "./Header";
import { APPROACH_STEPS, ARTICLES, INDUSTRIES, INSIGHT_THEMES, SERVICES } from "./data";

const ANCHOR = "scroll-mt-[64px] lg:scroll-mt-[80px]";
/** PC の本文幅(1240px)に左端を揃えるための余白。右端まで色面を伸ばすときに使う */
const EDGE_L = "pl-5 lg:pl-[max(40px,calc((100vw-1240px)/2))]";
const EDGE_R = "pr-5 lg:pr-[max(40px,calc((100vw-1240px)/2))]";
const CONTAINER = "max-w-[1240px] mx-auto px-5 lg:px-10";

function LineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="LINE" fill="#06C755" className={className}>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className={className}>
      <path d="M3 11h15M12 5l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 英字の小見出し */
function Eyebrow({ children, tone = "dark" }: { children: string; tone?: "dark" | "light" }) {
  return (
    <p className={`flex items-center gap-3 font-black text-[16px] tracking-[0.08em] lg:tracking-[0.24em] ${tone === "light" ? "text-white" : "text-[#111]"}`}>
      <span className="block w-8 lg:w-12 h-[4px] bg-[#FFCC00] shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/** セクション間の斜めの切り替え。外側が前のセクション色、内側の三角が次のセクション色 */
function Slant({ outer, inner, flip = false }: { outer: string; inner: string; flip?: boolean }) {
  return (
    <div className={`${outer} h-[40px] lg:h-[110px] -mb-px relative`} aria-hidden="true">
      <div
        className={`h-full ${inner} ${
          flip ? "[clip-path:polygon(0_0,100%_100%,0_100%)]" : "[clip-path:polygon(0_100%,100%_0,100%_100%)]"
        }`}
      />
    </div>
  );
}

/** セクション間のゆるやかなウェーブ */
function Wave({ outer, fill }: { outer: string; fill: string }) {
  return (
    <div className={`${outer} leading-[0] -mb-px relative`} aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={`block w-full h-[40px] lg:h-[100px] ${fill}`}>
        <path d="M0 90V50C180 10 360 10 540 40C720 70 900 80 1080 50C1200 30 1320 20 1440 36V90Z" />
      </svg>
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  return (
    <section
      className="relative bg-[#111] overflow-hidden flex flex-col justify-end min-h-[600px] h-[calc(100svh-64px)] max-h-[760px] lg:min-h-[680px] lg:h-[calc(100svh-80px)] lg:max-h-[900px]"
      aria-labelledby="about-hero-title"
    >
      <img
        src={imgHero}
        alt="工事現場で談笑する職人たち"
        width={1536}
        height={1024}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[46%_0%] lg:object-[50%_22%]"
      />
      <div className="absolute inset-0 bg-[#111]/35" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#111]/85 to-transparent" aria-hidden="true" />

      <div className={`relative ${EDGE_L}`}>
        <div className="pr-5 lg:pr-10 pb-7 lg:pb-12">
          <Eyebrow tone="light">OYAKATA.COM</Eyebrow>
          <h1
            id="about-hero-title"
            className="mt-5 lg:mt-7 text-white font-black leading-[1.14] tracking-[0.01em] text-[length:min(12.4vw,56px)] lg:text-[length:clamp(64px,7.2vw,116px)]"
          >
            工事会社の
            <br className="lg:hidden" />
            成長を、
            <br />
            <span className="text-[#FFCC00]">集客</span>から
            <br className="lg:hidden" />
            支える。
          </h1>
        </div>
      </div>

      {/* 黄色の色面。PC は右端まで伸ばして斜めに切る */}
      <div className="relative flex lg:justify-end">
        <div className="w-full lg:w-[min(46vw,680px)] bg-[#FFCC00] [clip-path:polygon(0_5%,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(72px_0,100%_0,100%_100%,0_100%)] pt-9 pb-7 px-5 lg:pt-9 lg:pb-9 lg:pl-[120px] lg:pr-[max(40px,calc((100vw-1240px)/2))]">
          <p className="text-[#111] font-bold leading-[1.85] text-[16px] lg:text-[18px]">
            ホームページ制作や広告運用を通じて、
            <br />
            仕事が増える仕組みをつくります。
          </p>
          <div className="mt-5 lg:mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 h-[56px] lg:h-[60px] px-7 whitespace-nowrap bg-[#111] text-white font-black text-[17px] lg:text-[18px] no-underline hover:bg-[#333] transition-colors"
            >
              法人向け集客相談はこちら
              <ArrowRight className="text-[#FFCC00]" />
            </a>
            <a href="#business" className="text-[#111] font-bold text-[16px] underline underline-offset-4 decoration-2 text-center sm:text-left whitespace-nowrap">
              サービスを見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── INTRO ───────────────────────── */
function Intro() {
  return (
    <section id="intro" className={`${ANCHOR} bg-white pt-16 pb-20 lg:pt-32 lg:pb-36`} aria-labelledby="intro-title">
      <div className={CONTAINER}>
        <Eyebrow>INTRO ─ 親方ドットコムの考え方</Eyebrow>
        <h2
          id="intro-title"
          className="mt-8 lg:mt-12 text-[#111] font-black leading-[1.35] tracking-[0.01em] text-[length:min(8vw,34px)] lg:text-[length:clamp(52px,6.2vw,96px)]"
        >
          現場の確かな仕事が、
          <br />
          <span className="bg-[#FFCC00] box-decoration-clone px-2 lg:px-4">選ばれる仕組みを。</span>
        </h2>

        <div className="mt-12 lg:mt-24 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-start-6 lg:col-span-7 border-t-[3px] border-[#111] pt-8 lg:pt-10">
            <p className="text-[#111] font-bold text-[18px] lg:text-[22px] leading-[1.9] text-balance">
              工事会社には、確かな技術と、誠実な仕事があります。
            </p>
            <p className="mt-5 lg:mt-6 text-[#333] text-[16px] lg:text-[18px] leading-[2] text-balance">
              けれど、その価値が、お客様に正しく伝わっているとは限りません。<span className="whitespace-nowrap">親方ドットコム</span>は、工事会社の技術と仕事の品質が適切に伝わり、直接のご依頼につながる環境づくりを支えます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── BUSINESS ───────────────────────── */
function Business() {
  return (
    <section id="business" className={`${ANCHOR} bg-[#111] pt-6 pb-16 lg:pt-12 lg:pb-28`} aria-labelledby="business-title">
      <div className={CONTAINER}>
        <Eyebrow tone="light">BUSINESS ─ 提供サービス</Eyebrow>
        <h2
          id="business-title"
          className="mt-6 lg:mt-8 text-white font-black leading-[1.4] text-[length:min(7.2vw,30px)] lg:text-[length:clamp(36px,3.6vw,52px)]"
        >
          仕事が増える仕組みを、
          <br className="lg:hidden" />
          ひとつずつ整える。
        </h2>

        <ul className="mt-10 lg:mt-16">
          {SERVICES.map((item, index) => (
            <li
              key={item.title}
              className={`border-t border-[#4a4a4a] py-8 lg:py-12 ${index % 2 === 1 ? "lg:pl-[8%]" : ""} ${index === SERVICES.length - 1 ? "border-b" : ""}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5 lg:gap-12 lg:items-end">
                <h3 className="text-white font-black leading-[1.15] text-[length:min(8vw,32px)] lg:text-[length:clamp(30px,4.2vw,64px)]">
                  {item.title}
                </h3>
                <div>
                  <p className="text-[#FFCC00] font-bold text-[17px] lg:text-[18px] leading-[1.7]">{item.lead}</p>
                  <p className="mt-3 text-[#e2e2e2] text-[16px] leading-[1.95] text-balance">{item.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── APPROACH ───────────────────────── */
function Approach() {
  const stairs = ["lg:mt-0", "lg:mt-10", "lg:mt-20", "lg:mt-[120px]"];
  return (
    <section id="approach" className={`${ANCHOR} bg-[#f4f4f1] pt-4 pb-16 lg:pt-10 lg:pb-32`} aria-labelledby="approach-title">
      <div className={CONTAINER}>
        <Eyebrow>APPROACH ─ 支援の進め方</Eyebrow>
        <h2
          id="approach-title"
          className="mt-8 lg:mt-12 text-[#111] font-black leading-[1.45] text-[length:min(7vw,30px)] lg:text-[length:clamp(40px,4.6vw,72px)]"
        >
          強みを整理し、伝え、
          <br />
          届けて、改善する。
        </h2>
        <p className="mt-6 lg:mt-8 text-[#333] text-[16px] lg:text-[18px] leading-[1.95] lg:max-w-[640px] text-balance">
          ホームページをつくって終わりにせず、問い合わせが入る状態になるまで、4つの段階で支えます。
        </p>
      </div>

      {/* 写真は全幅の帯にして、上下を斜めに切る */}
      <div className="mt-12 lg:mt-20 [clip-path:polygon(0_9%,100%_0,100%_91%,0_100%)] lg:[clip-path:polygon(0_14%,100%_0,100%_86%,0_100%)]">
        <img
          src={imgApproach}
          alt="工事会社の担当者と打ち合わせをする様子"
          width={1536}
          height={1024}
          loading="lazy"
          className="w-full h-[240px] lg:h-[460px] object-cover object-[50%_42%]"
        />
      </div>

      <div className={`${CONTAINER} mt-10 lg:mt-16`}>
        <ol className="grid grid-cols-1 lg:grid-cols-4 gap-y-9 lg:gap-x-10">
          {APPROACH_STEPS.map((item, index) => (
            <li key={item.title} className={`${stairs[index]} ${index % 2 === 1 ? "ml-5 lg:ml-0" : ""}`}>
              <p className="font-black text-[16px] tracking-[0.2em] text-[#111]">STEP {index + 1}</p>
              <span className="mt-2 block w-[56px] h-[6px] bg-[#FFCC00]" aria-hidden="true" />
              <h3 className="mt-4 text-[#111] font-black text-[26px] lg:text-[30px] leading-[1.4]">{item.title}</h3>
              <p className="mt-3 text-[#333] text-[16px] leading-[1.95] text-balance">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── INDUSTRIES ───────────────────────── */
function Industries() {
  return (
    <section id="industries" className={`${ANCHOR} bg-[#FFCC00] pt-4 pb-16 lg:pt-10 lg:pb-32`} aria-labelledby="industries-title">
      <div className={CONTAINER}>
        <p className="flex items-center gap-3 font-black text-[16px] tracking-[0.08em] lg:tracking-[0.24em] text-[#111]">
          <span className="block w-8 lg:w-12 h-[4px] bg-[#111] shrink-0" aria-hidden="true" />
          INDUSTRIES ─ 対応業種
        </p>
        <h2
          id="industries-title"
          className="mt-6 lg:mt-8 text-[#111] font-black leading-[1.4] text-[length:min(7.2vw,30px)] lg:text-[length:clamp(36px,3.6vw,52px)]"
        >
          工事の種類に合わせて、
          <br className="lg:hidden" />
          集客を設計する。
        </h2>
        <p className="mt-5 text-[#111] text-[16px] lg:text-[18px] leading-[1.95] lg:max-w-[640px] text-balance">
          お客様の探し方や、会社が選ばれるポイントは、工事の種類ごとに異なります。
        </p>

        <ul className="mt-12 lg:mt-20 flex flex-col lg:flex-row lg:flex-wrap gap-x-[4vw] gap-y-8 lg:gap-y-14">
          {INDUSTRIES.map((item) => {
            const body = (
              <>
                <span className="block text-[#111] font-black leading-[1.05] text-[length:min(10.5vw,44px)] lg:text-[length:clamp(48px,7.2vw,112px)]">
                  {item.name}
                </span>
                <span className="mt-2 lg:mt-3 block text-[#111] font-bold text-[16px] leading-[1.7]">{item.note}</span>
              </>
            );
            return (
              <li key={item.name}>
                {item.href ? (
                  <a href={item.href} className="block no-underline">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── JOURNAL ───────────────────────── */
function Journal() {
  const [lead, ...rest] = INSIGHT_THEMES;
  return (
    <section id="journal" className={`${ANCHOR} bg-white pt-4 pb-16 lg:pt-10 lg:pb-32`} aria-labelledby="journal-title">
      <div className={CONTAINER}>
        <h2
          id="journal-title"
          className="text-[#111] font-black leading-[0.95] tracking-[-0.02em] text-[length:min(17vw,72px)] lg:text-[length:clamp(96px,14vw,220px)]"
        >
          JOURNAL<span className="text-[#FFCC00]">.</span>
        </h2>
        <p className="mt-4 lg:mt-6 text-[#111] font-bold text-[18px] lg:text-[22px] leading-[1.7]">
          工事会社の集客に役立つ情報
        </p>
        <p className="mt-3 text-[#333] text-[16px] lg:text-[17px] leading-[1.95] text-balance">
          次のテーマについて、実務に役立つ情報を発信していきます。
        </p>

        <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16">
          <div className="lg:col-span-7 lg:pr-10">
            <span className="block w-[72px] h-[8px] bg-[#FFCC00]" aria-hidden="true" />
            <h3 className="mt-6 text-[#111] font-black leading-[1.35] text-[length:min(7.6vw,30px)] lg:text-[length:clamp(32px,3.6vw,52px)] text-balance">
              {lead.title}
            </h3>
            <p className="mt-5 text-[#333] text-[16px] lg:text-[18px] leading-[1.95] text-balance">{lead.body}</p>
          </div>
          <ul className="lg:col-span-5 lg:col-start-8 lg:pt-14">
            {rest.map((item) => (
              <li key={item.title} className="border-t-[3px] border-[#111] py-6 lg:py-8">
                <h3 className="text-[#111] font-black text-[22px] lg:text-[26px] leading-[1.45] text-balance">{item.title}</h3>
                <p className="mt-3 text-[#333] text-[16px] leading-[1.95] text-balance">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 記事を公開したら ARTICLES(data.ts)に追加すると、ここに一覧が出る */}
        {ARTICLES.length > 0 && (
          <ul className="mt-14 lg:mt-20 border-b border-[#ddd]">
            {ARTICLES.map((article) => (
              <li key={article.href} className="border-t border-[#ddd]">
                <a href={article.href} className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-8 py-5 text-[#111] no-underline hover:text-[#555]">
                  <time dateTime={article.date} className="text-[16px] font-bold">
                    {article.date}
                  </time>
                  <span className="text-[18px] lg:text-[20px] font-bold leading-[1.6]">{article.title}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */
function Contact() {
  const lineHref = buildLineCtaHref();
  return (
    <section id="contact" className={`${ANCHOR} bg-[#111]`} aria-labelledby="contact-title">
      <div className={`${CONTAINER} pt-4 pb-12 lg:pt-10 lg:pb-20`}>
        <Eyebrow tone="light">CONTACT</Eyebrow>
        <h2
          id="contact-title"
          className="mt-6 lg:mt-8 text-white font-black leading-[1.1] text-[length:min(13vw,52px)] lg:text-[length:clamp(64px,8vw,124px)]"
        >
          お問い合わせ
        </h2>
        <p className="mt-6 text-[#e2e2e2] text-[16px] lg:text-[18px] leading-[1.95] text-balance">
          ご相談の目的に合わせて、2つの窓口をご用意しています。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* A: LINE無料診断 */}
        <div className={`bg-[#f4f4f1] py-12 lg:py-20 ${EDGE_L} pr-5 lg:pr-[110px]`}>
          <p className="flex items-center gap-3 font-black text-[16px] tracking-[0.24em] text-[#111]">
            <span className="block w-8 h-[4px] bg-[#FFCC00]" aria-hidden="true" />A
          </p>
          <h3 className="mt-2 font-black text-[#111] leading-[1.3] text-[28px] lg:text-[40px]">LINE無料診断</h3>
          <p className="mt-5 text-[#111] text-[16px] lg:text-[18px] leading-[1.95] text-balance lg:max-w-[520px]">
            現在の集客状況をLINEでお聞かせください。直請け案件を増やすための改善ポイントを、無料でご提案します。
          </p>
          <a
            href={lineHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 flex items-center justify-center gap-3 h-[64px] lg:h-[70px] lg:max-w-[520px] bg-[#111] text-white font-black text-[17px] lg:text-[19px] no-underline hover:bg-[#333] transition-colors"
          >
            <span className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white">
              <LineIcon className="w-[20px] h-[20px]" />
            </span>
            LINEで無料診断を受ける
            <ArrowRight className="text-[#FFCC00]" />
          </a>
        </div>

        {/* B: 法人向け集客相談。PC は左辺を斜めに切る */}
        <div className={`bg-[#2a2a2a] py-12 lg:py-20 pl-5 lg:pl-[150px] ${EDGE_R} lg:-ml-[90px] [clip-path:polygon(0_28px,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(90px_0,100%_0,100%_100%,0_100%)] -mt-[1px]`}>
          <p className="font-black text-[16px] tracking-[0.24em] text-[#FFCC00]">B</p>
          <h3 className="mt-2 font-black text-white leading-[1.3] text-[28px] lg:text-[40px]">法人向け集客相談</h3>
          <p className="mt-5 text-[#e2e2e2] text-[16px] lg:text-[18px] leading-[1.95] text-balance lg:max-w-[520px]">
            継続的な集客支援・LP制作・広告運用をご検討中の企業様向けの相談窓口です。集客の仕組みづくりから、運用体制のご相談までお受けします。
          </p>
          <div className="mt-8 border-t border-[#555] pt-8 lg:max-w-[520px] relative">
            <CorporateInquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutContent() {
  return (
    <div className="bg-white text-[#111] [word-break:auto-phrase]">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Slant outer="bg-white" inner="bg-[#111]" flip />
        <Business />
        <Wave outer="bg-[#111]" fill="fill-[#f4f4f1]" />
        <Approach />
        <Slant outer="bg-[#f4f4f1]" inner="bg-[#FFCC00]" flip />
        <Industries />
        <Slant outer="bg-[#FFCC00]" inner="bg-white" />
        <Journal />
        <Slant outer="bg-white" inner="bg-[#111]" flip />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
