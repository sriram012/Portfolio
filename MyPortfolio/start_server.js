const express = require('express');
const exprs_hb = require('express-handlebars');
const path = require('path');
const body_parser = require('body-parser');
const logger = require('morgan');
const firebase = require('firebase');

const mysqlConn = require('./mysql_connection');




const app = express();
app.use(logger('dev'));

// Static files...
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/node_modules/bootstrap'));
app.use(express.static(__dirname + '/node_modules/jquery'));
app.engine('handlebars', exprs_hb({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

/*
    Give the server access to the user input...
*/
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));


/*
    Routing Website...
*/
const landing_page = require('./routes/landing_page');
const user = require('./routes/user');
app.use('/', landing_page.router);
app.use('/user', user.router);




/*
    Server Starts here
*/
let port = mysqlConn.port;
// Server Listening...
app.listen(port, function () {
    console.log('Server Started lstening to port: ' + port);
});
