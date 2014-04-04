// 紫外线指数，路由
var view = require('./view');

exports.register = function(app){
  app.get("/appbg/uvindex/", view.uvindex);
  app.post("/appbg/uvindex/push", view.pushuvindex);
};
