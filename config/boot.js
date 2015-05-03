var r = require('ramda');
var winston = require('winston');

module.exports = {
  configure: configure
};

function configure(app) {

  loadAndConfigure(app, 'logging');

  var configureModules = r.forEach(function(name) {
    winston.info('configuring', name);
    loadAndConfigure(app, name);
  });

  configureModules([
    'views',
    'favicon',
    'mongodb',
    'session',
    'static',
    'routes'
  ]);
}

function loadAndConfigure(app,name) {
  var m = require('./'+name);
  m.configure(app);
}
