import { ReactNode } from 'react';
import ThemeToggle from '../system/ThemeToggle';

interface FooterProps {
  children?: ReactNode;
  className?: string;
}

export default function Footer({ children, className = '' }: FooterProps) {
  return (
    <footer
      className={`footer flex items-center justify-between ${className}`.trim()}
    >
      <div className="flex items-center">
        <ThemeToggle />
      </div>
      <div>{children}</div>
    </footer>
  );
}
