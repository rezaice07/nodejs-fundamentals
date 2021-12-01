

const callBack=()=>{
    console.log('Queried the database and delivered data in 5 seconds')
}

console.log('User 1 made a request');
setTimeout(callBack, 5000);
// console.log('Database operation takes 5 seconds');
// console.log('Data Deliver to user');


console.log('User 2 made a request');
setTimeout(callBack, 5000);
// console.log('Database operation takes 5 seconds');
// console.log('Data Deliver to user');


console.log('User 3 made a request');
setTimeout(callBack, 5000);
// console.log('Database operation takes 5 seconds');
// console.log('Data Deliver to user');

