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
  }: {
    page?: number;
    pageSize?: number;
  }): Observable<{
    data: User[];
    meta: PaginationMeta;
  }> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<User[]>(this.baseUrl).pipe(
      delay(500),
      map((res) => ({
        data: res.slice((page - 1) * pageSize, page * pageSize),
        meta: {
          total: res.length,
          page,
          pageSize,
          totalPages: Math.ceil(res.length / pageSize),
          hasNextPage: page < Math.ceil(res.length / pageSize),
          hasPreviousPage: page > 1,
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
