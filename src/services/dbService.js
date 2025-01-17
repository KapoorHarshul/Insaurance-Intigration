const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'PincodeDB', // Corrected from 'InsuranceDB' to 'PincodeDB'
  port: process.env.DB_PORT || 3306,
};

const getConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connection established successfully.');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
};

module.exports = { getConnection };
