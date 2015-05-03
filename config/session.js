var session = require('client-sessions');
var userFromSession = require('../middleware/userFromSession');
var winston = require('winston');

var sessionType   = process.env.SESSION_TYPE || 'cookie';
var cookieSession = (sessionType === 'cookie');
var tokenSession  = (sessionType === 'token');

var cookieSecret  = process.env.COOKIE_SECRET || 'And-The-Meek-Shall-Inherit-The-Earth-2112';

module.exports = {
  configure: configure
};

function configure(app) {

  winston.info('  session type', sessionType);

  var params = {
    cookieName:     'session', // i.e.  req.session
    secret:         cookieSecret,
    duration:       30 * 60 * 1000,  // auto delete after Xms; (i.e. 30 min)
    activeDuration:  5 * 60 * 1000,  // extend session while active (i.e. 5 min)
    httpOnly:       true, // don't let JS code access cookies 
  // secure:         true, // only set cookies over https
    ephemeral:      true  // destroy cookies when browser closes
  };

  winston.info('  duration      ', params.duration);
  winston.info('  activeDuration', params.activeDuration);
  winston.info('  httpOnly      ', params.httpOnly);
  winston.warn('  secure        ', params.secure);
  winston.info('  ephemeral     ', params.ephemeral);

  app.use(session(params));

  if (cookieSession) {
    app.use(userFromSession);
  }

}

