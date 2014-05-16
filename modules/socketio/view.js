// socket.io view.js
var model = require("./model");

exports.socket = function(req, res) {
  res.render('socketio/index', {});
}
