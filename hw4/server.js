/*
 * Write your server code in this file.
 *
 * name: Michelle Nguyen
 * email: nguyemi4@oregonstate.edu
 */

var http = require('http')
var fs = require('fs')

var PORT = 3000
if (process.env.PORT != '') {
    PORT = parseInt(process.env.PORT)
}

var server = http.createServer(function(req, res) {
    console.log("Request received.")
    console.log("url: ", req.url)

    res.statusCode = 200

    if (req.url == '/' || req.url == '/index.html') {
        res.setHeader('Content-Type', 'text/html')
        var synchronousContents = fs.readFileSync('public/index.html', 'utf8', function (err, contents) {
            if (!err) {
                console.log("File contents:", contents)
            }
            else {
                return console.log(err)
            }
        })
    }

    else if (req.url == '/index.js') {
        res.setHeader('Content-Type', 'application/javascript')
        var synchronousContents = fs.readFileSync('public/index.js', 'utf8', function (err, contents) {
            if (!err) {
                console.log("File contents:", contents)
            }
            else {
                return console.log(err)
            }
        })
    }

    else if (req.url == '/style.css') {
        res.setHeader('Content-Type', 'text/css')
        var synchronousContents = fs.readFileSync('public/style.css', 'utf8', function (err, contents) {
            if (!err) {
                console.log("File contents:", contents)
            }
            else {
                return console.log(err)
            }
        })
    }

    else if (req.url == '/404.html') {
        res.setHeader('Content-Type', 'text/html')
        var synchronousContents = fs.readFileSync('public/404.html', 'utf8', function (err, contents) {
            if (!err) {
                console.log("File contents:", contents)
            }
            else {
                return console.log(err)
            }
        })
    }

    else if (req.url == '/benny.jpg') {
        res.setHeader('Content-Type', 'image/jpeg')
        var synchronousContents = fs.readFileSync('public/benny.jpg', function (err, contents) {
            if (!err) {
                console.log("File contents:", contents)
            }
            else {
                return console.log(err)
            }
        })
    }

    else {
        res.statusCode = 404
        var synchronousContents = fs.readFileSync('public/404.html', 'utf8', function (err, contents) {
            if (!err) {
                console.log("File contents:", contents)
            }
            else {
                return console.log(err)
            }
        })
    }
    console.log("Synchronous file contents:", synchronousContents)
    res.write(synchronousContents)
    res.end()
})

server.listen(3001, function() {
    console.log("Server is listening on port 3001.")
})