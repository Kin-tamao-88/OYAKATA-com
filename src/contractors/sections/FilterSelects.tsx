import { ALL_PREFECTURES, CATEGORIES } from "../data";
import type { CategoryId, CompanyFilter } from "../data";
import { PinIcon, WrenchIcon } from "../icons";

type Props = {
  filter: CompanyFilter;
  onChange: (next: CompanyFilter) => void;
  /** select要素のid衝突を避けるための接頭辞 */
  idPrefix: string;
  /** labeled: ラベル付き(一覧の絞り込みバー) / bar: アイコン付き(FVの検索フォーム) */
  variant?: "labeled" | "bar";
  /** labeled時のラベル文字色クラス */
  labelClassName?: string;
};

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const labeledSelectClass =
  "w-full h-[56px] bg-white text-[#1a1a1a] text-[17px] font-bold pl-4 pr-11 appearance-none rounded-none border-2 border-white focus:border-[#FFD000] focus:outline-none cursor-pointer";

const barSelectClass =
  "w-full h-[60px] bg-white text-[#1a1a1a] text-[16px] lg:text-[17px] font-bold pl-14 pr-11 appearance-none rounded-lg border border-[#e6e2d8] focus:border-[#FFD000] focus:outline-none cursor-pointer";

/** エリア・工事内容の2つのセレクト。FVと一覧セクションで共用する。 */
export default function FilterSelects({ filter, onChange, idPrefix, variant = "labeled", labelClassName = "" }: Props) {
  const isBar = variant === "bar";
  const selectClass = isBar ? barSelectClass : labeledSelectClass;
  const labelClass = isBar ? "sr-only" : `block mb-2 font-bold text-[15px] ${labelClassName}`;

  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}-area`} className={labelClass}>
          エリア
        </label>
        <div className="relative">
          {isBar && <PinIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#1a1a1a]" />}
          <select
            id={`${idPrefix}-area`}
            value={filter.area}
            onChange={(e) => onChange({ ...filter, area: e.target.value })}
            className={selectClass}
          >
            <option value="">{isBar ? "エリアを選択" : "すべてのエリア"}</option>
            {ALL_PREFECTURES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-category`} className={labelClass}>
          工事内容
        </label>
        <div className="relative">
          {isBar && <WrenchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#1a1a1a]" />}
          <select
            id={`${idPrefix}-category`}
            value={filter.category}
            onChange={(e) => onChange({ ...filter, category: e.target.value as CategoryId | "" })}
            className={selectClass}
          >
            <option value="">{isBar ? "工事の種類を選択" : "すべての工事内容"}</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>
    </>
  );
}
