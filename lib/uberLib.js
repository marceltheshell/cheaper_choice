var uberGetRequest = function {
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
}


module.exports = uberGetRequest;

