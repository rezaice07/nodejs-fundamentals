let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

//let url = 'mongodb://localhost:27017';

let url = 'mongodb+srv://frtsdb:zJZVYd15RQCb5uaa@cluster0.bm0z4.mongodb.net/test';

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

const GetAppleByFilter = (searchTerm) => {
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

const GetApplesByFilter = (searchTerm) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        var db = client.db('fruits');

        var query = { name: searchTerm };
        var mysort = { name: 1 };
        //{ name: 1 } // ascending
        //{ name: -1 } // descending
        db.collection('apples').find(query).limit(5).sort(mysort).toArray((findErr, result) => {
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


const UpdateApple = (apples) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        var db = client.db('fruits');       

        var myquery = { /*_id:"61acf8c5f9618d4d8a360444",*/ name: "Pakistani Apple" };
        var newvalues = { $set: {name: "Bhutani", color: "Gray With Red" } };

        db.collection('apples').updateOne(myquery,newvalues, (findErr, result) => {
            if (findErr) throw findErr;
            console.log("Apple Updated");
            client.close();
        });

    });
}



module.exports = {
    GetAllApples: GetAllApples,
    GetAppleByFilter:GetAppleByFilter,
    GetApplesByFilter: GetApplesByFilter,
    InsertNewApple:InsertNewApple,
    InsertManyApple:InsertManyApple,
    UpdateApple:UpdateApple
}