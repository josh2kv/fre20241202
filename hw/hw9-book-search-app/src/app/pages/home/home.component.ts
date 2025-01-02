import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@shared/interfaces/books';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl();
  books: Book[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchControl.setValue(params['q'] ? params['q'].trim() : '', {
        emitEvent: false,
      });
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        console.log(value);
        const trimmedValue = value?.trim() || null;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { q: trimmedValue },
          queryParamsHandling: 'merge',
        });
      });
  }
}
