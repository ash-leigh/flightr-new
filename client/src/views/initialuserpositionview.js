var InitialUserPosition = require('../models/initialuserposition.js'); 

var InitialUserPositionView = function(){

}

InitialUserPositionView.prototype = {
  displayLocation: function(location){
      var displayDiv = document.getElementById("suggestedOrigin");
      displayDiv.innerHTML = "You are in " + location;
  }
}

module.exports = InitialUserPositionView;