import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Privacy from "./pages/Privacy";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const page = path === "/privacy" ? <Privacy /> : <App />;

createRoot(document.getElementById("root")!).render(
  <StrictMode>{page}</StrictMode>
);
