var FlightSearch = require('./models/flightsearch.js');
var HotelSearch = require('./models/hotelsearch.js');
var ResultObject = require('./models/result.js');

var keys = {
  skyscannerApiKey: 'co301553792687403420764331127549',
  expediaApiKey: '49anVGknDW2Ck8ATFBRAAMQ0Ls75wphH',
}

window.onload = function(){
  var flightSearch = new FlightSearch()
  flightSearch.getFlightData(keys);
  var hotelSearch = new HotelSearch()
  hotelSearch.getHotelData(keys)
}




