var Test = function(name){
  this.name = name;
}

Test.prototype = {
  talk: function(){
    console.log("Hello my name is " + this.name )
  }
}

module.exports = Test;