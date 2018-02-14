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

PortfolioListView.prototype.updatePortfolio = function(coin, amount) {
  this.getTotal();
  this.createChart();
  this.updateDB();
  this.addRowSelect();
};

PortfolioListView.prototype.updateDB = function() {
  let userSelect = document.querySelector('#user-select');
  const id = userSelect.value;
  const name = userSelect.innerText;
  const request = new Request('http://localhost:9000/api/portfolio/' + id);

  let port = new Portfolio(name);
  let rows = this.container.children;
  for(row of rows) {
    coin = {
      coin: row.children[1].innerText,
      amount: row.children[3].innerText
    }
    // port.id = id;
    port.addCoin(coin);
  }
  // console.log(port);
  request.put(port);
};

PortfolioListView.prototype.createChart = function() {
  const portfolioChartContainer = document.querySelector('#portfolio-chart');
  new PieChart(portfolioChartContainer, 'Portfolio Breakdown', this.getChartData());
};

PortfolioListView.prototype.display = function(symbol, amount) {
  let row = this.hasMatch(symbol);
  if(!row){
    var div = document.querySelector(".row");
    div.style.visibility = "visible";
    this.container.innerHTML += `
    <tr class='table-row' id=${symbol}>
    <td><img width=35 src="https://chasing-coins.com/api/v1/std/logo/${symbol}" alt="" /></td>
    <td>${symbol}</td>
    <td></td>
    <td>${amount}</td>
    <td id="coin-value"></td>
    <td></td>
    <td><button class="btn btn-danger delete-row">x</button></td>
    </tr>
    `
    this.addDeleteButton();
  } else {
    console.log(typeof amount);
    row.children[3].innerText = (parseFloat(row.children[3].innerText) + parseFloat(amount)).toString();
  }
};

PortfolioListView.prototype.hasMatch = function (symbol) {
  let rows = this.container.children;
  for(row of rows) {
    let columnCoin = row.children[1].innerText;
    if(columnCoin === symbol) return row;
  }
  return false;
};

PortfolioListView.prototype.insertCoinData = function(symbol, data) {
  let tr = this.container.lastElementChild.children;
  let result = this.isPositive(data.change.day);
  let changeContainer = null;

  if (result) {
    changeContainer = `
    <div class='change green'>&nbsp;${data.change.day}%<span class='ion-arrow-up-c'></span></div>
    `
  } else {
    changeContainer = `
    <div class='change red'>${data.change.day}%<span class='ion-arrow-down-c'></span></div>
    `
  }

  const amount = tr[3].innerHTML;
  tr[2].innerHTML = data.price;
  tr[4].innerHTML = parseFloat(data.price * amount).toFixed(2);
  tr[5].innerHTML = changeContainer;
  this.updatePortfolio();
};

PortfolioListView.prototype.addDeleteButton = function() {
  let elements = document.querySelectorAll(".delete-row");
  var toRemove;
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function(e) {
      // console.log(i);
      toRemove = e.target.parentElement.parentElement;
      toRemove.parentNode.removeChild(toRemove);
      this.getTotal();
      this.createChart();
      this.updateDB();
    }.bind(this));
  }
};

PortfolioListView.prototype.addRowSelect = function() {
  let elements = document.querySelectorAll(".table-row");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      let symbol = elements[i].children[1].innerText;
      let request = new Request(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=600&aggregate=1&e=CCCAGG`);
      request.get(this.createLineChart, symbol);
    }.bind(this));
  }
};

PortfolioListView.prototype.createLineChart = function(data, symbol) {
  let i = 0;
  let formattedData = [];
  for(each of data.Data) {
    formattedData.push([(each.time * 1000), each.close]);
  }
  const performanceChartContainer = document.querySelector('#history-chart');
  new LineChart(performanceChartContainer, `${symbol} Performance`, formattedData);
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
  totalString = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  this.total.innerHTML = `${totalString}<br><span class='small'>Portfolio Total</span>`;
};

// PortfolioListView.prototype.save = function() {
//   const request = new Request('http://localhost:9000/api/portfolio');
//   let port = new Portfolio("Jardine");
//   let rows = this.container.children;
//   for(row of rows) {
//     coin = {
//       coin: row.children[1].lastElementChild.innerText,
//       amount: row.children[3].innerText
//     }
//     port.addCoin(coin);
//   }
//   request.post(port);
// };

PortfolioListView.prototype.getChartData = function() {
  let rows = this.container.children;
  let data = new Array();
  for(row of rows) {
    data.push({
      name: row.children[1].innerText,
      y: parseFloat(row.children[4].innerText)
    })
  }
  return data;
};

// Rendering Profiles From Database

PortfolioListView.prototype.renderProfile = function(data){
  console.log(data);
  this.container.innerHTML = '';
  for (datum of data.portfolio) {
    this.display(datum.coin, datum.amount);
  }
  this.refreshTable();
}

PortfolioListView.prototype.refreshTable = function() {
  for(row of this.container.children) {
    const coinData = new AllCoinsData('http://localhost:5000/api/' + row.children[1].innerText);
    coinData.onLoad = this.populateRow.bind(this);
    coinData.getData(row.id);
  }
  let symbol = this.container.children[0].children[1].innerText;
  let request = new Request(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=600&aggregate=1&e=CCCAGG`);
  request.get(this.createLineChart, symbol);
};

PortfolioListView.prototype.populateRow = function(data, symbol) {
  let row = document.getElementById(symbol);
  const amount = row.children[3].innerHTML;
  let result = this.isPositive(data.change.day);
  let changeContainer = null;

  if (result) {
    changeContainer = `
    <div class='change green'>&nbsp;${data.change.day}%<span class='ion-arrow-up-c'></span></div>
    `
    row.children[1].innerHTML = "<span class='margin-right ion-arrow-up-c green'></span>" + symbol;
  } else {
    changeContainer = `
    <div class='change red'>${data.change.day}%<span class='ion-arrow-down-c'></span></div>
    `
    row.children[1].innerHTML = "<span class='margin-right ion-arrow-down-c red'></span>" + symbol;
  }

  row.children[2].innerHTML = data.price;
  row.children[4].innerHTML = parseFloat(data.price * amount).toFixed(2);
  row.children[5].innerHTML = changeContainer;
  this.updatePortfolio();
};



PortfolioListView.prototype.isPositive = function(number) {
  if(number > 0) return true;
  return false;
};

module.exports = PortfolioListView;
