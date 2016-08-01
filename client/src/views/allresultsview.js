var ResultBoxes = function(){}


ResultBoxes.prototype = {
  allResults: function(result){
    //create city destination row//
    var parentElement = document.getElementById('parentResult');
    var row = document.createElement('div');
    row.className = "row";
    var div = document.createElement('div');
    div.className = 'col-12';
    var h1 = document.createElement('h1');
    h1.innerText = result.flightInfo.destinationCity;
    div.appendChild(h1);
    row.appendChild(div);
    parentElement.appendChild(row);

    //create flight details row//
    var row = document.createElement('div');
    row.className = "row";
    //outbound leg//
    //outbound carrier logo//
    var div = document.createElement('div');
    div.className = 'col-2';
    var image = document.createElement('img');
    image.src = '#'; //this is for carrier logo from API//
    div.appendChild(image);
    row.appendChild(div);
    parentElement.appendChild(row);

    //origin city//
    var div = document.createElement('div');
    div.className = 'col-1';
    var p = document.createElement('p');
    p.innerText = result.flightInfo.originCity;
    div.appendChild(p);
    row.appendChild(div);
    parentElement.appendChild(row);

    //arrow icon//
    var div = document.createElement('div');
    div.className = 'col-2';
    var image = document.createElement('img');
    image.src = '#'; //this is for arrow icon//
    div.appendChild(image);
    row.appendChild(div);
    parentElement.appendChild(row);

    //destination city//
    var div = document.createElement('div');
    div.className = 'col-1';
    var p = document.createElement('p');
    p.innerText = result.flightInfo.destinationCity;
    div.appendChild(p);
    row.appendChild(div);
    parentElement.appendChild(row);

    //inbound leg//
    //inbound carrier logo//
    var div = document.createElement('div');
    div.className = 'col-1';
    var image = document.createElement('img');
    image.src = '#'; //this is for carrier logo from API//
    div.appendChild(image);
    row.appendChild(div);
    parentElement.appendChild(row);

    //destination (origin) city//
    var div = document.createElement('div');
    div.className = 'col-1';
    var p = document.createElement('p');
    p.innerText = result.flightInfo.destinationCity;
    div.appendChild(p);
    row.appendChild(div);
    parentElement.appendChild(row);

    //arrow icon//
    var div = document.createElement('div');
    div.className = 'col-2';
    var image = document.createElement('img');
    image.src = '#'; //this is for arrow icon//
    div.appendChild(image);
    row.appendChild(div);
    parentElement.appendChild(row);

    //origin (destination) city//
    var div = document.createElement('div');
    div.className = 'col-1';
    var p = document.createElement('p');
    p.innerText = result.flightInfo.originCity;
    div.appendChild(p);
    row.appendChild(div);
    parentElement.appendChild(row);


    //loop starts here///////////////////
    for (var i = 0; i < 3; i++) {
       var node = this.createHotelRows(result, i);
       parentElement.appendChild(node)
       console.log('index:', i)
    }





  },

  displayfirst3hotels: function(){

  },


  createHotelRows: function(result, index){
    //this is the parentelement of hotels
    var parentElement = document.createElement('div')
    //this is the first hotel row of 2//
    var row = document.createElement('div');
    row.className = "row";
    //hotel name//
    var div = document.createElement('div');
    div.className = 'col-4';
    var p = document.createElement('p');
    p.innerText = result.hotels[index].hotelName;
    div.appendChild(p);
    row.appendChild(div);
    parentElement.appendChild(row);

    //hotel area//
    var div = document.createElement('div');
    div.className = 'col-4';
    var p = document.createElement('p');
    p.innerText = result.hotels[index].locationDescription;
    div.appendChild(p);
    row.appendChild(div);
    parentElement.appendChild(row);

    //guest rating//
    var div = document.createElement('div');
    div.className = 'col-2';
    var p = document.createElement('p');
    p.innerText = result.hotels[index].guestRating + '%';
    div.appendChild(p);
    row.appendChild(div);
    parentElement.appendChild(row);

    //packageprice
    var div = document.createElement('div');
    div.className = 'col-2';
    var p = document.createElement('p');
    console.log(result)
    p.innerText = '£' + result.cheapestPackage;
    div.appendChild(p);
    row.appendChild(div);
    parentElement.appendChild(row);

    //this is the second hotel row of 2 which will be hidden//
    var row2 = document.createElement('div');
    row2.className = "row hidden";
    var div = document.createElement('div');
    div.className = 'col-2';
    var image = document.createElement('img');
    image.src = 'http://images.travelnow.com' + result.hotels[index].thumbnailUrl;
    image.className = 'hotelThumbnail';
    div.appendChild(image);
    row2.appendChild(div);
    parentElement.appendChild(row);
    //result.hotels.thumbnailURL//

    //create number of nights//
    var div = document.createElement('div');
    div.className = 'col-2';
    var p = document.createElement('p');
    p.innerText = 'no of nights';
    div.appendChild(p);
    row2.appendChild(div);
    parentElement.appendChild(row2);

    //create hotel description//
    var div = document.createElement('div');
    div.className = 'col-4';
    var p = document.createElement('p');
    p.innerText = result.hotels[index].description;
    div.appendChild(p);
    row2.appendChild(div);
    parentElement.appendChild(row2);

    //create star rating//
    var div = document.createElement('div');
    div.className = 'col-2';
    var p = document.createElement('p');
    p.innerText = result.hotels[index].starRating;
    div.appendChild(p);
    row2.appendChild(div);
    parentElement.appendChild(row2);

    //create book button//
    var div = document.createElement('div');
    div.className = 'col-2';
    var image = document.createElement('img');
    image.src = '#'; //this is for book button//
    div.appendChild(image);
    row2.appendChild(div);
    parentElement.appendChild(row2);
    return parentElement
  }

}

module.exports = ResultBoxes;