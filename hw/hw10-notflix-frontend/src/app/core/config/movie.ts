// a part of response data from `https://api.themoviedb.org/3/configuration`
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

export const POSTER_SIZES = {
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W342: 'w342',
  W500: 'w500',
  W780: 'w780',
  ORIGINAL: 'original',
} as const;

export const BACKDROP_SIZES = {
  W300: 'w300',
  W780: 'w780',
  W1280: 'w1280',
  ORIGINAL: 'original',
} as const;

export const PROFILE_SIZES = {
  W45: 'w45',
  W185: 'w185',
  H632: 'h632',
  ORIGINAL: 'original',
} as const;

export const STILL_SIZES = {
  W92: 'w92',
  W185: 'w185',
  W300: 'w300',
  ORIGINAL: 'original',
} as const;

export const LOGO_SIZES = {
  W45: 'w45',
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W300: 'w300',
  W500: 'w500',
  ORIGINAL: 'original',
} as const;
