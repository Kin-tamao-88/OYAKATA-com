import type { Company } from "./data";
import { getContactMethods, getTheme } from "./companyDetails";
import type { CompanyDetail } from "./companyDetails";
import { getCompanySeo } from "./seo";
import { usePageSeo } from "./useSeo";
import CompanyAbout from "./company/CompanyAbout";
import CompanyArea from "./company/CompanyArea";
import CompanyBack from "./company/CompanyBack";
import CompanyContact from "./company/CompanyContact";
import CompanyHero from "./company/CompanyHero";
import CompanyProfile from "./company/CompanyProfile";
import CompanyServices from "./company/CompanyServices";
import CompanyStrengths from "./company/CompanyStrengths";
import CompanyWorks from "./company/CompanyWorks";
import Footer from "./sections/Footer";
import ListingConsult from "./sections/ListingConsult";
import Header from "./sections/Header";

type Props = {
  company: Company;
  detail: CompanyDetail;
};

/** 個別企業ページ。企業データ(Company + CompanyDetail)だけで内容が決まる共通テンプレート。 */
export default function CompanyPage({ company, detail }: Props) {
  usePageSeo(getCompanySeo(company, detail));
  const hasContact = getContactMethods(detail.contact).length > 0;
  const theme = getTheme(detail);

  return (
    <div className="bg-white text-[#1a1a1a]">
      <Header base="/contractors" />
      <main>
        <CompanyHero company={company} detail={detail} theme={theme} hasContact={hasContact} />
        <CompanyAbout detail={detail} theme={theme} />
        <CompanyServices services={detail.services} theme={theme} />
        <CompanyWorks works={detail.works} theme={theme} />
        <CompanyStrengths strengths={detail.strengths} photo={detail.strengthsPhoto} theme={theme} />
        <CompanyArea companyName={company.name} areas={detail.areaDetails} theme={theme} />
        <CompanyProfile company={company} detail={detail} theme={theme} />
        <CompanyContact companyName={company.name} contact={detail.contact} theme={theme} />
        <CompanyBack currentSlug={company.slug} />
        <ListingConsult />
      </main>
      <Footer base="/contractors" />
    </div>
  );
}
