// const mongoose=require('mongoose');

// //connect with db
// mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },{ useUnifiedTopology: true });
// mongoose.connection.once('open',function(){
//     console.log('Connection is made');
// }).on('error',function(error){
//     console.log('error is :',error);
// })

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost/test";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });
var mongoose = require('mongoose');
require("dotenv").config;

var uri = process.env.MONGOURL;
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('../schema/userSchema');