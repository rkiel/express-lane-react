var User = require('../models/user');
var password = require('../models/passwordBcrypt');
var tokenizer = require('../models/tokenizer');

var sessionType   = process.env.SESSION_TYPE || 'cookie';
var cookieSession = (sessionType === 'cookie');
var tokenSession  = (sessionType === 'token');

var redirectRoot  = process.env.REDIRECT_ROOT || '/dashboard';

module.exports = {
  getRegister:  getRegister,
  postRegister: postRegister,

  getLogin:     getLogin,
  postLogin:    postLogin,

  getLogout:    getLogout,

  establishSession: establishSession,
  cancelSession:    cancelSession,
  redirectURL:      redirectURL
};

function render(res, template, params) {
  res.render('hornburg/'+template, params);
}

function renderParams(req,err) {
  var params = {};
  if (req) { params.csrfToken = req.csrfToken();  }
  if (err) { params.error     = err.message; }
  return params;
}

function getRegister(req, res, next) {
  var params = renderParams(req);
  params.title = 'Register';
  render(res, 'register', params);
}

function postRegister(req, res, next) {
  if (req.body.password === req.body.confirmPassword) {
    password.encrypt(req.body.password, function(err, hash) {
      if (err) { return render(res,'register', renderParams(req,err)); }

      var params = {
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        email:     req.body.email,
        hash:      hash
      };
      User.create(params, function(err, user) {
        if (err) {
          var message;
          if (err.code === 11000) {
            message = 'That email address is already taken.  Please try again.';
          } else {
            message = 'Something bad happend.  Please try again.';
          }
          render(res, 'register', renderParams(req,{message: message}));
        } else {
          if (cookieSession) {
            establishSession(req,user);
          }
          res.redirect(redirectURL(user));
        }
      });
    });
  } else {
    render(res, 'register', renderParams(req,{message: 'Password does not match confirmation'}));
  }
}

function getLogin(req,res,next) {
  var params = renderParams(req);
  params.title = 'Login';
  render(res, 'login', params);
}

function postLogin(req,res,next) {
  var email = req.body.email.trim().toLowerCase();
  var user = {email: email};
  User.findOne(user, function(err,user) {
    if (err) {
      console.log(err.message);
      return res.redirect('/');
    }

    password.compare(req.body.password, user.hash, function(err, same) {
      if (err) {
        render(res, 'login', renderParams(req,err));
      } else if (same) {
        if (cookieSession) {
          establishSession(req, user);
        }
        res.redirect(redirectURL(user));
      } else {
        render(res, 'login', renderParams(req,{message: 'Incorrect email/password'}));
      }
    });
  });
}

function redirectURL(user) {
  var url = redirectRoot;
  if (tokenSession) {
    var payload   = { userId: user._id };
    var token     = tokenizer.encode(payload);
    url = url+'?token='+token;
  }
  return url;
}

function establishSession(req, user) {
  user.hash = null;
  req.session.user = user;
}

function cancelSession(req) {
  req.session.reset();
}


function foo() {
  try {
    payload = tokenizer.decode(token);
  } catch(err) {
    render(res, 'login', renderParams(req,{message: 'Please try to login again'}));
  }
}

function getLogout(req,res,next) {
  if (cookieSession) {
    cancelSession(req);
  }
  res.redirect('/');
}
