let jardine = {
  "name": "Jardine",
  "portfolio": [
  {
    "coin": "BTC",
    "amount": "0.275"
  },
  {
    "coin": "ETH",
    "amount": "5.5"
  },
  {
    "coin": "LTC",
    "amount": "25.75"
  },
  {
    "coin": "XRP",
    "amount": "300.50"
  },
  {
    "coin": "DOGE",
    "amount": "1005.50"
  }
  ]
}

let eliot = {
  "name": "Eliot",
  "portfolio": [
  {
    "coin": "BTC",
    "amount": "2.75"
  },
  {
    "coin": "NEO",
    "amount": "10.75"
  },
  {
    "coin": "WAVES",
    "amount": "3000.50"
  }
  ]
}

use crypto_app;

db.profolios.insert(jardine);
db.profolios.insert(eliot);