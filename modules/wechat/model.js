// 微信公众账号 model.js

var config = require('../../config');
var mongojs = require('mongojs');
// var io = require('socket.io');

var db = mongojs(config.dbinfo.dbname);
var dbuvindex = db.collection('account');
var ObjectID = require('mongodb').ObjectID;

exports.autoreply_txt = function (message,req,res) {
console.log(message);
var input = (message.Content || '').trim();
//用户发送信息时的回复
var from = message.FromUserName;
return res.reply("功能研发中，敬请期待！");
};

