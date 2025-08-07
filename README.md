# Book API

A simple RESTful API for managing books using Node.js and Express.

## Features
- Get all books
- Add a new book
- Update a book by ID
- Delete a book by ID

## Endpoints

### GET /books
Returns a list of all books.

### POST /books
Add a new book.
- Request body (JSON):
  ```json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  ```

### PUT /books/:id
Update a book by its ID.
- Request body (JSON):
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author"
  }
  ```

### DELETE /books/:id
Delete a book by its ID.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   node index.js
   ```
3. The API will run at `http://localhost:3000`

## Testing
Use Postman or any HTTP client to test the endpoints.

## Notes
- Data is stored in-memory and will reset when the server restarts.
- `node_modules` is ignored by git via `.gitignore`.

## Preview

_![Website Preview](./ss/ss1.png)
_![Website Preview](./ss/ss2.png)
_![Website Preview](./ss/ss3.png)
_![Website Preview](./ss/ss4.png)
_![Website Preview](./ss/ss5.png)



## Author 
 - Aditi Bhatt - Frontend Developer




