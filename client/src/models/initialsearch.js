var InitialSearchParams = function(){
  this.origin = this.getUserLatLng()
  this.startDate = 
  this.endDate = 
}

InitialSearchParams.prototype = {
  getUserLatLng: function(){
    navigator.geolocation.getCurrentPosition(function(position){
      var userPosition = position.coords.latitude + ',' + position.coords.longitude + '-latlong';
      return userPosition;
    })
  },
  searchOrigin: function(){
    
  }
}

module.exports = InitialSearchParams;


