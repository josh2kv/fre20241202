import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

interface ResBooks {
  kind: string;
  totalItems: number;
  items: ResBookItem[];
}

interface ResBookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

interface BookItem {
  thumbnail: string;
  name: string;
  publisher: string;
  publishedDate: string;
  description: string;
}

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  API_URL = 'https://www.googleapis.com/books/v1/volumes';
  result: BookItem[] = [];
  searchControl: FormControl<string>;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.searchControl = this.fb.control('', { nonNullable: true });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(400))
      .subscribe((value) => {
        this.onSearch(value);
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
}
