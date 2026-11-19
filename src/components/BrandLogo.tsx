interface BrandLogoProps {
  variant?: 'compact' | 'stacked';
  tone?: 'dark' | 'light';
  align?: 'center' | 'start';
  className?: string;
}

export default function BrandLogo({
  variant = 'compact',
  align = 'center',
  className = '',
}: BrandLogoProps) {
  if (variant === 'stacked') {
    return (
      <img
        src="/images/logo.jpg"
        alt="Vivid Interiors"
        className={`h-32 w-auto object-contain ${align === 'start' ? 'self-start' : 'self-center'} ${className}`}
      />
    );
  }

  return (
    <img
      src="/images/logo.jpg"
      alt="Vivid Interiors"
      className={`h-12 w-auto object-contain ${className}`}
    />
  );
}
