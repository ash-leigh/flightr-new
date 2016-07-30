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

