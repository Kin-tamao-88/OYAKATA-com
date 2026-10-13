import type { ReactNode } from "react";
import type { CategoryId } from "./data";

/* 写真素材が用意できるまでの仮ビジュアル(SVG)。fvAssets.ts で写真を設定すると置き換わる。 */

type SvgProps = { className?: string };

/** FV背景：青空・山・住宅街・街路樹 */
export function NeighborhoodScene({ className }: SvgProps) {
  const houses: { x: number; y: number; w: number; h: number; roof: string }[] = [
    { x: 760, y: 330, w: 70, h: 46, roof: "#c9714f" },
    { x: 850, y: 350, w: 84, h: 52, roof: "#8a97a6" },
    { x: 960, y: 322, w: 66, h: 44, roof: "#c9714f" },
    { x: 1040, y: 360, w: 90, h: 56, roof: "#6f7f92" },
    { x: 700, y: 400, w: 96, h: 60, roof: "#8a97a6" },
    { x: 830, y: 428, w: 110, h: 66, roof: "#c9714f" },
    { x: 980, y: 420, w: 100, h: 62, roof: "#6f7f92" },
    { x: 1110, y: 440, w: 120, h: 70, roof: "#c9714f" },
  ];
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="fv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fb6ec" />
          <stop offset="0.6" stopColor="#bfe0f6" />
          <stop offset="1" stopColor="#eaf5fb" />
        </linearGradient>
      </defs>
      <rect width="1440" height="720" fill="url(#fv-sky)" />
      {/* 雲 */}
      <g fill="#fff" opacity="0.92">
        <ellipse cx="300" cy="170" rx="150" ry="34" />
        <ellipse cx="380" cy="150" rx="90" ry="34" />
        <ellipse cx="760" cy="120" rx="170" ry="30" />
        <ellipse cx="900" cy="100" rx="100" ry="30" />
        <ellipse cx="1180" cy="190" rx="130" ry="26" />
      </g>
      {/* 山 */}
      <path d="M560 360 C650 250 760 210 860 215 C960 220 1060 280 1120 330 L1120 520 L560 520 Z" fill="#6c9a63" />
      <path d="M700 330 C770 270 860 250 940 262 C1010 275 1060 310 1100 340 L1100 520 L700 520 Z" fill="#7fae6f" />
      {/* 斜面の住宅 */}
      <path d="M640 380 L1260 360 L1440 470 L1440 720 L560 720 Z" fill="#8fbd78" />
      {houses.map((h, i) => (
        <g key={i}>
          <rect x={h.x} y={h.y} width={h.w} height={h.h} fill="#fbfaf6" />
          <path d={`M${h.x - 6} ${h.y} L${h.x + h.w / 2} ${h.y - h.h * 0.42} L${h.x + h.w + 6} ${h.y} Z`} fill={h.roof} />
          <rect x={h.x + h.w * 0.15} y={h.y + h.h * 0.3} width={h.w * 0.18} height={h.h * 0.3} fill="#9fc3dd" />
          <rect x={h.x + h.w * 0.6} y={h.y + h.h * 0.3} width={h.w * 0.18} height={h.h * 0.3} fill="#9fc3dd" />
        </g>
      ))}
      {/* 手前の芝と道路 */}
      <path d="M0 560 C300 520 700 540 1440 520 L1440 720 L0 720 Z" fill="#7fae5a" />
      <path d="M0 640 C400 600 900 620 1440 590 L1440 720 L0 720 Z" fill="#d9d5cb" />
      <path d="M0 690 C500 660 1000 670 1440 650" stroke="#fff" strokeWidth="4" strokeDasharray="30 26" fill="none" />
      {/* 左の洋館 */}
      <rect x="-20" y="240" width="190" height="330" fill="#f6f1e6" />
      <path d="M-30 250 L70 170 L180 250 Z" fill="#a9a396" />
      <g fill="#a7c6dc">
        <rect x="20" y="300" width="40" height="64" />
        <rect x="100" y="300" width="40" height="64" />
        <rect x="20" y="410" width="40" height="64" />
        <rect x="100" y="410" width="40" height="64" />
      </g>
      {/* 右の家 */}
      <rect x="1290" y="230" width="190" height="300" fill="#f3efe4" />
      <path d="M1270 240 L1380 160 L1490 240 Z" fill="#8b8f93" />
      <g fill="#a7c6dc">
        <rect x="1320" y="290" width="40" height="64" />
        <rect x="1390" y="290" width="40" height="64" />
      </g>
      {/* 街路樹 */}
      <g fill="#4f8f3a">
        <circle cx="40" cy="120" r="110" />
        <circle cx="150" cy="60" r="90" />
        <circle cx="1400" cy="90" r="120" />
        <circle cx="1290" cy="40" r="80" />
        <circle cx="90" cy="520" r="120" />
        <circle cx="230" cy="580" r="80" />
        <circle cx="1360" cy="540" r="130" />
        <circle cx="1230" cy="600" r="90" />
      </g>
      <g fill="#6aab4d" opacity="0.8">
        <circle cx="70" cy="90" r="60" />
        <circle cx="1420" cy="60" r="70" />
        <circle cx="60" cy="500" r="70" />
        <circle cx="1380" cy="510" r="80" />
      </g>
    </svg>
  );
}

export function MapPin({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 36 48" aria-hidden="true" className={className}>
      <path d="M18 2C9.2 2 2 9 2 17.600 2 29.500 18 46 18 46S34 29.500 34 17.600C34 9 26.800 2 18 2Z" fill="#FFD000" stroke="#fff" strokeWidth="3" />
      <circle cx="18" cy="17.500" r="6" fill="#fff" />
    </svg>
  );
}

/** 手描き風の黄色いアクセント(ブラシ状の楕円) */
export function YellowBlob({ className, children }: SvgProps & { children?: ReactNode }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 220 150" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 w-full h-full">
        <path
          d="M18 70C10 30 60 8 112 10 168 12 212 30 208 76 205 116 160 142 106 140 52 138 24 112 18 70Z"
          fill="#FFD84A"
        />
        <path d="M30 70C26 40 66 22 112 24 160 26 194 42 192 76" stroke="#fff" strokeOpacity="0.6" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <div className="relative w-full h-full flex items-center justify-center text-center">{children}</div>
    </div>
  );
}

/** FVのブラシ風マーカー */
export function BrushMarker({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d="M4 34C60 20 160 14 300 18 440 22 540 12 596 20L590 42C520 52 420 46 300 50 170 54 70 50 8 54Z" fill="#FFD000" />
    </svg>
  );
}

/* ── 円形施工写真の仮ビジュアル ── */

function Worker({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 90 C-30 40 30 40 30 90 L30 130 L-30 130 Z" fill="#26364f" />
      <circle cx="0" cy="22" r="20" fill="#e2b48f" />
      <path d="M-24 18 C-24 -8 24 -8 24 18 Z" fill="#2f6fb0" />
      <rect x="-26" y="14" width="52" height="6" fill="#2f6fb0" />
    </g>
  );
}

export function CircleScene({ index, className }: SvgProps & { index: 0 | 1 | 2 }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
        <rect width="200" height="200" fill="#bfe0f6" />
        <path d="M0 120 L100 50 L200 120 L200 200 L0 200Z" fill="#c9714f" />
        <g stroke="#7a8a99" strokeWidth="3">
          <path d="M20 20V200M70 20V200M120 20V200M170 20V200" />
          <path d="M20 60H170M20 110H170M20 160H170" />
        </g>
        <Worker x={110} y={78} s={0.7} />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
        <rect width="200" height="200" fill="#d9e6ee" />
        <rect y="130" width="200" height="70" fill="#9bbd7a" />
        <rect x="20" y="20" width="160" height="110" fill="#f3efe4" />
        <rect x="40" y="40" width="50" height="40" fill="#a7c6dc" />
        <Worker x={110} y={70} s={0.85} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <rect width="200" height="200" fill="#efe3d0" />
      <rect y="140" width="200" height="60" fill="#c9a77c" />
      <rect x="110" y="30" width="60" height="70" fill="#cfe4f2" />
      <rect x="20" y="60" width="60" height="80" fill="#d8c3a0" />
      <Worker x={96} y={78} s={0.6} />
    </svg>
  );
}

/* ── カテゴリカード用の仮ビジュアル(3:2) ── */

const SCENES: Record<CategoryId, ReactNode> = {
  exterior: (
    <>
      <rect width="300" height="200" fill="#bfdcf2" />
      <rect y="150" width="300" height="50" fill="#8fbd78" />
      <rect x="50" y="80" width="200" height="90" fill="#e9e4d8" />
      <path d="M36 84 L150 22 L264 84Z" fill="#7f8c99" />
      <rect x="70" y="100" width="40" height="40" fill="#a7c6dc" />
      <rect x="190" y="100" width="40" height="40" fill="#a7c6dc" />
      <rect x="130" y="112" width="40" height="58" fill="#8b6b4a" />
    </>
  ),
  reform: (
    <>
      <rect width="300" height="200" fill="#e9c9a0" />
      <rect x="0" y="20" width="300" height="46" fill="#b9793f" />
      <rect x="0" y="120" width="300" height="80" fill="#a8672f" />
      <rect x="0" y="110" width="300" height="14" fill="#f2ece2" />
      <rect x="120" y="70" width="60" height="40" fill="#f6f1e6" />
    </>
  ),
  plumbing: (
    <>
      <rect width="300" height="200" fill="#dfe4e8" />
      <rect y="140" width="300" height="60" fill="#c3cad0" />
      <path d="M110 140 V70 C110 40 170 40 190 62 L206 78 H186 L176 68 C160 56 138 62 138 78 V140Z" fill="#a9b1b8" />
      <rect x="196" y="76" width="22" height="26" fill="#8d959c" />
    </>
  ),
  electric: (
    <>
      <rect width="300" height="200" fill="#d9a56c" />
      <g stroke="#c28a50" strokeWidth="3">
        <path d="M0 40H300M0 80H300M0 120H300M0 160H300" />
      </g>
      <path d="M150 0V70" stroke="#222" strokeWidth="3" />
      <path d="M100 100 L150 70 L200 100Z" fill="#2b2b2b" />
      <circle cx="110" cy="112" r="9" fill="#ffe9a8" />
      <circle cx="150" cy="116" r="9" fill="#ffe9a8" />
      <circle cx="190" cy="112" r="9" fill="#ffe9a8" />
    </>
  ),
  "exterior-work": (
    <>
      <rect width="300" height="200" fill="#cfe0c8" />
      <rect y="150" width="300" height="50" fill="#bdb6a4" />
      <g fill="#6b4a33">
        <rect x="130" y="30" width="170" height="130" />
      </g>
      <g stroke="#52372a" strokeWidth="2">
        <path d="M130 55H300M130 80H300M130 105H300M130 130H300" />
      </g>
      <circle cx="60" cy="80" r="60" fill="#4f8f3a" />
      <circle cx="30" cy="120" r="40" fill="#6aab4d" />
    </>
  ),
  interior: (
    <>
      <rect width="300" height="200" fill="#ecd2a8" />
      <rect y="150" width="300" height="50" fill="#c9a77c" />
      <rect x="30" y="30" width="110" height="110" fill="#d7a96a" />
      <g stroke="#b88a4f" strokeWidth="3">
        <path d="M30 70H140M30 105H140" />
      </g>
      <rect x="180" y="40" width="90" height="100" fill="#e4f1f8" />
    </>
  ),
  cleaning: (
    <>
      <rect width="300" height="200" fill="#e7e9eb" />
      <path d="M170 0 L190 0 L172 110 L152 110Z" fill="#8e969c" />
      <rect x="90" y="110" width="150" height="26" rx="6" fill="#4b5359" />
      <rect x="100" y="136" width="130" height="8" fill="#2d3236" />
    </>
  ),
  other: (
    <>
      <rect width="300" height="200" fill="#e6eef6" />
      <g stroke="#c4d3e2" strokeWidth="2">
        <path d="M0 40H300M0 90H300M0 140H300M60 0V200M140 0V200M220 0V200" />
      </g>
      <rect x="170" y="60" width="90" height="26" rx="6" transform="rotate(28 215 73)" fill="#2b2b2b" />
      <rect x="205" y="40" width="18" height="70" transform="rotate(28 215 73)" fill="#c93b30" />
      <path d="M60 150 L130 80" stroke="#c99a3c" strokeWidth="14" strokeLinecap="round" />
      <circle cx="136" cy="74" r="16" fill="none" stroke="#c99a3c" strokeWidth="8" />
    </>
  ),
};

export function CategoryScene({ id, className }: SvgProps & { id: CategoryId }) {
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      {SCENES[id]}
    </svg>
  );
}
