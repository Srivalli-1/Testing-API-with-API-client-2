const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON requests

let books = []; // Placeholder for storing book data (In-memory storage)

// **Create a New Book (C)**
app.post("/books", (req, res) => {
    const { book_id, title, author, genre, year, copies } = req.body;

    if (!book_id || !title || !author || !genre || !year || !copies) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newBook = { book_id, title, author, genre, year, copies };
    books.push(newBook);
    res.status(201).json(newBook);
});

// **Read Book Information (R)**
// Fetch all books
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// Fetch a specific book by ID
app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books.find((b) => b.book_id === bookId);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
});

// **Update Book Information (U)**
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const updatedData = req.body;

    let book = books.find((b) => b.book_id === bookId);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    book = { ...book, ...updatedData };
    const index = books.findIndex((b) => b.book_id === bookId);
    books[index] = book;

    res.status(200).json(book);
});

// **Delete a Book (D)**
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const bookIndex = books.findIndex((b) => b.book_id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Library Management API is running on port ${PORT}`);
});
