var http = require('http');
var dt = require('./myFirstModule');
var url = require('url');
var uc = require('upper-case');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
/*
  let personInfo={
    'Name': 'reja',
    'Email': 'rezaice07@gmail.com',
    'Cellphone': '8801718055626',
    //'CreatedDate':dt.myDateTime()
  }
  */

  //res.write(dt.myDateTime())
  //res.write(req.url)

  res.write(uc.upperCase("Hello World!"));

  res.end();
}).listen(8080);

