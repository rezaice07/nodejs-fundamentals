

console.log(__filename); //for file name
console.log(__dirname); // for directory name

/*

//for setTimeout

printStuff=()=>{
    console.log('this was from settimeout');
}

setTimeout(printStuff,5000);
*/

setInterval(() => {
    console.log('this was from setInterval');
}, 2000);