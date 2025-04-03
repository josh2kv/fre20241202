import { Component, Input, OnInit } from '@angular/core';
import { Album, ItunesApiService } from '../itunes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-result',
  standalone: false,

  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit {
  query: string = '';
  albums: Album[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private itunesService: ItunesApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.loading = true;
          this.error = '';

          const searchQuery = params['q'];
          this.query = searchQuery || '';

          if (!searchQuery || searchQuery.trim() === '') {
            this.albums = [];
            this.loading = false;
            return of([]);
          }

          return this.itunesService.searchAlbums(params['q']);
        })
      )
      .subscribe({
        next: (results) => {
          this.albums = results;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to fetch albums. Please try again.';
          this.loading = false;
        },
      });
  }
}
