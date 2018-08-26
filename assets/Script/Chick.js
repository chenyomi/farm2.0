var Data = require('Data');
var Func = Data.func;
var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
var Chick = cc.Class({
  name: Chick,
  extends: cc.Component,

  properties: {},

  init: function() {
    //鸡的状态初始化
    this._chickStatus = {
      sick: true,
      hungry: true,
      shit: true
    };

    //节点的绑定
    this.isBoom = 0;
    this.BoomDirection = 0;
    this._chickNode = this.node;
    this._chickAnim = this.node.getComponent(cc.Animation);
    this._animMove = this.node.getComponent(cc.Animation)._clips[0];
    this._animFeed = this.node.getComponent(cc.Animation)._clips[1];
    this._animTreat = this.node.getComponent(cc.Animation)._clips[2];
    this._animHungry = this.node.getComponent(cc.Animation)._clips[3];
    this._animSick = this.node.getComponent(cc.Animation)._clips[4];
    this._parentNode = cc.find('Canvas');
    this.feedStateNode = cc.find('feedState', this._parentNode);
    this._shitCount = 0;

    //初始化小鸡Id为-1
    this.cId = -1;
    //获得小鸡的ID （小鸡列表点击小鸡 把Id赋值过来）
  },
  setId(Id) {
    this.cId = Id;
  },
  //初始化鸡的状态 播放不同的动画
  initData() {},
  //更新小鸡饥饿显示状态
  updateFeedState() {},
  onLoad() {
    let self = this;
    this.init();
    this.node.on('click', this.showChickState, this);
    this.walkTimer = Math.random() * 3 + 1;
    this.playWalk('start');
    //方法导出给index.js
    this.chickFunc = {
      playChickAnim: this.playAnim,

      setId: this.setId,
      initData: this.initData
    };
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;
    // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    this.touchingNumber = 0;
  },

  //显示小鸡的状态
  showChickState: function() {
    let id = this.cId;
    cc.director.loadScene('chickDetail', () => {
      let scene = cc.find('Canvas');
      Tool.RunAction(scene, 'fadeIn', 0.3);
      let chickDetailJs = scene.getComponent('chickDetail');
      chickDetailJs.Id = id;
    });
    Config.menuNode.active = false;
    Config.hearderNode.active = false;
  },
  // update(dt) {

  // },

  //小鸡挪动
  walking() {
    let x, y, direction, speed;
    //上下左右限定范围
    //小鸡当前的位置
    x = this.node.x;
    y = this.node.y;
    speed = this.walkTimer * 10;
    //在0~5中随机生成一个整数(上、下、左、右、斜左、斜右)
    if (this.isBoom) {
      direction = this.BoomDirection;
    } else {
      direction = Math.floor(Math.random() * 4);
    }
    x - speed < -150 ? (direction = 3) : false;
    x + speed > 300 ? (direction = 2) : false;
    y - speed < -430 ? (direction = 0) : false;
    y + speed > -100 ? (direction = 1) : false;
    this.BoomDirection = direction;
    switch (direction) {
      //向上移动
      case 0:
        y += speed;
        //播放动画
        this.playChickWalkUp();
        break;
      //向下移动
      case 1:
        y -= speed;
        //播放动画
        this.playChickWalkDown();
        break;
      //向左移动
      case 2:
        x -= speed;
        //播放动画
        this.playChickWalkLeft();
        break;
      //向右移动
      case 3:
        x += speed;
        //播放动画
        this.playChickWalkRight();
        break;
    }
    this.action = cc.moveTo(this.walkTimer, x, y);
    this.node.runAction(this.action);
  },
  playWalk(state) {
    if (state == 'stop') {
      this.unscheduleAllCallbacks();
      this.node.stopAction(this.action);
    } else if (state == 'start') {
      this.walking();
      setTimeout(() => {
        this.schedule(this.walking, this.walkTimer);
      }, this.walkTimer);
    }
  },
  onCollisionEnter: function(other, self) {
    // this.node.color = cc.Color.GREEN;
    this.touchingNumber++;
    this.isBoom = 1;
    this.playWalk('stop');
    if (Math.abs(self.world.aabb.x - other.world.aabb.x) > 35) {
      if (self.world.aabb.x > other.world.aabb.x) {
        this.BoomDirection = 3;
      } else {
        this.BoomDirection = 2;
      }
    } else {
      if (self.world.aabb.y > other.world.aabb.y) {
        this.BoomDirection = 0;
      } else {
        this.BoomDirection = 1;
      }
    }

    this.playWalk('start');
    //鸡的Zindex重叠的时候切换
    if (self.world.aabb.y > other.world.aabb.y) {
      self.node.setLocalZOrder(0);
      other.node.setLocalZOrder(1);
    }
  },

  onCollisionStay: function(other, self) {
    this.isBoom = 1;
    if (self.world.aabb.x > other.world.aabb.x && self.world.aabb.y > other.world.aabb.y) {
      if (this.BoomDirection == 3) {
        this.BoomDirection = 0;
      } else {
        this.BoomDirection = 3;
      }
    } else if (self.world.aabb.x > other.world.aabb.x && self.world.aabb.y < other.world.aabb.y) {
      if (this.BoomDirection == 3) {
        this.BoomDirection = 1;
      } else {
        this.BoomDirection = 3;
      }
    } else if (self.world.aabb.x < other.world.aabb.x && self.world.aabb.y > other.world.aabb.y) {
      if (this.BoomDirection == 0) {
        this.BoomDirection = 2;
      } else {
        this.BoomDirection = 0;
      }
    } else if (self.world.aabb.x < other.world.aabb.x && self.world.aabb.y < other.world.aabb.y) {
      if (this.BoomDirection == 1) {
        this.BoomDirection = 2;
      } else {
        this.BoomDirection = 1;
      }
    }
    if (self.world.aabb.y > other.world.aabb.y) {
      self.node.setLocalZOrder(0);
      other.node.setLocalZOrder(1);
    }
  },

  onCollisionExit: function() {
    //碰撞后的状态显示

    this.dataList = JSON.parse(cc.sys.localStorage.getItem('FarmData')); //缓存机制
    this.touchingNumber--;
    if (this.touchingNumber === 0) {
      this.node.color = cc.Color.WHITE;
    }
    this.isBoom = 0;
  },

  //小鸡的动画
  playChickWalkDown: function() {
    this._chickAnim.play('chick_walk_down');
  },
  playChickWalkUp: function() {
    this._chickAnim.play('chick_walk_up');
  },
  playChickWalkLeft: function() {
    this._chickAnim.play('chick_walk_left');
  },
  playChickWalkRight: function() {
    this._chickAnim.play('chick_walk_right');
  },
  playChickMove: function() {
    //this._chickAnim.play("chick_move");
  },
  playChickFeed: function() {
    var anim = this._chickAnim.play('chick_feed');
  },
  playChickTreat: function() {
    let anim = this._chickAnim.play('chick_treat');
    anim.repeatCount = 3;
  },
  playChickShit: function() {
    this._chickAnim.play('chick_shit');
  },
  playChickHungry: function() {
    this._chickAnim.play('chick_hungry');
  },
  playChickSick: function() {
    this._chickAnim.play('chick_sick');
  },
  playChickSickHungry: function() {
    this._chickAnim.play('chick_sick_hungry');
  },
  playChickSickShit: function() {
    // this._chickAnim.play("chick_shit_sick");
    this._chickAnim.play('chick_sick');
  },
  playChickShitHungry: function() {
    this._chickAnim.play('chick_shit_hungry');
  },
  playChickShitHungrySick: function() {
    // this._chickAnim.play("chick_hungry_sick_shit");
    this._chickAnim.play('chick_sick');
  },
  //根据小鸡的状态 播放不同的动画
  playAnim: function() {
    // if (this._status != 0) {
    //   if (this._chickStatus.sick && this._chickStatus.hungry && this._chickStatus.shit) {
    //     this.playChickShitHungrySick();
    //     return;
    //   }
    //   if (!this._chickStatus.sick && !this._chickStatus.hungry && !this._chickStatus.shit) {
    //     this.playChickMove();
    //     return;
    //   }
    //   if (this._chickStatus.sick) {
    //     //生病状态
    //     !this._chickStatus.hungry && !this._chickStatus.shit ? this.playChickSick() : false;
    //     //生病+饥饿状态
    //     this._chickStatus.hungry && !this._chickStatus.shit ? this.playChickSickHungry() : false;
    //     //生病+肮脏状态
    //     !this._chickStatus.hungry && this._chickStatus.shit ? this.playChickSickShit() : false;
    //   }
    //   if (this._chickStatus.hungry) {
    //     //饥饿状态
    //     !this._chickStatus.sick && !this._chickStatus.shit ? this.playChickHungry() : false;
    //     //饥饿+肮脏状态
    //     !this._chickStatus.sick && this._chickStatus.shit ? this.playChickShitHungry() : false;
    //     //饥饿+生病状态
    //     this._chickStatus.sick && this._chickStatus.shit ? this.playChickSickHungry() : false;
    //   }
    //   if (this._chickStatus.shit) {
    //     //肮脏状态
    //     !this._chickStatus.hungry && !this._chickStatus.sick ? this.playChickShit() : false;
    //     //肮脏+饥饿状态
    //     this._chickStatus.hungry && !this._chickStatus.sick ? this.playChickShitHungry() : false;
    //     //肮脏+生病状态
    //     !this._chickStatus.hungry && this._chickStatus.sick ? this.playChickSickShit() : false;
    //   }
    // }
  }
});
