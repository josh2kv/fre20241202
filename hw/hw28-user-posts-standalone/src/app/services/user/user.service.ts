import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  private readonly http = inject(HttpClient);
  private readonly _users = signal<User[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly users = computed(() => this._users());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  constructor() {}

  getUsers(): Observable<User[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      tap((res) => {
        this._users.set(res);
      }),
      catchError((err) => {
        this._error.set(err.message);
        return throwError(() => new Error(err.message));
      }),
      finalize(() => {
        this._loading.set(false);
      })
    );
  }
}
