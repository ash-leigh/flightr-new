var TestView = function(testModel){
  this.model = testModel;
}

TestView.prototype = {
  changeHeader: function(){
    var h1 = document.getElementById('title')
    h1.innerText = "My name is " + this.model.name;
  }
}
module.exports = TestView;