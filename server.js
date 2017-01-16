
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 9998});
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    var data = {};
    data.command = 'fadeIn';
    data.target = 'bg_dyyd';
    ws.send(JSON.stringify(data));
});
