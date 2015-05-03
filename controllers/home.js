
module.exports = {
  getRoot:      getRoot,
  getDashboard: getDashboard
};

function render(res, template, params) {
  res.render('home/'+template, params);
}

function getRoot(req,res,next) {
  render(res, 'index', { title: 'Express Lane' });
}

function getDashboard(req,res,next) {
  render(res, 'dashboard', { title: 'Dashboard' });
}
