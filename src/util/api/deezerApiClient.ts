import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Album } from '../../@types/album';
import config from '../config';

const { deezerApi, proxySettings } = config;

type DeezerArtist = {
  id: number;
  name: string;
  picture_xl: string;
};

type DeezerAlbum = {
  id: number;
  title: string;
  cover_small: string;
  cover_xl: string;
  record_type: 'album' | 'ep' | 'single';
  artist: DeezerArtist;
};

export type DeezerAlbumSearchResponse = {
  data: DeezerAlbum[];
  total: number;
  next?: string;
};

const getRequestUrl = (): string => {
  const baseUrl = proxySettings.baseUrl;

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
};

/**
 * With deezer requests routed through a proxy, we receive img source urls in http format.
 * This is a simple regex replacer applied to album cover source urls to replace them with
 * https versions.
 **/
const preferHttpsImgSrc = (url: string) => {
    return url.replace(/^http(?!s)/, 'https');
};

const DeezerApiClient = {
  searchAlbums: async (term: string): Promise<Album[]> => {

    const deezerRequest = `${deezerApi.baseUrl}/search/album?q=${term.replaceAll(' ', '+')}`;
    const proxyRequest = `${getRequestUrl()}/v1/proxy?quest=` + encodeURIComponent(deezerRequest);

    return axios
      .get(proxyRequest)
      .then((response: AxiosResponse<DeezerAlbumSearchResponse>) => {
        const { data } = response;

        const result: Album[] = [];

        data.data.forEach((album) => {
          result.push({
            id: album.id ?? 0,
            artistName: album.artist.name,
            name: album.title ?? '-',
            thumbnailSrc: preferHttpsImgSrc(album.cover_small),
            coverSrc: preferHttpsImgSrc(album.cover_xl)
          })
        });

        return Promise.resolve(result);
      });
  },
};

export default DeezerApiClient;
