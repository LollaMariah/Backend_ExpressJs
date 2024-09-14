const LoansModel = require('../models/loansModel');
const BooksModel = require('../models/booksModel');
const PenaltiesModel = require('../models/penaltiesModel');

const borrowBook = async (req, res) => {
    const { member_code, book_code } = req.body;

    try {
        // Cek apakah anggota sedang dikenakan penalti
        const [penalties] = await PenaltiesModel.getActivePenaltyByMemberCode(member_code);
        if (penalties.length > 0) {
            const penaltyEndDate = new Date(penalties[0].penalty_end_date);
            const currentDate = new Date();
            if (currentDate <= penaltyEndDate) {
                return res.status(400).json({
                    message: 'Member is currently penalized and cannot borrow books until the penalty period ends.',
                });
            }
        }

        // Cek jumlah buku yang dipinjam oleh anggota
        const [loans] = await LoansModel.getLoansByMemberCode(member_code);
        if (loans.length >= 2) {
            return res.status(400).json({
                message: 'Cannot borrow more than 2 books.',
            });
        }

        // Cek ketersediaan buku
        const [book] = await BooksModel.getBookByCode(book_code);
        if (book.length === 0) {
            return res.status(404).json({
                message: 'Book not found.',
            });
        }

        if (book[0].stock <= 0) {
            return res.status(400).json({
                message: 'No stock available for this book.',
            });
        }

        // Cek apakah buku sudah dipinjam
        const [bookLoan] = await LoansModel.getBookLoanByCode(book_code);
        if (bookLoan.length > 0) {
            return res.status(400).json({
                message: 'The book is already borrowed by another member.',
            });
        }

        // Tambahkan pinjaman baru
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7); // Due date adalah 7 hari dari hari ini
        await LoansModel.createLoan({ member_code, book_code, due_date: dueDate.toISOString().split('T')[0] });

        // Kurangi stok buku
        await BooksModel.updateBookStock(book_code, book[0].stock - 1);

        res.status(201).json({
            message: 'Book borrowed successfully',
            loan: { member_code, book_code, due_date: dueDate },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

const returnBook = async (req, res) => {
    const { member_code, book_code } = req.body;

    try {
        const [loan] = await LoansModel.getBookLoanByCode(book_code);
        if (loan.length === 0) {
            return res.status(400).json({
                message: 'No active loan found for this book and member.',
            });
        }

        const loanData = loan[0];
        const dueDate = new Date(loanData.due_date);
        const returnDate = new Date(); // Tanggal saat ini

        // Hitung selisih hari antara dueDate dan returnDate
        const diffTime = returnDate - dueDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Konversi ke hari

        if (diffDays > 3) { // Ubah batas penalti menjadi 3 hari
            // Tambahkan penalti jika selisih hari lebih dari 3
            const penaltyEndDate = new Date();
            penaltyEndDate.setDate(penaltyEndDate.getDate() + 3); // Penalti aktif selama 3 hari

            await PenaltiesModel.createPenalty({
                member_code,
                penalty_date: returnDate.toISOString().split('T')[0], // Format YYYY-MM-DD
                penalty_end_date: penaltyEndDate.toISOString().split('T')[0], // Format YYYY-MM-DD
            });

            res.status(200).json({
                message: 'Book returned late. Penalty applied.',
                penalty: { penalty_date: returnDate, penalty_end_date: penaltyEndDate },
            });
        } else {
            // Tandai buku sebagai dikembalikan
            await LoansModel.returnBook(member_code, book_code);

            // Update stok buku
            const [book] = await BooksModel.getBookByCode(book_code);
            await BooksModel.updateBookStock(book_code, book[0].stock + 1);

            res.status(200).json({
                message: 'Book returned successfully without penalty.',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

const checkPenalty = async (req, res) => {
    const { member_code } = req.params;

    try {
        const [penalties] = await PenaltiesModel.hasPenalty(member_code);
        if (penalties.length === 0) {
            return res.status(200).json({
                message: 'Member has no penalty',
            });
        }

        res.status(200).json({
            message: 'Penalties found',
            penalties,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

module.exports = {
    checkPenalty,
};


module.exports = {
    borrowBook,
    returnBook,
    checkPenalty,
};
