var exec = require("child_process").exec;
const querystring = require('querystring');
fs = require("fs");
formidable = require("formidable");
var i = 0;

function start(response) {
    console.log("Request handler 'start' was called.");
    var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    '</head>' +
    '<body style="background-color: black; color: green; font-family: monospace; display: flex; align-items: center;">' +
    '<div class="neon">' + '<span class="text" data-text="FORMS">FORMS</span>' + '<span class="gradient"></span>' +
    '<span class="spotlight"></span>' + '</div>' +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post" style="margin-left: 60%; z-index: 1000; position: absolute;">' + 
    '<input type="file" name="upload" multiple="multiple"' +
    'style="background-color: black">' + '<br>' +
    '<input type="submit" value="Upload file" style="width: 200px;"/>' +
    '</form>' +
    '<style> .neon {position: relative;overflow: hidden;filter: brightness(200%);}' +
    '.text {background-color: black;color: white;font-size: 180px;font-weight: bold; font-family: sans-serif; text-transform: uppercase; position: relative; user-select: none;}' +
    '.text::before {content: attr(data-text);position: absolute;color: white;filter: blur(0.02em);mix-blend-mode: difference;}' +
    '.gradient {position: absolute;background: linear-gradient(45deg, red, gold, lightgreen, gold, red);top: 0;left: 0;right: 0;bottom: 0;mix-blend-mode: multiply;}' +
    '.spotlight {position: absolute;top: -100%;left: -100%;right: 0;bottom: 0;background: radial-gradient(circle,white,transparent 25%) center / 25% 25%,radial-gradient(circle,white,black 25%) center / 12.5% 12.5%;animation: light 5s linear infinite;mix-blend-mode: color-dodge;}' +
    '@keyframes light {to {transform: translate(50%, 50%);}}' + 
    '</body>' +
    '</html>'
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse...");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done!");
        fs.rename(files.upload.path, "/images/test" + i + ".png", function(error) {
            if (error) {
                i++;
                fs.rename(files.upload.path, "/images/test" + i + ".png")
            }
        })
    })
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write("<body style='background-color: black; color: green;'");
    response.write("<p>received image:</p><br/>");
    response.write("<img src='https://i.pinimg.com/originals/45/b2/04/45b2041f252b85b28cc35c08ab50b895.jpg' style='margin-left: 30%;'/>");
    response.write("</body>");
    response.end();
}

function show(response) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {"Content-Type": "images/png"});
    fs.createReadStream("images/sample.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;