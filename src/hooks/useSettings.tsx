import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsTypes';

export function useSettings() {
  return useContext(SettingsContext);
}
