var path = require('path');
var winston = require('winston');

module.exports = {
  configure: configure
};

function configure(app) {

  var viewPath   = path.join(__dirname, '..', 'views');
  var viewEngine = 'jade';

  winston.info('  view path  ', viewPath);
  winston.info('  view engine', viewEngine);

  // view engine setup
  app.set('views',       viewPath);
  app.set('view engine', viewEngine);

}
