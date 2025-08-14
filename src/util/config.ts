const ITUNES_API_URL: string = import.meta.env.VITE_ITUNES_API_URL || '';
const DEEZER_API_URL: string = import.meta.env.VITE_DEEZER_API_URL || '';

export default {
  iTunesApi: {
    baseUrl: ITUNES_API_URL
  },
  deezerApi: {
    baseUrl: DEEZER_API_URL
  }
};
