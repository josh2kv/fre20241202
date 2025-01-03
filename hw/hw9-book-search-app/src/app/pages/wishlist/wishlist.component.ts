import { Component, OnInit } from '@angular/core';
import { WishlistService } from '@core/services/wishlist/wishlist.service';
import { Book } from '@shared/interfaces/books';

@Component({
  selector: 'app-wishlist',
  standalone: false,

  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  wishlist: Book[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe((wishlist) => {
      this.wishlist = wishlist;
    });
  }

  removeFromWishlist(id: string) {
    this.wishlistService.removeFromWishlist(id);
  }
}
