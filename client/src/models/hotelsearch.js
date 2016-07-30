var HotelQuote = require('./hotelquote.js');
var ResultObject = require('./result.js');
var AllResultsObject = require('./Allresults.js');
var Promise = require('promise');

var HotelSearch = function(data){
  this.quotes = []
}

HotelSearch.prototype = {
  getHotelData: function(keys){
    return new Promise(function(resolve, reject) {
      console.log('attemping hotel api')
      var url = 'http://terminal2.expedia.com/x/mhotels/search?city=EDINBURGH&checkInDate=2016-12-15&checkOutDate=2016-12-20&room1=9&apikey=' + keys.expediaApiKey;
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function(){
        if(request.status === 200){
          //bring in results
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
  populateQuotes: function(hotelData){
    hotelData.hotelList.forEach(function(hotel){
      if(hotel.isHotelAvailable){
        this.quotes.push(new HotelQuote(hotel))
      }
    }.bind(this))
  }

}

module.exports = HotelSearch;

