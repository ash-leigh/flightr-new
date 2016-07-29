var FlightQuote = function(quoteQbject){
  this.originCity = quoteQbject.OutboundLeg.OriginId,
  this.destinationCity = quoteQbject.OutboundLeg.DestinationId,
  this.outboundDate = Date.parse(quoteQbject.OutboundLeg.DepartureDate),
  this.inboundDate = Date.parse(quoteQbject.InboundLeg.DepartureDate),
  this.price = quoteQbject.MinPrice,
  this.outboundCarrier = quoteQbject.OutboundLeg.CarrierIds[0],
  this.inboundCarrier = quoteQbject.InboundLeg.CarrierIds[0]
}

FlightQuote.prototype = {
  
}

module.exports = FlightQuote;