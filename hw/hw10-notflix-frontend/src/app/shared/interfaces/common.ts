export type ThemeMode = 'light-mode' | 'dark-mode';

export interface DataWithPagination<T> {
  data: T;
  meta: PaginationMeta;
}

export interface PaginationMeta {
  totalItems: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage: number;
}

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors: any[];
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
