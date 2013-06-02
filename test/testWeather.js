var weather = require('../weather.js');
var http = require('http');

var response = http.OutgoingMessage.prototype
response.writeHead = function (num, string) {
	console.log(string);
}
response.write = function(obj) {
	console.log(obj);
}
response.end = function() {}

weather.interpret('07310', new http.OutgoingMessage());