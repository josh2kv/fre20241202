import { Injectable } from '@angular/core';
import { Book } from '@shared/interfaces/books';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Book[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  addToWishlist(book: Book): void {
    if (this.isInWishlist(book.id)) return;

    this.wishlistSubject.next([book, ...this.wishlistSubject.value]);
  }

  removeFromWishlist(bookId: string): void {
    if (!this.isInWishlist(bookId)) return;

    this.wishlistSubject.next(
      this.wishlistSubject.value.filter((book) => book.id !== bookId)
    );
  }

  toggleWishlist(book: Book): void {
    if (this.isInWishlist(book.id)) {
      this.removeFromWishlist(book.id);
    } else {
      this.addToWishlist(book);
    }
  }

  isInWishlist(bookId: string): boolean {
    return this.wishlistSubject.value.some((book) => book.id === bookId);
  }
}
