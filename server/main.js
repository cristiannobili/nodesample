const http = require('http');
const port = 8081;
http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello world!\n');
    response.end();
}).listen(port);

console.log('Web server running at port ' + port);