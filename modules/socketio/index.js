// socket.io index.js

var view = require('./view');

exports.init = function(app){
  app.get('/socketio', view.socket);
};

// socketio 连接建立后处理逻辑
var socket = null;
exports.socket = function(st) {
  socket = st;    // TODO: setTimeout 传参
  test();
}

var test = function() {
  socket.broadcast.emit('test event', {number: Math.floor(100*Math.random())});
  setTimeout(test, 2000);
};
