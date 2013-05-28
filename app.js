var restify = require('restify');

var client = restify.createJsonClient({url: 'http://reddit.com' });

client.get('/r/technology', function(err, req, res, obj) {
	console.log(err);
	console.log(JSON.stringify(obj, null, 2));
});
