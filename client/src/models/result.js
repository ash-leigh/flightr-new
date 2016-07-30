var HotelSearch = require('./hotelsearch.js');

var Result = function(flightObject){
  this.flightInfo = flightObject;
  this.flightPrice = 0;
  this.hotels = []
  this.country = null;
}

Result.prototype = {
  initialise: function(){
    this.populateHotels();
  },

  populateHotels: function(){
    console.log(this.flightInfo.Quotes)
  }

}

module.exports = Result;