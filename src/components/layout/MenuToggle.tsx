interface MenuToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export default function MenuToggle({
  isCollapsed,
  onToggle,
  className = '',
}: MenuToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`menu-toggle transition-colors duration-200 ${className}`.trim()}
      aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
      title={isCollapsed ? 'Expand menu' : 'Collapse menu'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="menu-toggle-icon transition-transform duration-300 ease-in-out"
      >
        <path
          d="M4 6H20M4 12H20M4 18H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
