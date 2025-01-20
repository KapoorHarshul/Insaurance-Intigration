const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration using environment variables
const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'PincodeDB',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Creating a pool of database connections
const pool = mysql.createPool(dbConfig);

// Function to get a connection from the pool
const getConnection = async () => {
    try {
        // This does not actually "create" a new connection, it retrieves one from the pool.
        const connection = await pool.getConnection();
        console.log('Database connection established successfully.');
        // Release connection back to the pool
        connection.release();
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        throw error; // Rethrowing the error to be handled by the caller
    }
};

module.exports = { getConnection, pool };
