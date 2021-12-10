/*
 *Title: Routes
 *Decription: Route
 *Author:Rejwanul Reja
 *Date: 10D-Dec-2021
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHanlder');

const routes = {
    sample: sampleHandler,
};

module.exports = routes;
