$('.title').fitText(1.2, { minFontSize: '20px', maxFontSize: '60px' })

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

$(function() {
  httpGetAsync('http://steamcommunity.com/market/priceoverview/?country=DE&currency=3&appid=730&market_hash_name=P90%20%7C%20Asiimov%20%28Factory%20New%29', function(text) {
    $('.content').value(text)
  })
})
