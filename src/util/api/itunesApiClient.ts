import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Album } from '../../@types/album';
import config from '../config';

const { iTunesApi } = config;

interface ITunesCollection {
  wrapperType: 'track' | 'collection';
  kind: 'album' | 'song' | 'music-video';
  artistId: number;
  collectionId?: number;
  trackId?: number;
  artistName: string;
  collectionName?: string;
  trackName?: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
};

export interface ITunesSearchResponse {
  results: ITunesCollection[];
  resultCount: number;
};

const getRequestUrl = (): string => {
  const baseUrl = iTunesApi.baseUrl;

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
};

const ITunesApiClient = {
  searchAlbums: async (term: string): Promise<Album[]> => {
    const requestPath = `${getRequestUrl()}/search`;

    return axios
      .get(requestPath, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          term,
          entity: 'album',
          limit: 100,
        },
      })
      .then((response: AxiosResponse<ITunesSearchResponse>) => {
        const { data } = response;

        const result: Album[] = [];

        data.results.forEach((album) => {
          result.push({
            id: album.collectionId ?? 0,
            artistName: album.artistName,
            name: album.collectionName ?? '-',
            thumbnailSrc: album.artworkUrl100,
          })
        });

        return Promise.resolve(result);
      });
  },
};

export default ITunesApiClient;
