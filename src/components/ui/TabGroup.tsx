interface Tab {
  id: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

/**
 * A reusable tab group component
 */
export default function TabGroup({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabGroupProps) {
  return (
    <div className={`bg-light2 rounded-lg p-1 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === tab.id ? 'bg-primary text-inverse' : 'hover:bg-light3'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
