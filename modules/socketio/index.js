// socket.io index.js
var view = require('./view');

exports.init = function(app){
  app.get('/socketio', view.socket);
};
