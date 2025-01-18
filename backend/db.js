const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: '',
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    
});

module.exports = db;
