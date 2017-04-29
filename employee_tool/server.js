var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var id = 0;
var users = [];


app.use( express.static('src') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true })); 


app.get('/employees', function (req, res) {

	res.send( JSON.stringify(users) );
});

app.post('/employees', function (req, res) {

	var newUser = {
		"id": id++,
		"name": req.body.name,
		"role": req.body.role,
		"salary": req.body.salary
	};

	users.push( newUser );

	console.log( "> User added:   " + JSON.stringify(newUser) );

	res.send( JSON.stringify(users) );
});

app.delete('/employees/:id', function (req, res) {

	var deleteAt = -1;

	for ( var i in users ) {

		if ( users[i].id == req.params.id ) {

			deleteAt = i;
			break;
		}
	}

	if ( deleteAt > -1 ) {

		var deletedUser = users.splice( deleteAt, 1 );

		console.log( "> User deleted: " + JSON.stringify(deletedUser) );
	
	} else {

		console.log( "> User with id (" + req.params.id + ") not found " );
	}

	

	res.send( JSON.stringify(users) );
});

http.listen(8080, function () {

	console.log( "Example app listening at http://localhost:8080/\n" );
});

