/*
 *Title: Routes
 *Decription: Route
 *Author:Rejwanul Reja
 *Date: 10D-Dec-2021
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHanlder');
const { tokenHandlerHandler } = require('./handlers/routeHandlers/tokenHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');
const { checkHandlerHandler } = require('./handlers/routeHandlers/checkHandlerHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandlerHandler,
    check: checkHandlerHandler,
};

module.exports = routes;
