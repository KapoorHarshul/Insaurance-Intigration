const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to check database connection
const testDBConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connected successfully!");
        connection.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        throw error;
    }
};

// Function to store KYC request in the database
const saveKYCRequest = async (name, idNumber, dob, documentType) => {
    try {
        const connection = await pool.getConnection();
        console.log("🔄 Saving KYC request to database...");

        const query = `INSERT INTO kyc_requests (name, pan_card, dob, document_type) VALUES (?, ?, ?, ?)`;
        const values = [name, idNumber, dob, documentType];

        const [result] = await connection.execute(query, values);
        connection.release();

        console.log(`✅ KYC request saved successfully with ID: ${result.insertId}`);
        return result.insertId; // Return the unique reference ID
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw error;
    }
};

module.exports = { saveKYCRequest, testDBConnection, pool };
