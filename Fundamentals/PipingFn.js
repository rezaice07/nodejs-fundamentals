
//Pipe

// In node js, pipe is mostly use for copying data from one file to another
let fs=require('fs');

let readableStream= fs.createReadStream('./pipings/input.txt');
let writableStream= fs.createWriteStream('./pipings/out.txt');

readableStream.pipe(writableStream);

