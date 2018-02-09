// const Request = require('./services/request.js');
const AllCoinsData = require('./models/AllCoinsData.js');
const CoinData = require('./models/CoinData.js');
const CoinSelectView = require('./views/CoinSelectView.js');
const PortfolioListView = require('./views/PortfolioListView.js');

const addCoinButtonClicked = function() {
  const portfolioList = document.querySelector('#portfolio');
  const portfolioListView = new PortfolioListView(portfolioList);
  const coin = document.querySelector('#coin-select').value;
  const coinData = new AllCoinsData('http://localhost:5000/api/' + coin);

  portfolioListView.display(coin);
  coinData.onLoad = portfolioListView.insertCoinData.bind(portfolioListView);
  coinData.getData();
}

const app = function() {
  const allCoinsData = new AllCoinsData("http://localhost:5000/api/coins/all");
  const coinSelect = document.querySelector('#coin-select');
  const coinSelectView = new CoinSelectView(coinSelect);

  allCoinsData.onLoad = coinSelectView.populate.bind(coinSelectView);
  allCoinsData.getData();

  document.querySelector('#add-coin').addEventListener('click', addCoinButtonClicked);
}

window.addEventListener('load', app);

