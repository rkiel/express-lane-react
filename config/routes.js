var r = require('ramda');
var winston = require('winston');

module.exports = {
  configure: configure
};

function configure(app) {

  var loadRoutesFor = r.forEach(function(x) {
    winston.info('  adding routes for', x);
    require('./../routes/'+x).configure(app);
  });

  loadRoutesFor([
    'home',
    'hornburg',
    'about',
    'blog',
    'user',
    'errors'  // last
  ]);

}
