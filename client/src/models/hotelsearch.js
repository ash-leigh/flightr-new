var HotelQuote = require('./hotelquote.js');

var HotelSearch = function(data){
  this.quotes = []
}

HotelSearch.prototype = {
  getHotelData: function(keys){
    console.log('attemping hotel api')
    var url = 'http://terminal2.expedia.com/x/mhotels/search?city=EDINBURGH&checkInDate=2016-12-15&checkOutDate=2016-12-20&room1=9&apikey=' + keys.expediaApiKey;
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        var hotelData = JSON.parse(jsonString);
        this.populateQuotes(hotelData);
        console.log(this)
      }
    }.bind(this)
    request.send(null);
  },
  populateQuotes: function(hotelData){
    hotelData.hotelList.forEach(function(hotel){
      if(hotel.isHotelAvailable){
        this.quotes.push(new HotelQuote(hotel))
      }
    }.bind(this))
  }

}

module.exports = HotelSearch;

