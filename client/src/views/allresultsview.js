var ResultBoxes = function(){}


ResultBoxes.prototype = {
  populateAllResults: function(result){


    if(document.getElementById('spinner')){
        var loader = document.getElementById('spinner')
        loader.id = 'spinnerHide';
    };

    var button = document.getElementById('initialSearchButton');

    button.value = 'SEARCH DEALS';

    var masterParent = document.getElementById('masterparent');
    var subMasterParent = this.createRow();
    subMasterParent.className = 'submasterparent';
    var hotelsRow = this.createRow();

    this.createHeader(result, subMasterParent);
    this.createFlightRow(result, subMasterParent);
    this.createSortHotelsRow(result, subMasterParent, hotelsRow);
    this.populateInitHotels(result, subMasterParent, hotelsRow);


    masterParent.appendChild(subMasterParent)
},

createSortHotelsRow: function(result, subMasterParent, hotelsRow) {
    var row = this.createRow();
    var col9 = this.createCol('9');
    var priceLbl = document.createElement('label');
    priceLbl.innerText = "Hotel Price";
    priceLbl.className = "hotelsort";
    var startRatingLbl = document.createElement('label');
    startRatingLbl.innerText = "Star Rating";
    startRatingLbl.className = "hotelsort";
    var guestRecLbl = document.createElement('label');
    guestRecLbl.innerText = "Guest Recomendation";
    guestRecLbl.className = "hotelsort";
    var guesRatingLbl = document.createElement('label');
    guesRatingLbl.innerText = "Guest Rating";
    guesRatingLbl.className = "hotelsort";

    col9.appendChild(priceLbl);
    col9.appendChild(startRatingLbl);
    col9.appendChild(guestRecLbl);
    col9.appendChild(guesRatingLbl);
    row.appendChild(col9);
    subMasterParent.appendChild(row)

    //plus and minus people here
   
    //minus column
    var colminus = document.createElement('div');
    colminus.className = "col-1";
    colminus.id = 'removeGuest';
    var minus = document.createElement('div')
    minus.innerText = "-"
    colminus.appendChild(minus)
    row.appendChild(colminus);
    //poeople column
    var colguest = document.createElement('div');
    colguest.className = "col-1";

    var countRow = document.createElement('div');
    countRow.className = 'row';
    countRow.id = 'guestIncrement';
    var count = document.createElement('div')
    count.innerText = "1"

    var guestRow = document.createElement('div');
    guestRow.className = 'row';
    var guest = document.createElement('div')
    guest.innerText = "guests"

    countRow.appendChild(count);
    colguest.appendChild(countRow);

    guestRow.appendChild(guest);
    colguest.appendChild(guestRow);

    row.appendChild(colguest);

    //plus column here
    var colplus = document.createElement('div');
    colplus.className = "col-1";
    colplus.id = 'addGuest';
    var plus = document.createElement('div')
    plus.innerText = "+"
    colplus.appendChild(plus)
    row.appendChild(colplus);

    //append plus minus above

    //order hotels by price
    priceLbl.onclick = function(){
        hotelsRow.innerHTML = ""
        console.log('order hotels by price')
        result.orderHotelsbyPrice();
        this.populateInitHotels(result, subMasterParent, hotelsRow)
    }.bind(this)

    //order hotels by star rating
    startRatingLbl.onclick = function(){
        hotelsRow.innerHTML = ""
        console.log('order hotels by * rating')
        result.orderHotelsbyStarRating();
        this.populateInitHotels(result, subMasterParent, hotelsRow)
    }.bind(this)

    //order by % rec
    guestRecLbl.onclick = function(){
        hotelsRow.innerHTML = ""
        console.log('order hotels by % rec')
        result.orderHotelsbyPercentRating();
        this.populateInitHotels(result, subMasterParent, hotelsRow)
    }.bind(this)

    //order guest rating
    guesRatingLbl.onclick = function(){
        hotelsRow.innerHTML = ""
        console.log('order hotels by guest rating')
        result.orderHotelsbyGuestRating();
        this.populateInitHotels(result, subMasterParent, hotelsRow)
    }.bind(this)

},
//increase price based on number of guests
increasePrice{
    
}

populateInitHotels: function(result, subMasterParent, hotelsRow){
    hotelsRow.id = "hotelrow"
    var count = 3;
    var torf = true;

    result.hotels.forEach(function(hotel){
        if(count < 1){
            torf = false;
        }
        var row = this.createSingleHotelLine(hotel)
        if(torf === false){
            row.hidden = true;
        }
        count--;
        hotelsRow.appendChild(row)
    }.bind(this))

    var btn = document.createElement('input');
    btn.type = 'button';
    btn.value = 'Show more hotels';
    btn.className = 'moreButton';

    btn.onclick = function(event){
        var kids = hotelsRow.children;
        if(kids[kids.length-2].hidden === true){
            this.showAllHotels(hotelsRow, btn);
            return;
        }

        if(kids[kids.length-2].hidden === false){
            this.showLessHotels(hotelsRow, btn);
        }
    }.bind(this)
    var btnRow = this.createRow();
    btnRow.appendChild(btn)
    hotelsRow.appendChild(btnRow)

    subMasterParent.appendChild(hotelsRow);
},

showLessHotels: function(hotelsRow, btn){
    console.log('show less hotels')
    var kids = hotelsRow.children;
    var count = 3;
    for (var i = 0; i < kids.length -1; i++){
        if(count > 0){
            kids[i].hidden = false;
        }else{
            kids[i].hidden = true;
        }
        count--;
    }
    btn.value = "Show more hotels";
},

showAllHotels: function(hotelsRow, btn){
    console.log('show all hotels')
    var kids = hotelsRow.children;
    for (var i = 0; i < kids.length -1; i++){
        kids[i].hidden = false;
    }
    btn.value = "Show less hotels"
},

createSingleHotelLine: function(hotel){
    var outerHotelRow = this.createRow();
    outerHotelRow.id = 'outerHotelRow'

    //first hotel row//
    var row = document.createElement('div');
    row.className = "row hotel";
    //hotel name & location description//
    var div = document.createElement('div');
    div.className = 'col-10';
    //prevents lines being too long
    var p = document.createElement('p');
    if(hotel.hotelName.length + hotel.locationDescription < 60){
       p.innerText = hotel.hotelName + ', ' + hotel.locationDescription;
   }else{
    p.innerText = hotel.hotelName 
}
     //end prevent

     div.appendChild(p);
     row.appendChild(div);

    //cheapest package price//
    var div = document.createElement('div');
    div.className = 'col-2';
    var p = document.createElement('p');
    p.innerText = "£" + Math.floor(((this.calculateDaystravelled() * hotel.nightlyPrice)/1.33) + hotel.flightQuote.price);
    p.className = 'from';
    div.appendChild(p);
    row.appendChild(div);

    //hidden hotel row//
    //thumbnail hotel image//
    var row2 = document.createElement('div');
    row2.className = "row hiddenrow";
    var div = document.createElement('div');
    div.className = 'col-3';
    var image = document.createElement('img');
    image.src = 'http://images.travelnow.com' + hotel.thumbnailUrl;
    image.className = 'hotelThumbnail';
    div.appendChild(image);
    row2.appendChild(div);

    //hotel name, location, star rating and description//
    var div = document.createElement('div');
    div.className = 'col-6';
    var h3 = document.createElement('h3');
    h3.innerText = hotel.hotelName + ', ' + hotel.locationDescription;
    h3.classname = 'hotelName';
    var h4 = document.createElement('h4');
    img = document.createElement('img')
    var stars = '/images/' + Math.floor(hotel.starRating)  + '-stars.png';
    img.src = stars;
    img.className = "starRatings"
    // h4.innerText = 'Our star rating: ' + Math.floor(hotel.starRating)  + '/5';
    h4.classname = 'starRating';
    var p = document.createElement('p');
    p.innerText = hotel.description; 
    p.classname = 'hotelDescription';
    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(p);
    row2.appendChild(div);

    //book, guest rating and percentage recommended//
    var div = document.createElement('div');
    div.className = 'col-3 ratings';
    var h3 = document.createElement('h3');
    h3.innerText = 'book';
    var h1 = document.createElement('h1');
    h1.innerText = 'Guest rating  ' + hotel.guestRating + '/5';
    var h2 = document.createElement('h2');
    h2.innerText = 'Recommended  ' + hotel.percentRecommended + '%';
    div.appendChild(h3);
    div.appendChild(h1);
    div.appendChild(h2);
    row2.appendChild(div);
    row2.hidden = true

    outerHotelRow.appendChild(row);
    outerHotelRow.appendChild(row2);

    //onclick for hidden rows//
    outerHotelRow.onclick = function(){
    //add transition classes here
    console.log('OuterHotel Clicked...')
    if(row2.hidden === false){
        row2.hidden = true
    }else{
     row2.hidden = false 
 };
}
return outerHotelRow;
},

createFlightRow: function(result, subMasterParent){
    var flightRow = this.createRow();

    var row = document.createElement('div')
    row.className = "row flight";
        //outbound leg//
        //outbound carrier logo//
        var div = document.createElement('div');
        div.className = 'col-1';
        var image = document.createElement('img');
        image.src = 'images/plane.png'; //this is for carrier logo from API//
        image.className = 'planeIcon';
        div.appendChild(image);
        row.appendChild(div);
        flightRow.appendChild(row);

        //origin city//
        var div = document.createElement('div');
        div.className = 'col-2';
        var p = document.createElement('p');
        p.innerText = result.flightInfo.originCity;
        div.appendChild(p);
        row.appendChild(div);
        flightRow.appendChild(row);

        //arrow icon//
        var div = document.createElement('div');
        div.className = 'col-1';
        var image = document.createElement('img');
        image.src = 'images/arrow.png'; //this is for carrier logo from API//
        image.className = 'arrowIcon';
        div.appendChild(image);
        row.appendChild(div);
        flightRow.appendChild(row);

        //destination city//
        var div = document.createElement('div');
        div.className = 'col-2';
        var p = document.createElement('p');
        p.innerText = result.flightInfo.destinationCity;
        div.appendChild(p);
        row.appendChild(div);
        flightRow.appendChild(row);

        //inbound leg//
        //inbound carrier logo//
        var div = document.createElement('div');
        div.className = 'col-1';
        var image = document.createElement('img');
        image.src = 'images/plane.png'; //this is for carrier logo from API//
        image.className = 'planeIcon';
        div.appendChild(image);
        row.appendChild(div);
        flightRow.appendChild(row);

        //destination (origin) city//
        var div = document.createElement('div');
        div.className = 'col-2';
        var p = document.createElement('p');
        p.innerText = result.flightInfo.destinationCity;
        div.appendChild(p);
        row.appendChild(div);
        flightRow.appendChild(row);

        //arrow icon//
        var div = document.createElement('div');
        div.className = 'col-1';
        var image = document.createElement('img');
        image.src = 'images/arrow.png'; //this is for carrier logo from API//
        image.className = 'arrowIcon';
        div.appendChild(image);
        row.appendChild(div);
        flightRow.appendChild(row);

        //origin (destination) city//
        var div = document.createElement('div');
        div.className = 'col-2';
        var p = document.createElement('p');
        p.innerText = result.flightInfo.originCity;
        div.appendChild(p);
        row.appendChild(div);
        flightRow.appendChild(row);

        subMasterParent.appendChild(flightRow);
    },

    createHeader: function(result, subMasterParent){

     var row = document.createElement('div');
     row.className = "row destination";
     row.style.backgroundImage = "url('" + result.imageUrl + "')"
     var div = document.createElement('div');
     div.className = 'col-12';

     var headerText = document.createElement('div')
     headerText.className = 'destinationTitle'
     headerText.innerHTML = result.flightInfo.destinationCity;

       // var h1 = document.createElement('h1');
       // h1.innerText = result.flightInfo.destinationCity;
       // div.appendChild(h1);
       div.appendChild(headerText)
       row.appendChild(div);

       subMasterParent.appendChild(row)
   },

   createRow: function(){
    var row = document.createElement('div');
    row.className = "row";
    return row;
},

createCol: function(num){
    var col = document.createElement('div');
    col.className = "col-" + num;
    return col;
},

calculateDaystravelled: function(){
 var depDate = document.getElementById('searchStartDateInput')
 var retDate = document.getElementById('searchEndDateInput')
 var oneDay = 24*60*60*1000;
 var firstDate = new Date(depDate.value);
 var secondDate = new Date(retDate.value);
 var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)))
 return diffDays;
}

}

module.exports = ResultBoxes;