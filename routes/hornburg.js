var express = require('express');

var hornburg  = require('../controllers/hornburg');
var formInput = require('../middleware/formInput');
var csrf = require('csurf')();

module.exports = {
  configure: configure
};

function configure(app) {
  app.use('/hornburg', actions());
}

function actions() {
  var router = express.Router();
  router
     .get('/register',            csrf, hornburg.getRegister )
    .post('/register', formInput, csrf, hornburg.postRegister )

     .get('/login',               csrf, hornburg.getLogin )
    .post('/login',    formInput, csrf, hornburg.postLogin )

    .get('/logout',                     hornburg.getLogout );

  return router;
}

