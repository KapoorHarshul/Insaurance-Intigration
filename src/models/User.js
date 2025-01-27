// models/User.js

const mysql = require('mysql2');
const pool = require('../services/dbService').pool;

class User {
    static async updateKYCStatus(userId, kycStatus) {
        const sql = 'UPDATE users SET kycStatus = ? WHERE id = ?';
        const [result] = await pool.execute(sql, [kycStatus, userId]);
        return result;
    }
}

module.exports = User;