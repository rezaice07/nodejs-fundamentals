
const home=()=>{
    console.log(`Executing Home Handler`)
}

const review=()=>{
    console.log(`Executing 'Review' Handler`)
}


let handle={}
handle['/']=home();
handle['/home']=home();
handle['/review']=review();

let object ={
    '/home':'Response from home',
    '/review': 'Response from review'
}


debugger;
console.log(object);

