import { IMG } from "./assets";
import { ArrowRight } from "./icons";

export default function Partners() {
  return (
    <section id="partners" className="scroll-mt-[64px] lg:scroll-mt-[76px] relative bg-white overflow-hidden" aria-labelledby="partners-title">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="relative lg:w-[26%] h-[140px] lg:h-[150px] shrink-0">
          <img src={IMG.partners} alt="" className="w-full h-full object-cover object-[30%_50%] lg:[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]" />
        </div>
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-10 px-5 py-8 lg:py-0 lg:pl-8 lg:pr-[max(40px,calc((100vw-1320px)/2))]">
          <div>
            <h2 id="partners-title" className="text-[#111] font-black text-[24px] leading-[1.5]">親方ドットコム パートナーズ</h2>
            <p className="mt-3 text-[#333] text-[16px] leading-[1.95]">
              工事を依頼したいお客様と、施工を担う事業者をつなぐサービス。工事会社の新たな受注機会を広げます。
            </p>
          </div>
          <a
            href="/contractors"
            className="flex items-center justify-between gap-6 shrink-0 h-[54px] lg:h-[58px] px-8 rounded-full bg-[#f5b800] text-[#111] font-black text-[16px] hover:brightness-95 transition"
          >
            パートナーズサイトを見る
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
