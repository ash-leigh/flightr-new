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
/***/ function(module, exports) {

	var state = {
	  skyscannerApiKey: 'co301553792687403420764331127549',
	  expediaApiKey: 'fZPSPARW8ZW6Yg738AzbASiN8VPFwVos',
	}
	
	window.onload = function(){
	  getFlightData(state.skyscannerApiKey);
	  getHotelData(state.expediaApiKey);
	}
	
	
	function getFlightData(api){
	  console.log('attemping api')
	  var url = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/EDI/everywhere/2016-08-01/2016-08-14?apiKey=' + api;
	  var request = new XMLHttpRequest();
	  request.open('GET', url);
	  request.onload = function(){
	    if(request.status === 200){
	      var jsonString = request.responseText;
	      var flightData = JSON.parse(jsonString);
	      console.log(flightData);
	    }
	  }
	  request.send(null);
	}
	
	function getHotelData(api){
	  var url = 'http://terminal2.expedia.com/x/mhotels/search?city=EDINBURGH&checkInDate=2016-12-15&checkOutDate=2016-12-17&room1=2&apikey=' + api;
	    var request = new XMLHttpRequest();
	    request.open('GET', url);
	    request.onload = function(){
	      if(request.status === 200){
	        var jsonString = request.responseText;
	        var hotelData = JSON.parse(jsonString);
	        console.log(hotelData);
	      }
	    }
	    request.send(null);
	  }
	


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map