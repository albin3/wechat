// 微信公众账号 view.js
var model = require('./model'),
    wechat = require('wechat');

exports.uvindex = function (req, res) {
  res.render("uvindex/index", {Title: "紫外线指数推送"});
};

// 推送
exports.pushuvindex = function (req, res) {
  model.pushuvindex(function(ret){
    res.end(JSON.stringify(ret));
  });
};

// 微信路由
exports.wechat = wechat('qweruiop', function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    if (message.FromUserName === 'diaosi') {
      // 回复屌丝(普通回复)
      res.reply('hehe');
    } else if (message.FromUserName === 'text') {
      //你也可以这样回复text类型的信息
      res.reply({
        content: 'text object',
        type: 'text'
      });
    } else if (message.FromUserName === 'hehe') {
      // 回复一段音乐
      res.reply({
        type: "music",
        content: {
          title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3"
        }
      });
    } else {
      // 回复高富帅(图文回复)
      res.reply([
          {
            title: '你来我家接我吧',
            description: '这是女神与高富帅之间的对话',
            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
            url: 'http://nodeapi.cloudfoundry.com/'
          }
          ]);
    }
  });

