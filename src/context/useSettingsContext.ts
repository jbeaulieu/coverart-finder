import { use } from 'react';
import SettingsContext from './SettingsContext';

const useSettingsContext = () => {
  const settingsContext = use(SettingsContext);
  if (!settingsContext) {
    throw new Error('useResidentContext must be used within a ResidentContextProvider');
  }

  return settingsContext;
};

export default useSettingsContext;
