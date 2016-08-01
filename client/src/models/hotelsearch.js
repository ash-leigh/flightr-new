var HotelQuote = require('./hotelquote.js');
var ResultObject = require('./result.js');
var AllResultsObject = require('./Allresults.js');
var ResultBoxes = require('../views/allresultsview.js');
var Promise = require('promise');

var QuoteImage = require('./quoteimage.js');

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
         console.log('Creating Hotel Objects and then result Objects')
         resultObject = this.createResultObject(hotelData, flightQuote)

         var quoteImage = new QuoteImage();

         quoteImage.getDestinationLatLng(flightQuote).then(function (response) {
            return response;
         }).then(function (response) {
          //call flickr here
          var quoteImage = new QuoteImage();
          return quoteImage.getImageFromFlickr(response)
         }).then(function (response) {
          resultObject.imageUrl = response;
          resolve(resultObject);
         })
       }
     }.bind(this)
     request.send(null);
   }.bind(this))//end of promise
 },

 createResultObject: function(hotelData, flightQuote){

  
   var resultObject = new ResultObject();
   resultObject.hotels = this.populateQuotes(hotelData, flightQuote);
   resultObject.flightInfo = flightQuote;
   resultObject.flightPrice = flightQuote.price;
   
   return resultObject;
 },

 getUrl: function(flightQuote){
   var depDate = flightQuote.outboundDate;
   var retDate = flightQuote.inboundDate;
   var city = flightQuote.destinationCity.toUpperCase();
   var url = 'http://terminal2.expedia.com/x/mhotels/search?city=' + city + '&checkInDate=' + depDate + '&checkOutDate=' + retDate + '&room1=4&apikey='
   return url;
 },

 populateQuotes: function(hotelData, flightQuote){
   resultsArray = []
   hotelData.hotelList.forEach(function(hotel){
     if(hotel.isHotelAvailable){
       // this.quotes.push(new HotelQuote(hotel))
       resultsArray.push(new HotelQuote(hotel, flightQuote));
     }
   }.bind(this))
   return resultsArray;
 }

}

module.exports = HotelSearch;