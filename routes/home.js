var express = require('express');

var home         = require('../controllers/home');
var requireLogin = require('../middleware/requireLogin');

module.exports = {
  configure: configure
};

function configure(app) {
  app.use('/', actions());
}

function actions() {
  var router = express.Router();
  router
    .get('/',                        home.getRoot)
    .get('/dashboard', requireLogin, home.getDashboard);

  return router;
}
