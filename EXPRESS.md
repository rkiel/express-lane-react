# Basics

## app.js

    var express = require('express');
    var app = express();

    // your app goes here

    module.exports = app;

## bin/www

    #!/usr/bin/env node

    var app = require('./../app');
    var port = process.env.PORT || 3000;
    app.listen(port, function() {
      console.log('Listenting on port '+port);
    });

* Express extends Node HTTP objects

# package.json

    "scripts" : {
      "pretest"  : "./node_modules/jshint/bin/jshint ./**/*.js",
      "test"     : "                               mocha -R spec --check-leaks --recursive --bail",
      "autotest" : "nodemon node_modules/mocha/bin/mocha -R spec --check-leaks --recursive --bail"
    }

# Routes

## static - get, post, put, delete

    app.get('/blocks', function(req, res) { });

## dynamic - get, post, put, delete

    app.param('name', function(req, res, next) {
      request.newName = request.params.name.toLowerCase();
      next();
    });

    app.get('/blocks/:name', function(req, res) {
      request.params.name // string - set by router
      request.newName     // string - set by app.param
    });

## with middleware

    app.post('/blocks', parseUrlencoded, function(req, res) { });

## route instances

    app.route('/block')
      .get(function(req,res) { })
      .post(parseUrlencoded, function(req,res) { });
    app.route('/block/:name')
      .get(function(req,res) { })
      .delete(function(req,res) { });

## mounting routes - all, get, post, put, delete

    var blocks = require('./routes/blocks');
    app.use('/blocks', blocks);

    var express = require('express');
    var router = express.Router();
    router.route('/')
      .get(function(req,res,next) { })
      .post(parseUrlencoded, function(req,res,next) { });
    router.route('/:name')
      .all(function(req,res,next) { })
      .get(function(req,res,next) { })
      .delete(function(req,res,next) { });
    module.exports = router;

## request

    app.VERB(pattern, function(request, response) {
      request.url    // property
      request.method // property

      request.query  // object - query strings follow the path

      request.params // object - named route parameters

      request.body   // object - form data from body-parser
    });


## response

    app.VERB(pattern, function(request, response) {
      response.write('hello world');         // Node - inherited
      response.end();                        // Node - inherited

      response.send('hello world');          // Express - strings are not coverted; text/html
      response.send(['one','two','three']);  // Express - converts object/array to json
      response.json(['one','two','three']);  // Express - converts object/array to json

      response.redirect(path);      // temporary - status code 302
      response.redirect(301, path); // permanent - status code 301

      response.status(404);                                  // step 1 - not found
      response.json('description of not found');             // step 2 - send the body
      response.status(404).json('description of not found'); // can be chained
      response.status(201).json('newly created');            // can be chained
      response.sendStatus(200);                              // response body to OK

      resonse.sendFile(__dirname + "/public/index.html");


      response.on('finish', function() {
        // invoked when response has handed off to the OS
      });
    });

* response object is an EventEmitter
* default response code for `send()`, and `json()` is 200
* default response code for `redirect()` is 302

# Middleware

    app.use(function(req, res, next) {
      next();       // must be called to move forward

      res.action(); // stops moving forward
      next();       // will cause errors
    });

* Functions executed sequentially that access request & response
* Executed before route is invoked
* Morgan is an Express middleware for logging

## static pages

    app.use(express.static('public'));  // only middleware shipping with Express

## form data

    var bodyParser = require('body-parser');
    var parseUrlencoded = bodyParser.urlencoded({ extended: false});

# Views

    app.set('views',       path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

# Miscellaneous

    Object.keys(blocks);  // returns an array of object keys

    Etag - entity tag (hash of the response body)  304 response code
    If-None-Match - client sends hash with request

# curl

    curl    http://localhost:3000
    curl -i http://localhost:3000
    curl -I http://localhost:3000

    curl -i http://localhost:3000/blocks
    curl -i http://localhost:3000/blocks?limit=1

