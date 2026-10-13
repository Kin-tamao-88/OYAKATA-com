import type { ReactNode } from "react";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";
import { buildBreadcrumbs } from "./breadcrumbs";
import { findPage, pagePath } from "./registry";
import { SITE_NAME } from "./site";
import type { SeoPageDef } from "./types";

function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-[960px] mx-auto px-5 lg:px-8 h-[64px] flex items-center">
        <a href="/" className="inline-flex items-center h-[40px] overflow-hidden">
          <img src={logoHorizontal} alt={SITE_NAME} className="h-[40px] w-auto" />
        </a>
      </div>
    </header>
  );
}

function Breadcrumb({ page }: { page: SeoPageDef }) {
  const items = buildBreadcrumbs(page);
  return (
    <nav aria-label="パンくずリスト" className="max-w-[840px] mx-auto px-5 lg:px-8 pt-6">
      <ol className="flex flex-wrap items-center gap-x-2 text-[16px] text-[#555]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-x-2">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <a href={item.path} className="underline">
                  {item.name}
                </a>
              )}
              {!isLast && <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function RelatedLinks({ page }: { page: SeoPageDef }) {
  const related = (page.relatedSlugs ?? [])
    .map((slug) => findPage(slug))
    .filter((p): p is SeoPageDef => p !== undefined && !p.noindex);
  if (related.length === 0) return null;
  return (
    <aside className="max-w-[840px] mx-auto px-5 lg:px-8 pb-12">
      <h2 className="text-[#1a1a1a] font-bold text-[18px] mb-3">関連ページ</h2>
      <ul className="space-y-2 text-[16px]">
        {related.map((p) => (
          <li key={p.slug}>
            <a href={pagePath(p)} className="underline text-[#1a1a1a]">
              {p.breadcrumbLabel}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-[960px] mx-auto px-5 lg:px-8 py-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[16px] text-[#555]">
        <a href="/" className="underline">
          {SITE_NAME} トップ
        </a>
        <a href="/privacy" className="underline">
          プライバシーポリシー
        </a>
      </div>
    </footer>
  );
}

export default function SeoLayout({ page, children }: { page: SeoPageDef; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Breadcrumb page={page} />
      <main className="flex-1">
        <article className="max-w-[840px] mx-auto px-5 lg:px-8 py-10 lg:py-12">{children}</article>
        <RelatedLinks page={page} />
      </main>
      <Footer />
    </div>
  );
}

export function NotFoundView() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[840px] mx-auto px-5 lg:px-8 py-16">
          <h1 className="text-[#1a1a1a] font-black text-[24px] lg:text-[30px] leading-tight mb-6">
            ページが見つかりません
          </h1>
          <p className="text-[#333] text-[16px] leading-[1.9] mb-8">
            お探しのページは移動または削除された可能性があります。
          </p>
          <a href="/" className="underline text-[#1a1a1a] text-[16px]">
            {SITE_NAME} トップへ戻る
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
