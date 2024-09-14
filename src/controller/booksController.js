const BooksModel = require('../models/booksModel');

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const [data] = await BooksModel.getAllBooks();
        res.json({
            message: 'GET all books success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

// Create a new book
const createNewBooks = async (req, res) => {
    const { code, title, author, stock } = req.body;

    try {
        await BooksModel.createNewBooks({ code, title, author, stock });
        res.status(201).json({
            message: 'CREATE new book success',
            newBook: { code, title, author, stock }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

// Update a book by code
const updateBook = async (req, res) => {
    const { code } = req.params;
    const { title, author, stock } = req.body;

    try {
        const [updatedRows] = await BooksModel.updateBookByCode(code, { title, author, stock });

        if (updatedRows === 0) {
            res.status(404).json({
                message: 'Book not found',
            });
        } else {
            res.json({
                message: 'UPDATE book success',
                updatedBook: { code, title, author, stock }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

// Delete a book by code
const deleteBook = async (req, res) => {
    const { code } = req.params;

    try {
        const [deletedRows] = await BooksModel.deleteBookByCode(code);

        if (deletedRows === 0) {
            res.status(404).json({
                message: 'Book not found',
            });
        } else {
            res.json({
                message: 'DELETE book success',
                deletedCode: code
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

module.exports = {
    getAllBooks,
    createNewBooks,
    updateBook,
    deleteBook,
};
