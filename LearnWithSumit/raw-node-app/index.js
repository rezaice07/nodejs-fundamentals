/*
 *Title: Uptime monitoring Application
 *Decription: A RESTFul API to monitor up or down time of user defined links
 *Author:Rejwanul Reja
 *Date: 10D-Dec-2021
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');

// app module - module scaffolding
const app = {};

// create new file and insert data  into the file
/*
data.create('sandbox', 'sandbox-file', { name: 'Bangladesh', Language: 'Bangla' }, (err) => {
    console.log(`${err}`);
});
*/

// read data from file
/*
data.read('sandbox', 'sandbox-file', (err, data) => {
    if (!err) {
        console.log(data);
    } else {
        console.log(err);
    }
});
*/

// data updating
/*
data.update('sandbox', 'sandbox-file', { name: 'USA', Language: 'English' }, (err) => {
    console.log(`${err}`);
});
*/

// deleting data or file
data.delete('sandbox', 'sandbox-file', (res) => {
    console.log(`${res}`);
});
// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(environment.port, () => {
        // get help from doc.txt
        console.log(`listening to port ${environment.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
