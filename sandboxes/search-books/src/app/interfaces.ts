export interface ResBooks {
  kind: string;
  totalItems: number;
  items: ResBookItem[];
}

export interface ResBookItem {
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

export interface BookItem {
  id: string;
  thumbnail: string;
  name: string;
  publisher: string;
  publishedDate: string;
  description: string;
}
