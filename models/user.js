var mongoose    = require('mongoose');
var uuid        = require('uuid');
var objectMerge = require('object-merge');

var User = {
  schemaDefinition: schemaDefinition,
  validateEmail:    validateEmail,
  defineSchema:     defineSchema,
  createParams:     createParams,
  create:           create,
  findOne:          findOne,
  updateOne:        updateOne
};

module.exports = User;

// in  production we disable auto index creation
// schema.set('autoIndex', false);

// you can create/use plugins
// schema.plugin(createdDate);

// schema.statics.foo = function() {}

// mongoose-lifecycle

function schemaDefinition() {
  var requiredString = {
    type:     String,
    required: true
  };
  var emailString = objectMerge(requiredString, {
    validate:  validateEmail,
    lowercase: true,
    trim:      true,
    unique:    true,
    index:     true
  });

  var schema = {
    _id:       requiredString,
    firstName: requiredString,
    lastName:  requiredString,
    email:     emailString,
    hash:      requiredString
  };

  return schema;
}

function defineSchema() {
  var Schema = mongoose.Schema;
  var definition = User.schemaDefinition();
  var schema = new Schema(definition);

  mongoose.model('User', schema);
}

function validateEmail(str) {
  return str.length > 1;
}

function createParams(params) {
  var data = objectMerge(params, {
    _id: uuid.v4()
  });
  return data;
}

function create(params, callback) {
  var Model = mongoose.model('User');
  var data = User.createParams(params);
  var user = new Model(data);
  user.save(callback);
}

function findOne(user, callback) {
  var Model = mongoose.model('User');
  Model.where({email: user.email}).findOne(callback);
}

function updateOne(user, document, callback) {
  var Model = mongoose.model('User');
  Model.where({email: user.email}).update(document,callback);
}
