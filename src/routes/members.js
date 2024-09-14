const express = require('express');
const router = express.Router();
const membersController = require('../controller/membersController');

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API untuk mengelola anggota perpustakaan
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Mendapatkan semua anggota
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Daftar semua anggota
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
 *                         description: ID anggota
 *                       code:
 *                         type: string
 *                         description: Kode unik anggota
 *                       name:
 *                         type: string
 *                         description: Nama anggota
 *                     example:
 *                       id: 1
 *                       code: M001
 *                       name: Angga
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/', membersController.getAllMembers);

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Menambahkan anggota baru
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Kode unik anggota baru
 *               name:
 *                 type: string
 *                 description: Nama anggota baru
 *             example:
 *               code: M003
 *               name: Sinta
 *     responses:
 *       201:
 *         description: Anggota berhasil ditambahkan
 *       400:
 *         description: Data yang dikirimkan tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post('/', membersController.createNewMember);

/**
 * @swagger
 * /members/{code}:
 *   put:
 *     summary: Memperbarui anggota berdasarkan kode
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Kode unik anggota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama anggota yang diperbarui
 *             example:
 *               name: Ferry
 *     responses:
 *       200:
 *         description: Anggota berhasil diperbarui
 *       400:
 *         description: Data yang dikirimkan tidak valid
 *       404:
 *         description: Anggota tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put('/:code', membersController.updateMemberByCode);

/**
 * @swagger
 * /members/{code}:
 *   delete:
 *     summary: Menghapus anggota berdasarkan kode
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Kode unik anggota
 *     responses:
 *       200:
 *         description: Anggota berhasil dihapus
 *       404:
 *         description: Anggota tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete('/:code', membersController.deleteMemberByCode);

/**
 * @swagger
 * /members/loan-count:
 *   get:
 *     summary: Mendapatkan semua anggota dengan jumlah buku yang dipinjam
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Daftar anggota dengan jumlah buku yang dipinjam
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     description: Kode unik anggota
 *                   name:
 *                     type: string
 *                     description: Nama anggota
 *                   loanCount:
 *                     type: integer
 *                     description: Jumlah buku yang dipinjam
 *                 example:
 *                   code: M001
 *                   name: Angga
 *                   loanCount: 3
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/loan-count', membersController.getMembersWithLoanCount);

module.exports = router;
