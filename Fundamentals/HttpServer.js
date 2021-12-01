
//Http Server - Export into another file

let http = require('http');

const onRequest = (request, response) => {
    console.log('Request Received');
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Welcome from Node JS Application Server!')
    response.end()
}

const serverStarted = () => {
    http.createServer(onRequest).listen(1971);
    console.log('Server Started on localhost port 1971');
}

//here we created a export object to export externally
module.exports={
    serverStarted:serverStarted
}





