const router = require('./router');
// Problem: we need a simple way to at user's badge count and JavaScript points from a web browser
// Solution: Use Node.js perform the profile look ups and server out template via HTTP

const http = require('http');
const port = 3000;

http.createServer(function (req, res) {
    router.home(req, res);
    router.user(req, res);
}).listen(port);

console.log(`Server running on port ${port}`);

// 4. Function that handles the reading of files and merge in value