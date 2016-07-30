var InitialSearchParams = require('../models/initialsearch.js');

var InitialSearchView = function(){
  
}

InitialSearchView.prototype = {
  handleSearchClick: function(){
    var button = document.getElementById('initialSearchButton');
    button.onclick = function(){
      this.getUserLatLng();
    }.bind(this);
  },
  getUserLatLng: function(){
    var constructString = function(lat, lng){
      var string = lat + ',' + lng + '-latlong';
      return string;
    }
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var latLng = constructString(lat, lng)
      this.newSearchParams(latLng);
    }.bind(this))
  },
  getStartDate: function(){
    var startDate = document.getElementById('searchStartDateInput').value;
    return startDate
  },
  getEndDate: function(){
    var endDate = document.getElementById('searchEndDateInput').value;
    return endDate
  }, 
  newSearchParams: function(latLng){
    var initialSearchParams = new InitialSearchParams(latLng, this.getStartDate(), this.getEndDate());
    return initialSearchParams;
  }
}

module.exports = InitialSearchView;


