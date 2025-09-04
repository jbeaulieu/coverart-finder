type EnumLike<T> = T[keyof T];

export const Provider = {
  iTunes: 0,
  Deezer: 1,
} as const;

export type TProvider = EnumLike<typeof Provider>;
