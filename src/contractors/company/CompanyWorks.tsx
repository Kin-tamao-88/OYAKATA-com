import type { CompanyWork } from "../companyDetails";
import type { CompanyTheme } from "../companyTheme";

type Props = {
  works: CompanyWork[];
  theme: CompanyTheme;
};

function WorkCaption({ work, no, theme, large = false }: { work: CompanyWork; no: number; theme: CompanyTheme; large?: boolean }) {
  return (
    <div>
      <p className={`${theme.accentText} font-black text-[14px] tracking-wider`}>CASE {String(no).padStart(2, "0")}</p>
      <h3 className={`mt-1 font-black text-[#1a1a1a] leading-[1.4] ${large ? "text-[24px] lg:text-[32px]" : "text-[20px] lg:text-[24px]"}`}>
        {work.title}
      </h3>
      <dl className="mt-3 text-[16px] border-t border-[#d8d4ca]">
        <div className="flex gap-4 py-2 border-b border-[#e8e4da]">
          <dt className="shrink-0 w-[72px] font-bold text-[#555]">施工場所</dt>
          <dd className="text-[#1a1a1a] font-bold">{work.place}</dd>
        </div>
        <div className="flex gap-4 py-2 border-b border-[#e8e4da]">
          <dt className="shrink-0 w-[72px] font-bold text-[#555]">工事内容</dt>
          <dd className="text-[#1a1a1a] font-bold">{work.content}</dd>
        </div>
      </dl>
      {work.body && (
        <p className="mt-3 text-[#333] text-[16px] leading-[1.9] [word-break:auto-phrase]">{work.body}</p>
      )}
    </div>
  );
}

/** 2件ずつの行で列幅を入れ替え、写真の大小・位置に変化をつける(単調な3列の繰り返しを避ける) */
const PAIRS = [
  [
    { col: "lg:col-span-7", ratio: "aspect-[4/3]", offset: "" },
    { col: "lg:col-span-5", ratio: "aspect-[4/3]", offset: "lg:mt-20" },
  ],
  [
    { col: "lg:col-span-5", ratio: "aspect-[4/3]", offset: "" },
    { col: "lg:col-span-7", ratio: "aspect-[4/3]", offset: "lg:mt-16" },
  ],
];

export default function CompanyWorks({ works, theme }: Props) {
  if (works.length === 0) return null;
  const [feature, ...rest] = works;

  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10">
        <div className="mb-10 lg:mb-14 lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="flex items-center gap-3 mb-4 text-[#1a1a1a] font-bold text-[14px] tracking-wider">
              <span className={`block w-6 h-[3px] ${theme.accentBg}`} />
              WORKS
            </p>
            <h2 className="text-[#1a1a1a] font-black leading-[1.4] text-[26px] lg:text-[42px]">施工事例</h2>
          </div>
          <p className="mt-3 lg:mt-0 text-[#333] text-[16px] leading-[1.8]">
            実際の施工写真と、ご依頼内容をご紹介します。
          </p>
        </div>

        {/* 代表事例：大きく見せる */}
        <article className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 lg:items-end">
          <img
            src={feature.photo.src}
            alt={feature.photo.alt}
            width={feature.photo.width}
            height={feature.photo.height}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[3/2] object-cover"
          />
          <div className="mt-5 lg:mt-0">
            <WorkCaption work={feature} no={1} theme={theme} large />
          </div>
        </article>

        {/* そのほかの事例：写真の大小・位置に変化をつける */}
        {rest.length > 0 && (
          <div className="mt-14 lg:mt-24 grid gap-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-16">
            {rest.map((w, i) => {
              const isLastAlone = i === rest.length - 1 && rest.length % 2 === 1;
              if (isLastAlone) {
                // 最後の1件だけ余る場合は、横長の行として見せる
                return (
                  <article key={w.title} className="flex flex-col lg:col-span-12 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:items-end">
                    <div className="order-2 mt-5 lg:mt-0 lg:order-1">
                      <WorkCaption work={w} no={i + 2} theme={theme} />
                    </div>
                    <img
                      src={w.photo.src}
                      alt={w.photo.alt}
                      width={w.photo.width}
                      height={w.photo.height}
                      loading="lazy"
                      decoding="async"
                      className="order-1 w-full aspect-[3/2] object-cover lg:order-2"
                    />
                  </article>
                );
              }
              const pattern = PAIRS[Math.floor(i / 2) % PAIRS.length][i % 2];
              return (
                <article key={w.title} className={`${pattern.col} ${pattern.offset}`}>
                  <img
                    src={w.photo.src}
                    alt={w.photo.alt}
                    width={w.photo.width}
                    height={w.photo.height}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover ${pattern.ratio}`}
                  />
                  <div className="mt-5">
                    <WorkCaption work={w} no={i + 2} theme={theme} />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
