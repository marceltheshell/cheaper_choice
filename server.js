// REQUIREMENTS //
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var views = path.join(process.cwd(), "views/");

// CONFIG //
// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES //

app.get('/', function (req, res) {
	var indexPath = path.join(views, "index.html");
	res.sendFile(indexPath);
});


app.listen(3000, function () {
	console.log("the magic is happening on 3000");
});