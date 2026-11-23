/** /corporate 共通の小さな部品とクラス定義 */

/** ボタンの共通形状(角丸・影なし、2pxの枠) */
export const BTN =
  "inline-flex items-center justify-between gap-7 h-[58px] lg:h-[60px] px-7 border-2 font-black text-[16px] transition-colors";
export const BTN_YELLOW = "border-[#111] bg-[#ffd400] text-[#111] hover:bg-[#111] hover:text-white";
export const BTN_BLACK = "border-[#111] bg-[#111] text-white hover:bg-white hover:text-[#111]";
export const BTN_OUTLINE = "border-[#111] bg-transparent text-[#111] hover:bg-[#111] hover:text-white";

/** ボタン・リンク用の矢印 */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block w-[22px] h-[10px] shrink-0 bg-current [clip-path:polygon(0_42%,72%_42%,72%_0,100%_50%,72%_100%,72%_58%,0_58%)] ${className}`}
    />
  );
}

/** セクションの小見出し(短い線+欧文+和文) */
export function Label({ en, ja, tone = "yellow" }: { en: string; ja?: string; tone?: "yellow" | "ink" }) {
  return (
    <p className="flex items-center gap-[14px] font-bold text-[14px]">
      <span aria-hidden="true" className={`block w-9 h-[3px] ${tone === "ink" ? "bg-[#111]" : "bg-[#ffd400]"}`} />
      <span className="font-['Montserrat'] font-bold text-[13px] tracking-[0.14em]">{en}</span>
      {ja && <span>{ja}</span>}
    </p>
  );
}
