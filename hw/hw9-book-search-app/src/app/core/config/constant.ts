export const PER_PAGE = 20 as const;
export const BOOKS_QUERY_FIELDS =
  'kind,totalItems,items(id,volumeInfo/title,volumeInfo/subtitle,volumeInfo/authors,volumeInfo/publisher,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/infoLink,volumeInfo/imageLinks)' as const;
