const Portfolio = require('../models/Portfolio.js');
const Request = require('../services/request.js');

const PortfolioListView = function(container) {
  this.container = container.childNodes[3];
  this.total = document.querySelector('#portfolio-total');
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
  <td id="coin-value"></td>
  <td></td>
  <td><button class="delete-row">Delete</button></td>
  </tr>
  `
};

PortfolioListView.prototype.insertCoinData = function(data) {
  let tr = this.container.lastElementChild.children;
  const amount = tr[3].innerHTML;
  tr[2].innerHTML = data.price;
  tr[4].innerHTML = amount * data.price;
  tr[5].innerHTML = data.change.day;
  this.getTotal();
  this.save();
  this.addDeleteButton();
};

PortfolioListView.prototype.addDeleteButton = function() {
  let elements = document.querySelectorAll(".delete-row");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      let toRemove = elements[i].parentElement.parentElement;
      toRemove.parentNode.removeChild(toRemove);
      this.getTotal();
    }.bind(this));
  }
};

PortfolioListView.prototype.clear = function() {
  this.container.innerHTML = '';
};

PortfolioListView.prototype.getTotal = function() {
  let rows = this.container.children;
  let total = 0;
  for(row of rows) {
    total += parseFloat(row.children[4].innerText);
  }
  this.total.innerText = `$${total.toString()}`;
};

PortfolioListView.prototype.save = function() {
  const request = new Request('http://localhost:9000/api/portfolio');
  let port = new Portfolio("Jardine");
  let rows = this.container.children;
  for(row of rows) {
    coin = {
      coin: row.children[1].innerText,
      amount: row.children[3].innerText
    }
    port.addCoin(coin);
  }
  request.post(port);
};

module.exports = PortfolioListView;