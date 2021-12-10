/*
 *Title: Uptime monitoring Application
 *Decription: A RESTFul API to monitor up or down time of user defined links
 *Author:Rejwanul Reja
 *Date: 10D-Dec-2021
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');

// app module - module scaffolding
const app = {};

// configuration
app.config = {
    port: 7000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
