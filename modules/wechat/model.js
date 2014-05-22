// 微信公众账号 model.js

var config = require('../../config');
var mongojs = require('mongojs');
var redis = require("redis");
var client = redis.createClient();
var db = mongojs(config.dbinfo.dbname);
var dbuvindex = db.collection('account');
var ObjectID = require('mongodb').ObjectID;
var io = require('../../server_wechat').io
var API = require('wechat').API;
var api = new API('wx601b569d5c050bb3','7b91bbd950aa3910b96b4bddee3118c3');

//自动回复文本消息
exports.autoreply_txt = function (message,req,res) {

console.log(message);
//获取用户昵称并将发送到服务器
//调用缓存，对用户消息类型进行判断
var input = (message.Content || '').trim();
var from = message.FromUserName;

client.get(from , function(err, keynum) {
                if (keynum) {
                switch(keynum){
                case 'V1001_BaoAn':
                break;

                case 'V1002_AnJian':
                switch(input){
                case '1':
                client.set(from, 'V1002_AnJian_1');
                client.expire(from, 60);
                return  res.reply('请输入您的车牌号码');
                break;

                case '2':
                client.set(from, 'V1002_AnJian_2');
                client.expire(from, 60);
                return  res.reply('请输入您的保单号码');
                break;

                case '3':
                client.set(from, 'V1002_AnJian_2');
                client.expire(from, 60);
                return  res.reply('请输入您的报案号');
                break;

                default:
                client.expire(from, 60);
                return  res.reply('请重新输入');
                break;
                }

                case 'V1003_LiPei':
                switch(input){
                case '1':
                client.set(from, 'V1003_LiPei_1');
                client.expire(from, 60);
                return  res.reply('请输入您的保单号码');
                break;

                case '2':
                client.set(from, 'V1003_LiPei_2');
                client.expire(from, 60);
                return  res.reply('请输入您的保单号码');
                break;

                case '3':
                client.set(from, 'V1003_LiPei_2');
                client.expire(from, 60);
                return  res.reply('请输入您的保单号码');
                break;

                default:
                client.expire(from, 60);
                return  res.reply('请重新输入');
                break;
                }

                case 'V1004_VIP':
                break;

                case 'V1005_SuoPei':
                return  res.reply('功能研发中');
                break;

                case 'V2001_GaiPai':
                break;

                case 'V2002_ReJian':
                break;

                case 'V2003_ChuShen':
                break;

                case 'V3001_DaiJia':
                break;

                case 'V3002_JiuYuan':
                break;

                case 'V3003_ShouDan':
                break;

                default: 
                return  res.reply('功能研发中');
                break;
                }
                } else {  

if (from ==='oDaPijoHCe-q_UOtxORE4GCpNHOo'){
sever_reply(from,message.Content,res);
}
return res.reply("功能研发中，敬请期待！");
}
});
}

//记录菜单点击事件
exports.autoreply_menu = function(message,req,res) {
var from = message.FromUserName;
var clickey = message.EventKey
  client.set(from, clickey);
    client.expire(from, 60);
}

exports.autoreply_pic = function (message,req,res) {
var pic = message.PicUrl
var from = message.FromUserName;
var msg='<img src="' + pic + '"/>'
res.reply(pic);
sever_reply(from,msg,res);
}
//解析地理位置
exports.autoreply_loc = function(message,req,res) {
return res.reply("功能研发中，敬请期待！");
}

var sever_reply = function(from,msg,res){
var theperson = api.getUser(from, function(err,result){
 if(result){
 console.log(result);
 console.log(msg);
 var fromname = result.nickname;
   // TODO: socketio 测试中
      require('../../server_wechat').io.sockets.emit('mymessage',{
      username: fromname,
      roomname: from,
      msg: msg
      });
      console.log( fromname  );
 } 
 });

}

