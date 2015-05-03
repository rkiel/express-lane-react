var express = require('express');

var user         = require('../controllers/user');
var requireLogin = require('../middleware/requireLogin');
var formInput    = require('../middleware/formInput');
var csrf         = require('csurf')();

module.exports = {
  configure: configure
};

function configure(app) {
  app.use('/user', actions());
}

function actions() {
  var router = express.Router();
  router
     .get('/password', requireLogin,            csrf, user.getPassword)
    .post('/password', requireLogin, formInput, csrf, user.postPassword);

  return router;
}
