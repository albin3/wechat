var User = require('./models').User;

exports.signin = function(req, res) {
  if (req.method === 'GET') return res.render('account/signin');

  if (!req.form.isValid)
    return res.render('account/signin', { errors: req.form.getErrors() });

  User.findOne({ email: req.form.email }, function(err, user) {
    if (err || !user || !user.authenticate(req.form.password)) throw new Error();
    req.login_user(user);
    req.flash('Successfully signed in.');
    res.redirect('/');
  });
};

exports.signout = function(req, res) {
  req.logout_user();
  res.redirect('/u/signin');
};
