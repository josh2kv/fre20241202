export type ThemeMode = 'light-mode' | 'dark-mode';

export interface PaginationMeta {
  totalItems: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage: number;
}
