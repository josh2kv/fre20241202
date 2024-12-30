import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Album {
  collectionId: number;
  collectionViewUrl: string;
  thumbnail: string;
  collectionName: string;
  artistName: string;
}

export interface AlbumResponse {
  resultCount: number;
  results: {
    wrapperType: string;
    collectionType: string;
    artistId: number;
    collectionId: number;
    amgArtistId?: number;
    artistName: string;
    collectionName: string;
    collectionCensoredName: string;
    artistViewUrl: string;
    collectionViewUrl: string;
    artworkUrl60: string;
    artworkUrl100: string;
    collectionPrice?: number;
    collectionExplicitness: string;
    contentAdvisoryRating?: string;
    trackCount: number;
    copyright: string;
    country: string;
    currency: string;
    releaseDate: string;
    primaryGenreName: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ItunesApiService {
  private baseUrl = 'https://itunes.apple.com';
  private searchPath = '/search';

  constructor(private http: HttpClient) {}

  searchAlbums(q: string): Observable<Album[]> {
    const params = {
      term: q,
      media: 'music',
      entity: 'album',
      attribute: 'artistTerm',
      limit: '200',
    };

    return this.http
      .get<AlbumResponse>(this.baseUrl + this.searchPath, { params })
      .pipe(
        map((response) =>
          response.results.map((result) => ({
            collectionId: result.collectionId,
            collectionViewUrl: result.collectionViewUrl,
            collectionName: result.collectionName,
            thumbnail: result.artworkUrl100,
            artistName: result.artistName,
          }))
        )
      );
  }
}
