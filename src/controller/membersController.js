// controllers/membersController.js
/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         code:
 *           type: string
 *         name:
 *           type: string
 */

const MembersModel = require('../models/membersModel');

// Mendapatkan semua anggota
const getAllMembers = async (req, res) => {
    try {
        const [data] = await MembersModel.getAllMembers();
        res.json({
            message: 'GET all members success',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

// Menambahkan anggota baru
const createNewMember = async (req, res) => {
    const newMember = req.body;
    try {
        await MembersModel.createNewMember(newMember);
        res.status(201).json({
            message: 'CREATE new member success',
            newMember: newMember,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

// Memperbarui anggota berdasarkan kode
const updateMemberByCode = async (req, res) => {
    const code = req.params.code;
    const updatedData = req.body;
    try {
        await MembersModel.updateMemberByCode(code, updatedData);
        res.status(200).json({
            message: 'UPDATE member success',
            updatedMember: {
                code,
                ...updatedData,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

// Menghapus anggota berdasarkan kode
const deleteMemberByCode = async (req, res) => {
    const code = req.params.code;
    try {
        await MembersModel.deleteMemberByCode(code);
        res.status(200).json({
            message: 'DELETE member success',
            deletedMemberCode: code,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

// Mendapatkan semua anggota dengan jumlah buku yang dipinjam
const getMembersWithLoanCount = async (req, res) => {
    try {
        const [data] = await MembersModel.getMembersWithLoanCount();
        res.json({
            message: 'GET members with loan count success',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

module.exports = {
    getAllMembers,
    createNewMember,
    updateMemberByCode,
    deleteMemberByCode,
    getMembersWithLoanCount,
};
