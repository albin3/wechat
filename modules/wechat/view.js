// 微信公众账号 view.js
var model = require('./model');

exports.uvindex = function (req, res) {
  res.render("uvindex/index", {Title: "紫外线指数推送"});
};

// 推送
exports.pushuvindex = function (req, res) {
  model.pushuvindex(function(ret){
    res.end(JSON.stringify(ret));
  });
};
