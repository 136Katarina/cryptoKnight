require('./services/themes.js');
const Request = require('./services/request.js');
const AllCoinsData = require('./models/AllCoinsData.js');
const CoinData = require('./models/CoinData.js');
const CoinSelectView = require('./views/CoinSelectView.js');
const PortfolioListView = require('./views/PortfolioListView.js');
const PortfolioData = require('./models/PortfolioData.js');


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

const userSelectChanged = function() {
  const portfolioList = document.querySelector('#portfolio');
  const portfolioListView = new PortfolioListView(portfolioList);
  const portfolioData = new PortfolioData("http://localhost:9000/api/portfolio/" + this.value);
  // console.log(portfolioData);
  portfolioData.onLoad = portfolioListView.renderProfile.bind(portfolioListView);
  portfolioData.getData();

}

const app = function() {
  const allCoinsData = new AllCoinsData("http://localhost:5000/api/coins/all");
  

  const coinSelect = document.querySelector('#coin-select');
  const coinSelectView = new CoinSelectView(coinSelect);

  allCoinsData.onLoad = coinSelectView.populate.bind(coinSelectView);
  allCoinsData.getData(); 

  document.querySelector('#add-coin').addEventListener('click', addCoinButtonClicked);
  document.querySelector('#user-select').addEventListener('change', userSelectChanged);
}

window.addEventListener('load', app);

