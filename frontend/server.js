const express = require('express');
const server = express();
const parser = require('body-parser');
const request = require('request');
server.use(parser.json());
server.use(parser.urlencoded({extended: true}));
server.use(express.static('build'));

server.get('/portfolio/:name', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
  // const options = {
  //   url: 'http://localhost:9000/api/portfolio/' + req.params.name,
  //   method: 'GET',
  //   headers: {
  //       'Accept': 'application/json',
  //       'Accept-Charset': 'utf-8',
  //   }
  // };
  // request(options, function(error, response, body) {
  //   let json = JSON.parse(body);
  //   console.log(json);
  //   console.log(response);
  //   console.log(body);
  //   res.json(json);
  // });
})

server.get('/api/:coin', function(req, res) {
  const options = {
    url: 'https://chasing-coins.com/api/v1/std/coin/' + req.params.coin,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
  };
  request(options, function(error, response, body) {
    let json = JSON.parse(body);
    res.json(json)
  });
});

server.get('/api/coins/all', function(req, res) {
  const options = {
    url: 'https://chasing-coins.com/api/v1/top-coins/50',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
  };
  request(options, function(error, response, body) {
    let json = JSON.parse(body);
    res.json(json)
  });

});

server.listen(5000, function() {
  console.log("Front end: Port 5000");
})