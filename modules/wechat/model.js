// 微信公众账号 model.js

var config = require('../../config');
var mongojs = require('mongojs');
// var io = require('socket.io');

var db = mongojs(config.dbinfo.dbname);
var dbuvindex = db.collection('account');
var ObjectID = require('mongodb').ObjectID;

exports.restomsg = function (params,callback) {
  return callback({ret: 1});
};

