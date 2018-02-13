const Request = require('../services/request.js');

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