var HotelQuote = require('./hotelquote.js');
var ResultObject = require('./result.js');
var AllResultsObject = require('./Allresults.js');
var Promise = require('promise');

var HotelSearch = function(data){
  this.quotes = []
}

HotelSearch.prototype = {
  getHotelData: function(keys, flightQuote){
    return new Promise(function(resolve, reject) {
      var url = this.getUrl(flightQuote)
      url = url + keys.expediaApiKey;

      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function(){
        if(request.status === 200){
          var result = new ResultObject();
          var result = new AllResultsObject();
          var jsonString = request.responseText;
          var hotelData = JSON.parse(jsonString);
          this.populateQuotes(hotelData);
          resolve(this)
        }
      }.bind(this)
      request.send(null);
    }.bind(this))//end of promise
  },

  getUrl: function(flightQuote){
    var depDate = flightQuote.outboundDate;
    var retDate = flightQuote.inboundDate;
    var city = flightQuote.destinationCity.toUpperCase();
    var url = 'http://terminal2.expedia.com/x/mhotels/search?city=' + city + '&checkInDate=' + depDate + '&checkOutDate=' + retDate + '&room1=4&apikey='
    return url;
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

