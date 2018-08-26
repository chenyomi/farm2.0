cc.Class({
  extends: cc.Component,

  properties: {},
  onLoad() {
    this.walkTimer = Math.random() * 3 + 3;
    this.robotTalk = 0;
    this.walking();
    setTimeout(() => {
      this.schedule(this.walking, this.walkTimer);
    }, this.walkTimer);
    let showNode = cc.find('farmer-text', this.node);
    if (showNode) {
      setTimeout(() => {
        showNode.active = false;
      }, 5000);
    }
  },
  //机器人
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
    x - speed < -300 ? (direction = 3) : false;
    x + speed > 300 ? (direction = 2) : false;
    y - speed < -400 ? (direction = 0) : false;
    y + speed > -100 ? (direction = 1) : false;
    this.BoomDirection = direction;
    switch (direction) {
      //向上移动
      case 0:
        y += speed;
        break;
      //向下移动
      case 1:
        y -= speed;
        break;
      //向左移动
      case 2:
        x -= speed;
        break;
      //向右移动
      case 3:
        x += speed;
        break;
    }
    // console.log(x);
    this.action = cc.moveTo(this.walkTimer, x, y);
    this.node.runAction(this.action);
    // console.log(`x = ${x} ,y = ${y}`);
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
  botSpeak() {
    let showNode = cc.find('farmer-text', this.node);
    let showNodetext = cc.find('text', showNode).getComponent(cc.Label);

    switch (this.robotTalk) {
      case 0: {
        showNodetext.string = '我是牧场自动清洁机器人，我的愿望是世界和平！';
        break;
      }
      case 1: {
        showNodetext.string = '是时候展现真正的技术了！';
        break;
      }
    }
    this.robotTalk++;
    if (this.robotTalk > 1) {
      this.robotTalk = 0;
    }
    clearTimeout(timer);
    showNode.active = true;

    let timer = setTimeout(() => {
      showNode.active = false;
    }, 3000);
  }
  // update (dt) {},
});
