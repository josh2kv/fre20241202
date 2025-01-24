export const ROUTE_SEGMENTS = {
  DYNAMIC_ID: ':id',
  HOME: '',

  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
  CREDENTIALS: 'credentials',
  PLAN: 'plan',
  ACCOUNT: 'account',

  BROWSE: 'browse',
} as const;

export const ROUTE_PATHS = {
  HOME: `/${ROUTE_SEGMENTS.HOME}`,

  AUTH: `/${ROUTE_SEGMENTS.AUTH}`,
  AUTH_LOGIN: `/${ROUTE_SEGMENTS.AUTH}/${ROUTE_SEGMENTS.LOGIN}`,
  AUTH_REGISTER: `/${ROUTE_SEGMENTS.AUTH}/${ROUTE_SEGMENTS.REGISTER}`,
  AUTH_REGISTER_CREDENTIALS: `/${ROUTE_SEGMENTS.AUTH}/${ROUTE_SEGMENTS.REGISTER}/${ROUTE_SEGMENTS.CREDENTIALS}`,
  AUTH_REGISTER_PLAN: `/${ROUTE_SEGMENTS.AUTH}/${ROUTE_SEGMENTS.REGISTER}/${ROUTE_SEGMENTS.PLAN}`,
  AUTH_REGISTER_ACCOUNT: `/${ROUTE_SEGMENTS.AUTH}/${ROUTE_SEGMENTS.REGISTER}/${ROUTE_SEGMENTS.ACCOUNT}`,

  BROWSE: `/${ROUTE_SEGMENTS.BROWSE}`,
  BROWSE_DETAIL: `/${ROUTE_SEGMENTS.BROWSE}/${ROUTE_SEGMENTS.DYNAMIC_ID}`,
} as const;

export const LIGHT_MODE_ROUTES = [ROUTE_PATHS.AUTH_REGISTER];

export const API_PATH_SEGMENTS = {
  AUTH: {
    ROOT: 'auth',
    LOGIN: 'login',
    REGISTER: 'register',
    REFRESH: 'refresh-token',
    LOGOUT: 'logout',
  },
  BROWSE: {
    ROOT: 'browse',
  },
} as const;

export const API_PATHS = {
  AUTH: `/${API_PATH_SEGMENTS.AUTH.ROOT}`,
  AUTH_LOGIN: `/${API_PATH_SEGMENTS.AUTH.ROOT}/${API_PATH_SEGMENTS.AUTH.LOGIN}`,
  AUTH_REGISTER: `/${API_PATH_SEGMENTS.AUTH.ROOT}/${API_PATH_SEGMENTS.AUTH.REGISTER}`,
  AUTH_REFRESH: `/${API_PATH_SEGMENTS.AUTH.ROOT}/${API_PATH_SEGMENTS.AUTH.REFRESH}`,
  AUTH_LOGOUT: `/${API_PATH_SEGMENTS.AUTH.ROOT}/${API_PATH_SEGMENTS.AUTH.LOGOUT}`,
} as const;
