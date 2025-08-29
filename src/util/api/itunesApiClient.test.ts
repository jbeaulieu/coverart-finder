import type { Album } from '../../@types/album';
import itunesApiClient, { type ITunesSearchResponse } from './itunesApiClient';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  iTunesBaseUrl: 'itunes.bogus'
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
      iTunesApi: {
        baseUrl: mocks.iTunesBaseUrl
      },
    }
  }
});

const searchParam = 'Def Leppard';

const data: ITunesSearchResponse = {
  results: [
    {
      wrapperType: 'collection',
      kind: 'album',
      artistId: 17,
      collectionId: 12345,
      artistName: 'Def Leppard',
      collectionName: 'Adrenalize',
      artworkUrl100: 'bogus.100',
      artworkUrl60: 'bogus.60',
      artworkUrl30: 'bogus.30'
    }
  ],
  resultCount: 1,
};

const response = { data };

describe('itunesApiClient', () => {
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
        await itunesApiClient.searchAlbums(searchParam);

        const expectedRequest = mocks.iTunesBaseUrl + '/search';
        const expectedParams = {
          params: {
            term: searchParam,
            entity: 'album',
            limit: 100,
          }
        }

        expect(mocks.get).toHaveBeenCalledExactlyOnceWith(expectedRequest, expectedParams);
      });

      it('returns data', async () => {
        mocks.get.mockResolvedValueOnce(response);

        const expected: Album[] = [
          {
            id: data.results[0].collectionId!,
            name: data.results[0].collectionName!,
            artistName: data.results[0].artistName,
            thumbnailSrc: data.results[0].artworkUrl100,
          }
        ];
        const result = await itunesApiClient.searchAlbums(searchParam);

        expect(result).toEqual(expected);
      });
    });

    describe('with error', () => {
      it('returns undefined', async () => {
        mocks.get.mockRejectedValueOnce(new Error('Unable to retrieve album data'));
        const result = await itunesApiClient.searchAlbums(searchParam);

        expect(result).toEqual([]);
      });
    });
  });
});
