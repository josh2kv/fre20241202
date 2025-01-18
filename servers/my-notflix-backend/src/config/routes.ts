export const API_PREFIX = "/api" as const;
export const API_VERSION = "/v1" as const;

export const ROUTE_SEGMENT = {
  ROOT: "/",
  ID_PARAM: "/:id",

  AUTH: {
    ROOT: "/auth",
    LOGIN: "/login",
    REGISTER: "/register",
    REFRESH_TOKEN: "/refresh-token",
  },

  USERS: {
    ROOT: "/users",
  },
};
