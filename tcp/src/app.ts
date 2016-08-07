// Application code

import * as net from "net";

var conn = net.connect(12345, "localhost");

conn.on("error", function(e) {
	console.log("[Error]" + e + "\n");
	conn.destroy();
	process.exit();
})

conn.on("connect", function() {
	console.log("[Connected]\n");
})

setTimeout(function() {
	conn.destroy();
	process.exit();
}, 4 * 1000);
