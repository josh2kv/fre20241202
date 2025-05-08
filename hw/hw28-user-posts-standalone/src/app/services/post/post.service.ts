import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  private readonly http = inject(HttpClient);
  private readonly _posts = signal<Post[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly posts = computed(() => this._posts());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  constructor() {}

  getPostsByUser(userId: number): Observable<Post[]> {
    this._loading.set(true);
    this._error.set(null);

    const params = new HttpParams({
      fromObject: {
        userId,
      },
    });
    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params }).pipe(
      tap((res) => {
        this._posts.set(res);
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
