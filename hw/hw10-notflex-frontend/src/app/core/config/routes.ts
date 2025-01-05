export const ROUTE_SEGMENT = {
  HOME: '',
  AUTH: 'auth',
  REGISTER: 'register',
  SIGNIN: 'signin',
} as const;

export const ROUTE_PATH = {
  HOME: `/${ROUTE_SEGMENT.HOME}`,
  AUTH: `/${ROUTE_SEGMENT.AUTH}`,
  REGISTER: `/${ROUTE_SEGMENT.AUTH}/${ROUTE_SEGMENT.REGISTER}`,
  SIGNIN: `/${ROUTE_SEGMENT.AUTH}/${ROUTE_SEGMENT.SIGNIN}`,
} as const;

export const LIGHT_MODE_ROUTES = [ROUTE_PATH.REGISTER];
