const ITUNES_API_URL: string = import.meta.env.VITE_ITUNES_API_URL || '';
const DEEZER_API_URL: string = import.meta.env.VITE_DEEZER_API_URL || '';
const PROXY_URL: string = import.meta.env.VITE_PROXY_URL || '';

export default {
  iTunesApi: {
    baseUrl: ITUNES_API_URL
  },
  deezerApi: {
    baseUrl: DEEZER_API_URL
  },
  proxySettings: {
    baseUrl: PROXY_URL
  }
};
