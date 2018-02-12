// function route(handle, pathname, response, request) {
//     console.log("About to route a request for " + pathname);
//     if (typeof handle[pathname] === 'function') {
//         handle[pathname](response, request);
//     } else {
//         console.log("No request handler found for " + pathname);
//         response.writeHead(404, { "Content-Type": "text/html, utf-8" });
//         response.write("404 Not found");
//         response.end();
//     }
// }

// exports.route = route;

var http = require('http');
var url = require('url');
var router = require('./other')

http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    if (request.url !== '/favicon.ico') {
        var pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, '');
        console.log(pathname)
        router[pathname](request, response);
        response.end('');
    }
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
