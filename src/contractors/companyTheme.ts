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

/** 企業別の配色キー。掲載企業ごとの配色を足すときは、ここと THEMES に追加する */
export type ThemeKey = "brand";

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
};
