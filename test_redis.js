var redis = require("redis"),
    chexian = redis.createClient();

  // if you'd like to select database 3, instead of 0 (default), call
  // client.select(3, function() { /* ... */ });

  chexian.on("error", function (err) {
      console.log("Error " + err);
  });

  chexian.set("id",1);
  chexian.set("id",2);
  chexian.set("hehe",3);
  chexian.expire("id", 3);
  chexian.expire("hehe", 3);
  setTimeout(function() {       // 两秒后测试取
    chexian.get("id", redis.print)
    chexian.get("hehe", redis.print)
  }, 2000);
  setTimeout(function() {       // 四秒后测试取
    chexian.get("id", function(err, reply) {
      if (reply) {
        return console.log("id is: " + reply);
      } else {
        return console.log("id is: null");
      }
    })
  }, 4000);
