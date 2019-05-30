const express = require('express');
const mysql = require('mysql');                     /* MySql DATABASE */
const bcrypt = require('bcrypt');                   /* Password encrypting lib */
const mysqlConn = require('../mysql_connection');   /* init MySql Connection */
const User = require('../server/models/users');     /* USER MODEL */

const app = express();
const router = express.Router();



/*
    Variables
*/
let connection = mysqlConn.connection;
let input;




/*
    method = [GET] => LOGIN, REGISTER, EDIT_PROFILE, UPDATE_PROFILE
*/
router.get('/login', (request, response) => {
    response.render('login', {layout: false, login: true, register: false});
});
router.get('/register', (request, response) => {
    response.render('register', {layout: false, login: false, register: true});
});


/*
    method = [POST] => CRUD OPERAIONS ON USER MODEL
*/
router.post('/login', (request, response) => {
    input = JSON.parse(JSON.stringify(request.body));
    userLogin(request, response);
});
router.post('/register', (request, response) => {
    input = request.body;
    let user = User.user(
        input.first_name,
        input.last_name,
        input.email,
        input.password,
        getCurrMysqlDateTime(),
        getCurrMysqlDateTime()
    );
    let getUser = userExists(request, response, user);
    if (getUser == false) createUser(request, response, user);
    else response.redirect('/user/register');
});







// FUNCTIONS TO EXEC CRUD OPERATIONS
function userLogin(request, response) {

    let query = connection.query('SELECT password FROM users WHERE email = ?', [input.email], (error, row) => {
        if (row.length == 0 || row == 'undefined') {
            // request.session['loginError'] = 'User doesn\'t exist'
            response.redirect('/user/login');
        }
        else {
            // request.session['loginError'] = null;
            response.redirect('/');
        }
    });

}

function createUser(request, response, user) {

    let query = connection.query(
        'INSERT INTO users (first_name, last_name, email, password, created, updated) VALUES ?', [[user]], (error, result) => {
            if (error) {
                console.log(error);
                response.redirect('/user/login');
            }
            else response.redirect('/user/login');
        }
    );

}

function deleteUser(request, response, user) {

    let query = connection.query(
        'DELETE * FROM users WHERE email = ?', request.body.email, (error, result) => {
            if (error) response.redirect('/user/login');
            else response.redirect('/');
        }
    );

}







// CONSTRAINTS
function userExists(request, response, user) {
    let query = connection.query('SELECT * FROM users WHERE email = ?', [input.email], (error, row) => {
        console.log(row);
        console.log(row.length);
        if (!error) {
            if (row.length == 0) return false;
            else return true;
        }
        else {
            console.log('ERROR: ' + error);
            response.redirect('/register');
        };
    });
}





/*
    Extra Functions
*/
function getCurrMysqlDateTime() {
    let date = new Date();
    return date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
}




/*
    EXPORTS
*/
module.exports.router = router;
