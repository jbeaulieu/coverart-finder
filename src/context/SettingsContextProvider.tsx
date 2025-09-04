import { useMemo, useState } from 'react';
import SettingsContext from './SettingsContext';
import type { ReactNode } from 'react';
import { Provider } from '../@types/enums';
import type { AppSettings } from '../@types/settings';

interface Props { children: ReactNode }

const SettingsContextProvider = (props: Props) => {
  const { children } = props;
  const [settings, setSettings] = useState<AppSettings>({ provider: Provider.iTunes });
  const value = useMemo(() => ({ settings, setSettings }), [settings]);

  return <SettingsContext value={value}>{children}</SettingsContext>;
};

export default SettingsContextProvider;
