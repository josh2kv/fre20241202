import { Injectable } from '@angular/core';
import { PaginationMeta } from '@shared/interfaces/common';
import { Movie } from '@shared/interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesCacheService {
  private scrollPosition: number = 0;
  private meta: PaginationMeta | null = null;
  private cachedMovies: Movie[] = [];

  constructor() {}

  getScrollPosition(): number {
    return this.scrollPosition;
  }

  setScrollPosition(position: number): void {
    this.scrollPosition = position;
  }

  getCachedMovies(): Movie[] {
    return this.cachedMovies;
  }

  setCachedMovies(movies: Movie[]): void {
    this.cachedMovies = movies;
  }

  getMeta(): PaginationMeta | null {
    return this.meta;
  }

  setMeta(meta: PaginationMeta): void {
    this.meta = meta;
  }

  clearCache(): void {
    this.cachedMovies = [];
    this.scrollPosition = 0;
    this.meta = null;
  }
}
