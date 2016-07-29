var TestModel = require('./models/test.js')
var TestModelView = require('./views/test.js')



window.onload = function(){
  var test = new TestModel('Jazz');
  var testView = new TestModelView(test);
  testView.changeHeader();
}


//This is Joes Comment