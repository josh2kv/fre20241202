import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookItem } from '../../interfaces';
import { WishlistService } from '../../services/wishlist.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  wishlist: BookItem[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.wishlist$
      .pipe(takeUntil(this.destroy$))
      .subscribe((wishlist) => {
        this.wishlist = wishlist;
      });
  }

  onDeleteFavorite(id: string) {
    this.wishlistService.removeItem(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
