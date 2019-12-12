var http = require("http");
var url = require("url");

function start(route, handle) {
function onRequest(request, response) {
    var postData = "";
    var path = url.parse(request.url).pathname;
    console.log("Request for " + path + " received.");
    route(handle, path, response, request);

}
http.createServer(onRequest).listen(8888);
console.log("Server has started.");
}

/*
var exec = require("child_process").exec;
function start() {
    console.log("Handler 'start' was called.");
    var content = "empty";
    exec("ls -lah", function (error, stdout,
            stderr) {
        content = stdout;
    });
    return content;
}
*/



exports.start = start;