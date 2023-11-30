const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'He@rt2<3',
        database: 'employee_db'
    }
);

module.exports = db;