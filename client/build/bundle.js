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
	
	var InitialSearchView = __webpack_require__(5);
	
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
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//This is to test git ignore
	//so is this
	
	var FlightQuote = __webpack_require__(2);
	
	var FlightSearch = function(data){
	  this.quotes = [];
	}
	
	FlightSearch.prototype = {
	  getFlightData: function(apiKey){
	    console.log('attemping api')
	    var url = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/LON/everywhere/2016-10-01/2016-10-14?apiKey=' + apiKey;
	    var request = new XMLHttpRequest();
	    request.open('GET', url);
	    request.onload = function(){
	      if(request.status === 200){
	        var jsonString = request.responseText;
	        var flightData = JSON.parse(jsonString);
	        console.log(flightData);
	        var newFlightData = this.replaceCodes(flightData);
	        this.populateQuotes(newFlightData);
	        console.log(this)
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
	  getHotelData: function(apiKey){
	    console.log('attemping hotel api')
	    var url = 'http://terminal2.expedia.com/x/mhotels/search?city=EDINBURGH&checkInDate=2016-12-15&checkOutDate=2016-12-20&room1=9&apikey=' + apiKey;
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

	var InitialSearchParams = __webpack_require__(6);
	
	var InitialSearchView = function(){
	  
	}
	
	InitialSearchView.prototype = {
	  handleSearchClick: function(){
	    var button = document.getElementById('initialSearchButton');
	    button.onclick = function(){
	      this.newSearchParams();
	    }.bind(this);
	
	  },
	  getStartDate: function(){
	    var startDate = document.getElementById('searchStartDateInput').value;
	    return startDate
	  },
	  getEndDate: function(){
	    var endDate = document.getElementById('searchEndDateInput').value;
	    return endDate
	  }, 
	  getUserLatLng: function(){
	    console.log('entered function')
	    navigator.geolocation.getCurrentPosition(function(position){var latLng = position.coords.latitude + ',' + position.coords.longitude + '-latlong';
	      console.log(latLng)
	    }.bind(this))
	  },
	  newSearchParams: function(){
	    var latLng = this.getUserLatLng();
	    console.log(latLng);
	    // var startDate = this.getStartDate();
	    // var endDate = this.getEndDate();
	    // var initialSearchParams = new InitialSearchParams(latLng, startDate, endDate);
	    // return initialSearchParams;
	  }
	}
	
	module.exports = InitialSearchView;
	
	
	// this.setCenter = function(){
	//   navigator.geolocation.getCurrentPosition(function(position){
	//     var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
	      // 
	//     this.map.googleMap.panTo(pos);
	//     // map.addMarker(pos);
	//   }.bind(this))
	// }
	


/***/ },
/* 6 */
/***/ function(module, exports) {

	var InitialSearchParams = function(latLng, startDate, endDate){
	  this.origin = latLng;
	  this.startDate = startDate;
	  this.endDate = endDate;
	}
	
	InitialSearchParams.prototype = {
	  
	}
	
	module.exports = InitialSearchParams;
	
	
	


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map