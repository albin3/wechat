var redis = require("redis"),
      client = redis.createClient();

  // if you'd like to select database 3, instead of 0 (default), call
  // client.select(3, function() { /* ... */ });

  client.on("error", function (err) {
      console.log("Error " + err);
  });

  client.set("id", "expire_id");
  client.expire("id", 3);
  setTimeout(function() {       // 两秒后测试取
    client.get("id", function(err, reply) {
      if (reply) {
        return console.log("id is: " + reply);
      } else {
        return console.log("id is: null");
      }
    })
  }, 2000);
  setTimeout(function() {       // 四秒后测试取
    client.get("id", function(err, reply) {
      if (reply) {
        return console.log("id is: " + reply);
      } else {
        return console.log("id is: null");
      }
    })
  }, 4000);
