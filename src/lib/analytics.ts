export function trackLineClick(): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "line_click" });
}
