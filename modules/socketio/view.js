// socket.io view.js
var model = require("./model");

exports.socket = function(req, res) {
  res.render('socketio/index', {});
}

exports.tryit = function(req, res) {
  res.render('socketio/try', {});
  }
  
exports.chatting = function(req, res) {
  res.render('socketio/chatting', {});
  }
