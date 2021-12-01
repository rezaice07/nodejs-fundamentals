

//Stream

let fs = require('fs');

//Read Data From File
let readableStream = fs.createReadStream('./streams/stream-input.txt');
let data = '';
readableStream.setEncoding('UTF8');
readableStream.on('data', (chunk) => {
    data += chunk;
});

readableStream.on('end',()=>{
    console.log(data)
})

//Write Data into File
let writeData='Hello Node Js'
let writableStream=fs.createWriteStream('./streams/stream-output.txt');
writableStream.write(writeData,'UTF8');
writableStream.end();
writableStream.on('finish',()=>{
    console.log('Write Completed');
})



