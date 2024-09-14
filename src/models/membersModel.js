// models/members.js
const dbPool = require('../config/database');

// Mendapatkan semua anggota
const getAllMembers = () => {
    const SQLQuery = 'SELECT * FROM members';
    return dbPool.execute(SQLQuery);
};

// Menambahkan anggota baru
const createNewMember = (memberData) => {
    const { code, name } = memberData;
    const SQLQuery = 'INSERT INTO members (code, name) VALUES (?, ?)';
    return dbPool.execute(SQLQuery, [code, name]);
};

// Memperbarui anggota berdasarkan kode
const updateMemberByCode = (code, updatedData) => {
    const { name } = updatedData;
    const SQLQuery = 'UPDATE members SET name = ? WHERE code = ?';
    return dbPool.execute(SQLQuery, [name, code]);
};

// Menghapus anggota berdasarkan kode
const deleteMemberByCode = (code) => {
    const SQLQuery = 'DELETE FROM members WHERE code = ?';
    return dbPool.execute(SQLQuery, [code]);
};

// Mendapatkan jumlah buku yang dipinjam oleh setiap anggota
const getMembersWithLoanCount = () => {
    const SQLQuery = `
        SELECT m.code, m.name, COUNT(l.book_code) AS loan_count
        FROM members m
        LEFT JOIN loans l ON m.code = l.member_code
        GROUP BY m.code, m.name;
    `;
    return dbPool.execute(SQLQuery);
};

module.exports = {
    getAllMembers,
    createNewMember,
    updateMemberByCode,
    deleteMemberByCode,
    getMembersWithLoanCount,
};
