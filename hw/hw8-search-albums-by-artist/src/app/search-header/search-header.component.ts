import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-header',
  standalone: false,

  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss',
})
export class SearchHeaderComponent implements OnInit {
  search: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.search = params['q'] || '';
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    const trimmedSearch = this.search.trim();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: trimmedSearch },
      queryParamsHandling: 'merge',
    });
  }
}
