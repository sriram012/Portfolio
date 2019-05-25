var express = require('express');


var app = express();
var router = express.Router();

/* 
    method = [GET] => get to login page...
*/
router.get('/', (request, response) => {
    response.render('landing_page', {layout: false});
});


module.exports = {router: router};
