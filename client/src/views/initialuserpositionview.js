var InitialUserPosition = require('../models/initialuserposition.js'); 

var InitialUserPositionView = function(){

}

InitialUserPositionView.prototype = {
  displayLocation: function(location){
      var displayDiv = document.getElementById("suggestedOrigin");
      displayDiv.innerHTML = "not leaving from " + location + "?";

      var dates = document.getElementById('dates');
      dates.id = 'datesInit';
  }
}

module.exports = InitialUserPositionView;