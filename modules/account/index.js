var require_login = require('current-user').require_login,
    views = require('./views'),
    forms = require('./forms');

exports.init = function(app) {
  app.get('/u/signin', views.signin);
  app.post('/u/signin', forms.signin_form, views.signin);
  app.get('/u/signout', require_login, views.signout);
};
