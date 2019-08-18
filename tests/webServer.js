#!/usr/bin/env node

const http = require("http");
const port = 8684;

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Hello World!");
    res.end();
  })
  .listen(port);

process.send({ port });
