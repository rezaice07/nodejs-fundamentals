
//File System Module

let fs = require('fs');

//Reading the file in async way
fs.readFile('./fs-modules/input.txt', (error, data) => {
    if (error) {
        console.log(error);
    }
    else{
        console.log('Aync Data is '+data.toString());
    }
})

//Reading the file in sync way
let data=fs.readFileSync('./fs-modules/input.txt');

console.log('Sync data is '+data.toString());
console.log('This is the end');

//Therefore sync data will load first then async data 


