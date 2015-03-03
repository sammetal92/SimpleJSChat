var http = require('http');
var fs = require('fs');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);

function handler(req, res)
{
	fs.readFile(__dirname + '/index.html', function(err, data)
		{
			res.writeHead(200);
			res.end(data);
		});
}

app.listen(3000);
console.log("Listening on port 3000");

io.sockets.on('connection', function(socket)
	{
		socket.send('hi from server');
		socket.on('message', function(data)
			{
				console.log(data);
			});
		socket.broadcast.emit('user-joined', {msg: "Joined!"});
		socket.on('send-msg', function(data)
			{
				socket.broadcast.emit('chat-msg', data);
			});
	});