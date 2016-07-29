/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var FlightSearch = __webpack_require__(3);
	
	var state = {
	  skyscannerApiKey: 'co301553792687403420764331127549',
	  expediaApiKey: 'fZPSPARW8ZW6Yg738AzbASiN8VPFwVos',
	  resultQuotes: [],
	}
	
	window.onload = function(){
	  var flightsearch = new FlightSearch()
	  console.log(flightsearch);
	  flightsearch.getFlightData(state.skyscannerApiKey);
	
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
	


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

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
	    var quotes = flightData.Quotes;
	    var cities = flightData.Places;
	
	    quotes.forEach(function(quote){
	
	      cities.forEach(function(city){
	
	        if(quote.OutboundLeg.OriginId === city.PlaceId){
	          quote.OutboundLeg.OriginId = city.CityName;
	          quote.InboundLeg.DestinationId = city.CityName;
	        }
	      })
	    })
	    return flightData;
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
	    var quotes = flightData.Quotes;
	    var carriers = flightData.Carriers;
	
	    quotes.forEach(function(quote){
	
	      carriers.forEach(function(carrier){
	
	        if(quote.OutboundLeg.CarrierIds[0] === carrier.CarrierId){
	          quote.OutboundLeg.CarrierIds[0] = carrier.Name;
	        }
	      })
	    })
	    return flightData;
	  },
	  replaceInboundCarrierCode: function(flightData){
	    var quotes = flightData.Quotes;
	    var carriers = flightData.Carriers;
	
	    quotes.forEach(function(quote){
	
	      carriers.forEach(function(carrier){
	
	        if(quote.InboundLeg.CarrierIds[0] === carrier.CarrierId){
	          quote.InboundLeg.CarrierIds[0] = carrier.Name;
	        }
	      })
	    })
	    return flightData;
	  },
	  replaceCodes: function(flightData){
	    var flightData = this.replaceOriginCityCode(flightData);
	    flightData = this.replaceDestinationCityCode(flightData);
	    flightData = this.replaceOutboundCarrierCode(flightData);
	    flightData = this.replaceInboundCarrierCode(flightData);
	    // return flightData;
	  },
	  populateQuotes: function(flightData){
	
	  }
	}
	
	module.exports = FlightSearch;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map