const mysql = require('mysql');


// Creating mysql server
let port = parseInt(process.env.PORT, 10) || 8000;
let connection;
var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'SANDY@12',
    database: 'PORTFOLIO'
};

connection = mysql.createConnection(db_config);
connection.connect((error) => {
    if (error) {
        console.log('ERROR: ' + error);
    }
    else {
        console.log('Connected!!');
    }
})

module.exports = {
    port: port,
    connection: connection
}