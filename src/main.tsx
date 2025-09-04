import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppContainer from './pages/AppContainer/AppContainer.tsx';
import SettingsContextProvider from './context/SettingsContextProvider.tsx';
import './index.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <SettingsContextProvider>
        <CssBaseline />
        <AppContainer />
      </SettingsContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
