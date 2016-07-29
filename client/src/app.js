var FlightSearch = require('./models/flightsearch.js');
var HotelSearch = require('./models/hotelsearch.js');

var state = {
  skyscannerApiKey: 'co301553792687403420764331127549',
  expediaApiKey: '49anVGknDW2Ck8ATFBRAAMQ0Ls75wphH',
  resultQuotes: [],
}

window.onload = function(){
  var flightSearch = new FlightSearch()
  flightSearch.getFlightData(state.skyscannerApiKey);
  var hotelSearch = new HotelSearch()
  hotelSearch.getHotelData(state.expediaApiKey)
}




