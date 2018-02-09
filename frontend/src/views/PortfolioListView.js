const PortfolioListView = function(container) {
  this.container = container;
}

PortfolioListView.prototype.populate = function(data) {
    data.forEach(function(coin) {
      this.display(coin);
    }.bind(this))
};

PortfolioListView.prototype.display = function(symbol) {
  this.container.innerHTML += `
  <tr>
    <td><img width=50 src="https://chasing-coins.com/api/v1/std/logo/${symbol}" alt="" /></td>
    <td>${symbol}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  `
};

PortfolioListView.prototype.clear = function() {
  this.container.innerHTML = '';
};

module.exports = PortfolioListView;