var User = require('../models/user');

module.exports = userFromSession;

function userFromSession(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne(req.session.user, function(err, user) {
      if (user) {
        user.hash = null;
        req.user         = user;
        req.session.user = user;
        res.locals.user  = user;
      }
      next();
    });
  } else {
    next();
  }
}
