var formattedOriginLtLg,
formattedDestinLtLg,
directionsDisplay,
map,
options,
address,
origin,
destination

$('document').ready(function() {
	initAutocomplete();
	$('form.findPrice').on('submit',function(e){
        e.preventDefault();
        address = $(this).serializeArray();
        origin = address[0].value;
        destination = address[1].value;
        mapCoordinates(origin, destination);
    });
    $(function(){
      $(".element").typed({
        strings: ["Enter your start and end address for an Uber price estimate"],
        typeSpeed: 0
      });
  });
})


function initAutocomplete() {
     autocompleteStart = new google.maps.places.Autocomplete((document.getElementById('start')), options);
     autocompleteEnd = new google.maps.places.Autocomplete((document.getElementById('end')), options);
}

function mapCoordinates(addressOne, addressTwo){
    var startAddress = addressOne.replace(/\s|,/g,"+");
    var endAddress = addressTwo.replace(/\s|,/g,"+");
    
    $.when(
        $.get("https://maps.googleapis.com/maps/api/geocode/json?", {"address" : startAddress}, function(data){
          var originLtLg = data.results[0].geometry.location;
        }),

        $.get("https://maps.googleapis.com/maps/api/geocode/json?", {"address" : endAddress}, function(data){
          var destinLtLg = data.results[0].geometry.location;
        })

    ).done(function(originLtLg, destinLtLg){    
        formattedOriginLtLg = originLtLg[0].results[0].geometry.location
        formattedDestinLtLg = destinLtLg[0].results[0].geometry.location
        renderGoogleMap(formattedOriginLtLg, formattedDestinLtLg);
        getRidePrices(formattedOriginLtLg, formattedDestinLtLg);

    }).fail(function() {
        console.log("oops, something went wrong while getting directions");

    });
}


function renderGoogleMap(originCoord, destinCoord) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    
    $('#map').animate({'height':'384px'},2000, function(){    
        map = new google.maps.Map(document.getElementById("map"),{
            center:
              originCoord,
              destinCoord,
              zoom:13,
              zoomControl: false,
              scaleControl: false,
              scrollwheel: false,
              disableDoubleClickZoom: true
        });
        directionsDisplay.setMap(map);
    });
   
    var request = {
      origin:originCoord,
      destination:destinCoord,
      travelMode: google.maps.TravelMode.DRIVING   
    };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

function getRidePrices(origin, destination){
    var coordinates = {};
    coordinates.lat1 = origin.lat;
    coordinates.lng1 = origin.lng;
    coordinates.lat2 = destination.lat;
    coordinates.lng2 = destination.lng;
    $.post('/uberPrice', {coordinates: coordinates}, function(data){
        var rides = data.prices;
        $.each( rides, function( i, ride ) {
            var newListItem = ("<tr><td>" + ride.display_name + "</td><td>" + ride.estimate + "</td></tr>");
            $( "#estimates" ).append( newListItem );
        });

    });
};
