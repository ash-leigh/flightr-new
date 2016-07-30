var InitialSearchParams = require('../models/initialsearch.js');

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

