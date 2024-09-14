const express = require('express');
const router = express.Router();
const loansController = require('../controller/loansController');

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: API untuk mengelola peminjaman dan pengembalian buku
 */

/**
 * @swagger
 * /loans/borrow:
 *   post:
 *     summary: Meminjam buku
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: Kode anggota yang meminjam buku
 *               book_code:
 *                 type: integer
 *                 description: ID buku yang akan dipinjam
 *             example:
 *               member_code: M001
 *               book_code: JK-45
 *     responses:
 *       200:
 *         description: Buku berhasil dipinjam
 *       400:
 *         description: Data yang dikirimkan tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post('/borrow', loansController.borrowBook);

/**
 * @swagger
 * /loans/return:
 *   post:
 *     summary: Mengembalikan buku
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: Kode anggota yang mengembalikan buku
 *               book_code:
 *                 type: integer
 *                 description: ID buku yang akan dikembalikan
 *             example:
 *               member_code: M001
 *               book_code: JK-45
 *     responses:
 *       200:
 *         description: Buku berhasil dikembalikan
 *       400:
 *         description: Data yang dikirimkan tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post('/return', loansController.returnBook);

/**
 * @swagger
 * /loans/check-penalty/{member_code}:
 *   get:
 *     summary: Check penalties for a member
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: member_code
 *         required: true
 *         description: The member code to check penalties for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of penalties for the member
 *       404:
 *         description: No penalties found
 *       500:
 *         description: Server error
 */
router.get('/check-penalty/:member_code', loansController.checkPenalty);

module.exports = router;
