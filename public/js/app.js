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
