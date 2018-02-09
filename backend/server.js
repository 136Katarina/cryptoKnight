const express = require('express');
const server = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
server.use(cors());
server.use(parser.json());
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  const db = client.db('crypto_app');

  if(err) {
    return console.log(err);
  }

  // server.get('/api/countries', function(req, res) {
  //   db.collection('countries').find().toArray(function(err, result) {
  //     res.status(200);
  //     res.json(result);
  //   })
  // });

  server.listen(9000, function() {
    console.log("Backend: Happy days, everything is amazing (port 9000)");
  })

})