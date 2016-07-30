var FlightSearch = require('./models/flightsearch.js');
var HotelSearch = require('./models/hotelsearch.js');
var ResultObject = require('./models/result.js');
var AllResultsObject = require('./models/result.js');

var InitialSearchView = require('./views/initialsearchview.js');


var keys = {
  skyscannerApiKey: 'co301553792687403420764331127549',
  expediaApiKey: '49anVGknDW2Ck8ATFBRAAMQ0Ls75wphH',
  userSearches: [],
}

window.onload = function(){
  var allResults = new AllResultsObject();

  var flightSearch = new FlightSearch()
  flightSearch.getFlightData(keys);
  var hotelSearch = new HotelSearch()
  hotelSearch.getHotelData(keys)


  // flightSearch.getFlightData(keys).then(function(response) {
  //   //returns once flightdata has loaded, responce = flightsearch object
  //   flightSearch.quotes.forEach(function(quote){
  //     var result = new ResultObject(quote)
  //     //nesting promises. for each qoute go and get hotels for dest city
  //     hotelSearch.getHotelData(keys, quote).then(function(response) {
  //       //go and create a results object
  //       // console.log('got hotel data')
  //       result.hotels = hotelSearch.quotes;
  //       console.log(result)
  //       allResults.results.push(result)
  //     })
  //   })//end of forEach loop
  //   console.log('ALL RESULTS', allResults)
  // }, function(error) {
  //   console.error("Failed!", error);
  // });


  var initialSearchView = new InitialSearchView();

  initialSearchView.getUserLatLng().then(function(response){
    AshleighsObject = initialSearchView.newSearchParams(response)
    console.log(AshleighsObject)
  })
}








