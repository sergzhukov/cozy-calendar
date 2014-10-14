// Generated by CoffeeScript 1.7.1
var port, start;

start = function(port, callback) {
  return require('americano').start({
    name: 'Calendar',
    port: port,
    host: process.env.HOST || "0.0.0.0",
    root: __dirname
  }, function(app, server) {
    var Realtimer, User, realtime;
    User = require('./server/models/user');
    Realtimer = require('cozy-realtime-adapter');
    realtime = Realtimer({
      server: server
    }, ['alarm.*', 'event.*']);
    realtime.on('user.*', function() {
      return User.updateUser();
    });
    return User.updateUser(function(err) {
      return callback(err, app, server);
    });
  });
};

if (!module.parent) {
  port = process.env.PORT || 9113;
  start(port, function(err) {
    if (err) {
      console.log("Initialization failed, not starting");
      console.log(err.stack);
      return process.exit(1);
    }
  });
} else {
  module.exports = start;
}
