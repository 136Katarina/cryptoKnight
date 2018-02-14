 let brian = {
  "name": "Brian",
  "portfolio": [
  {
    "coin": "BTC",
    "amount": "1.775"
  },
  {
    "coin": "ETH",
    "amount": "1.275"
  },
  {
    "coin": "XRP",
    "amount": "5.50"
  },
  {
    "coin": "NEO",
    "amount": "5.50"
  },
  {
    "coin": "EOS",
    "amount": "15.50"
  },
  {
    "coin": "MIOTA",
    "amount": "122.50"
  },
  {
    "coin": "DASH",
    "amount": "15.50"
  },
  {
    "coin": "ICX",
    "amount": "15.50"
  },
  {
    "coin": "SUB",
    "amount": "1225.50"
  }
  ],
}

let jardine = {
  "name": "Jardine",
  "portfolio": [
  {
    "coin": "BTC",
    "amount": "0.775"
  },
  {
    "coin": "ETH",
    "amount": "1.275"
  },
  {
    "coin": "XRP",
    "amount": "300.50"
  },
  {
    "coin": "NEO",
    "amount": "50.50"
  },
  {
    "coin": "EOS",
    "amount": "15.50"
  },
  {
    "coin": "MIOTA",
    "amount": "12.50"
  },
  {
    "coin": "DASH",
    "amount": "125.50"
  },
  {
    "coin": "ICX",
    "amount": "125.50"
  },
  {
    "coin": "SUB",
    "amount": "125.50"
  }
  ],
}

let katarina = {
  "name": "Katarina",
  "portfolio": [
  {
    "coin": "BTC",
    "amount": "0.275"
  },
  {
    "coin": "ETH",
    "amount": "5.275"
  },
  {
    "coin": "XRP",
    "amount": "30.50"
  },
  {
    "coin": "NEO",
    "amount": "20.50"
  },
  {
    "coin": "EOS",
    "amount": "15.50"
  },
  {
    "coin": "MIOTA",
    "amount": "52.50"
  },
  {
    "coin": "DASH",
    "amount": "225.50"
  },
  {
    "coin": "ICX",
    "amount": "25.50"
  },
  {
    "coin": "SUB",
    "amount": "5.50"
  }
  ],
}

let eliot = {
  "name": "Eliot",
  "portfolio": [
  {
    "coin": "BTC",
    "amount": "1.775"
  },
  {
    "coin": "ETH",
    "amount": "0.275"
  },
  {
    "coin": "XRP",
    "amount": "30.50"
  },
  {
    "coin": "NEO",
    "amount": "20.50"
  },
  {
    "coin": "EOS",
    "amount": "12.50"
  },
  {
    "coin": "MIOTA",
    "amount": "122.50"
  },
  {
    "coin": "DASH",
    "amount": "122.50"
  },
  {
    "coin": "ICX",
    "amount": "11.50"
  },
  {
    "coin": "SUB",
    "amount": "15.50"
  }
  ],
}

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err)
    return;
  }

  const db = client.db('crypto_app');


  db.collection('portfolios').drop();
  db.collection('portfolios').insert(eliot);
  db.collection('portfolios').insert(jardine);
  db.collection('portfolios').insert(brian);
  db.collection('portfolios').insert(katarina);
  
})