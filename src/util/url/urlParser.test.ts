import { describe, expect, it } from "vitest";
import { getITunesArtworkUrl } from "./urlParser";

const url = 'https://myapp.bogus/846363.png/1000x1000bb.jpg';

describe('Util urlParser', () => {
  describe('getITunesArtworkUrl', () => {
    it('generates resize urls', () => {
      const result = getITunesArtworkUrl(url, 50);

      expect(result).toEqual('https://myapp.bogus/846363.png/50x50bb.jpg');
    });
  });
});