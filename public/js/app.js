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

})


function initAutocomplete() {
     autocompleteStart = new google.maps.places.Autocomplete((document.getElementById('start')), options);
     autocompleteEnd = new google.maps.places.Autocomplete((document.getElementById('end')), options);
}