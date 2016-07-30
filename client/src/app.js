var FlightSearch = require('./models/flightsearch.js');
var HotelSearch = require('./models/hotelsearch.js');

var InitialSearchView = require('./views/initialsearchview.js');

var state = {
  skyscannerApiKey: 'co301553792687403420764331127549',
  expediaApiKey: '49anVGknDW2Ck8ATFBRAAMQ0Ls75wphH',
  resultQuotes: [],
}

window.onload = function(){
  var initialSearchView = new InitialSearchView();
  console.log(initialSearchView)
  var searchObject = initialSearchView.handleSearchClick();
  console.log(searchObject);
  // var flightSearch = new FlightSearch()
  // flightSearch.getFlightData(state.skyscannerApiKey);
  // var hotelSearch = new HotelSearch()
  // hotelSearch.getHotelData(state.expediaApiKey)
}




