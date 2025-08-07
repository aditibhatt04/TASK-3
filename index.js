const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); 
app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});

// Step 1: In-memory "database"
let books = [
  { id: 1, title: "DSA", author: "XYZ" },
  { id: 2, title: "OOP", author: "ABC" },
  { id: 3, title: "DEVELOPMENT", author: "DEF" },
  
];

// Step 2: GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Step 3: POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Step 4: PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// Step 5: DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(` Book API running at http://localhost:${3000}`);
});
