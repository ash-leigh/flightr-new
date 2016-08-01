var QuoteImage = function(){

}

QuoteImage.prototype = {
  getDestinationLatLng: function(result){
    return new Promise(function(resolve, reject) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': result.destinationCity}, function(results, status){
        if (status === google.maps.GeocoderStatus.OK){
          var destinationCityLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
            resolve(destinationCityLatLng)
          //look here
          // this.getImageFromFlickr(destinationCityLatLng)
          ////
        }else{
          resolve({lat: 55.946986700000004, lng: -3.2014716})
        }
      }.bind(this))
    }.bind(this))//end of promise
  },
  getImageFromFlickr: function(latLngObject){
    return new Promise(function(resolve, reject) {
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d836aea8ef2a786aad020fb216b0b1c4&lat='+ latLngObject.lat +'&lon='+ latLngObject.lng +'&format=json&nojsoncallback=1' 
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = function () {
            if (request.status === 200) {
                var jsonString = request.responseText;
                var photosObject = JSON.parse(jsonString);
                photo = photosObject.photos.photo[0]
                resolve(this.constructImgLink(photo));
            }
        }.bind(this)
        request.send();
      }.bind(this))//end of promise
    }, 
    constructImgLink: function(photoObject){
      return 'https://farm' + photoObject.farm + '.staticflickr.com/' + photoObject.server + '/' + photoObject.id + '_' + photoObject.secret + '.jpg>'
    }
}

module.exports = QuoteImage;




