var InitialSearchParams = require('../models/initialsearch.js');

var InitialSearchView = function(){
  this.latLng = this.getUserLatLng();
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
    var latLngString = navigator.geolocation.getCurrentPosition(function(position){this.latLng = position.coords.latitude + ',' + position.coords.longitude + '-latlong';
    }.bind(this))
  },
  newSearchParams: function(){
    // var latLng = this.getUserLatLng();
    console.log(this.latLng);
    // var startDate = this.getStartDate();
    // var endDate = this.getEndDate();
    // var initialSearchParams = new InitialSearchParams(latLng, startDate, endDate);
    // return initialSearchParams;
  }
}

module.exports = InitialSearchView;

