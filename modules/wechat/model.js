// 微信公众账号 model.js

var config = require('../../config');
var mongojs = require('mongojs');

var db = mongojs(config.dbinfo.dbname);
var dbuvindex = db.collection('account');
var ObjectID = require('mongodb').ObjectID;
var API = require('wechat').API;
var api = new API('wx601b569d5c050bb3','7b91bbd950aa3910b96b4bddee3118c3');

exports.autoreply_txt = function (message,req,res) {
var from = message.FromUserName;
console.log(message);
var theperson = api.getUser(from, function(err,result){
 if(result){
 console.log(result);
 from = result.nickname;
   // TODO: socketio 测试中
      require('../../server').io.sockets.emit('new message', {
      username : from,
      message  : message.Content
    });
 } 
 });

var input = (message.Content || '').trim();
//用户发送信息时的回复
var from = message.FromUserName;
if (from ==='oDaPijoHCe-q_UOtxORE4GCpNHOo'){
return res.reply("请稍后");
}
return res.reply("功能研发中，敬请期待！");
};

