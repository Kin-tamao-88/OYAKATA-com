import { COMPANIES, getCategoryLabel } from "../data";
import { getCompanyDetail } from "../companyDetails";
import { ArrowIcon } from "../icons";

type Props = {
  /** 表示中の企業(ほかの掲載ページ例から除く) */
  currentSlug: string;
};

/** ページ下部の導線。ほかの掲載企業ページと、一覧ページへ戻る。 */
export default function CompanyBack({ currentSlug }: Props) {
  const others = COMPANIES.filter((c) => c.slug !== currentSlug && getCompanyDetail(c.slug));

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-[1340px] mx-auto px-5 lg:px-10">
        {others.length > 0 && (
          <div className="mb-12 lg:mb-14">
            <h2 className="font-black text-[#1a1a1a] text-[20px] lg:text-[24px]">ほかのパートナー企業ページ</h2>
            <ul className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
              {others.map((c) => (
                <li key={c.slug}>
                  <a href={`/contractors/${c.slug}`} className="group block no-underline border border-[#d8d4ca] bg-white hover:border-[#1a1a1a] transition-colors">
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      width={1536}
                      height={1024}
                      loading="lazy"
                      decoding="async"
                      className="block w-full aspect-[3/2] object-cover"
                    />
                    <span className="block px-3 py-3 lg:px-4 lg:py-4">
                      <span className="block font-black text-[#1a1a1a] text-[16px] lg:text-[18px] leading-[1.4]">{c.name}</span>
                      <span className="block mt-1 text-[#555] text-[14px] leading-[1.6]">
                        {c.categories.map(getCategoryLabel).join("・")}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href="/contractors"
          className="inline-flex items-center gap-3 text-[#1a1a1a] font-black text-[18px] no-underline border-b-[3px] border-[#FFD000] pb-1 hover:gap-4 transition-all"
        >
          ほかのパートナー工事会社を探す
          <ArrowIcon className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
