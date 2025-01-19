const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

const db = mysql.createConnection(process.env.MYSQL_URL);
    


module.exports = db;
