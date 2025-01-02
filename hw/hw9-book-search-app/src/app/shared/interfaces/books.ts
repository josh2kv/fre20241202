import { PaginationMeta } from './common';

export interface BooksQueryParams {
  q: string;
  page: number;
}

export interface ResBookVolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  infoLink: string;
}

export interface ResBookItem {
  id: string;
  volumeInfo: ResBookVolumeInfo;
}

export interface ResBooks {
  kind: string;
  totalItems: number;
  items: ResBookItem[];
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  thumbnail: string;
}

export interface BooksWithPagination {
  data: Book[];
  meta: PaginationMeta;
}
