import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookItem } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly wishlistSubject = new BehaviorSubject<BookItem[]>([]);
  readonly wishlist$ = this.wishlistSubject.asObservable();

  constructor() {}

  addItem(book: BookItem) {
    this.wishlistSubject.next([...this.wishlist, book]);
  }

  removeItem(id: string) {
    this.wishlistSubject.next(this.wishlist.filter((item) => item.id !== id));
  }

  isOnWishlist(id: string): boolean {
    return this.wishlist.find((item) => item.id === id) ? true : false;
  }

  get wishlist() {
    return this.wishlistSubject.getValue();
  }
}
