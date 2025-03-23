import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export default function Header({ children, className = '' }: HeaderProps) {
  return <header className={`header ${className}`.trim()}>{children}</header>;
}
