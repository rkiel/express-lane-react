require('../support')

var User = require('../../models/user');
var mongoose = require('mongoose');
var uuid     = require('uuid');

describe('User model', function() {

  var mocky;

  beforeEach(function() {
    mocky = sinon.sandbox.create();
  });
  afterEach(function() {
    mocky.restore();
  });

  describe('#schemaDefinition', function() {
    var schema;
    beforeEach(function() {
      schema = User.schemaDefinition();
    });

    it('should define a bunch of fields',function() {
      expect(Object.keys(schema)).to.be.eql([
        '_id',
        'firstName',
        'lastName',
        'email',
        'hash'
      ]);
    });
    it('should define _id',function() {
      expect(schema._id).to.be.eql({
        type:     String,
        required: true
      });
    });
    it('should define firstName',function() {
      expect(schema.firstName).to.be.eql({
        type:     String,
        required: true
      });
    });
    it('should define lastName',function() {
      expect(schema.lastName).to.be.eql({
        type:     String,
        required: true
      });
    });
    it('should define email',function() {
      expect(Object.keys(schema.email)).to.eql([
        'type',
        'required',
        'validate',
        'lowercase',
        'trim',
        'unique',
        'index'
      ]);
      expect(schema.email.type).to.equal(String);
      expect(schema.email.required).to.equal(true);
      expect(schema.email.validate.toString()).to.equal(User.validateEmail.toString());
      expect(schema.email.lowercase).to.equal(true);
      expect(schema.email.trim).to.equal(true);
      expect(schema.email.unique).to.equal(true);
      expect(schema.email.index).to.equal(true);
    });
    it('should define hash',function() {
      expect(schema.hash).to.be.eql({
        type:     String,
        required: true
      });
    });
  });

  describe('#defineSchema', function() {
    it('should define a mongoose schema',function() {
      mocky.stub(User,'schemaDefinition').returns({ });
      mocky.stub(mongoose,'model');
      User.defineSchema();
      expect(mongoose.model.calledWith('User')).to.be.true;
      expect(User.schemaDefinition.calledOnce).to.be.true;
    });
  });

  describe('#validateEmail',function() {
    it('should be false when there is one chararcter',function() {
      expect(User.validateEmail('Y')).to.be.false;
    });
    it('should be true when there is more than one chararcter',function() {
      expect(User.validateEmail('YY')).to.be.true;
    });
    it('should be true when there is more than one chararcter',function() {
      expect(User.validateEmail('YYZ')).to.be.true;
    });
  });

  describe('#createParams',function() {
    it('should set _id with a guid',function() {
      mocky.stub(uuid,'v4').returns('YYZ');
      expect(User.createParams({foo: 'bar'})).to.be.eql({_id: 'YYZ', foo: 'bar'});
    });
  });

  describe('#create',function() {
    it('should create and save a new user',function() {
      var callback = mocky.stub();
      var params = { params: 1 };
      var data   = { data: 1 };
      var user   = { save: function() {} };
      var model  = function constructor(x) {
        expect(x).to.be.eql(data);
        return user;
      };
      mocky.stub(mongoose,'model').withArgs('User').returns(model);
      mocky.stub(User,'createParams').withArgs(params).returns(data);
      mocky.stub(user,'save').withArgs(callback);
      User.create(params,callback);
      expect(user.save.calledWith(callback)).to.be.true;
    });
  });

  describe('#findOne,#updateOne',function() {
    var model;
    var user;
    var email;
    var callback;
    var document;
    var params;

    beforeEach(function() {
      model = { };
      email = 'foo@bar.com';
      user  = {email: email};
      callback = mocky.stub();
      document = { document: 1 };
      params = { params: 1 };
    });

    context('when a User model is defined',function() {
      beforeEach(function() {
        mocky.stub(mongoose,'model').withArgs('User').returns(model);
      });
      context('when a User model is found',function() {
        beforeEach(function() {
          model.where = function() { };
          mocky.stub(model,'where').withArgs({email: email}).returns(model);
        });
        context('#findOne',function() {
          beforeEach(function() {
            model.findOne = function() { };
            mocky.stub(model,'findOne').withArgs(callback);
          });
          it('should findOne',function() {
            User.findOne(user,callback);
          });
        });
        context('#updateOne',function() {
          beforeEach(function() {
            model.update = function() { };
            mocky.stub(model,'update').withArgs(document,callback);
          });
          it('should updateOne',function() {
            User.updateOne(user,document,callback);
          });
        });
      });
    });
  });
});
