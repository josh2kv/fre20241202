# SearchBooks

## Requirements

1. There are two pages: Home and Show Wishlist page. User can switch pages. Default page is Home page.
2. Home page:

   - Create a Search Bar to input contents (bookname) to search books (see the gif below).
   - We expect every input typing in the search input should send request to backend, but we can improve the performance and UX by using debounceTime.
   - After searching, List result result (books) in the Booklist section, each book as a card, each card should contains:
     - book pickture,
     - book name,
     - publisher,
     - publish date,
     - description.
       (if any info not list in the response json, do not show it in the card.)

3. Click a book card can add this book into Wishlist.
4. Wishlist only list books name, user can delete book from the Wishlist by click delete button for each book.
5. Show Wishlist Page: (Optional)

- When user switches to this page. it will show book list names from Home page's wishlist.
Data/API
<https://www.googleapis.com/books/v1/volumes?q=bookname>
