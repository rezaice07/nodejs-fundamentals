const relay=()=>{
    console.log('This is relay function')
}


const longJump=()=>{
    console.log('This is long jump function')
}

/*
module.exports.relay=relay;
module.exports.longJump=longJump;
*/

//We can replace the above commented two lines with below code snipet
module.exports={
    relay:relay,
    longJump:longJump
}