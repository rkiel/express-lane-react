var errors = require('../controllers/errors');

module.exports = {
  configure: configure
};

function configure(app) {
  // 404
  app.use(errors.pageNotFound);

  // 500
  if (app.get('env') === 'development') {
    app.use(errors.developmentError);
  } else {
    app.use(errors.productionError);
  }
}
