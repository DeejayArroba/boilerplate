function httpGetAsync(t,e){var n=new XMLHttpRequest;n.onreadystatechange=function(){4==n.readyState&&200==n.status&&e(n.responseText)},n.open("GET",t,!0),n.send(null)}$(".title").fitText(1.2,{minFontSize:"20px",maxFontSize:"60px"}),$(function(){httpGetAsync("http://steamcommunity.com/market/priceoverview/?country=DE&currency=3&appid=730&market_hash_name=P90%20%7C%20Asiimov%20%28Factory%20New%29",function(t){$(".content").value(t)})});