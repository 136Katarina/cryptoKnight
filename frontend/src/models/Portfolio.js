const Portfolio = function(name) {
  this.name = name;
  this.portfolio = [];
}

Portfolio.prototype.addCoin = function(coinObject) {
  this.portfolio.push(coinObject);
};

module.exports = Portfolio;