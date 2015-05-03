var dateFormat = require('dateformat');

var winston = require('winston');

module.exports = {
  configure: configure
};

function configure(app) {
  winston.remove(winston.transports.Console);

  var options = {
    colorize: true,
    timestamp: timestamp
  };
  winston.add(winston.transports.Console, options);
}

function timestamp() {
  var now = new Date();
  return dateFormat(now,'yyyy-mm-dd HH:MM:ss',true);
}
