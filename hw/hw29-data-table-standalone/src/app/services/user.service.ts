import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap, finalize, catchError, map, delay } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  age: number;
  occupation: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  sortBy: keyof User;
  sortOrder: 'asc' | 'desc';
}

export interface ResUsers {
  data: User[];
  meta: PaginationMeta;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'data/users.json';
  private readonly http = inject(HttpClient);

  private readonly _users = signal<User[]>([]);
  private readonly _meta = signal<PaginationMeta>({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    sortBy: 'id',
    sortOrder: 'asc',
  });
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly users = computed(() => this._users());
  readonly meta = computed(() => this._meta());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  constructor() {}

  getUsers({
    page = 1,
    pageSize = 10,
    sortBy = 'id',
    sortOrder = 'asc',
  }: {
    page?: number;
    pageSize?: number;
    sortBy?: keyof User;
    sortOrder?: 'asc' | 'desc';
  }): Observable<ResUsers> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<User[]>(this.baseUrl).pipe(
      delay(200),
      map((res) => ({
        data: res
          .sort((a, b) => {
            const aValue = a[sortBy as keyof User];
            const bValue = b[sortBy as keyof User];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
              return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }

            const aStr = String(aValue);
            const bStr = String(bValue);
            return sortOrder === 'asc'
              ? aStr.localeCompare(bStr)
              : bStr.localeCompare(aStr);
          })
          .slice((page - 1) * pageSize, page * pageSize),
        meta: {
          total: res.length,
          page,
          pageSize,
          totalPages: Math.ceil(res.length / pageSize),
          hasNextPage: page < Math.ceil(res.length / pageSize),
          hasPreviousPage: page > 1,
          sortBy,
          sortOrder,
        },
      })),
      tap(({ data, meta }) => {
        this._users.set(data);
        this._meta.set(meta);
      }),
      catchError((err) => {
        this._error.set(err.message);
        return throwError(() => new Error(err.message));
      }),
      finalize(() => this._loading.set(false))
    );
  }
}
