
module.exports = requireLogin;

function requireLogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/hornburg/login');
  }
}
