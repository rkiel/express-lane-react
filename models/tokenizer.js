var jwt         = require('jsonwebtoken');
var objectMerge = require('object-merge');

var tokenSecret  = process.env.TOKEN_SECRET || 'And The Meek Shall Inherit The Earth';

var base = {issuer: 'RMK', audience: 'Kiel'};

module.exports = {
  encode: encode,
  decode: decode
};

function encode(payload) {
  var options = objectMerge(base, {subject: 'Login', expiresInMinutes: (60 * 12)});
  var token   = jwt.sign(payload, tokenSecret, options);
  console.log(token);
  return token;
}

function decode(token) {
  var msg = jwt.verify(token, tokenSecret, base);
  console.log(msg);
  return msg;
}
