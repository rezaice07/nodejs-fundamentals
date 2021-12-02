

let http = require('http');
let url = require('url');

const serverStarted = (route,handle) => {

    const onServerRequest=(request, response) => {

        let reviewData='';
        let pathName = url.parse(request.url).pathname;
        request.setEncoding('UTF8');

        request.addListener('data',(chunk)=>{
            reviewData +=chunk;
        });

        request.addListener('end',()=>{
            //call route function to post data
            route(handle,pathName,response,reviewData); 
        });              
    }

    http.createServer(onServerRequest).listen(1971);
    console.log('Server Started on http://localhost:1971');
}

//here we created a export object to export externally
module.exports = {
    serverStarted: serverStarted
}





