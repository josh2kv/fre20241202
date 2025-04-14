import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { BookItem, ResBooks } from '../../interfaces';
import { WishlistService } from '../../services/wishlist.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit, OnDestroy {
  API_URL = 'https://www.googleapis.com/books/v1/volumes';
  private destroy$ = new Subject<void>();
  result: BookItem[] = [];
  searchControl: FormControl<string>;
  wishlist: BookItem[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private wishlistService: WishlistService
  ) {
    this.searchControl = this.fb.control('', { nonNullable: true });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        filter((value) => value.length > 2),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.onSearch(value);
      });

    this.wishlistService.wishlist$
      .pipe(takeUntil(this.destroy$))
      .subscribe((wishlist) => {
        this.wishlist = wishlist;
      });
  }

  onSearch(q: string | null) {
    if (!q) {
      this.result = [];
      return;
    }

    const params = new HttpParams({
      fromObject: {
        q,
      },
    });

    this.http
      .get<ResBooks>(this.API_URL, { params })
      .pipe(
        map((res) =>
          res.items.map((item) => ({
            id: item.id,
            thumbnail: item.volumeInfo.imageLinks.thumbnail,
            name: item.volumeInfo.title,
            publisher: item.volumeInfo.publisher,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description,
          }))
        )
      )
      .subscribe((books) => {
        this.result = books;
      });
  }

  isFavorite(id: string): boolean {
    return this.wishlist.some((item) => item.id === id);
  }

  onToggleFavorite(book: BookItem) {
    if (this.isFavorite(book.id)) {
      this.wishlistService.removeItem(book.id);
    } else {
      this.wishlistService.addItem(book);
    }
  }

  onAddFavorite(book: BookItem) {
    this.wishlistService.addItem(book);
  }

  trackByBookId(index: number, book: BookItem): string {
    return book.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
