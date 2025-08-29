import type { Album } from '../../@types/album';
import deezerApiClient, { type DeezerAlbumSearchResponse } from './deezerApiClient';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  deezerBaseUrl: 'deezer.bogus',
  proxyBaseUrl: 'proxy.bogus',
}));

vi.mock('axios', async(importActual) => {
  const actual = await importActual<typeof import ('axios')>();

  const mockAxios = {
    default: {
      ...actual.default,
      get: mocks.get,
    },
  };

  return mockAxios;
});

vi.mock('../config', () => {
  return {
    default: {
      deezerApi: {
        baseUrl: mocks.deezerBaseUrl
      },
      proxySettings: {
        baseUrl: mocks.proxyBaseUrl
      }
    }
  }
});

const searchParam = 'Def Leppard';

const data: DeezerAlbumSearchResponse = {
  data: [
    {
      id: 12345,
      title: 'Adrenalize',
      record_type: 'album',
      artist: {
        id: 17,
        name: 'Def Leppard',
        picture_xl: 'bogus.artist',
      },
      cover_small: 'bogus.small',
      cover_xl: 'bogus.xl'
    }
  ],
  total: 1,
  next: 'bogus.local',
};

const response = { data };

describe('deezerApiClient', () => {
  describe('searchAlbums called', () => {
  
    beforeEach(() => {
      mocks.get.mockReset();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });
  
    describe('successfully', () => {
      it('should call axios.get', async() => {
        mocks.get.mockResolvedValueOnce(response);
        await deezerApiClient.searchAlbums(searchParam);

        const dRequest = `${mocks.deezerBaseUrl}/search/album?q=${searchParam.replaceAll(' ', '+')}`;
        const pRequest = `${mocks.proxyBaseUrl}/v1/proxy?quest=${encodeURIComponent(dRequest)}`;

        expect(mocks.get).toHaveBeenCalledExactlyOnceWith(pRequest);
      });

      it('returns data', async () => {
        mocks.get.mockResolvedValueOnce(response);

        const expected: Album[] = [
          {
            id: data.data[0].id,
            name: data.data[0].title,
            artistName: data.data[0].artist.name,
            coverSrc: data.data[0].cover_xl,
            thumbnailSrc: data.data[0].cover_small,
          }
        ];
        const result = await deezerApiClient.searchAlbums(searchParam);

        expect(result).toEqual(expected);
      });
    });

    describe('with error', () => {
      it('returns undefined', async () => {
        mocks.get.mockRejectedValueOnce(new Error('Unable to retrieve album data'));
        const result = await deezerApiClient.searchAlbums(searchParam);

        expect(result).toEqual([]);
      });
    });
  });
});
