require('./services/themes.js');
const Request = require('./services/request.js');
const AllCoinsData = require('./models/AllCoinsData.js');
const CoinData = require('./models/CoinData.js');
const CoinSelectView = require('./views/CoinSelectView.js');
const PortfolioListView = require('./views/PortfolioListView.js');
const PortfolioData = require('./models/PortfolioData.js');
const News = require('./models/News.js');


const addCoinButtonClicked = function() {
  event.preventDefault();
  const portfolioList = document.querySelector('#portfolio');
  const portfolioListView = new PortfolioListView(portfolioList);
  const coin = document.querySelector('#coin-select').value;
  const amount = document.querySelector('#coin-amount').value;
  const coinData = new AllCoinsData('http://localhost:5000/api/' + coin);

  if (amount > 0) {
    portfolioListView.display(coin, amount);
    coinData.onLoad = portfolioListView.insertCoinData.bind(portfolioListView);
    coinData.getData();
  }

}

const newsOn = function() {
  document.querySelector('#overlay').style.zIndex = '2';
  document.querySelector('#overlay').style.opacity = '0.3';
}

const newsOff = function() {
  document.querySelector('#overlay').style.zIndex = '-1';
  document.querySelector('#overlay').style.opacity = '0';
}

const userSelectChanged = function() {
  const portfolioList = document.querySelector('#portfolio');
  const portfolioListView = new PortfolioListView(portfolioList);
  const portfolioData = new PortfolioData("http://localhost:9000/api/portfolio/" + this.value);
  portfolioData.onLoad = portfolioListView.renderProfile.bind(portfolioListView);
  portfolioData.getData();

}

const app = function() {
  const allCoinsData = new AllCoinsData("http://localhost:5000/api/coins/all");
  const coinSelect = document.querySelector('#coin-select');
  const coinSelectView = new CoinSelectView(coinSelect);
  const newsModel = new News('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=e703a1cb92574b5aafa1c3532618f877');

  allCoinsData.onLoad = coinSelectView.populate.bind(coinSelectView);
  allCoinsData.getData();   
  newsModel.getData();

  document.querySelector('#add-coin').addEventListener('click', addCoinButtonClicked);
  document.querySelector('#user-select').addEventListener('change', userSelectChanged);
  document.querySelector('#news-list').addEventListener('mouseover', newsOn);
  document.querySelector('#news-list').addEventListener('mouseout', newsOff);
}

window.addEventListener('load', app);

