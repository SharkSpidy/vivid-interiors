interface BrandLogoProps {
  variant?: 'compact' | 'stacked';
  tone?: 'dark' | 'light';
  align?: 'center' | 'start';
  className?: string;
}

const Monogram = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 48 48"
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
  >
    <rect x="0.75" y="0.75" width="46.5" height="46.5" strokeWidth="1" />
    <rect x="4.75" y="4.75" width="38.5" height="38.5" strokeWidth="0.5" opacity="0.75" />
    <text
      x="24"
      y="31.5"
      textAnchor="middle"
      stroke="none"
      fill="currentColor"
      fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="19"
      fontWeight="400"
      letterSpacing="0.5"
    >
      VI
    </text>
  </svg>
);

export default function BrandLogo({
  variant = 'compact',
  tone = 'dark',
  align = 'center',
  className = '',
}: BrandLogoProps) {
  const isLight = tone === 'light';
  const nameColor = isLight ? 'text-limestone' : 'text-ink';
  const subColor = isLight ? 'text-limestone/55' : 'text-ink-muted';

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col gap-5 ${align === 'start' ? 'items-start' : 'items-center'} ${className}`}>
        <Monogram className="h-16 w-16 text-gold" />
        <div className={`flex flex-col gap-2 ${align === 'start' ? 'items-start' : 'items-center'}`}>
          <span className={`font-display text-[26px] font-light uppercase leading-none tracking-[0.34em] ${nameColor}`}>
            Vivid
          </span>
          <span className={`meta-label text-[9px] tracking-[0.42em] ${subColor}`}>Interiors</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <Monogram className="h-10 w-10 shrink-0 text-gold" />
      <div className="flex flex-col gap-1 leading-none">
        <span className={`font-display text-[17px] font-normal uppercase tracking-[0.3em] ${nameColor}`}>
          Vivid
        </span>
        <span className={`meta-label text-[8.5px] tracking-[0.34em] ${subColor}`}>Interiors</span>
      </div>
    </div>
  );
}
