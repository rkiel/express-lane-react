var mongoose = require('mongoose');
var User     = require('../models/user');

var winston = require('winston');

module.exports = {
  configure: configure
};

function configure(app) {
  var uri;

  if (process.env.MONGOLAB_URI) {
    uri = process.env.MONGOLAB_URI;
  } else {
    var database = 'take-action';
    var hostname = '192.168.33.30';
    uri = 'mongodb://'+hostname+'/'+database;
  }

  winston.info('  URI', uri);

  mongoose.connect(uri, function(err) {
    if (err) { throw err; }

    winston.info('connected to MongoDB '+uri);
  });

  User.defineSchema();
}

