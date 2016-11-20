"use strict";

import * as http from "http";
import * as io from "socket.io";

function main() {
	let sv = http.createServer((req, res) => {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("It works.");
	});
	sv.listen(8080);
	let si = io.listen(sv);
	si.sockets.on("connection", (socket) => {
		socket.on("message", (data) => {
			si.sockets.emit("message", "Message: <b>" + data.value + "</b>");
		});
	});
}

main();
