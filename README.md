# Book API

A simple RESTful API for managing books using Node.js and Express.

## Features
- Get all books
- Add a new book
- Update a book by ID
- Delete a book by ID
- **NEW**: Fetch README content from GitHub repositories

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

### POST /github/readme
**NEW**: Fetch README content from a GitHub repository.
- Request body (JSON):
  ```json
  {
    "url": "https://github.com/owner/repository"
  }
  ```
- Supported URL formats:
  - `https://github.com/owner/repo`
  - `github.com/owner/repo`
  - `owner/repo`
- Returns:
  ```json
  {
    "repository": "owner/repo",
    "url": "https://github.com/owner/repo",
    "readme": "README content...",
    "filename": "README.md",
    "size": 1234
  }
  ```

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

## Author 
 - Aditi Bhatt - Frontend Developer




