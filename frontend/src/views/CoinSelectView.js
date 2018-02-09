const CoinSelectView = function(container) {
  this.container = container;
}

CoinSelectView.prototype.populate = function(data) {
  Object.keys(data).forEach(function(key) {
    this.addCoin(data[key].symbol);
  }.bind(this));
};

CoinSelectView.prototype.addCoin = function(coin) {
  this.container.innerHTML += `
    <option value="${coin}">${coin}</option>
  `
};

module.exports = CoinSelectView;