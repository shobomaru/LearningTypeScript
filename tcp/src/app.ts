// Application code

import * as net from "net";

var conn = net.connect(12345, "localhost");

conn.on("connect", function() {
	console.log("[Connected]");
});
conn.on("error", function(e) {
	console.log("[Error]" + e);
	process.exit();
});

// Recv
conn.on("data", function(d) {
	console.log("[Receive]" + d);
});
// Close
conn.on("end", function() {
	console.log("[End]");
	conn.destroy();
	process.exit();
});

// Send
conn.write("spring\0");
conn.write("summer\0");
conn.write("fall\0");
conn.write("winter\0");
conn.write("quit\0");
// Flush
setTimeout(function() {
	conn.write("\n");
}, 2 * 1000);

setTimeout(function() {
	console.log("Error: Quit command failed.");
	conn.destroy();
	process.exit();
}, 8 * 1000);
