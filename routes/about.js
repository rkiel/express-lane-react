var express = require('express');

var about  = require('../controllers/about');

module.exports = {
  configure: configure
};

function configure(app) {
  app.use('/about', actions());
}

function actions() {
  var router = express.Router();
  router
     .get('/us',            about.getAboutUs )
     .get('/contact',       about.getContactUs );

  return router;
}

