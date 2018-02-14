/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
const Request = __webpack_require__(1);
const AllCoinsData = __webpack_require__(3);
const CoinData = __webpack_require__(5);
const CoinSelectView = __webpack_require__(2);
const PortfolioListView = __webpack_require__(4);
const PortfolioData = __webpack_require__(9);
const News = __webpack_require__(11);


const addCoinButtonClicked = function() {
  event.preventDefault();
  const portfolioList = document.querySelector('#portfolio');
  const portfolioListView = new PortfolioListView(portfolioList);
  const coin = document.querySelector('#coin-select').value;
  const amount = document.querySelector('#coin-amount').value;
  const coinData = new AllCoinsData('http://localhost:5000/api/' + coin);

  if (amount > 0) {
    portfolioListView.display(coin, amount);
    coinData.onLoad = portfolioListView.insertCoinData.bind(portfolioListView, coin);
    coinData.getData();
  }
}

const newsOn = function() {
  document.querySelector('#overlay').style.zIndex = '2';
  document.querySelector('#overlay').style.opacity = '0.4';
}

const newsOff = function() {
  document.querySelector('#overlay').style.zIndex = '-1';
  document.querySelector('#overlay').style.opacity = '0';
}

const userSelectChanged = function() {
  console.log(this.value);
  // console.log(this.innerHTML);
  const portfolioList = document.querySelector('#portfolio');
  const portfolioListView = new PortfolioListView(portfolioList);
  const portfolioData = new PortfolioData("http://localhost:9000/api/portfolio/" + this.value);
  portfolioData.onLoad = portfolioListView.renderProfile.bind(portfolioListView);
  portfolioData.getData();
}

const getNews = function() {
  const newsModel = new News('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=e703a1cb92574b5aafa1c3532618f877');
  newsModel.getData();
}

const refreshPortfolio = function() {
  const portfolioList = document.querySelector('#portfolio');
  const portfolioListView = new PortfolioListView(portfolioList);
  portfolioListView.refreshTable();
}

const app = function() {
  var div = document.querySelector(".row");
  div.style.visibility = "hidden";
  const coinSelect = document.querySelector('#coin-select');
  const allCoinsData = new AllCoinsData("http://localhost:5000/api/coins/all");
  const coinSelectView = new CoinSelectView(coinSelect);

  allCoinsData.onLoad = coinSelectView.populate.bind(coinSelectView);
  allCoinsData.getData();

  getNews();

  document.querySelector('#add-coin').addEventListener('click', addCoinButtonClicked);
  document.querySelector('#user-select').addEventListener('change', userSelectChanged);
  document.querySelector('#news-list').addEventListener('mouseover', newsOn);
  document.querySelector('#news-list').addEventListener('mouseout', newsOff);

  setInterval(refreshPortfolio, (60000 * 5));
  setInterval(getNews, (60000 * 5));
}

window.addEventListener('load', app);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(callback, symbol) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function() {
    if(this.status != 200) return;
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody, symbol);
  })
  request.send();
};

// Request.prototype.post = function(callback, body) {
Request.prototype.post = function(body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if(this.status != 201) return;
    const responseBody = JSON.parse(this.responseText);
  })
  request.send(JSON.stringify(body));
};

Request.prototype.delete = function() {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if(this.status != 204) return;
  })
  request.send();
};

Request.prototype.put = function(body) {
  const request = new XMLHttpRequest();
  request.open('PUT', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if(this.status != 200) return;
  })
  request.send(JSON.stringify(body));
};


module.exports = Request;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

const CoinSelectView = function(container) {
  this.container = container;
}

CoinSelectView.prototype.populate = function(data) {
  Object.keys(data).forEach(function(key) {
    this.addCoin(data[key].symbol);
  }.bind(this));
};

CoinSelectView.prototype.addCoin = function(coin) {
  this.container.innerHTML += `
    <option value="${coin}">${coin}</option>
  `
};

module.exports = CoinSelectView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);

const AllCoinsData = function(url) {
  this.url = url;
  this.onLoad = null;
}

AllCoinsData.prototype.getData = function(symbol) {
  let request = new Request(this.url);
  request.get(this.onLoad, symbol);
};

module.exports = AllCoinsData;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Portfolio = __webpack_require__(6);
const Request = __webpack_require__(1);
const PieChart = __webpack_require__(7);
const LineChart = __webpack_require__(10);
const AllCoinsData = __webpack_require__(3);

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

PortfolioListView.prototype.hasMatch = function(symbol) {
  let rows = this.container.children;
  for(row of rows) {
    if (row.children[1].innerText === symbol) return row;
  }
  return false;
};

PortfolioListView.prototype.updateAmount = function(row, amount) {
  let amountTD = row.children[3];
  let parsedAmount = parseFloat(amount);
  let currentAmount = parseFloat(amountTD.innerText);
  let newAmount = parsedAmount + currentAmount;
  amountTD.innerText = newAmount.toString();
};

PortfolioListView.prototype.display = function(symbol, amount) {
  let row = this.hasMatch(symbol);
  if (row === false) {
    var div = document.querySelector(".row");
    div.style.visibility = "visible";
    var hide = document.querySelector('#hideme');
    hide.style.display = "none";
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
    this.updateAmount(row, amount);
  }
};

PortfolioListView.prototype.insertCoinData = function(symbol, data) {
  if(this.hasMatch(symbol) === false) {
    let tr = this.container.lastElementChild.children;
    let result = this.isPositive(data.change.day);
    let changeContainer = null;

    if (result) {
      changeContainer = `
      <div class='change green'>&nbsp;${data.change.day}%<span class='ion-arrow-up-c'></span></div>
      `
      tr[1].innerHTML = "<span class='margin-right ion-arrow-up-c green'></span>" + symbol;
    } else {
      changeContainer = `
      <div class='change red'>${data.change.day}%<span class='ion-arrow-down-c'></span></div>
      `
      tr[1].innerHTML = "<span class='margin-right ion-arrow-down-c red'></span>" + symbol;
    }

    const amount = tr[3].innerHTML;
    tr[2].innerHTML = data.price;
    tr[4].innerHTML = parseFloat(data.price * amount).toFixed(2);
    tr[5].innerHTML = changeContainer;
  }
  this.refreshTable();
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);

const CoinData = function(url) {
  this.url = url;
  this.onLoad = null;
}

CoinData.prototype.getData = function() {
  let request = new Request(this.url);
  // request.get(this.onLoad);
  request.get(this.onLoad);
};

module.exports = CoinData;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

const Portfolio = function(name) {
  this.name = name;
  this.portfolio = [];
}

Portfolio.prototype.addCoin = function(coinObject) {
  this.portfolio.push(coinObject);
};

module.exports = Portfolio;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var PieChart = function(container, title, data) {
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    plotOptions: {
      pie: {
        borderWidth: 0.5,
        // borderColor: null
      }
    },
    title: {
      text: title
    },
    series: [{
      name: 'Value (USD)',
      data: data,
    }]
  })
}

module.exports = PieChart;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

Highcharts.theme = {
   colors: ['#6AE368', '#f25051', '#ffe56a', '#61e3cc', '#e32f80',
      '#b06aff', '#f7903c', '#a6e54b', '#e5774b', '#4be577'],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2a2a2b'],
            [1, '#2a2a2b']
         ]
      },
      style: {
         fontFamily: '\'Roboto\', sans-serif'
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         fontSize: '16px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);

const PortfolioData = function(url){
  this.url = url;
  this.onLoad = null;
}

PortfolioData.prototype.getData = function(){
  const request = new Request(this.url);
  request.get(this.onLoad);
}



module.exports = PortfolioData;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var LineChart = function(container, title, data) {
  Highcharts.stockChart(container, {


    rangeSelector: {
      selected: 2
    },

    title: {
      text: title
    },

    series: [{
      name: 'Price (USD)',
      data: data,
      tooltip: {
        valueDecimals: 4
      }
    }]
  });
}

module.exports = LineChart;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);

const News = function(url) {
  this.url = url;
  // this.onLoad = null;
}

News.prototype.getData = function(){
  let request = new Request(this.url);
  // console.log(this.url);
  request.get(this.render);
};


News.prototype.render = function(news){
  // const newsDiv = document.querySelector('#news-list');

  var articleTag = document.getElementById('news-list');
  articleTag.innerHTML = '';
  

  var headlines = news.articles;


  headlines.forEach(function(item){

    let article = document.createElement('div');
    article.classList.add('article');

    var timeDifference = function(){

      var apiDate = item.publishedAt;
      var apiUnixTime = Date.parse(apiDate)/1000;
      // console.log(apiUnixTime);
      var currentUnixTime = Math.round((new Date()).getTime() / 1000);
      var result = currentUnixTime - apiUnixTime;
      var minutes = Math.floor(result /60);
      return minutes;
    }

    var displayResult = timeDifference();

    // var tagTitle = document.createElement('h3');
    // tagTitle.innerText = item.title;
    // articleTag.appendChild(tagTitle);

    var link = document.createElement('a');
    link.innerText = item.title;
    link.href = item.url;
    link.target = "_blank";
    article.appendChild(link);

    var p = document.createElement('p');

    if (displayResult > 59){
      var remainder = Math.floor(displayResult % 60);
      var hours = Math.floor(displayResult / 60);
      p.innerText = "Published " + hours + " hours " + remainder + " minutes ago";
    }
    else if (displayResult > 0){
      var minutes = displayResult;
      p.innerText = "Published " + minutes  + " minutes ago";
    } else {
      var minutes = displayResult;
      p.innerText = "Published " + minutes * -1  + " minutes ago"}

      p.style.color = '#aaa';
      article.appendChild(p);

      var text = document.createElement('p');
      text.innerText = item.description;
      article.appendChild(text);
      var image = document.createElement('img');
      image.src = item.urlToImage;
      image.style.width = "100%";
      // image.height = 150;
      article.appendChild(image);

      article.style.fontSize = "1em";
      article.style.lineHeight = "150%";
      article.style.width = "50%";

      articleTag.appendChild(article);


    });
}

module.exports = News;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map