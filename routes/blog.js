var express = require('express');

var blog  = require('../controllers/blog');

module.exports = {
  configure: configure
};

function configure(app) {
  app.use('/blog', actions());
}

function actions() {
  var router = express.Router();
  router
     .get('/',            blog.getRoot );

  return router;
}

