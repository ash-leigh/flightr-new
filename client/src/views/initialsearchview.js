var InitialSearchParams = require('../models/initialsearch.js');
var ResultObject = require('../models/result.js');
var AllResultsObject = require('../models/allresults.js');

var InitialSearchView = function(){}

InitialSearchView.prototype = {
  handleSearchClick: function(flightSearch, hotelSearch, keys){
    var button = document.getElementById('initialSearchButton');
    button.onclick = function(){
      console.log('clicked')
      //get users geolocation...
      //can we get lat
      this.getUserLatLng().then(function(response){
        //then get that info into a usable object
        locationData = this.newSearchParams(response, this.getStartDate(), this.getEndDate())
        //request get flight data, once that is complete conintue....
        flightSearch.getFlightData(keys, locationData).then(function(response) {
          //return the quotes array to the next promise handler
          console.log('test',response)
          return response.quotes
        }).then(function(response){
          //loop through each quote and call a function to create a results object
          //then put that in array.
          //solution to the beast....
          return Promise.all(response.map(function (quote) {
              return hotelSearch.getHotelData(keys, quote)
            }));
        }).then(function (arrayOfResults) {
          //do stuff here with the array of result objects
          //save somewhere?
          var allResults = new AllResultsObject();
          allResults.results = arrayOfResults
          console.log('all results:',allResults)
          //save locally.
        });;
      }.bind(this))
    }.bind(this);

  },

  constructString: function(lat, lng){
    var string = lat + ',' + lng + '-latlong';
    return string;
  },

  getUserLatLng: function(){
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latLng = this.constructString(lat, lng)
        // this.newSearchParams(latLng);
        resolve(latLng)
      }.bind(this))
    }.bind(this))//end of promise
  },

  getStartDate: function(){
    var startDate = document.getElementById('searchStartDateInput').value;
    return startDate
  },

  getEndDate: function(){
    var endDate = document.getElementById('searchEndDateInput').value;
    return endDate
  }, 
  
  newSearchParams: function(latLng){
    var initialSearchParams = new InitialSearchParams(latLng, this.getStartDate(), this.getEndDate());
    return initialSearchParams;
  }
}

module.exports = InitialSearchView;


