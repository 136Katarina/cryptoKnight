const PortfolioListView = function(container) {
  this.container = container.childNodes[3];
}

PortfolioListView.prototype.populate = function(data) {
    data.forEach(function(coin) {
      this.display(coin);
    }.bind(this))
};

PortfolioListView.prototype.display = function(symbol, amount) {
  this.container.innerHTML += `
  <tr>
    <td><img width=50 src="https://chasing-coins.com/api/v1/std/logo/${symbol}" alt="" /></td>
    <td>${symbol}</td>
    <td></td>
    <td>${amount}</td>
    <td></td>
    <td></td>
  </tr>
  `
};

PortfolioListView.prototype.insertCoinData = function(data) {
  tr = this.container.lastElementChild.children;
  const amount = tr[3].innerHTML;
  tr[2].innerHTML = data.price;
  tr[4].innerHTML = amount * data.price;
  tr[5].innerHTML = data.change.day;
};

PortfolioListView.prototype.clear = function() {
  this.container.innerHTML = '';
};

module.exports = PortfolioListView;