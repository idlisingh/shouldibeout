var fs   = require('fs');
var express = require('express');
var app = express();
var weather = require('./weather.js');

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
	res.writeHead(200, {'Content-Type': 'text/html'});
	var rs = fs.readFileSync(__dirname + '/public/views/index.html').toString();
	res.write(rs);
	res.end();
});

app.post('/weather', function(req, res) {
	var zipCode = req.body.zipCode;
	weather.interpret(zipCode, res);
});

var port = process.env.PORT || 5000;
console.log('Listening on port: ' + port);
app.listen(port);
