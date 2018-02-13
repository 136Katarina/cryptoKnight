require('./services/themes.js');
const Request = require('./services/request.js');
const AllCoinsData = require('./models/AllCoinsData.js');
const CoinData = require('./models/CoinData.js');
const CoinSelectView = require('./views/CoinSelectView.js');
const PortfolioListView = require('./views/PortfolioListView.js');
// const NewsView = require('./views/newsView.js');
const News = require('./models/news.js');


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

const app = function() {
  const allCoinsData = new AllCoinsData("http://localhost:5000/api/coins/all");
  const coinSelect = document.querySelector('#coin-select');
  const coinSelectView = new CoinSelectView(coinSelect);



  const newsModel = new News('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=e703a1cb92574b5aafa1c3532618f877');
  // const newsView = new NewsView(newsDiv, newsModel);

  newsModel.getData();

  allCoinsData.onLoad = coinSelectView.populate.bind(coinSelectView);
  allCoinsData.getData();

  document.querySelector('#add-coin').addEventListener('click', addCoinButtonClicked);
}

window.addEventListener('load', app);
