import { ReactNode } from 'react';
import {
  SettingsContext,
  defaultSettings,
  DateFormat,
  UnitSystem,
  EmailDigest,
  StorageLimit,
} from './SettingsTypes';
import useLocalStorage from '../hooks/useLocalStorage';

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [dataCollection, setDataCollection] = useLocalStorage<boolean>(
    'settings.dataCollection',
    defaultSettings.dataCollection
  );

  const [anonymizeData, setAnonymizeData] = useLocalStorage<boolean>(
    'settings.anonymizeData',
    defaultSettings.anonymizeData
  );

  const [storageLimit, setStorageLimit] = useLocalStorage<StorageLimit>(
    'settings.storageLimit',
    defaultSettings.storageLimit
  );

  const [units, setUnits] = useLocalStorage<UnitSystem>(
    'settings.units',
    defaultSettings.units
  );

  const [dateFormat, setDateFormat] = useLocalStorage<DateFormat>(
    'settings.dateFormat',
    defaultSettings.dateFormat
  );

  const [emailDigest, setEmailDigest] = useLocalStorage<EmailDigest>(
    'settings.emailDigest',
    defaultSettings.emailDigest
  );

  const [pushNotifications, setPushNotifications] = useLocalStorage<boolean>(
    'settings.pushNotifications',
    defaultSettings.pushNotifications
  );

  const resetToDefaults = () => {
    setDataCollection(defaultSettings.dataCollection);
    setAnonymizeData(defaultSettings.anonymizeData);
    setStorageLimit(defaultSettings.storageLimit);
    setUnits(defaultSettings.units);
    setDateFormat(defaultSettings.dateFormat);
    setEmailDigest(defaultSettings.emailDigest);
    setPushNotifications(defaultSettings.pushNotifications);
  };

  return (
    <SettingsContext.Provider
      value={{
        dataCollection,
        anonymizeData,
        storageLimit,
        units,
        dateFormat,
        emailDigest,
        pushNotifications,
        setDataCollection,
        setAnonymizeData,
        setStorageLimit,
        setUnits,
        setDateFormat,
        setEmailDigest,
        setPushNotifications,
        resetToDefaults,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
