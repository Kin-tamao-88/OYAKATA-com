import SeoLayout, { NotFoundView } from "./SeoLayout";
import { findPage } from "./registry";

export const NOT_FOUND_KEY = "404";

/** サーバー（プリレンダー）とクライアント（hydrate）で同じ出力になるよう共通化している */
export default function SeoApp({ pageKey }: { pageKey: string }) {
  const page = findPage(pageKey);
  if (!page) return <NotFoundView />;
  const Content = page.Component;
  return (
    <SeoLayout page={page}>
      <Content />
    </SeoLayout>
  );
}
