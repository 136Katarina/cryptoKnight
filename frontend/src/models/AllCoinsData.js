const Request = require('../services/request.js');

const AllCoinsData = function(url) {
  this.url = url;
  this.onLoad = null;
}

AllCoinsData.prototype.getData = function() {
  let request = new Request(this.url);
  request.get(this.onLoad);
};

module.exports = AllCoinsData;