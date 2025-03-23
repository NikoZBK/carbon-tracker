import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import MenuToggle from './MenuToggle';
import { NAV_ITEMS } from '../../constants/navigation';
import { useMenu } from '../../hooks/useMenu';

interface MenuProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  context?: string;
  ariaLabel?: string;
}

interface MenuItemProps {
  to: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Menu({
  className = '',
  orientation = 'vertical',
  context = 'app',
  ariaLabel = 'Main Navigation',
}: MenuProps) {
  const { isCollapsed, toggleCollapse } = useMenu();

  return (
    <nav
      className={`menu-${orientation}-${context} ${
        isCollapsed ? 'collapsed' : ''
      } ${className}`.trim()}
      aria-label={ariaLabel}
      role="navigation"
    >
      <div className="menu-header">
        <MenuToggle
          isCollapsed={isCollapsed}
          onToggle={toggleCollapse}
          className="menu-toggle-button touch-target"
        />
      </div>

      <div className="menu-items" role="menubar">
        {NAV_ITEMS.map(item => (
          <MenuItem key={item.path} to={item.path} ariaLabel={item.label}>
            <span>{item.label}</span>
          </MenuItem>
        ))}
      </div>
    </nav>
  );
}

export function MenuItem({
  to,
  children,
  className = '',
  ariaLabel,
}: MenuItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `link transition-all duration-200 ${
          isActive ? 'active text-white' : ''
        } ${className}`.trim()
      }
      aria-label={ariaLabel}
      role="menuitem"
    >
      <span className="mobile-center">{children}</span>
    </NavLink>
  );
}
