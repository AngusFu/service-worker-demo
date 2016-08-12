#!/usr/bin/env node
var path = require('path');
var http = require('http');
var url = require('url');
var fs = require('fs');

// http.createServer(function(req, res) {
//     console.log('server running on port ' + argv.port);
// }).listen(argv.port);

var argv = require('yargs')
            .command('server <dir> [port]', 'simple demo server')
            .help()
            .alias('p', 'port')
            .alias('d', 'dir')
            .default('p', 80)
            .demand('d')
            .argv;

var port = argv.port,
    cwd  = process.cwd(),
    dir  = path.join(cwd, argv.dir);


http.createServer(function(req, res) {
    var filepath = path.join(dir, url.parse(req.url).pathname);

    // TODO
    // `/ =>index` 的判断
    // MIME-type 判断
    fs.stat(filepath, function(err, stat) {
        if (err)  {
            res.writeHead(404);
        } else {
            fs.createReadStream(filepath).pipe(res);
        }
    });
}).listen(port);

console.log('server running on port ' + port);


