// var FlightQuote = require('flightquote.js');

var FlightSearch = function(data){
  quotes = []
}

FlightSearch.prototype = {
  getFlightData: function(apiKey){
    console.log('attemping api')
    var url = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/EDI/everywhere/2016-12-01/2016-12-14?apiKey=' + apiKey;
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        var flightData = JSON.parse(jsonString);

        console.log(flightData);

        newData = this.replaceCodes(flightData);
        this.populateQuotes(newData);

        console.log(flightData);
      }
    }.bind(this)
    request.send(null);
  },
  replaceOriginCityCode: function(flightData){

  },
  replaceDestinationCityCode: function(flightData){
    var quotes = flightData.Quotes;
    var cities = flightData.Places;

    quotes.forEach(function(quote){

      cities.forEach(function(city){

        if(quote.OutboundLeg.DestinationId === city.PlaceId){
          quote.OutboundLeg.DestinationId = city.CityName;
          quote.InboundLeg.OriginId = city.CityName;
        }
      })
    })
    return flightData;
  },
  replaceOutboundCarrierCode: function(flightData){

  },
  replaceInboundCarrierCode: function(flightData){

  },
  replaceCodes: function(flightData){
    // var flightData = replaceOriginCityCode(flightData);
    var flightData = this.replaceDestinationCityCode(flightData);
    // flightData = replaceOutboundCarrierCode(flightData);
    // flightData = replaceOutboundCarrierCode(flightData);
    // return flightData;
  },
  populateQuotes: function(flightData){

  }
}

module.exports = FlightSearch;