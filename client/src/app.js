var FlightSearch = require('./models/flightsearch.js');
var HotelSearch = require('./models/hotelsearch.js');
var ResultObject = require('./models/result.js');
var AllResultsObject = require('./models/result.js');
var InitialSearchView = require('./views/initialsearchview.js');


var keys = {
  skyscannerApiKey: 'co301553792687403420764331127549',
  expediaApiKey: '49anVGknDW2Ck8ATFBRAAMQ0Ls75wphH'
}

window.onload = function(){
  //object loads here
  var allResults = new AllResultsObject();
  var flightSearch = new FlightSearch()
  var hotelSearch = new HotelSearch()
  //event listeners here
  var initialSearchView = new InitialSearchView();
  initialSearchView.handleSearchClick(flightSearch, hotelSearch, keys);
  //area for Joe to play with


  //area for ash to play with


  //area for nat to play with


  //
}








