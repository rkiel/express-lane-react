var favicon = require('serve-favicon');
var winston = require('winston');

module.exports = {
  configure: configure
};

function configure(app) {
  winston.warn('  skipping');
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
}
