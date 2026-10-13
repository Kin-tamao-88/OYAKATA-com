/**
 * 企業ページのカラーテーマ。各企業の紹介ページが、その会社のブランドカラーで統一されて見えるようにする。
 * Tailwindのクラス名は静的な文字列として書く必要があるため、色はここでクラス名として定義する。
 * 新しい企業を追加するときは、detail.theme にキーを指定する(未指定は "brand" = 親方ドットコムの黄・黒)。
 */
export type CompanyTheme = {
  /** 小さなバー・四角などの装飾色(背景) */
  accentBg: string;
  /** 明るい背景上の強調文字色(番号・英字ラベル) */
  accentText: string;
  /** 暗い背景上の強調文字色 */
  accentTextOnDark: string;
  /** 左ボーダーなどの強調線 */
  accentBorder: string;
  /** 文章セクションを区切る淡い背景 */
  softBg: string;
  /** ファーストビュー・エリアの背景 */
  warmBg: string;
  /** 「選ばれる理由」の暗い背景 */
  darkBg: string;
  /** 問い合わせCTAの背景 */
  ctaBg: string;
  /** 問い合わせCTA上の文字色 */
  ctaText: string;
  /** ファーストビューの問い合わせボタン */
  heroButton: string;
  /** 問い合わせCTAの主ボタン(電話) */
  ctaPrimary: string;
  /** 主ボタン上の補助文字色(電話番号) */
  ctaPrimaryNote: string;
  /** ファーストビューの画像の背後に敷くブロック */
  frameBlock: string;
};

export type ThemeKey = "brand" | "maruesu" | "takumi" | "kodensetsu" | "kiyomirai";

export const THEMES: Record<ThemeKey, CompanyTheme> = {
  brand: {
    accentBg: "bg-[#FFD000]",
    accentText: "text-[#8a6a00]",
    accentTextOnDark: "text-[#FFD000]",
    accentBorder: "border-[#FFD000]",
    softBg: "bg-[#f4f1ea]",
    warmBg: "bg-[#faf8f4]",
    darkBg: "bg-[#1a1a1a]",
    ctaBg: "bg-[#FFD000]",
    ctaText: "text-[#1a1a1a]",
    heroButton: "bg-[#FFD000] text-[#1a1a1a]",
    ctaPrimary: "bg-[#1a1a1a] text-white hover:bg-[#333]",
    ctaPrimaryNote: "text-[#FFD000]",
    frameBlock: "bg-[#FFD000]",
  },
  // マルエスリフォーム: 紺×イエロー
  maruesu: {
    accentBg: "bg-[#f5a800]",
    accentText: "text-[#1d4f9f]",
    accentTextOnDark: "text-[#f7b500]",
    accentBorder: "border-[#f5a800]",
    softBg: "bg-[#eef3fb]",
    warmBg: "bg-[#f4f8fd]",
    darkBg: "bg-[#12315f]",
    ctaBg: "bg-[#f7b500]",
    ctaText: "text-[#12315f]",
    heroButton: "bg-[#f7b500] text-[#12315f]",
    ctaPrimary: "bg-[#12315f] text-white hover:bg-[#1d4f9f]",
    ctaPrimaryNote: "text-[#f7b500]",
    frameBlock: "bg-[#1d4f9f]",
  },
  // 匠内装: ゴールド×ブラック
  takumi: {
    accentBg: "bg-[#b08d3f]",
    accentText: "text-[#8d6d24]",
    accentTextOnDark: "text-[#c9a456]",
    accentBorder: "border-[#b08d3f]",
    softBg: "bg-[#f3eee3]",
    warmBg: "bg-[#faf6ee]",
    darkBg: "bg-[#1e1c19]",
    ctaBg: "bg-[#c9a456]",
    ctaText: "text-[#1e1c19]",
    heroButton: "bg-[#c9a456] text-[#1e1c19]",
    ctaPrimary: "bg-[#1e1c19] text-white hover:bg-[#3a362f]",
    ctaPrimaryNote: "text-[#e2c27a]",
    frameBlock: "bg-[#b08d3f]",
  },
  // 光電設: ネイビー×ブルー×イエロー
  kodensetsu: {
    accentBg: "bg-[#f3c200]",
    accentText: "text-[#1c5fb8]",
    accentTextOnDark: "text-[#f3c200]",
    accentBorder: "border-[#f3c200]",
    softBg: "bg-[#edf3fb]",
    warmBg: "bg-[#f3f7fc]",
    darkBg: "bg-[#0f2347]",
    ctaBg: "bg-[#f3c200]",
    ctaText: "text-[#0f2347]",
    heroButton: "bg-[#f3c200] text-[#0f2347]",
    ctaPrimary: "bg-[#0f2347] text-white hover:bg-[#1c3a70]",
    ctaPrimaryNote: "text-[#f3c200]",
    frameBlock: "bg-[#1c5fb8]",
  },
  // きよみらい: グリーン×ブルー
  kiyomirai: {
    accentBg: "bg-[#2aa04f]",
    accentText: "text-[#1b7f3e]",
    accentTextOnDark: "text-[#6fd38d]",
    accentBorder: "border-[#2aa04f]",
    softBg: "bg-[#eef7f0]",
    warmBg: "bg-[#f5faf6]",
    darkBg: "bg-[#14402a]",
    ctaBg: "bg-[#2aa04f]",
    ctaText: "text-white",
    heroButton: "bg-[#2aa04f] text-white",
    ctaPrimary: "bg-white text-[#14402a] hover:bg-[#eef7f0]",
    ctaPrimaryNote: "text-[#1b7f3e]",
    frameBlock: "bg-[#1b73b8]",
  },
};
