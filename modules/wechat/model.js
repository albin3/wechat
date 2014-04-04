// 微信公众账号 model.js

var config = require('../../config');
var mongojs = require('mongojs');

var db = mongojs(config.dbinfo.dbname);
var dbuvindex = db.collection('account');
var ObjectID = require('mongodb').ObjectID;

exports.pushuvindex = function (callback) {
  return callback({ret: 1});
};

