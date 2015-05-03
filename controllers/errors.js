
module.exports = {
  pageNotFound:     pageNotFound,
  developmentError: developmentError,
  productionError:  productionError
};

function render(res, template, params) {
  res.render('errors/'+template, params);
}

function pageNotFound(req, res, next) {

  res.status(404);

  if (req.accepts('html')) {
    render(res, '404', {message: 'Page not found.'});
  } else if (req.accepts('json')) {
    res.json({error: 'Page not found.'});
  } else {
    res.type('txt');
    res.send('Page not found.');
  }

}

// development error handler
// will print stacktrace
function developmentError(err, req, res, next) {
  res.status(err.status || 500);
  render(res, '500', {
    message: err.message,
    error: err
  });
}

// production error handler
// no stacktraces leaked to user
function productionError(err, req, res, next) {
  res.status(err.status || 500);
  render(res, '500', {
    message: err.message,
    error: {}
  });
}


