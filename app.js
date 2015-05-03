var express = require('express'),
    boot    = require('./config/boot'),
    app     = express();

boot.configure(app);

module.exports = app;
