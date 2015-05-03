module.exports = {
  getAboutUs:   getAboutUs,
  getContactUs: getContactUs
};

function render(res, template, params) {
  res.render('about/'+template, params);
}

function getAboutUs(req,res,next) {
  render(res, 'us', { title: 'About Us' });
}

function getContactUs(req,res,next) {
  render(res, 'contact', { title: 'Contact Us' });
}
