var bcrypt = require('bcryptjs');

module.exports = {
  salt:    salt,
  hash:    hash,
  encrypt: encrypt,
  compare: compare
};

function salt(callback) {
  bcrypt.genSalt(12,callback);
}

function hash(password, salt, callback) {
  bcrypt.hash(password, salt, callback);
}

function encrypt(password, callback) {
  bcrypt.genSalt(12, function(err,salt) {
    if (err) { return callback(err); }

    bcrypt.hash(password, salt, function(err, hash) {
      if (err) { return callback(err); }

      callback(null, hash);
    });
  });
}

function compare(password, hash, callback) {
  bcrypt.compare(password, hash, callback);
}
