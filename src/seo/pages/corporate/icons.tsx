type IconProps = { className?: string };

export function ArrowRight({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true" className={className}>
      <path d="M3 11h15M12 5l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className={className}>
      <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function ChartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" className={className}>
      <rect x="3" y="26" width="6" height="11" rx="1" />
      <rect x="12" y="19" width="6" height="18" rx="1" />
      <rect x="21" y="12" width="6" height="25" rx="1" />
      <rect x="30" y="4" width="6" height="33" rx="1" />
    </svg>
  );
}

export function PeopleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" className={className}>
      <circle cx="20" cy="11" r="6" />
      <path d="M8 34c0-7 5-12 12-12s12 5 12 12z" />
      <circle cx="7" cy="16" r="4" />
      <path d="M0 31c0-5 3-9 8-9 1 0 2 .2 3 .5-3 2-4.800 5-5.200 8.500z" />
      <circle cx="33" cy="16" r="4" />
      <path d="M40 31c0-5-3-9-8-9-1 0-2 .2-3 .5 3 2 4.800 5 5.200 8.500z" />
    </svg>
  );
}

export function HandshakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M2 14l8-4 9 3 5-3 6 3 8-3v14l-8 3" />
      <path d="M2 14v14l8 3" />
      <path d="M10 10l-0 0M12 31l7 4c2 1 4-1 3-3M19 28l5 3c2 1 4-1 3-3M14 24l7 4M24 13l-8 8c-1 1 0 3 2 3 1 0 3-1 4-2l8-6" />
    </svg>
  );
}
