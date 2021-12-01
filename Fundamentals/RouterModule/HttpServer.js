

let http = require('http');
let url = require('url');

const serverStarted = (route) => {

    const onServerRequest=(request, response) => {
        let pathName = url.parse(request.url).pathname;

        route(pathName);
        console.log('Request Received for ' + pathName);
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Welcome from Node JS Application Server!')
        response.end()
    }

    http.createServer(onServerRequest).listen(1971);
    console.log('Server Started on localhost port 1971');
}

//here we created a export object to export externally
module.exports = {
    serverStarted: serverStarted
}





