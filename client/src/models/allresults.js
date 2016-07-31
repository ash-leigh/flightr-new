var _ = require('lodash')

var AllResults = function(){
  this.results = []
}

var testingVarible = null;

AllResults.prototype = {
  populateFromLocal: function(){
    var retrievedResults = JSON.parse(localStorage.getItem('lastSearch')) || [];
    console.log(retrievedResults)
    if(retrievedResults.length === 0){
      console.log('No results...')
      return;
    }
    this.results = retrievedResults.results;
  },

  orderByFlightPrice: function(){
    
  }
}

module.exports = AllResults;