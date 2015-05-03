var password = require('../models/passwordBcrypt');
var User = require('../models/user');

module.exports = {
  getPassword:  getPassword,
  postPassword: postPassword,
};

function render(res, template, params) {
  res.render('user/'+template, params);
}

function renderParams(req,err) {
  var params = {};
  if (req) { params.csrfToken = req.csrfToken();  }
  if (err) {
    if (err.message) {
      params.error     = err.message;
    } else {
      params.success   = err;
    }
  }
  return params;
}

function getPassword(req, res, next) {
  var params = renderParams(req);
  params.title = 'Change Password';
  render(res, 'password', params);
}

function postPassword(req, res, next) {
  var user = req.session.user;
  password.compare(req.body.currentPassword, user.hash, function(err, same) {
    if (err) {
      render(res, 'password', renderParams(req,err));
    } else if (same) {
      if (req.body.newPassword === req.body.confirmPassword) {
        password.encrypt(req.body.newPassword, function(err, hash) {
          if (err) { return render(res,'password', renderParams(req,err)); }
          User.updateOne(user, {$set: {hash: hash}}, function(err, count) {
            if (err) { return render(res,'password', renderParams(req,err)); }
            if (count === 1) {
              render(res, 'password', renderParams(req,'Password was successfully changed'));
            } else {
              render(res, 'password', renderParams(req,{message: 'Unable to change password'}));
            }
          });
        });
      } else {
        render(res, 'password', renderParams(req,{message: 'New password does not match confirmation'}));
      }
    } else {
      render(res, 'password', renderParams(req,{message: 'Incorrect password'}));
    }
  });
}
