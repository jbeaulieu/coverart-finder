/**
 * Deezer artwork urls are formated with a suffix of `/{size}x{size}-000000-{jpeg-quality}-0-0.jpg`.
 * This is a helper method to crop that suffix and replace it with one that
 * will link to artwork with the desired size.
 * @param {string} imgUrl The url to be manipulated
 * @param {number} size The desired size
 * @param {number} quality The desired jpeg quality level
 */
export const getDeezerArtworkUrl = (imgUrl: string, size: number, quality: number) => {
  const index = imgUrl.lastIndexOf('/');

  const prefix = imgUrl.substring(0, index);
  const suffix = `/${size}x${size}-000000-${quality}-0-0.jpg`;

  return prefix + suffix;
};

/**
 * iTunes artwork urls are formated with a suffix of `/{size}x{size}bb.jpg`.
 * This is a helper method to crop that suffix and replace it with one that
 * will link to artwork with the desired size.
 * @param {string} imgUrl The url to be manipulated
 * @param {number} size The desired size
 */
export const getITunesArtworkUrl = (imgUrl: string, size: number) => {
  const index = imgUrl.lastIndexOf('/');

  const prefix = imgUrl.substring(0, index);
  const suffix = `/${size}x${size}bb.jpg`;

  return prefix + suffix;
};
