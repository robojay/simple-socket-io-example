var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var light = {state:false};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('User connected: ' + socket.id);
  socket.emit('light', light);
  socket.on('disconnect', function(){
    console.log('User disconnected: ' + socket.id);
  });
  socket.on('toggle', function(state) {
    light.state = !light.state;
    console.log('id: ' + socket.id + ' light: ' + light.state);
    io.sockets.emit('light', light);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

