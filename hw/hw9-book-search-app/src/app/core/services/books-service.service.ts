import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BooksQueryParams,
  BooksWithPagination,
  ResBooks,
} from '@interfaces/books';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksServiceService {
  private baseUrl = 'https://www.googleapis.com/books/v1';
  private searchPath = '/volumes';
  private apiKey = 'AIzaSyCuMNA6UIfjZYY4ntRpA4TwPl_BJX87FAo';

  constructor(private http: HttpClient) {}

  fetchBooks({
    q,
    page = 0,
  }: BooksQueryParams): Observable<BooksWithPagination> {
    const params = {
      q,
      startIndex: page,
      maxResults: PER_PAGE,
      fields: BOOKS_QUERY_FIELDS,
      key: this.apiKey,
    };

    return this.http
      .get<ResBooks>(this.baseUrl + this.searchPath, {
        params,
      })
      .pipe(
        map((response) => {
          return {
            data: response.items.map((item) => ({
              id: item.id,
              title: item.volumeInfo.title,
              subtitle: item.volumeInfo.subtitle,
              authors: item.volumeInfo.authors,
              publisher: item.volumeInfo.publisher,
              publishedDate: item.volumeInfo.publishedDate,
              description: item.volumeInfo.description,
              thumbnail: item.volumeInfo.imageLinks.thumbnail,
            })),
            meta: {
              totalItems: response.totalItems,
              page: page + 1,
              totalPages: Math.ceil(response.totalItems / PER_PAGE),
              hasNextPage: response.items.length === PER_PAGE,
              hasPrevPage: page > 1,
              perPage: PER_PAGE,
            },
          };
        })
      );
  }
}
