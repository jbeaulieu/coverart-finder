import SettingsIcon from '@mui/icons-material/Settings';
import App from "../../App";
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import useSettingsContext from '../../context/useSettingsContext';
import { Provider, type TProvider } from '../../@types/enums';
import Avatar from '@mui/material/Avatar';
import DeezerLogo from '../../assets/deezer.png'
import iTunesLogo from '../../assets/iTunes.png';

const AppContainer = () => {
  const { settings, setSettings } = useSettingsContext();

  const setProvider = (provider: TProvider) => {
    setSettings({ ...settings, provider });
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>
          <Chip
            label="iTunes"
            avatar={<Avatar alt="iTunes" src={iTunesLogo} />}
            color={settings.provider == Provider.iTunes ? "primary" : "default"}
            onClick={() => setProvider(Provider.iTunes)}
            style={{marginRight: 5}}
          />
          <Chip
            label="Deezer"
            avatar={<Avatar alt="iTunes" src={DeezerLogo} />}
            color={settings.provider == Provider.Deezer ? "primary" : "default"}
            onClick={() => setProvider(Provider.Deezer)}
          />
        </span>
        <IconButton aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </div>
      <App />
    </>
  );
};

export default AppContainer;
