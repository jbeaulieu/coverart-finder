import { createContext } from 'react';
import type { AppSettings } from '../@types/settings';

interface SettingsContextType { settings: AppSettings; setSettings: (settings: AppSettings) => void }

const SettingsContext = createContext<SettingsContextType | null>(null);

export default SettingsContext;
