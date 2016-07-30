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

	var FlightSearch = __webpack_require__(1);
	var HotelSearch = __webpack_require__(3);
	var ResultObject = __webpack_require__(5);
	
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
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var HotelSearch = __webpack_require__(3);
	
	var FlightQuote = __webpack_require__(2);
	
	var FlightSearch = function(data){
	  this.quotes = [];
	}
	
	FlightSearch.prototype = {
	  getFlightData: function(keys){
	    console.log('attemping api')
	    var url = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/LON/everywhere/2016-10-01/2016-10-14?apiKey=' + keys.skyscannerApiKey;
	    var request = new XMLHttpRequest();
	    request.open('GET', url);
	    request.onload = function(){
	      if(request.status === 200){
	        var jsonString = request.responseText;
	        var flightData = JSON.parse(jsonString);
	        var newFlightData = this.replaceCodes(flightData);
	        this.populateQuotes(newFlightData);
	        //about to run an API expedia call for each qoute...hopefully
	        this.quotes.forEach(function(quote){
	          console.log('looping')
	          var hotelSearch = new HotelSearch()
	          hotelSearch.getHotelData(keys)
	        })
	
	
	      }//end of onload if
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
	          quote.OutboundAirportName = city.Name;
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
	          quote.InboundAirportName = city.Name;
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
	    return flightData;
	  },
	  populateQuotes: function(flightData){
	    flightData.Quotes.forEach(function(flight){
	      this.quotes.push(new FlightQuote(flight))
	    }.bind(this))
	  }
	}
	
	module.exports = FlightSearch;

/***/ },
/* 2 */
/***/ function(module, exports) {

	//nats comment//
	
	var FlightQuote = function(quoteQbject){
	  this.originCity = quoteQbject.OutboundLeg.OriginId,
	  this.destinationCity = quoteQbject.OutboundLeg.DestinationId,
	  this.outboundDate = this.fixdate(quoteQbject.OutboundLeg.DepartureDate),
	  this.inboundDate = this.fixdate(quoteQbject.InboundLeg.DepartureDate),
	  this.price = quoteQbject.MinPrice,
	  this.outboundCarrier = quoteQbject.OutboundLeg.CarrierIds[0],
	  this.inboundCarrier = quoteQbject.InboundLeg.CarrierIds[0]
	  this.inboundAirport = quoteQbject.InboundAirportName
	  this.outboundAirport = quoteQbject.OutboundAirportName
	}
	
	FlightQuote.prototype = {
	  fixdate: function(date){
	    dateArray = date.split('T')
	    return dateArray[0]
	  }
	}
	
	module.exports = FlightQuote;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var HotelQuote = __webpack_require__(4);
	
	var HotelSearch = function(data){
	  this.quotes = []
	}
	
	HotelSearch.prototype = {
	  getHotelData: function(keys){
	    console.log('attemping hotel api')
	    var url = 'http://terminal2.expedia.com/x/mhotels/search?city=EDINBURGH&checkInDate=2016-12-15&checkOutDate=2016-12-20&room1=9&apikey=' + keys.expediaApiKey;
	    var request = new XMLHttpRequest();
	    request.open('GET', url);
	    request.onload = function(){
	      if(request.status === 200){
	        var jsonString = request.responseText;
	        var hotelData = JSON.parse(jsonString);
	        this.populateQuotes(hotelData);
	        console.log(this)
	      }
	    }.bind(this)
	    request.send(null);
	  },
	  populateQuotes: function(hotelData){
	    hotelData.hotelList.forEach(function(hotel){
	      if(hotel.isHotelAvailable){
	        this.quotes.push(new HotelQuote(hotel))
	      }
	    }.bind(this))
	  }
	
	}
	
	module.exports = HotelSearch;
	


/***/ },
/* 4 */
/***/ function(module, exports) {

	var HotelQuote = function(quoteObject){
	  this.hotelName = quoteObject.name,
	  this.hotelAddress = quoteObject.address + ", " + quoteObject.city + ", " + quoteObject.stateProvinceCode + ", " + quoteObject.postalCode
	  this.latLng = {lat: quoteObject.latitude, lng: quoteObject.longitude},
	  this.thumbnailUrl = quoteObject.largeThumbnailUrl,
	  this.description = quoteObject.shortDescription,
	  this.locationDescription = quoteObject.locationDescription,
	  this.starRating = quoteObject.hotelStarRating,
	  this.guestRating = quoteObject.hotelGuestRating,
	  this.percentRecommended = quoteObject.percentRecommended,
	  this.nightlyPrice = quoteObject.lowRateInfo.total,
	  this.country = quoteObject.countryCode
	}
	
	HotelQuote.prototype = {
	
	}
	
	module.exports = HotelQuote;
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var HotelSearch = __webpack_require__(3);
	
	var Result = function(flightObject){
	  this.flightInfo = flightObject;
	  this.flightPrice = 0;
	  this.hotels = []
	  this.country = null;
	}
	
	Result.prototype = {
	  initialise: function(){
	    this.populateHotels();
	  },
	
	  populateHotels: function(){
	    console.log(this.flightInfo.Quotes)
	  }
	
	}
	
	module.exports = Result;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map