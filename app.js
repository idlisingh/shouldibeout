var Client = require('node-rest-client').Client;
var fs   = require('fs');
var express = require('express');

var rest = new Client();
var app = express();

API_KEY =  process.env.WEATHER_KEY

URL='http://api.worldweatheronline.com/free/v1/weather.ashx?&format=json'
API_PARAM='&key=' + API_KEY;
ZIPCODE_PARAM='&q=' 

app.configure(function() {
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use("/public", express.static(__dirname + '/public'));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.get('/', function(req, res) {
	var reqIp = req.connection.remoteAddress;
	res.writeHead(200, {'Content-Type': 'text/html'});
	var rs = fs.readFileSync(__dirname + '/public/views/index.html').toString();
	res.write(rs);
	res.end();
});

app.post('/weather', function(req, res) {
	var zipCode = req.body.zipCode;

	QUERY = URL + API_PARAM + ZIPCODE_PARAM + zipCode;
	console.log(QUERY);
	rest.get(QUERY, function(data, response) {
		data = JSON.parse(data);
		var error = data['data']['error'];
		console.log(data);
		console.log("******")
		console.log(error + " - " + (typeof error))
		var returnValue = {};
		if (error == undefined) {
			var temp = data['data']['current_condition'][0]['temp_C'];
			console.log(temp);
			var text = (temp > 18 && temp < 25) ? "Hell Yeah!! Go Out right now" : "Nope. Stay in and read a book.";
			returnValue = {temp: temp, should: text};
		} else {
			returnValue = {temp: "n/a", should: "Error occured"}
			console.log("Error occured");
		}
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(JSON.stringify(returnValue));
		res.end();
	});
});

var port = process.env.PORT || 5000;
console.log('Listening on port: ' + port);
app.listen(port);