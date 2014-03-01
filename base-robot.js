// Generated by LiveScript 1.2.0
(function(){
  var BaseRobot;
  importScripts('../log.js');
  BaseRobot = (function(){
    BaseRobot.displayName = 'BaseRobot';
    var prototype = BaseRobot.prototype, constructor = BaseRobot;
    prototype.me = {
      id: 0,
      x: 0,
      y: 0,
      hp: 0
    };
    prototype.enemySpot = [];
    function BaseRobot(name){
      var this$ = this;
      this.name = name != null ? name : "base-robot";
      this.event_counter = 0;
      this.callbacks = {};
      self.onmessage = function(e){
        return this$.receive(e.data);
      };
    }
    prototype.move_forwards = function(distance, callback){
      callback == null && (callback = null);
      return this.send({
        "action": "move_forwards",
        "amount": distance
      }, callback);
    };
    prototype.move_backwards = function(distance, callback){
      callback == null && (callback = null);
      return this.send({
        "action": "move_backwards",
        "amount": distance
      }, callback);
    };
    prototype.move_opposide = function(distance, callback){
      callback == null && (callback = null);
      return this.send({
        "action": "move_opposide",
        "amount": distance
      }, callback);
    };
    prototype.turn_left = function(angle, callback){
      callback == null && (callback = null);
      return this.send({
        "action": "turn_left",
        "amount": angle
      }, callback);
    };
    prototype.turn_right = function(angle, callback){
      callback == null && (callback = null);
      return this.send({
        "action": "turn_right",
        "amount": angle
      }, callback);
    };
    prototype.turn_turret_left = function(angle, callback){
      callback == null && (callback = null);
      return this.send({
        "action": "turn_turret_left",
        "amount": angle
      });
    };
    prototype.turn_turret_right = function(angle, callback){
      callback == null && (callback = null);
      return this.send({
        "action": "turn_turret_right",
        "amount": angle
      });
    };
    prototype.shoot = function(){
      return this.send({
        "action": "shoot"
      });
    };
    prototype.yell = function(msg){
      return this.send({
        "action": "yell",
        "msg": msg
      });
    };
    prototype.receive = function(msg){
      var msg_obj;
      msg_obj = JSON.parse(msg);
      /*
      if msg_obj["enemy-robots"]
        # update enemy-robots array
        @enemy-robots = []
        for r in msg_obj["enemy-robots"]
          @enemy-robots.push {id: r.id, x: r.x, y: r.y, hp: r.hp}
      */
      if (msg_obj.me) {
        this.me = msg_obj.me;
      }
      switch (msg_obj["action"]) {
      case "run":
        this._run();
        break;
      case "callback":
        logger.log('callback');
        logger.log(this.event_counter);
        if (typeof this.callbacks[msg_obj["event_id"]] === "function") {
          this.callbacks[msg_obj["event_id"]]();
        }
        this.event_counter--;
        if (this.event_counter === 0) {
          this._run();
        }
        break;
      case "interruption":
        logger.log('interruption');
        logger.log(this.event_counter);
        this.event_counter = 0;
        if (msg_obj["status"].wallCollide) {
          this.onWallCollide();
        }
        if (msg_obj["status"].isHit) {
          this.onHit();
        }
        console.log('onhit-and-run');
        this._run();
        break;
      case "enemy-spot":
        logger.log('enemy-spot');
        this.enemySpot = msg_obj["enemy-spot"];
        this.onEnemySpot();
      }
    };
    prototype._run = function(){
      var this$ = this;
      logger.log(this.event_counter);
      console.log('run');
      return setTimeout(function(){
        return this$.onIdle();
      }, 0);
    };
    prototype.onIdle = function(){
      throw "You need to implement the onIdle() method";
    };
    prototype.onWallCollide = function(){
      throw "You need to implement the onWallCollide() method";
    };
    prototype.onHit = function(){};
    prototype.onEnemySpot = function(){};
    prototype.send = function(msg_obj, callback){
      var event_id;
      logger.log('send' + " " + msg_obj.action);
      event_id = this.event_counter++;
      this.callbacks[event_id] = callback;
      msg_obj["event_id"] = event_id;
      return postMessage(JSON.stringify(msg_obj));
    };
    return BaseRobot;
  }());
  this.BaseRobot = BaseRobot;
}).call(this);
