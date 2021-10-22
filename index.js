const http = require('http');

http.createServer( (req, res) => {
console.log(req.url)
res.end('alguito')
}).listen(8000)