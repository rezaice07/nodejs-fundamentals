
const route = (handle, pathname,response)=>{
    console.log('Routing a request for '+ pathname);
    if(typeof handle[pathname]==='function'){
        handle[pathname](response);
    }
    else{
        console.log('No handler for '+ pathname)       
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('Error 404 Page not found')
        response.end()
    }
}

module.exports = {
    route: route
}
