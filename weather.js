var Client = require('node-rest-client').Client;


var rest = new Client();

API_KEY =  process.env.WEATHER_KEY

URL='http://api.worldweatheronline.com/free/v1/weather.ashx?&format=json'
API_PARAM='&key=' + API_KEY;
ZIPCODE_PARAM='&q=' 

function interpret(zipCode, res) {
	QUERY = URL + API_PARAM + ZIPCODE_PARAM + zipCode;

	rest.get(QUERY, function(data, response) {
		data = JSON.parse(data);
		var error = data['data']['error'];
		var weatherData = data['data']
		var returnValue = {};
		if (error == undefined) {	//	No Error found
			parseWeatherData(weatherData, res);
		} else {
			returnValue = {temperature: "n/a", should: "Error occured", city: "Could not determine!!"};
			writeResponse(returnValue, res)
		}
	});
}

function parseWeatherData(data, res) {
	var temperature = data['current_condition'][0]['temp_C'];
	var text = (temperature > 18 && temperature < 30) ? "Go Out right now" : "Nope. Stay in and read a book.";
	var weatherQuery = data['request'][0];
	var queryParam = weatherQuery['query'];

	if (weatherQuery['type'] == 'Zipcode') {
		rest.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + queryParam + '&sensor=true', function(data, response) {
			data = JSON.parse(data);
			console.log
			city = data['results'][0]['address_components'][1]['long_name'];
			country = data['results'][0]['address_components'][3]['long_name'];
			location = city + ', ' + country;
			console.log(location)
			var returnValue = createResponseWithCity(location, temperature, text);
			writeResponse(returnValue, res);
		});
	} else if (weatherQuery['type'] == 'City'){
		location = queryParam;
		console.log(location)
		var returnValue = createResponseWithCity(location, temperature, text);
		writeResponse(returnValue, res);
	} else {
		console.log('error');
	}
}

function createResponseWithCity(city, temperature, text) {
	return {temperature: temperature, should: text, city: city};
}

function writeResponse(returnValue, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write(JSON.stringify(returnValue));
	res.end();
}

exports.interpret = interpret;