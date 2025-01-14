export const ROUTE_SEGMENT = {
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

export const ROUTE_PATH = {
  HOME: `/${ROUTE_SEGMENT.HOME}`,

  AUTH: `/${ROUTE_SEGMENT.AUTH}`,
  AUTH_LOGIN: `/${ROUTE_SEGMENT.AUTH}/${ROUTE_SEGMENT.LOGIN}`,
  AUTH_REGISTER: `/${ROUTE_SEGMENT.AUTH}/${ROUTE_SEGMENT.REGISTER}`,
  AUTH_REGISTER_CREDENTIALS: `/${ROUTE_SEGMENT.AUTH}/${ROUTE_SEGMENT.REGISTER}/${ROUTE_SEGMENT.CREDENTIALS}`,
  AUTH_REGISTER_PLAN: `/${ROUTE_SEGMENT.AUTH}/${ROUTE_SEGMENT.REGISTER}/${ROUTE_SEGMENT.PLAN}`,
  AUTH_REGISTER_ACCOUNT: `/${ROUTE_SEGMENT.AUTH}/${ROUTE_SEGMENT.REGISTER}/${ROUTE_SEGMENT.ACCOUNT}`,

  BROWSE: `/${ROUTE_SEGMENT.BROWSE}`,
  BROWSE_DETAIL: `/${ROUTE_SEGMENT.BROWSE}/${ROUTE_SEGMENT.DYNAMIC_ID}`,
} as const;

export const LIGHT_MODE_ROUTES = [ROUTE_PATH.AUTH_REGISTER];