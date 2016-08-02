var HotelSearch = require('./hotelsearch.js');

var Result = function(flightObject){
  this.flightInfo = flightObject;
  this.flightPrice = 0;
  this.hotels = []
  this.country = null;
  this.imageUrl = null;
}

Result.prototype = {
  initialise: function(){
    this.populateHotels();
  },

  populateHotels: function(){
    console.log(this.flightInfo.Quotes)
  },

  orderHotelsbyPrice: function(){
    this.hotels = _.sortBy(this.hotels, 'nightlyPrice')
  },

  orderHotelsbyStarRating: function(){
      this.hotels = _.sortBy(this.hotels, 'starRating')
  },

  orderHotelsbyPercentRating: function(){
      this.hotels = _.sortBy(this.hotels, 'percentRecommended')
  },

  orderHotelsbyGuestRating: function(){
      this.hotels = _.sortBy(this.hotels, 'guestRating')
  }

}

module.exports = Result;