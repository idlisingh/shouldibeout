var Client = require('node-rest-client').Client;


var rest = new Client();

API_KEY =  process.env.WEATHER_KEY

URL='http://api.worldweatheronline.com/free/v1/weather.ashx?&format=json'
API_PARAM='&key=' + API_KEY;
ZIPCODE_PARAM='&q=' 

function interpret(zipCode, res) {
	QUERY = URL + API_PARAM + ZIPCODE_PARAM + zipCode;
	console.log(QUERY);
	rest.get(QUERY, function(data, response) {
		data = JSON.parse(data);
		var error = data['data']['error'];
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
}

exports.interpret = interpret;