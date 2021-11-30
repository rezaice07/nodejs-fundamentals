
let stuffName='Rejwanul Reja';

//Example 01: 
//------------
const printStuff=(stuff)=>{ //this is a anonymous function [arrow function] and it is assigned to variable printStuff
    console.log(stuff)
}

const MainFunction=(paramFunction,value)=>{
    paramFunction(value);
}


MainFunction(printStuff,stuffName)

//Example 02: 
//------------

const MainFunctionTwo=(paramFunction,value)=>{
    paramFunction(value);
}

MainFunctionTwo(
    (stuff)=>{
        console.log(`Stuff Name ${stuff}`) //this is a anonymous function [arrow function]
    },
    'Rejwanul Reja'
)


