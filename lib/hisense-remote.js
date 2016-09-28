var dgram = require('dgram');
var exec = require('child_process').exec;

const POWER_PAYLOAD = "434d44203030303133380d0a320d0a31484953454e53455f44454c494d4954455232484953454e53455f44454c494d4954455232484953454e53455f44454c494d495445524b45595f504f574552484953454e53455f44454c494d495445523130484953454e53455f44454c494d4954455230484953454e53455f44454c494d49544552300d0a0d0a00"
const PORT = 1411

var Remote = function(config) {

    if (!config.ip) throw new Error("Hisense Smart TV IP address is required");

    config.host = config.host || {
        ip: "127.0.0.1",
        mac: "00:00:00:00",
        name: "Hisense Remote"
    };
    
    
this.powerOn = function(callback) {
  callback = callback || function() {};
  
  var message = Buffer.concat([new Buffer(POWER_PAYLOAD, 'hex')]);
  var socket = dgram.createSocket('udp4');
  socket.send(message, 0, message.length, PORT, config.ip, function(err, bytes) {
    if (err) throw err;
    socket.close();
    callback();
  });
}

    this.isAlive = function(done) {
        return exec("ping -c 1 " + config.ip, function (error, stdout, stderr) {
            if (error) {
                done(1);
            } else {
                done(0);
            }
        });
    };

    this.config = config;
};

module.exports = Remote;