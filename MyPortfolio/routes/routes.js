const express = require('express');
const app = express();

// const landing_page = require('./landing_page');
const userCRUD = require('./user');


/*
    Routers
*/
module.exports.landingPageRouter = require('./landing_page');
let userRouter = require('./user');


/*
    EXPORTS
*/
// module.exports = {
//     landingPageRouter: require('./landing_page'),
//     userRouter: userRouter,
// }
