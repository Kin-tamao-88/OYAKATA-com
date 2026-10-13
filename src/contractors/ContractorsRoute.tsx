import { useEffect } from "react";
import { COMPANIES } from "./data";
import { getCompanyDetail } from "./companyDetails";
import CompanyPage from "./CompanyPage";
import ContractorsPage from "./ContractorsPage";
import Footer from "./sections/Footer";
import Header from "./sections/Header";

type Props = {
  /** 例: /contractors, /contractors/<slug> */
  path: string;
};

function NotFound() {
  // 本番は存在しないURLが静的404になる。ここは開発時やクライアント側の保険。
  useEffect(() => {
    document.title = "ページが見つかりません｜親方ドットコム";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
  }, []);

  return (
    <div className="bg-white text-[#1a1a1a]">
      <Header base="/contractors" />
      <main className="max-w-[960px] mx-auto px-5 lg:px-10 py-24 lg:py-32 text-center">
        <p className="font-black text-[#FFD000] text-[56px] leading-none [-webkit-text-stroke:1.5px_#1a1a1a]">404</p>
        <h1 className="mt-6 font-black text-[26px] lg:text-[34px]">ページが見つかりません</h1>
        <p className="mt-4 text-[#333] text-[16px] leading-[1.9]">
          お探しのページは公開されていないか、URLが変更された可能性があります。
        </p>
        <a
          href="/contractors"
          className="mt-8 inline-flex items-center justify-center h-[60px] px-8 bg-[#FFD000] text-[#1a1a1a] font-black text-[17px] no-underline hover:brightness-95"
        >
          パートナー工事会社の一覧へ
        </a>
      </main>
      <Footer base="/contractors" />
    </div>
  );
}

/** /contractors 配下のルーティング。サーバー(プリレンダー)とクライアントで同じ出力になる。 */
export default function ContractorsRoute({ path }: Props) {
  const normalized = path.replace(/\/+$/, "") || "/";
  if (normalized === "/contractors") return <ContractorsPage />;

  const match = normalized.match(/^\/contractors\/([^/]+)$/);
  if (match) {
    const slug = decodeURIComponent(match[1]);
    const company = COMPANIES.find((c) => c.slug === slug);
    const detail = company ? getCompanyDetail(slug) : undefined;
    if (company && detail) return <CompanyPage company={company} detail={detail} />;
  }
  return <NotFound />;
}
