

var Greeting=(greetingTo)=>{
    console.log(`Greeting from ${greetingTo}`);
}

var MainFunction=(Greeting,greetingTo)=>{
    console.log('MainFunction')
    Greeting(greetingTo);
}

MainFunction(Greeting,'Rejwanul Reja');

