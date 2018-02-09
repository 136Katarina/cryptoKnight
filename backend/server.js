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

  server.get('/api/portfolio', function(req, res) {
    db.collection('portfolios').find().toArray(function(err, result) {
      res.status(200);
      res.json(result);
    })
  });

  server.get('/api/portfolio/:name', function(req, res){
    // db.collection('portfolios').findOne({_id: ObjectID(req.params.id)}, function(err, result){
    db.collection('portfolios').findOne({name: req.params.name}, function(err, result){

      if (err) {
        res.status(500);
        res.send();
      }

      res.status(200);
      res.json(result);
    });
  });

  server.post('/api/portfolio', function(req, res){
    db.collection('portfolios').save(req.body, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      res.status(201);
      res.json(result.ops[0]);

      console.log('save it yo');
    })
  })

  server.delete('/api/portfolio', function(req, res) {
    db.collection('portfolios').remove(function(err, result) {
      if(err) {
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    })
  })

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