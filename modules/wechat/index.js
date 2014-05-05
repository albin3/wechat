// 微信公众账号，路由
var view = require('./view');

exports.init = function(app){
  app.get("/appbg/uvindex/", view.uvindex);
  app.post("/appbg/uvindex/push", view.pushuvindex);
  app.use('/wechat', view.wechat)
  };
