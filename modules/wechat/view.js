// 微信公众账号 view.js
var model = require('./model'),
    wechat = require('wechat');

// 微信路由
exports.wechat = wechat('qweruiop',wechat.text(function (message, req, res) {
model.autoreply_txt(message, req,  res);
}).location(function (message, req, res){
model.autoreply_loc(message, req,  res);
}).image(function (message, req, res){
model.autoreply_pic(message, req,  res);
}).event(function (message, req, res) {
  console.log(message);

  if (message.Event === 'subscribe') {
        // 用户添加时候的消息
    res.reply('欢迎关注上海运营中心微信，我们时刻在您身边');
  } else if (message.Event === 'CLICK') {
    //定义自动回复内容
var con_SuoPei = '请回复您所需查询事项的序号： \n' +
                   ' 1.单方事故 \n' +
                   ' 2.双方事故 \n' +
                   ' 3.人伤事故 \n' +
                   ' 4.涉及伤残死亡事故 \n' +
                   ' 5.涉及支付、垫付事故 \n' +
                   ' 6.盗抢事故 '
var con_idf = '您尚未绑定手机号！\n '
var con_VIP = ' <a href="http://183.61.111.195/static/verification_VIP.html">请点击此处绑定手机号！</a> '
var con_LiPei = '请回复查询项目的序号：\n' +
                   ' 1.出险次数 \n' +
                   ' 2.赔付金额 \n' +
                   ' 3.理赔状态'
var con_AnJian = '本功能仅适用于通过微信报案的案件信息。 \n' +
                   '请回复查询条件的序号： \n' +
                   ' 1.车牌号 \n ' +
                   ' 2.保单号 \n ' +
                   ' 3.报案号'
var con_BaoAn = '请点选报案类型：\n\t\n' +
                   '1.' +
                   '<a href="http://183.61.111.195/static/Insurance.html">车险报案 </a>' +
                   '\n\t\n'+
                   '2.'+
                   '<a href="http://183.61.111.195/static/Report.html">非车险报案</a>' +
                   '\n\r'
var con_JiGou = ' <a href="http://183.61.111.195/static/verification_ORG.html">请点击此处绑定手机号！</a> '
var con_JiuYuan = '请输入任务派工短信的全部内容，谢谢！'
var con_dev = '即将开放'
var con_err = '系统错误，请重试！'
model.autoreply_menu(message, req, res);
  // 用户使用菜单时的消息
    switch(message.EventKey){

      case 'V1001_BaoAn':
      return  res.reply(con_BaoAn)
      break;

      case 'V1002_AnJian':
      return  res.reply(con_AnJian);
      break;

      case 'V1003_LiPei':
      return  res.reply(con_LiPei);
      break;

      case 'V1004_VIP':
      return  res.reply(con_idf + con_VIP);
      break;

      case 'V1005_SuoPei':
      return  res.reply(con_SuoPei);
      break;

      case 'V2001_GaiPai':
      return  res.reply(con_idf + con_JiGou);
      break;

      case 'V2002_ReJian':
      return  res.reply(con_idf + con_JiGou);
      break;

      case 'V2003_ChuShen':
      return  res.reply(con_idf + con_JiGou);
      break;

      case 'V2004_JiuYuan':
      return  res.reply(con_idf + con_JiGou);
      break;

      case 'V3001_DaiJia':
      return  res.reply(con_dev);
      break;

      case 'V3002_ShouDan':
      return  res.reply(con_dev);
      break;

      default: 
      return  res.reply(con_err);
      break;
    }
  } else {
    res.reply('暂未支持! Coming soon!');
  }
})
);
