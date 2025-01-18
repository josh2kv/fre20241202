export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum Plan {
  STANDARD_WITH_ADS = "STANDARD_WITH_ADS",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
}
export interface PaginationMeta {
  totalItems: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage: number;
}

export interface Pagination<T> {
  data: T[];
  meta: PaginationMeta;
}
