import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Album } from '../../@types/album';
import config from '../config';

const { deezerApi } = config;

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
  const baseUrl = deezerApi.baseUrl;

  return baseUrl.endsWith('/') ? `${baseUrl}` : `${baseUrl}/`;
};

const DeezerApiClient = {
  searchAlbums: async (term: string): Promise<Album[]> => {
    const requestPath = `${getRequestUrl()}search/album`;

    const query = term.replaceAll(' ', '+');

    return axios
      .get(requestPath, {
        params: {
          q: query,
          limit: 100,
        },
      })
      .then((response: AxiosResponse<DeezerAlbumSearchResponse>) => {
        const { data } = response;

        const result: Album[] = [];

        data.data.forEach((album) => {
          result.push({
            id: album.id ?? 0,
            artistName: album.artist.name,
            name: album.title ?? '-',
            thumbnailSrc: album.cover_small,
            coverSrc: album.cover_xl
          })
        });

        return Promise.resolve(result);
      });
  },
};

export default DeezerApiClient;
