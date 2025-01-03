import { Component, OnInit } from '@angular/core';
import { WishlistService } from '@core/services/wishlist/wishlist.service';
import { Book } from '@shared/interfaces/books';

@Component({
  selector: 'app-wishlist-section',
  standalone: false,

  templateUrl: './wishlist-section.component.html',
  styleUrl: './wishlist-section.component.scss',
})
export class WishlistSectionComponent implements OnInit {
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
