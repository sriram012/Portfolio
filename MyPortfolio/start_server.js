var express = require('express');
var exprs_hb = require('express-handlebars');
var path = require('path');
var body_parser = require('body-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database/users.db')



var app = express();
app.use(logger('dev'));

// Static files...
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/node_modules/bootstrap'));
app.use(express.static(__dirname + '/node_modules/jquery'));
app.engine('handlebars', exprs_hb({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

/*
    Give the server access to the user input...
*/
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));


/*
    Routing Website...
*/
var landing_page = require('./routes/landing_page');
var login = require('./routes/login');

app.use('/', landing_page.router);
app.use('/login', login.router);



var port = parseInt(process.env.PORT, 10) || 8000;
// Server Listening...
app.listen(port, function() {
    console.log('Server Started lstening to port: ' + port);
});
