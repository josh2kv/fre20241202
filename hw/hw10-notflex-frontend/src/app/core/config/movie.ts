export const movieConfig = {
  images: {
    baseUrl: 'http://image.tmdb.org/t/p/',
    secureBaseUrl: 'https://image.tmdb.org/t/p/',
    backdropSizes: ['w300', 'w780', 'w1280', 'original'],
    logoSizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
    posterSizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    profileSizes: ['w45', 'w185', 'h632', 'original'],
    stillSizes: ['w92', 'w185', 'w300', 'original'],
  },
} as const;

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const POSTER_SIZE = {
  w92: 'w92',
  w154: 'w154',
  w185: 'w185',
  w342: 'w342',
  w500: 'w500',
  w780: 'w780',
  original: 'original',
} as const;

export const BACKDROP_SIZE = {
  w300: 'w300',
  w780: 'w780',
  w1280: 'w1280',
  original: 'original',
} as const;
