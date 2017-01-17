function initWebSocket() {
var ws = new WebSocket("ws://localhost:9998/planssi");
ws.onopen = function() {
	console.log("WebSocket open.");
	ws.send("planssi ui online");
};

ws.onmessage = function(event) {
	var receivedMsg = event.data;
	var data = JSON.parse(event.data);
	if (data.command) {
		if (data.command === "fadeIn") {
			if (data.target) fadeIn(data.target);
		} else if (data.command === "fadeOut") {
			if (data.target) fadeOut(data.target);
		} else if (data.command === "setText") {
			if (data.target) setText(data.target, data.params);
		}
	}
	console.dir(event.data);
}

ws.onclose = function() {
	console.log("WebSocket closed.");
	initWebSocket();
}
}
