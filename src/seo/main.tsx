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

const tree = (
  <StrictMode>
    <SeoApp pageKey={pageKey} />
  </StrictMode>
);

if (prerendered) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
