var express = require('express'),
    path = require('path'),
    log4js = require('log4js'),
    colors = require('colors'),
    twinkle = require('node-twinkle'),            // flash messages
    current_user = require('current-user'),       // user session

    odm = require('./extensions').odm,
    tmpl_engine = require('./extensions').tmpl_engine,
    logger = require('./extensions').logger,
    wechat = require('wechat');

/**
 * 创建应用实例
 *
 * @method create_app
 * @param Object config
 */
exports.create_app = function(config) {

  /**
   * 应用实例
   *
   * @property app
   * @type Object
   * @final
   */
  var app = express();

  if (config) {
    Object.keys(config).forEach(function(k) {
      app[k] = config[k];
    });
  }

  odm.init_app(app);
  tmpl_engine.init_app(app);
  logger.init_app(app);

  // middlewares - 注意顺序！
  //app.use(express.logger());
  app.use(log4js.connectLogger(logger));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: app.SECRET_KEY }));
  app.use(app.STATIC_ROUTER, express.static(app.STATIC_DIR));
  app.use(twinkle);

  app.use(express.query());
  app.use('/wechat', wechat('some token', function (req, res, next) {
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
  }));
  
  // 发生异常时打印调用堆栈
  if (app.DEBUG) {
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.locals.pretty = true;
  }

  /**
   * 添加一个'current_app'属性到request上下文
   * 应用在视图函数中
   *
   * Usage:
   *
   * function(req, res[, next]) {
   *   // 1. console.log(req.current_app);
   *   // 2. if (req.current_app.DEBUG) {...}
   * }
   */
  app.use(function(req, res, next) {
    req.current_app = app;
    next();
  });

  app.use(current_user());

  // 路由
  app.use(app.router);
  app.MODULES.forEach(function(module) {
    require(path.join(app.MODULE_DIR, module)).init(app);
  });

  // 未发现模块
  if (app.MODULES.length === 0) {
    app.use(function(req, res) {
      res.send('No MODULE registered, please review your project and make sure at least one module is registered.');
    });
  }

  // 404, 500
  app.use(function(req, res) { res.send(404); });
  app.use(function(err, req, res, next) {
    if (app.DEBUG) {
      console.error(err.message.underline.red);
      console.error(err.stack);
    }
    res.send(500);
  });

  return app;
};
