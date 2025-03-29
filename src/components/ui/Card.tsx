import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  role?: string;
  ariaLabel?: string;
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface CardLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Card({
  children,
  className = '',
  elevation = 1,
  role,
  ariaLabel,
}: CardProps) {
  const elevationClass = `elevation-${elevation}`;

  return (
    <div
      className={`card ${elevationClass} ${className}`.trim()}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt, className = '' }: CardImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`image ${className}`.trim()}
      loading="lazy"
    />
  );
}

export function CardLink({
  href,
  children,
  className = '',
  ariaLabel,
}: CardLinkProps) {
  return (
    <a
      href={href}
      className={`link ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
