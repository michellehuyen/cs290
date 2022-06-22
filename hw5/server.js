/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Michelle Nguyen
 * Email: nguyemi4@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var postData = require('./postData.json');
const { nextTick } = require('process');
console.log("postData:", postData)

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).render('index', {
    nPosts: true,
    posts: postData
  });
});

app.get('/posts/:index', function (req, res, next) {
  var idx = parseInt(req.params.index)

  if(idx >= 0 && idx < postData.length) {
    var pData = postData[idx]
    res.status(200).render('index', {
      nPosts: false,
      posts: [pData]
    })
  }
  else {
    next()
  }
})

app.get('*', function (req, res) {
  console.log("404!")
  res.status(404).render('404', {
    path: req.url
  })
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});