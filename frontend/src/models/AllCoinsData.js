const Request = require('../services/request.js');

const AllCoinsData = function(url) {
  this.url = url;
  this.onLoad = null;
}

AllCoinsData.prototype.getData = function(symbol) {
  let request = new Request(this.url);
  request.get(this.onLoad, symbol);
};

module.exports = AllCoinsData;