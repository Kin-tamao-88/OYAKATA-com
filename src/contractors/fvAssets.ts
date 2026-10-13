import type { CategoryId } from "./data";
import catExterior from "../assets/images/contractors/category-exterior.webp";
import catReform from "../assets/images/contractors/category-reform.webp";
import catElectric from "../assets/images/contractors/category-electric.webp";
import catExteriorWork from "../assets/images/contractors/category-exterior-work.webp";
import catPlumbing from "../assets/images/contractors/category-plumbing.webp";
import catInterior from "../assets/images/contractors/category-interior.webp";
import catCleaning from "../assets/images/contractors/category-cleaning.webp";
import catOther from "../assets/images/contractors/category-other.webp";
import fvBackground from "../assets/images/contractors/fv-background.webp";
import circleExterior from "../assets/images/contractors/fv-circle-exterior.webp";
import japanMap from "../assets/images/contractors/japan-map.webp";
import circleElectric from "../assets/images/contractors/fv-circle-electric.webp";
import circlePlumbing from "../assets/images/contractors/fv-circle-plumbing.webp";

/* ────────────────────────────────────────────────
 * FV・カテゴリ用の写真スロット。
 * 現在はSVGイラストの仮素材を表示している。写真素材を src/assets/images/contractors/ に置き、
 * import したURLをここに設定すると、該当スロットが写真に切り替わる。
 *
 * 推奨サイズ
 *  - background : 2880×1400 推奨(現在は 2103×748 の丘陵住宅街を設定済み。WebP, 住宅街・青空・緑。左側は白っぽく読み物が乗る構図)
 *  - circles    : 800×800 (正方形。現在は 外構 / 電気工事 / 水道工事 の写真を設定済み)
 *  - categories : 現在は 800×約428 の写真を8業種分設定済み(表示は3:2でトリミング)
 * ──────────────────────────────────────────────── */

export type CircleSlot = { src: string | null; alt: string };

export const FV_BACKGROUND_PHOTO: string | null = fvBackground;

export const FV_CIRCLES: [CircleSlot, CircleSlot, CircleSlot] = [
  { src: circleExterior, alt: "庭先で外構の石材を施工する職人" },
  { src: circleElectric, alt: "室内で照明器具を取り付ける電気工事の職人" },
  { src: circlePlumbing, alt: "洗面台の下で配管を施工する水道工事の職人" },
];

export const CATEGORY_PHOTOS: Partial<Record<CategoryId, string>> = {
  exterior: catExterior,
  reform: catReform,
  electric: catElectric,
  "exterior-work": catExteriorWork,
  plumbing: catPlumbing,
  interior: catInterior,
  cleaning: catCleaning,
  other: catOther,
};

/** FV右側の日本地図(背景透過)。 */
export const FV_MAP = japanMap;
