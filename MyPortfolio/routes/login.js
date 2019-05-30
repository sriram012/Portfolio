const express = require('express');
const bcrypt = require('bcrypt');

const mysqlConn = require('../mysql_connection');


const app = express();
const router = express.Router();

let connection = mysqlConn.connection;






/*
    method = [GET] => Go to login page
*/
router.get('/', (request, response) => {
    response.render('login', {layout: false});
});


/* 
    method = [POST] => Authenticate with submitted credentials...
*/
// General login page...
router.post('/', (request, response) => {
    login(request, response);
    console.log(request.body.email);
});




// Login Function
function login(request, response) {
    let input = JSON.parse(JSON.stringify(request.body));
    try {
        let query = connection.query('SELECT password FROM users WHERE email = ?', [input.email], (error, row) => {
            if (row.length == 0 || row == 'undefined') {
                console.log('ERROR: User doesn\'t exist');
                request.session['loginError'] = 'User doesn\'t exist'
                response.redirect('/login');
            }
            else {
                request.session.loginError = null;
                console.log(row);
                response.redirect('/');
            }
        });
    } catch (error) {
        console.error(error);
        response.redirect('/login');
    }
}







module.exports = {
    router: router,
};



/*
    General use functions...
*/
// Check if any user is logged in...
