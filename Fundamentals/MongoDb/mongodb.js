let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017/fruits';

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Mongodb Connected');
        db.close();
    }


})
