const dbPool = require('../config/database');

// Membuat pinjaman
const createLoan = (loan) => {
    const SQLQuery = 'INSERT INTO loans (member_code, book_code, due_date) VALUES (?, ?, ?)';
    return dbPool.execute(SQLQuery, [loan.member_code, loan.book_code, loan.due_date]);
};

// Mengembalikan buku
const returnBook = (member_code, book_code) => {
    const SQLQuery = 'UPDATE loans SET return_date = NOW() WHERE member_code = ? AND book_code = ? AND return_date IS NULL';
    return dbPool.execute(SQLQuery, [member_code, book_code]);
};

// Mendapatkan pinjaman buku berdasarkan kode buku
const getBookLoanByCode = (book_code) => {
    const SQLQuery = 'SELECT * FROM loans WHERE book_code = ? AND return_date IS NULL';
    return dbPool.execute(SQLQuery, [book_code]);
};

// Mendapatkan pinjaman berdasarkan kode anggota
const getLoansByMemberCode = (member_code) => {
    const SQLQuery = 'SELECT * FROM loans WHERE member_code = ? AND return_date IS NULL';
    return dbPool.execute(SQLQuery, [member_code]);
};

module.exports = {
    createLoan,
    returnBook,
    getBookLoanByCode,
    getLoansByMemberCode,
};
