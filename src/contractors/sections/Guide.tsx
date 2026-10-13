import { GuideAreaIllust, GuideSpecialtyIllust, GuideWorksIllust } from "../icons";

const POINTS = [
  {
    no: "01",
    title: "得意な工事を確認する",
    body: "会社ごとに専門分野や得意な施工内容は異なります。",
    Illust: GuideSpecialtyIllust,
  },
  {
    no: "02",
    title: "施工事例を確認する",
    body: "過去の施工写真や実績から、仕上がりのイメージをつかめます。",
    Illust: GuideWorksIllust,
  },
  {
    no: "03",
    title: "対応エリアを確認する",
    body: "工事を依頼したい地域に対応しているか確認しましょう。",
    Illust: GuideAreaIllust,
  },
];

export default function Guide() {
  return (
    <section className="bg-[#f4f1ea] py-16 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-10">
        <h2 className="text-[#1a1a1a] font-black leading-[1.4] text-[24px] lg:text-[40px] mb-10 text-balance [word-break:auto-phrase] lg:mb-14">
          納得できる工事会社選びのために。
        </h2>

        <ol className="border-t-[3px] border-[#1a1a1a]">
          {POINTS.map(({ no, title, body, Illust }) => (
            <li
              key={no}
              className="grid grid-cols-[auto_1fr] lg:grid-cols-[120px_1fr_280px] items-center gap-x-5 gap-y-5 lg:gap-x-10 py-8 lg:py-10 border-b border-[#c9c5bc]"
            >
              <span className="font-black leading-none text-[#FFD000] text-[56px] lg:text-[88px] [-webkit-text-stroke:1.5px_#1a1a1a]">
                {no}
              </span>
              <div>
                <h3 className="text-[#1a1a1a] font-black leading-[1.4] text-[21px] lg:text-[28px]">{title}</h3>
                <p className="mt-2 lg:mt-3 text-[#333] text-[16px] lg:text-[18px] leading-[1.85] text-pretty [word-break:auto-phrase]">
                  {body}
                </p>
              </div>
              <Illust className="col-span-2 lg:col-span-1 w-full max-w-[320px] lg:max-w-none h-auto" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
