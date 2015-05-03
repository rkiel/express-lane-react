module.exports = {
  getRoot:      getRoot
};

function render(res, template, params) {
  res.render('blog/'+template, params);
}

function getRoot(req,res,next) {
  render(res, 'index', { title: 'Blog' });
}
