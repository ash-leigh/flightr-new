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
  hotelSearch.getHotelData(keys).then(function(response) {
    //succesfull code goes here.
    console.log("Look here:", hotelSearch);
  }, function(error) {
    console.error("Failed!", error);
  });

  // function get(url) {
  //   return new Promise(function(resolve, reject) {
  //     var req = new XMLHttpRequest();
  //     req.open('GET', url);

  //     req.onload = function() {
  //       if (req.status == 200) {
  //         resolve(req.response);
  //       }
  //       else {
  //         reject(Error(req.statusText));
  //       }
  //     };
  //     // Make the request
  //     req.send();
  //   });
  // }

  // // Use it!
  // get('story.json').then(function(response) {
  //   console.log("Success!", response);
  // }, function(error) {
  //   console.error("Failed!", error);
  // });
}




