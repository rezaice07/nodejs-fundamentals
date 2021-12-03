let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017';

MongoClient.connect(url, function (err, client) {
  if (err) throw err;
  var db = client.db('local');
  db.collection('apples').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result);
    client.close();
  });
}); 

/*
MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Mongodb Connected');

        var db = client.db('apples');

        //let's insert values in fruits collection

        // let col01={
        //     name:'Red Apples',
        //     name:'Green Apples',
        //     name:'White Apples',
        // }
        //collection.insert({name:'Red Apples',color:'Red'})

        
        //find in a collection
        db.collection.findOne(
            {

            },
            (err, res) => {
                if (err) {
                    console.log(err)
                }
                else if (res.length) {
                    console.log(res)
                }
                else {
                    console.log('No matches found')
                }

                client.close();
            }
        )       
                
    }
})

*/
