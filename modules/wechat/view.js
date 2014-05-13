// 微信公众账号 view.js
var model = require('./model'),
    wechat = require('wechat');
// 微信路由
exports.wechat = wechat('qweruiop',wechat.text(function (message, req, res) {
  console.log(message);
  var input = (message.Content || '').trim();
        //用户发送信息时的回复
  //restomsg(input,function(err, retailers){
  var from = message.FromUserName;
  return res.reply("功能研发中，敬请期待！");
  //}
}).location(function (message, req, res)
{

}).event(function (message, req, res) {
  console.log(message);
  if (message.Event === 'subscribe') {
        // 用户添加时候的消息
    res.reply('欢迎关注上海运营中心微信，我们时刻在您身边');
  } else if (message.Event === 'CLICK') {
        // 用户使用菜单时的消息
    switch(message.EventKey){

      case 'V1001_SuoPei':
      return  res.reply('请回复您所需查询事项的序号： \n' +
                        ' 1.单方事故 \n' +
                        ' 2.双方事故 \n' +
                        ' 3.人伤事故 \n' +
                        ' 4.涉及伤残死亡事故 \n' +
                        ' 5.涉及支付、垫付事故 \n' +
                        ' 6.盗抢事故 ');
      break;

      case 'V1002_VIP':
      return  res.reply('您尚未绑定手机号！\n ' + 
                        ' <a href="http://183.61.111.195/static/verification_VIP.html">请点击此处绑定手机号！</a> '
                       );
      break;

      case 'V1003_LiPei':
      return  res.reply('请回复查询项目的序号：\n 1.出险次数 \n 2.赔付金额 \n 3.理赔状态');
      break;

      case 'V1004_AnJian':
      return  res.reply('请回复查询条件的序号： \n 1.车牌号 \n  2.保单号 \n 3.报案号');
      break;

      case 'V1005_BaoAn':
      return  res.reply('请点选报案类型：' +
                         '\n' +
                         '\t\t\t\t\t\t\t\t\t' +
                         '\n'+
                         '\t\t' + 
                         '1.' +
                         '<a href="http://183.61.111.195/static/Insurance.html">车险报案 </a>' +
                         '\n'+
                         '\t\t\t\t\t\t\t\t\t' +
                         '\n'+
                         '\t\t' +
                         '2.'+
                         '<a href="http://183.61.111.195/static/Report.html">非车险报案</a>');
      break;

      case 'V2001_ChuShen':
      return  res.reply('您尚未绑定手机号！\n' +
                        ' <a href="http://183.61.111.195/static/verification_ORG.html">请点击此处绑定手机号！</a> ' 
                       );
      break;

      case 'V2002_ReJian':
      return  res.reply('您尚未绑定手机号！\n' +
                        ' <a href="http://183.61.111.195/static/verification_ORG.html">请点击此处绑定手机号！</a> '
              );
      break;

      case 'V2003_GaiPai':
      return  res.reply('您尚未绑定手机号！\n' +
                        ' <a href="http://183.61.111.195/static/verification_ORG.html">请点击此处绑定手机号！</a> '
                       );
      break;

      case 'V3001_ShouDan':
      return  res.reply('即将开放');
      break;

      case 'V3002_JiuYuan':
      return  res.reply('请输入任务派遣工短信的全部内容，谢谢！');
      break;

      case 'V3003_DaiJia':
      return  res.reply('即将开放');
      break;

      default: 
      return  res.reply('系统错误，请重试！');
      break;
    }
    res.reply('Bye!');
  } else {
    res.reply('暂未支持! Coming soon!');
  }
})
);
