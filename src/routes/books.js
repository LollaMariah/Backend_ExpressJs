const express = require('express');
const router = express.Router();
const booksController = require('../controller/booksController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API untuk mengelola buku
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Mendapatkan semua buku
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Daftar semua buku
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID buku
 *                       code:
 *                         type: string
 *                         description: Kode unik buku
 *                       title:
 *                         type: string
 *                         description: Judul buku
 *                       author:
 *                         type: string
 *                         description: Nama pengarang buku
 *                       stock:
 *                         type: integer
 *                         description: Stok buku yang tersedia
 *                     example:
 *                       id: 1
 *                       code: JK-45
 *                       title: Harry Potter
 *                       author: J.K. Rowling
 *                       stock: 2
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/', booksController.getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Menambahkan buku baru
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Kode unik buku
 *               title:
 *                 type: string
 *                 description: Judul buku
 *               author:
 *                 type: string
 *                 description: Nama pengarang buku
 *               stock:
 *                 type: integer
 *                 description: Stok buku yang tersedia
 *             example:
 *               code: JK-45
 *               title: Harry Potter
 *               author: J.K. Rowling
 *               stock: 2
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       400:
 *         description: Data yang dikirimkan tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post('/', booksController.createNewBooks);

/**
 * @swagger
 * /books/{code}:
 *   put:
 *     summary: Mengupdate buku berdasarkan kode
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Kode unik buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Judul buku
 *               author:
 *                 type: string
 *                 description: Nama pengarang buku
 *               stock:
 *                 type: integer
 *                 description: Stok buku yang tersedia
 *             example:
 *               title: Harry Potter and the Chamber of Secrets
 *               author: J.K. Rowling
 *               stock: 3
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui
 *       400:
 *         description: Data yang dikirimkan tidak valid
 *       404:
 *         description: Buku tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put('/:code', booksController.updateBook);

/**
 * @swagger
 * /books/{code}:
 *   delete:
 *     summary: Menghapus buku berdasarkan kode
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Kode unik buku
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       404:
 *         description: Buku tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete('/:code', booksController.deleteBook);

module.exports = router;
