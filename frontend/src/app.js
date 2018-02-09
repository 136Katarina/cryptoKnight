// const Request = require('./services/request.js');
const AllCoinsData = require('./models/AllCoinsData.js');
const CoinData = require('./models/CoinData.js');
const CoinSelectView = require('./views/CoinSelectView.js');
const PortfolioListView = require('./views/PortfolioListView.js');

// const display = function(data) {
//   let amount = 2;
//   document.querySelector('#portfolio').innerHTML += `
//   <tr>
//   <td><img width=50 src="https://chasing-coins.com/api/v1/std/logo/eth" alt="" /></td>
//   <td>ETH</td>
//   <td>${Number.parseFloat(data.price).toFixed(2)}</td>
//   <td>${amount}</td>
//   <td>${(data.price * amount).toFixed(2)}</td>
//   <td>${data.change.day}</td>
//   </tr>
//   `
  // console.log(data.ticker);
// }

// const app = function() {
//   let coin = 'btc';
//   let currency = 'gbp';
//   // let coinData = new Request(`https://api.cryptonator.com/api/ticker/${coin}-${currency}`);
//   let coinData = new Request('https://chasing-coins.com/api/v1/std/coin/BTC')

//   coinData.get(display);
// }


// window.addEventListener('DOMContentLoaded', app);

// const populateList = function(countries) {
//   countries.forEach(function(country){
//     const ul = document.querySelector('#portfolio')
//     li = document.createElement('li')
//     li.innerText = country.name
//     ul.appendChild(li)
//   })
// }

// const onRequestComplete = function(data) {
//   if(this.status !== 200) return;
//   const jsonString = this.responseText;
//   const coinData = JSON.parse(jsonString);
//   console.log(coinData);
//   // display(coinData);
// }

// const coinRequest = function(symbol) {
//   const request = new XMLHttpRequest();
//   request.open("GET", "http://localhost:5000/api/" + symbol);
//   request.addEventListener('load', onRequestComplete);
//   request.send();
// }

// const allCoinRequest = function() {
//   const request = new XMLHttpRequest();
//   request.open("GET", "http://localhost:5000/api/coins/all");
//   request.addEventListener('load', onRequestComplete);
//   request.send();
// }

const addCoinButtonClicked = function() {
  const portfolioList = document.querySelector('#portfolio');
  const portfolioListView = new PortfolioListView(portfolioList);
  const coin = document.querySelector('#coin-select').value;
  console.log(coin);
  coinRequest(coin);
  // const coinData = AllCoinsData('http://localhost:5000/api/' + coin);
  portfolioListView.display(coin);
  coinData.onLoad = portfolioListView.displayData.bind(portfolioListView);

  
}

const app = function() {
  const allCoinsData = new AllCoinsData("http://localhost:5000/api/coins/all");
  const coinSelect = document.querySelector('#coin-select');
  const coinSelectView = new CoinSelectView(coinSelect);

  // coinRequest('btc');
  // allCoinRequest();
  allCoinsData.onLoad = coinSelectView.populate.bind(coinSelectView);
  
  allCoinsData.getData();

  document.querySelector('#add-coin').addEventListener('click', addCoinButtonClicked);
}

window.addEventListener('load', app);

