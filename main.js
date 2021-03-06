/*global require */

var http = require("http");
var fs = require("fs");
var path = require("path");

var realsimpleserver = module.exports = {
	
	spinUp: function (port) {
		if (typeof (port) === "undefined") {
			port = 8125;
		}
		http.createServer(function (request, response) {
			if (request.url === "/") {
				request.url = "/index.html";
			}
			var filePath = "." + request.url,
				fileExt = path.extname(filePath),
				contentType;

			if (fileExt === ".js") {
				contentType = "text/javascript";
			} else if (fileExt === ".css") {
				contentType = "text/css";
			} else {
				contentType = "text/html";
			}

			path.exists(filePath, function (exists) {
				if (exists) {
					fs.readFile(filePath, function (error, content) {
						if (error) {
							response.writeHead(500);
							response.end();
						} else {
							response.writeHead(200, { "Content-Type": contentType });
							response.end(content, "utf-8");
						}
					});
				} else {
					response.writeHead(404);
					response.end();
				}
			});
		}).listen(port);
	}
	
};