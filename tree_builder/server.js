var fs = require('fs');
var express = require('express');
var app = express();


app.use(express.static('src'));

app.get('/data', function (req, res) {

	var data = fs.readFileSync( "./data.json", "utf8" );

	res.send( JSON.stringify(data) );
});

app.listen(8080, function () {

	console.log( "Example app listening at http://localhost:8080/" );
});