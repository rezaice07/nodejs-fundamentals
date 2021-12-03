let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017';

const GetAllApples = () => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        var db = client.db('fruits');

        db.collection('apples').find({}).toArray((findErr, result) => {
            if (findErr) throw findErr;
            console.log(result);
            client.close();
        });

    });
}

const GetApplesByFilter = (searchTerm) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        var db = client.db('fruits');

        db.collection('apples').findOne({ name: searchTerm }, (findErr, result) => {
            if (findErr) throw findErr;
            console.log(result);
            client.close();
        });

    });
}


const InsertNewApple = (newApple) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        var db = client.db('fruits');       

        db.collection('apples').insertOne(newApple, (findErr, result) => {
            if (findErr) throw findErr;
            console.log("New apple inserted");
            client.close();
        });

    });
}

const InsertManyApple = (newApples) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        var db = client.db('fruits');       

        db.collection('apples').insertMany(newApples, (findErr, result) => {
            if (findErr) throw findErr;
            console.log("Apples inserted");
            client.close();
        });

    });
}

module.exports = {
    GetAllApples: GetAllApples,
    GetApplesByFilter: GetApplesByFilter,
    InsertNewApple:InsertNewApple,
    InsertManyApple:InsertManyApple
}