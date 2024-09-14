const dbPool = require('../config/database');

// Get all books
const getAllBooks = () => {
    const SQLQuery = 'SELECT * FROM books';
    return dbPool.execute(SQLQuery);
};

// Create a new book
const createNewBooks = ({ code, title, author, stock }) => {
    const SQLQuery = 'INSERT INTO books (code, title, author, stock) VALUES (?, ?, ?, ?)';
    return dbPool.execute(SQLQuery, [code, title, author, stock]);
};

// Update a book by code
const updateBookByCode = (code, { title, author, stock }) => {
    const SQLQuery = 'UPDATE books SET title = ?, author = ?, stock = ? WHERE code = ?';
    return dbPool.execute(SQLQuery, [title, author, stock, code]);
};

// Mendapatkan buku berdasarkan kode
const getBookByCode = (bookCode) => {
    const SQLQuery = 'SELECT * FROM books WHERE code = ?';
    return dbPool.execute(SQLQuery, [bookCode]);
};

// Mengupdate stok buku
const updateBookStock = (bookCode, newStock) => {
    const SQLQuery = 'UPDATE books SET stock = ? WHERE code = ?';
    return dbPool.execute(SQLQuery, [newStock, bookCode]);
};

module.exports = {
    getAllBooks,
    createNewBooks,
    updateBookByCode,
    getBookByCode,
    updateBookStock,
    updateBookStock,
};
