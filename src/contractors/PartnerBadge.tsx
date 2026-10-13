type Props = {
  className?: string;
};

/** 親方ドットコム パートナーズ掲載企業を示す共通バッジ。企業カード・個人企業ページなどで再利用する。 */
export default function PartnerBadge({ className = "" }: Props) {
  return (
    <p
      className={`inline-flex items-stretch bg-[#1a1a1a] text-white font-bold text-[13px] leading-none tracking-[0.12em] whitespace-nowrap ${className}`}
    >
      <span className="block w-[6px] bg-[#FFD000]" />
      <span className="px-3 py-[9px]">OYAKATA PARTNER</span>
    </p>
  );
}
