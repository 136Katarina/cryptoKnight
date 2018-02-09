const Request = require('../services/request.js');

const CoinData = function(url) {
  this.url = url;
  this.onLoad = null;
}

CoinData.prototype.getData = function() {
  let request = new Request(this.url);
  request.get(this.onLoad);
};

module.exports = CoinData;