var bodyParser = require('body-parser');

module.exports = {
  configure: configure
};

function configure(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}
