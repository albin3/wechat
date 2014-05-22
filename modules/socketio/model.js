// socket.io model.js
var wechat = require('wechat');
var API = require('wechat').API;
var api = new API('wx601b569d5c050bb3','7b91bbd950aa3910b96b4bddee3118c3');

var Socket = {};
exports.socket = function() {
  return Socket;
};

// socketio 连接建立后处理逻辑
exports.initsocket = function(socket) {
  Socket = socket;
  var usernames = {};
  var numUsers  = 0;
  var addedUser = false;

  socket.on('room', function(room) {
    socket.username = 'admin';
    socket.roomname = room
    socket.emit('open');
    socket.join(room);
    console.log(socket.username);
    console.log(socket.roomname);
    }); 
  socket.on('message', function(msg){
    var obj = {time:getTime(),color:getColor()};
    obj['text']=msg;
    obj['author']=socket.username;
    obj['type']='message';
    console.log(socket.username + ' say: ' + msg + ' to ' + socket.roomname);
    // 返回消息（可以省略）
    socket.emit('message',obj);
    api.sendText(socket.roomname,msg, function(err,result){
    });
    });

  socket.on('mymessage', function(data){
     var obj = {time:getTime(),color:getColor()};
     obj['text']=data.msg;
     obj['author']=data.username;
     obj['type']='message';
     console.log(data.username + ' say: ' +data.msg + ' to ' + data.roomname);
     socket.emit('message',obj);
     socket.bbroadcast.emit('message',obj);
    });

  //socket.on是监听，收到服务器端发来的new message的内容，则运行function，其中data就是请求回来的数据
  socket.on('new message', function (data) {
    // socket.emit是发送消息给服务器端的方法。
    socket.broadcast.emit('new message', {
      username: socket.username,
      roomname:socket.roomname,
      message: data
    });
    console.log(data);
    console.log(socket);

  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (usersession) {
    // we store the username in the socket session for this client
    var username = usersession.username
    socket.username = username;
    socket.roomname = usersession.roomname;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    socket.join(socket.roomname);
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
  var getTime=function(){
    var date = new Date();
      return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      }

      var getColor=function(){
        var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
                        'orange','blue','blueviolet','brown','burlywood','cadetblue'];
                          return colors[Math.round(Math.random() * 10000 % colors.length)];
                          }
}

