import { useState } from "react";
import { EMPTY_FILTER } from "./data";
import type { CategoryId, CompanyFilter } from "./data";
import { usePageSeo } from "./useSeo";
import { getListSeo } from "./seo";
import Areas from "./sections/Areas";
import Categories from "./sections/Categories";
import CompanyList from "./sections/CompanyList";
import Footer from "./sections/Footer";
import Guide from "./sections/Guide";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import ListingCta from "./sections/ListingCta";

const LIST_SEO = getListSeo();

function scrollToCompanies() {
  document.getElementById("companies")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ContractorsPage() {
  usePageSeo(LIST_SEO);
  const [filter, setFilter] = useState<CompanyFilter>(EMPTY_FILTER);

  const selectCategory = (id: CategoryId) => {
    setFilter((prev) => ({ ...prev, category: prev.category === id ? "" : id }));
    scrollToCompanies();
  };

  const selectArea = (prefecture: string) => {
    setFilter((prev) => ({ ...prev, area: prev.area === prefecture ? "" : prefecture }));
    scrollToCompanies();
  };

  return (
    <div className="bg-white text-[#1a1a1a]">
      <Header />
      <main>
        <Hero filter={filter} onFilterChange={setFilter} onSearch={scrollToCompanies} />
        <Categories filter={filter} onSelect={selectCategory} />
        <CompanyList filter={filter} onFilterChange={setFilter} />
        <Areas filter={filter} onSelect={selectArea} />
        <Guide />
        <ListingCta />
      </main>
      <Footer />
    </div>
  );
}
