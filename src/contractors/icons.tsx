import type { ReactNode } from "react";
import type { CategoryId } from "./data";

type IconProps = { className?: string };

function Base({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

const ICONS: Record<CategoryId, ReactNode> = {
  exterior: (
    <>
      <path d="M5 22 24 7l19 15" />
      <path d="M10 19v22h28V19" />
      <path d="M17 28h14M17 34h14" />
    </>
  ),
  reform: (
    <>
      <path d="M5 22 24 7l19 15" />
      <path d="M10 19v22h28V19" />
      <path d="M20 41V30h8v11" />
      <path d="M34 8v5M31.5 10.5h5" />
    </>
  ),
  electric: <path d="M27 5 11 28h12l-3 15 17-24H25l2-14Z" />,
  "exterior-work": (
    <>
      <path d="M5 42h38" />
      <path d="M8 42V22l4-4 4 4v20M18 42V22l4-4 4 4v20" />
      <path d="M8 30h18M8 37h18" />
      <circle cx="36" cy="18" r="6" />
      <path d="M36 24v18" />
    </>
  ),
  plumbing: (
    <>
      <path d="M8 18h18a7 7 0 0 1 7 7v3" />
      <path d="M8 12v10M5 12h6" />
      <path d="M28 28h10" />
      <path d="M33 34c-2.5 3-3.5 4.7-3.5 6.2a3.5 3.5 0 0 0 7 0c0-1.5-1-3.2-3.5-6.2Z" />
    </>
  ),
  interior: (
    <>
      <rect x="8" y="8" width="26" height="12" rx="2" />
      <path d="M34 14h6v12H24v7" />
      <rect x="21" y="33" width="6" height="9" rx="1.5" />
    </>
  ),
  cleaning: (
    <>
      <path d="M20 8c0 8-4 12-12 12 8 0 12 4 12 12 0-8 4-12 12-12-8 0-12-4-12-12Z" />
      <path d="M37 28c0 4-2 6-6 6 4 0 6 2 6 6 0-4 2-6 6-6-4 0-6-2-6-6Z" />
    </>
  ),
  other: (
    <>
      <rect x="7" y="7" width="14" height="14" rx="2" />
      <rect x="27" y="7" width="14" height="14" rx="2" />
      <rect x="7" y="27" width="14" height="14" rx="2" />
      <path d="M34 27v14M27 34h14" />
    </>
  ),
};

export function CategoryIcon({ id, className }: IconProps & { id: CategoryId }) {
  return <Base className={className}>{ICONS[id]}</Base>;
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 21s7-6.1 7-11.5a7 7 0 0 0-14 0C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/* ── 工事会社選びの3ポイント用 図解 ── */

export function GuideSpecialtyIllust({ className }: IconProps) {
  return (
    <svg viewBox="0 0 240 160" fill="none" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="238" height="158" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="20" y="22" width="14" height="14" fill="#FFD000" stroke="#1a1a1a" strokeWidth="2" />
      <path d="m23 29 3 3 5-6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="46" y="26" width="120" height="6" fill="#1a1a1a" />
      <rect x="20" y="58" width="14" height="14" fill="#FFD000" stroke="#1a1a1a" strokeWidth="2" />
      <path d="m23 65 3 3 5-6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="46" y="62" width="150" height="6" fill="#1a1a1a" />
      <rect x="20" y="94" width="14" height="14" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="46" y="98" width="96" height="6" fill="#d9d9d9" />
      <rect x="20" y="126" width="14" height="14" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="46" y="130" width="124" height="6" fill="#d9d9d9" />
    </svg>
  );
}

export function GuideWorksIllust({ className }: IconProps) {
  return (
    <svg viewBox="0 0 240 160" fill="none" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="238" height="158" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="18" y="20" width="96" height="70" fill="#e9e6df" stroke="#1a1a1a" strokeWidth="2" />
      <path d="m18 90 30-32 24 22 16-14 26 24" stroke="#1a1a1a" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="42" cy="40" r="7" fill="#FFD000" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="126" y="20" width="96" height="70" fill="#FFD000" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M126 90 156 58l24 22 16-14 26 24" stroke="#1a1a1a" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="150" cy="40" r="7" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="18" y="108" width="70" height="6" fill="#1a1a1a" />
      <rect x="18" y="124" width="120" height="6" fill="#d9d9d9" />
    </svg>
  );
}

export function GuideAreaIllust({ className }: IconProps) {
  return (
    <svg viewBox="0 0 240 160" fill="none" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="238" height="158" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M20 120c24-10 40-6 64-18s44-6 64-22 38-20 72-12" stroke="#d9d9d9" strokeWidth="2" />
      <path d="M20 90c26-8 44 0 66-14s44-4 66-20 40-14 68-8" stroke="#d9d9d9" strokeWidth="2" />
      <path d="M20 60c22-8 40-4 62-16s46-6 66-20" stroke="#d9d9d9" strokeWidth="2" />
      <circle cx="120" cy="88" r="46" fill="#FFD000" fillOpacity="0.28" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M120 112s20-17 20-34a20 20 0 0 0-40 0c0 17 20 34 20 34Z" fill="#1a1a1a" />
      <circle cx="120" cy="78" r="7" fill="#FFD000" />
    </svg>
  );
}

export function WrenchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M14.500 6.500a4 4 0 0 0 5 5L10 21a2.100 2.100 0 0 1-3-3l9.500-9.500a4 4 0 0 0-2-2Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="1.500" />
      <path d="m3.500 6.500 8.500 7 8.500-7" />
    </svg>
  );
}

/** LINEのロゴマーク(公式の緑)。白い円の上に置いて使う。 */
export function LineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="LINE" fill="#06C755" className={className}>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}
