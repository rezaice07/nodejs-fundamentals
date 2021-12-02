

let http = require('http');
let url = require('url');

const serverStarted = (route,handle) => {

    const onServerRequest=(request, response) => {
        let pathName = url.parse(request.url).pathname;
        route(handle,pathName,response);       
    }

    http.createServer(onServerRequest).listen(1971);
    console.log('Server Started on localhost port 1971');
}

//here we created a export object to export externally
module.exports = {
    serverStarted: serverStarted
}





