
var chai = require('chai');
chai.config.truncateThreshold = 0; // disable truncating
chai.config.includeStack = true; // turn on stack trace


global.expect = chai.expect;
global.sinon  = require('sinon');
