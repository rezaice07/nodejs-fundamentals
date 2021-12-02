let server=require('./HttpServer');
let router = require('./router');
let handler=require('./Handler');

let handle={}
handle['/']=handler.home;
handle['/home']=handler.home;
handle['/review']=handler.review;
handle['/reviewPost']=handler.reviewPost;

server.serverStarted(router.route, handle);