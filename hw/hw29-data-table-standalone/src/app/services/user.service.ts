import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap, finalize, catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  age: number;
  occupation: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'data/users.json';
  private readonly http = inject(HttpClient);
  private readonly _users = signal<User[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly users = computed(() => this._users());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  constructor() {}

  getUsers({
    page = 1,
    pageSize = 10,
  }: {
    page?: number;
    pageSize?: number;
  }): Observable<User[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<User[]>(this.baseUrl).pipe(
      map((res) => res.slice((page - 1) * pageSize, page * pageSize)),
      tap((users) => this._users.set(users)),
      catchError((err) => {
        this._error.set(err.message);
        return throwError(() => new Error(err.message));
      }),
      finalize(() => this._loading.set(false))
    );
  }
}
