// REQUIREMENTS //
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var views = path.join(process.cwd(), "views/");
require('dotenv').config();
var uberServerToken = process.env.API_UBER
Uber = require('uber-api')({server_token: uberServerToken, version:'v1'});

// CONFIG //
// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES //

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.post('/uberPrice', function(req, res) {
	var coordinates = req.body;
	var options = {
				sLat:coordinates.coordinates.lat1,
				sLng:coordinates.coordinates.lng1,
				eLat:coordinates.coordinates.lat2,
				eLng:coordinates.coordinates.lng2
				};
	
	Uber.getPriceEstimate(options , function (error, response) {
		if (error) {
			console.log("the error is ", error);
		} else {
			res.send(response);
		}

    });
});


app.listen(process.env.PORT || 3000, function () {
	console.log("the magic is happening on 3000");
});