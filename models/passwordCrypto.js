var crypto = require('crypto');

module.exports = {
  salt:    salt,
  hash:    hash,
  encrypt: encrypt,
  compare: compare
};

function salt(callback) {
  callback(null, crypto.randomBytes(16).toString('utf8'));
}

function hash(password, salt, callback) {
  var cryptoHash = crypto.createHash('sha512');
  cryptoHash.update(password, 'utf8');
  cryptoHash.update(salt,     'utf8');
  callback(null, cryptoHash.digest('base64'));
}

function encrypt(password, callback) {
  var salt = crypto.randomBytes(16).toString('utf8');
  var hash = crypto.createHash('sha512');
  hash.update(password, 'utf8');
  hash.update(salt,     'utf8');
  callback(null, hash.digest('base64'), salt);
}

function compare(leftHash, leftSalt, rightPassword, callback) {
  var rightSalt = leftSalt;
  var rightHash = hash(rightPassword, rightSalt);
  callback(null, (leftHash === rightHash));
}
