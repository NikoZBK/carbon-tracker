import { createContext, useContext } from 'react';

// Types for settings
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
export type UnitSystem = 'metric' | 'imperial';
export type EmailDigest = 'daily' | 'weekly' | 'monthly' | 'never';
export type StorageLimit = '30' | '90' | '180' | '365' | 'unlimited';

export interface SettingsContextType {
  // Data & Privacy
  dataCollection: boolean;
  anonymizeData: boolean;
  storageLimit: StorageLimit;

  // Measurements
  units: UnitSystem;
  dateFormat: DateFormat;

  // Notifications
  emailDigest: EmailDigest;
  pushNotifications: boolean;

  // Methods
  setDataCollection: (value: boolean) => void;
  setAnonymizeData: (value: boolean) => void;
  setStorageLimit: (value: StorageLimit) => void;
  setUnits: (value: UnitSystem) => void;
  setDateFormat: (value: DateFormat) => void;
  setEmailDigest: (value: EmailDigest) => void;
  setPushNotifications: (value: boolean) => void;
  resetToDefaults: () => void;
}

export const defaultSettings = {
  // Data & Privacy
  dataCollection: true,
  anonymizeData: true,
  storageLimit: '90' as StorageLimit,

  // Measurements
  units: 'metric' as UnitSystem,
  dateFormat: 'MM/DD/YYYY' as DateFormat,

  // Notifications
  emailDigest: 'weekly' as EmailDigest,
  pushNotifications: true,
};

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  setDataCollection: () => {},
  setAnonymizeData: () => {},
  setStorageLimit: () => {},
  setUnits: () => {},
  setDateFormat: () => {},
  setEmailDigest: () => {},
  setPushNotifications: () => {},
  resetToDefaults: () => {},
});

// Hook for using settings
export const useSettings = () => useContext(SettingsContext);
