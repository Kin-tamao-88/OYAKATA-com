import type { CompanyDetail } from "../companyDetails";
import type { CompanyTheme } from "../companyTheme";

type Props = {
  detail: CompanyDetail;
  theme: CompanyTheme;
};

export default function CompanyAbout({ detail, theme }: Props) {
  const { about } = detail;
  const portrait = about.portrait;
  const team = about.teamPhoto;
  const hasPhotos = Boolean(portrait || team);

  return (
    <section className="bg-white py-16 lg:py-28">
      <div
        className={`max-w-[1340px] mx-auto px-5 lg:px-10 ${
          hasPhotos ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20" : ""
        }`}
      >
        <div className={hasPhotos ? "" : "max-w-[820px]"}>
          <p className="flex items-center gap-3 mb-4 text-[#1a1a1a] font-bold text-[14px] tracking-wider">
            <span className={`block w-6 h-[3px] ${theme.accentBg}`} />
            ABOUT
          </p>
          <h2 className="text-[#1a1a1a] font-black leading-[1.4] text-[26px] lg:text-[42px] text-balance [word-break:auto-phrase]">
            {about.heading ?? "地域の住まいを支える、確かな仕事。"}
          </h2>

          <div className="mt-8 lg:mt-10 space-y-5 text-[#333] text-[16px] lg:text-[18px] leading-[2] [word-break:auto-phrase]">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {about.specialties && about.specialties.length > 0 && (
            <div className="mt-9">
              <h3 className="font-black text-[#1a1a1a] text-[18px]">得意分野</h3>
              <ul className="mt-3 grid sm:grid-cols-2 gap-x-8">
                {about.specialties.map((s) => (
                  <li key={s} className="flex items-center gap-3 py-3 border-b border-[#e4e0d8] text-[#1a1a1a] font-bold text-[16px]">
                    <span className={`block w-3 h-3 ${theme.accentBg} shrink-0`} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {about.attitude && (
            <div className={`mt-10 ${theme.softBg} border-l-[5px] ${theme.accentBorder} px-6 py-6 lg:px-8`}>
              <h3 className="font-black text-[#1a1a1a] text-[18px]">{about.attitude.title}</h3>
              <p className="mt-3 text-[#333] text-[16px] lg:text-[17px] leading-[1.95] [word-break:auto-phrase]">
                {about.attitude.body}
              </p>
            </div>
          )}
        </div>

        {hasPhotos && (
          <div className="mt-12 lg:mt-0 relative">
            {portrait && (
              <figure className="relative">
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] object-cover object-[32%_40%]"
                />
                <figcaption className="absolute left-0 bottom-0 bg-[#1a1a1a] text-white px-5 py-4">
                  <span className="block text-[14px] text-white/80 font-bold">{portrait.role}</span>
                  <span className="block text-[20px] font-black">{portrait.name}</span>
                </figcaption>
              </figure>
            )}
            {team && (
              <img
                src={team.src}
                alt={team.alt}
                width={team.width}
                height={team.height}
                loading="lazy"
                decoding="async"
                className={`aspect-[4/3] object-cover ${
                  portrait ? "mt-4 w-[78%] ml-auto lg:-mt-16 border-[6px] border-white" : "w-full"
                }`}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
