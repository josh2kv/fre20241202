export const EMAIL_REGEX = `(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)`;
export const TMDB_API_KEY_REGEX = `^[A-Za-z0-9_-]{2,}(?:\.[A-Za-z0-9_-]{2,}){2}$`;
export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 16;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 16;

export const SNACKBAR_DURATION = 3000;

export const SNACKBAR_DEFAULT_CONFIG = {
  duration: SNACKBAR_DURATION,
  verticalPosition: 'top',
  horizontalPosition: 'center',
} as const;

export const SNACKBAR_SUCCESS_CONFIG = {
  ...SNACKBAR_DEFAULT_CONFIG,
  panelClass: 'snackbar-success',
} as const;

export const SNACKBAR_ERROR_CONFIG = {
  ...SNACKBAR_DEFAULT_CONFIG,
  panelClass: 'snackbar-error',
} as const;
