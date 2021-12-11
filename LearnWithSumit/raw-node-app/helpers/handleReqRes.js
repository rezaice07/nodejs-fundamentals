/*
 *Title: Handle request and response
 *Decription: Handle request and responseuser defined links
 *Author:Rejwanul Reja
 *Date: 10-Dec-2021
 */
// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const { parseJSON } = require('./utilies');
// module scaffolding
const handle = {};
// handle request response
handle.handleReqRes = (req, res) => {
    // request handle
    // get the url and parse it
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const heardObjects = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        heardObjects,
        body: {},
    };
    const decoder = new StringDecoder();
    let realData = '';

    // for FYI: routes['sample'] means sample value of routes object
    const choosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    // here butter means client's submitted data
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        requestProperties.body = parseJSON(realData);

        // userHandler(reqProps,callback)
        choosenHandler(requestProperties, (statusCode, payload = {}) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);
            // return the final response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};

// export items
module.exports = handle;
