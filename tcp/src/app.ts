"use strict";

// Application code

import * as net from "net";

var conn = net.connect(12345, "127.0.0.1");

conn.on("connect", function() {
	console.log("[Connected]");
});
conn.on("error", function(e) {
	console.log("[Error]" + e);
	process.exit();
});

// Recv
var recv: string;
conn.on("data", function(d: Buffer) {
	recv = d.toString("utf8");
	console.log("[Receive]" + d);
});
// Close
conn.on("end", function() {
	console.log("[End]");
	conn.destroy();
	process.exit();
});

var promise = new Promise((resolve: () => void, reject: () => void) => {
	resolve();
});

// Send
/*promise.then(() => {
	conn.write("spring\0");
	conn.write("\n");
});*/

var connId = setInterval(() => {
	if (recv == null)
		return;
	var msgs = recv.split("\n");
	if (msgs.length == 0)
		throw "Error: Unknown token.";
	var msg = msgs[0];
	switch (msg)
	{
		case "Hello":
			conn.write("spring\0\n");
			break;
		case "Akebono":
			conn.write("summer\0\n");
			break;
		case "Yoru":
			conn.write("fall\0\n");
			break;
		case "Yuugure":
			conn.write("winter\0\n");
			break;
		case "Tsutomete":
			conn.write("quit\0\n");
			break;
		case "Quit":
			clearInterval(connId);
			conn.destroy();
			process.exit();
			break;
		default:
			console.log("Unknown token.");
			break;
	}
	recv = null;
}, 500);

setTimeout(function() {
	console.log("Error: Quit command failed.");
	clearInterval(connId);
	conn.destroy();
	process.exit();
}, 60 * 1000);
