import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksApiService } from '@core/services/books-api/books-api-service';
import { WishlistService } from '@core/services/wishlist/wishlist.service';
import { Book, BooksWithPagination } from '@shared/interfaces/books';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-result',
  standalone: false,

  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit {
  search: string = '';
  booksWithPagination: BooksWithPagination | null = null;
  loading: boolean = false;
  error: string = '';
  wishlist: Book[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private booksApiService: BooksApiService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.loading = true;
          this.error = '';

          const q = params['q']?.trim() || '';
          const page = params['page'] ? Number(params['page']) : 1;
          this.search = q;
          if (!q) {
            this.loading = false;
            return of(null);
          }

          return this.booksApiService.fetchBooks({ q, page });
        })
      )
      .subscribe({
        next: (booksWithPagination) => {
          this.booksWithPagination = booksWithPagination;
        },
        error: (err) => {
          console.error('error', err);
          this.error = 'Failed to fetch books. Please try again.';
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  onPreviousPage() {
    if (!this.booksWithPagination || this.booksWithPagination.meta.page === 1)
      return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.booksWithPagination.meta.page - 1 },
      queryParamsHandling: 'merge',
    });
  }

  onNextPage() {
    if (
      !this.booksWithPagination ||
      this.booksWithPagination.meta.page ===
        this.booksWithPagination.meta.totalPages
    )
      return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.booksWithPagination.meta.page + 1 },
      queryParamsHandling: 'merge',
    });
  }

  onToggleWishlist(book: Book) {
    this.wishlistService.toggleWishlist(book);
  }

  isInWishlist(book: Book) {
    return this.wishlistService.isInWishlist(book.id);
  }
}
