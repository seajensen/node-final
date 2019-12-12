function route(handle, path, response, request) {
    console.log("Route a request for " + path);
    if (typeof handle[path] === 'function') {
        handle[path](response, request);
    } else {
        console.log("No handler for " + path);
        response.writeHead(404, {"Content-type":"text/html"});
        response.write("404 Not found");
        response.end();
    }
}
exports.route = route;