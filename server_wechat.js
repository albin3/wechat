var env = process.env.NODE_ENV || 'development',
    config = require('./config')[env],            // configuration
    create_app = require('./application').create_app;
var sockets = require('./modules/socketio/model');

// 实例化应用
var app = create_app(config);

// 启动应用实例
var port   = app.PORT || 3000;
var server = app.listen(port, function() {
  console.info('Application running on port %d.'.green, port);
  console.info('You can now visit '.green +
               'http://localhost:%d/'.underline.blue +
               ' via your browser.'.green, port);
});

// socketio 注入
var io     = require('socket.io').listen(server);
io.sockets.on('connection', sockets.initsocket);      // 处理逻辑

exports.io = io;
