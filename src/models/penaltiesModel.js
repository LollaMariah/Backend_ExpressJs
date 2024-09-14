const dbPool = require('../config/database');

// Mendapatkan penalti aktif berdasarkan kode anggota
const getActivePenaltyByMemberCode = (member_code) => {
    const SQLQuery = 'SELECT * FROM penalties WHERE member_code = ? AND penalty_end_date >= NOW()';
    return dbPool.execute(SQLQuery, [member_code]);
};

// Menambahkan penalti
const createPenalty = (penalty) => {
    const SQLQuery = 'INSERT INTO penalties (member_code, penalty_date, penalty_end_date) VALUES (?, ?, ?)';
    return dbPool.execute(SQLQuery, [penalty.member_code, penalty.penalty_date, penalty.penalty_end_date]);
};

// Memeriksa apakah anggota memiliki penalti
const hasPenalty = (member_code) => {
    const SQLQuery = 'SELECT * FROM penalties WHERE member_code = ?';
    return dbPool.execute(SQLQuery, [member_code]);
};

module.exports = {
    getActivePenaltyByMemberCode,
    createPenalty,
    hasPenalty,
};
