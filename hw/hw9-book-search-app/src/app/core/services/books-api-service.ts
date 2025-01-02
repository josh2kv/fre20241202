import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BOOKS_QUERY_FIELDS, PER_PAGE } from '@core/config/constant';
import {
  BooksQueryParams,
  BooksWithPagination,
  ResBooks,
} from '@interfaces/books';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  private baseUrl = 'https://www.googleapis.com/books/v1';
  private searchPath = '/volumes';
  private key = 'AIzaSyCuMNA6UIfjZYY4ntRpA4TwPl_BJX87FAo';

  constructor(private http: HttpClient) {}

  fetchBooks({
    q,
    page = 1,
  }: BooksQueryParams): Observable<BooksWithPagination> {
    const params = {
      q,
      startIndex: (page - 1) * PER_PAGE,
      maxResults: PER_PAGE,
      fields: BOOKS_QUERY_FIELDS,
      key: this.key,
    };

    return this.http
      .get<ResBooks>(this.baseUrl + this.searchPath, {
        params,
      })
      .pipe(
        map((response) => {
          const totalItems = response.totalItems;
          const totalPages = Math.ceil(totalItems / PER_PAGE);

          return {
            data:
              response.items?.map((item) => ({
                id: item.id,
                title: item.volumeInfo.title,
                subtitle: item.volumeInfo.subtitle,
                authors: item.volumeInfo.authors,
                publisher: item.volumeInfo.publisher || 'Unknown',
                publishedDate: item.volumeInfo.publishedDate,
                description:
                  item.volumeInfo.description || 'No description available',
                thumbnail:
                  item.volumeInfo.imageLinks?.thumbnail ||
                  'https://placehold.co/310x465?text=No+Image',
              })) || [],
            meta: {
              totalItems,
              page,
              totalPages,
              hasNextPage: page < totalPages,
              hasPrevPage: page > 1,
              perPage: PER_PAGE,
            },
          };
        })
      );
  }
}
