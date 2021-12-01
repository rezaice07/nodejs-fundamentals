let server=require('./HttpServer');
let router = require('./router');

server.serverStarted(router.route);