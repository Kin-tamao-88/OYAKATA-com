import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "../index.css";
import { captureUtmParams } from "../lib/utm";
import SeoApp from "./SeoApp";

captureUtmParams();

const root = document.getElementById("root")!;
// 本番はプリレンダーが data-page に識別子を埋め込む。
// 開発時は /seo.html?page=<slug> で確認できる。
const prerendered = root.dataset.page !== undefined;
const pageKey =
  root.dataset.page ?? new URLSearchParams(window.location.search).get("page") ?? "404";

// 親方ドットコム パートナーズ(/contractors 配下)は専用の画面を使う。他のSEOページに読み込ませないよう動的import。
// 非公開の間はビルド時にfalseへ確定し、パートナーズのチャンクはビルドに含まれない
const isContractors = import.meta.env.VITE_CONTRACTORS_PUBLIC === "true" && (pageKey === "contractors" || pageKey.startsWith("contractors/"));
const ContractorsRoute = isContractors ? (await import("../contractors/ContractorsRoute")).default : null;

const tree = (
  <StrictMode>
    {ContractorsRoute ? <ContractorsRoute path={`/${pageKey}`} /> : <SeoApp pageKey={pageKey} />}
  </StrictMode>
);

if (prerendered) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
