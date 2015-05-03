var express = require('express');
var path = require('path');
var winston = require('winston');

module.exports = {
  configure: configure
};

function configure(app) {
  var staticPath = path.join(__dirname, '..', 'public');

  winston.info('  path', staticPath);
  app.use(express.static(staticPath));
}

