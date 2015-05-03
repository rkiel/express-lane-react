var csrf = require('csurf');

module.exports = {
  configure: configure
};

function configure(app) {
  app.use(csrf());
}
