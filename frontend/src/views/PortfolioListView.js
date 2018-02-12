const Portfolio = require('../models/Portfolio.js');
const Request = require('../services/request.js');
const PieChart = require('../models/PieChart.js');
const LineChart = require('../models/LineChart.js');
const AllCoinsData = require('../models/AllCoinsData.js');

const PortfolioListView = function(container) {
  this.container = container.childNodes[3];
  this.total = document.querySelector('#portfolio-total');
}

PortfolioListView.prototype.populate = function(data) {
  data.forEach(function(coin) {
    this.display(coin);
  }.bind(this))
};

PortfolioListView.prototype.updateTable = function(coin, amount) {
  this.getTotal();
  // this.save();
  this.createChart();
  this.addDeleteButton();
  this.addRowSelect();
};

PortfolioListView.prototype.createChart = function() {
  const portfolioChartContainer = document.querySelector('#portfolio-chart');
  new PieChart(portfolioChartContainer, 'Portfolio Breakdown', this.getChartData());
};

PortfolioListView.prototype.display = function(symbol, amount) {
  this.container.innerHTML += `
  <tr class='table-row' id=${symbol}>
  <td><img width=35 src="https://chasing-coins.com/api/v1/std/logo/${symbol}" alt="" /><br><span id="coin">${symbol}<span></td>
  <td></td>
  <td>${amount}</td>
  <td id="coin-value"></td>
  <td></td>
  <td><button class="btn btn-danger delete-row">Delete</button></td>
  </tr>
  `
};

PortfolioListView.prototype.insertCoinData = function(data) {
  // console.log("insertCoinData", data);
  let tr = this.container.lastElementChild.children;
  const amount = tr[2].innerHTML;
  tr[2].innerHTML = data.price;
  tr[4].innerHTML = amount * data.price;
  tr[5].innerHTML = data.change.day;
  this.updateTable();
};

PortfolioListView.prototype.addDeleteButton = function() {
  let elements = document.querySelectorAll(".delete-row");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      let toRemove = elements[i].parentElement.parentElement;
      toRemove.parentNode.removeChild(toRemove);
      this.getTotal();
      this.createChart();
    }.bind(this));
  }
};

PortfolioListView.prototype.addRowSelect = function() {
  let elements = document.querySelectorAll(".table-row");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      symbol = elements[i].children[0].lastElementChild.innerText;
      request = new Request(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=600&aggregate=3&e=CCCAGG`);
      request.get(this.formatChartData);
    }.bind(this));
  }
};

PortfolioListView.prototype.formatChartData = function(data) {
  let i = 0;
  let formattedData = [];
  for(each of data.Data) {
    // console.log(each);
    formattedData.push([each.time, each.close]);
  }
  // console.log(formattedData);
  const performanceChartContainer = document.querySelector('#history-chart');
  new LineChart(performanceChartContainer, 'Coin Performance', formattedData);
  // this.createLineChart(formattedData);
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
      coin: row.children[0].lastElementChild.innerText,
      amount: row.children[2].innerText
    }
    port.addCoin(coin);
  }
  request.post(port);
};

PortfolioListView.prototype.getChartData = function() {
  let rows = this.container.children;
  let data = new Array();
  for(row of rows) {
    data.push({
      name: row.children[0].lastElementChild.innerText,
      y: parseFloat(row.children[3].innerText)
    })
  }
  return data;
};

PortfolioListView.prototype.populateTableOnLoad = function() {
  for(row of this.container.children) {
    const coinData = new AllCoinsData('http://localhost:5000/api/' + row.children[0].lastElementChild.innerText);
    coinData.onLoad = this.populateRow.bind(this);
    coinData.getData(row.id);
  }
};

PortfolioListView.prototype.populateRow = function(data, symbol) {
  let row = document.getElementById(symbol);
  const amount = row.children[2].innerHTML;
  
  row.children[1].innerHTML = data.price;
  row.children[3].innerHTML = data.price * amount;
  row.children[4].innerHTML = data.change.day;
  this.updateTable();

};

PortfolioListView.prototype.renderProfile = function(data){
  document.querySelector('#portfolio-name').innerText = 'Welcome back, ' + data.name;
  this.container.innerHTML = '';
  for (datum of data.portfolio) {
    this.display(datum.coin, datum.amount);
  }
  this.populateTableOnLoad();

}

module.exports = PortfolioListView;