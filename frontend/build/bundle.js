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
/***/ (function(module, exports) {

// const Request = require('./services/request.js');

const display = function(data) {
  let amount = 2;
  document.querySelector('#portfolio').innerHTML += `
    <tr>
      <td><img width=50 src="https://chasing-coins.com/api/v1/std/logo/eth" alt="" /></td>
      <td>ETH</td>
      <td>${Number.parseFloat(data.price).toFixed(2)}</td>
      <td>${amount}</td>
      <td>${(data.price * amount).toFixed(2)}</td>
      <td>${data.change.day}</td>
    </tr>
  `
  // console.log(data.ticker);
}

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

const onRequestComplete = function(data) {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const coinData = JSON.parse(jsonString);
  console.log(coinData);
  // display(coinData);
}

const coinRequest = function(symbol) {
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:5000/api/" + symbol);
  request.addEventListener('load', onRequestComplete);
  request.send();
}

const allCoinRequest = function() {
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:5000/api/coins/all");
  request.addEventListener('load', onRequestComplete);
  request.send();
}

const app = function() {
  coinRequest('btc');
  allCoinRequest();
}

window.addEventListener('load', app);



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map