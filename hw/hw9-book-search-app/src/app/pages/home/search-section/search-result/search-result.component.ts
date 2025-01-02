import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksApiService } from '@core/services/books-api-service';
import { BooksWithPagination } from '@shared/interfaces/books';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-result',
  standalone: false,

  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit {
  booksWithPagination: BooksWithPagination | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private booksApiService: BooksApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.loading = true;
          this.error = '';

          const q = params['q']?.trim() || '';

          if (!q) {
            this.loading = false;
            return of(null);
          }

          return this.booksApiService.fetchBooks({ q, page: 1 });
        })
      )
      .subscribe({
        next: (booksWithPagination) => {
          this.booksWithPagination = booksWithPagination;
          this.loading = false;
        },
        error: (err) => {
          console.error('error', err);
          this.error =
            err.message || 'Failed to fetch books. Please try again.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
