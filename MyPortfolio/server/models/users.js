var mysql = require('mysql');
var firebase = require('firebase');


// CRUD Operations
function User(first_name, last_name, email, password, created, updated) {
    return [
        first_name,
        last_name,
        email,
        password,
        created,
        updated
    ];
}



module.exports = {
    user: User
}
