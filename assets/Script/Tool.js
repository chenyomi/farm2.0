var Tool = {
  setBarColor: function (bar, value) {
    var Node = bar;
    if (value < 0.6) {
      Node.color = cc.color('#FF4A4A');
    } else if (value < 0.8) {
      Node.color = cc.color('#FFB70B');
    } else {
      Node.color = cc.color('#74DA72');
    }
  },
  setLabelColor: function (label, value) {
    var node = label.node;
    if (value < 0.6) {
      Node.color = cc.color('#FF4A4A');
    } else if (value < 0.8) {
      Node.color = cc.color('#FFB70B');
    } else {
      Node.color = cc.color('#74DA72');
    }
  },
  //关闭模态
  closeModal: function (node) {
    node.active = false;
    // var action = cc.sequence(cc.fadeOut(0.3), cc.callFunc(node.removeFromParent, node));
    // node.runAction(action);
  },
  //范围随机值
  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  //更新头部数据（money和经验值）
  updateHeader() {
    let headerJs = cc.find('div_header').getComponent('Header');
    headerJs.init.call(headerJs);
  },
  RunAction(node, type, time) {
    var action = null;
    switch (type) {
      case 'fadeIn':
        node.active = true;
        node.opacity = 0;
        action = cc.fadeIn(time);
        node.runAction(action);
        break;
    }
  },
  //判断触摸滑动方向
  touchMove(node, call) {
    let moveEndX, moveEndY, X, Y, startX, startY;
    node.on(
      cc.Node.EventType.TOUCH_START,
      function (event) {
        if (event.touch._point.y > 300) {
          (startX = event.touch._point.x), (startY = event.touch._point.y);
        }
      },
      true
    );
    // node.on(
    //   cc.Node.EventType.TOUCH_MOVE,
    //   function(event) {

    //   },
    //   true
    // );
    node.on(
      cc.Node.EventType.TOUCH_END,
      function (event) {
        (moveEndX = event.touch._point.x),
          (moveEndY = event.touch._point.y),
          (X = moveEndX - startX),
          (Y = moveEndY - startY);
        if (X > 150) {
          console.log('right');
        } else if (X < -150) {
          console.log('left');
        } else if (Y > 150) {
          call(0);
          console.log('up');
        } else if (Y < -150) {
          call(1);
          console.log('down');
        }
      },
      true
    );
  },
  //滚动字幕
  slidePluign(node, textnode, list, i, first) {
    let self = this;
    if (!first) {
      this.listSize = list.length - 1;
      this.listIndexShow = 0;
      var leftPostion = 600;
      Config.noticeIsSlide = true;
      var action = cc.scaleTo(0.3, 1, 1);
      node.parent.parent.runAction(action);
      node.setPositionX(600);
      var timers = setInterval(function () {
        textnode.string = list[self.listIndexShow].SendData;
        if (leftPostion == -node.width) {
          if (self.listIndexShow < i) {
            self.listIndexShow++;
            leftPostion = 600;
          } else {
            Config.noticeIsSlide = false;
            clearInterval(timers);
            var _action = cc.scaleTo(0.3, 0, 0);
            node.parent.parent.runAction(_action);
          }
        } else {
          node.setPositionX(leftPostion--);
        }
      }, 10);
    } else {
      let leftPostion = 600
      node.setPositionX(600)
      Config.noticeIsSlide = true;
      let timers = setInterval(function () {
        if (leftPostion == -node.width) {
          clearInterval(timers)
          let action = cc.scaleTo(0.3, 0, 0);
          node.parent.parent.runAction(action)
          Config.noticeIsSlide = false;
        }
        else {
          node.setPositionX(leftPostion--)
        }

      }, 10)
    }



  },
  //移除常驻资源
  removePersist() {
    Config.menuNode.active = false;
    Config.SlideNode.active = false;
    Config.hearderNode.active = false;
  }
};

module.exports = {
  Tool: Tool
};
