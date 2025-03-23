import { createContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEvent } from '../hooks/useEvent';
import { APP_EVENTS } from '../constants/events';

interface MenuContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const MenuContext = createContext<MenuContextType>({
  isCollapsed: false,
  toggleCollapse: () => {},
});

export { MenuContext };

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
  const [isCollapsed, setIsCollapsed] = useLocalStorage<boolean>(
    'menuCollapsed',
    false
  );
  const { emit } = useEvent();

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);

    // Emit menu toggle event
    emit(APP_EVENTS.MENU_TOGGLED, { isCollapsed: newState });
  };

  return (
    <MenuContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </MenuContext.Provider>
  );
}
