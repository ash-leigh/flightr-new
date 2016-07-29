var FlightSearch = require('./models/flightsearch.js');

var state = {
  skyscannerApiKey: 'co301553792687403420764331127549',
  expediaApiKey: 'fZPSPARW8ZW6Yg738AzbASiN8VPFwVos',
  resultQuotes: [],
}

window.onload = function(){
  var flightSearch = new FlightSearch()
  // console.log(flightSearch);
  flightSearch.getFlightData(state.skyscannerApiKey);
  // console.log(flightSearch.quotes)
  // getFlightData(state.skyscannerApiKey);
}


function getFlightData(api){
 
}

function populateResults(data){
  var quotes = data.Quotes;
  var cities = data.Places;

  quotes.forEach(function(quote){

    cities.forEach(function(city){

      if(quote.OutboundLeg.DestinationId === city.PlaceId){
        quote.CityName = city.CityName;
        state.resultQuotes.push(quote);
        console.log(quote.CityName)
      }
    })
  })
}

// function getHotelData(api){
//   var url = 'http://terminal2.expedia.com/x/mhotels/search?city=EDINBURGH&checkInDate=2016-12-15&checkOutDate=2016-12-17&room1=2&apikey=' + api;
//   var request = new XMLHttpRequest();
//   request.open('GET', url);
//   request.onload = function(){
//     if(request.status === 200){
//       var jsonString = request.responseText;
//       var hotelData = JSON.parse(jsonString);
//         // console.log(hotelData);
//       }
//     }
//     request.send(null);
//   }

