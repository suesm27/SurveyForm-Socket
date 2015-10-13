var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

app.get('/', function(request, response) {
  response.render('index');
})

var server = app.listen(8000, function() {
  console.log("listening on port 8000");
})
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	console.log(socket.id);
	socket.on("posting_form", function (data){
		console.log(data);
		var number = Math.floor((Math.random() * 1000) + 1);
		socket.emit('update_message', {
			name: data.name, 
			location: data.location,
			language: data.language,
			comment: data.comment,
		});
		socket.emit('random_number', {
			number: number
		});
	});

});
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
