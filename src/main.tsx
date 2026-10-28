import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Privacy from "./pages/Privacy";
import { captureUtmParams } from "./lib/utm";

captureUtmParams();

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const rootEl = document.getElementById("root")!;

// 非公開の間は条件がビルド時にfalseへ確定し、パートナーズのチャンクはビルドに含まれない(site.ts の CONTRACTORS_PUBLIC と同じ条件)
if (import.meta.env.VITE_CONTRACTORS_PUBLIC === "true" && (path === "/contractors" || path.startsWith("/contractors/"))) {
  // 親方ドットコム パートナーズは別チャンクにして、トップLPの読み込みサイズに影響させない。
  // プリレンダー済みHTMLがある場合はハイドレートし、ない場合は通常描画する。
  const { default: ContractorsRoute } = await import("./contractors/ContractorsRoute");
  const page = (
    <StrictMode>
      <ContractorsRoute path={path} />
    </StrictMode>
  );
  if (rootEl.hasChildNodes()) {
    hydrateRoot(rootEl, page);
  } else {
    createRoot(rootEl).render(page);
  }
} else {
  const page = path === "/privacy" ? <Privacy /> : <App />;

  createRoot(rootEl).render(<StrictMode>{page}</StrictMode>);
}
