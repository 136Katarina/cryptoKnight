const Request = require('../services/request.js');

const PortfolioData = function(url){
  this.url = url;
  this.onLoad = null;
}

PortfolioData.prototype.getData = function(){
  const request = new Request(this.url);
  request.get(this.onLoad);
}

module.exports = PortfolioData;