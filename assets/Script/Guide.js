'use strict';

var GuideSystem = {
  step: 0,
  stepGround: 0,
  scene: null,
  menu: null,
  isSetName: false,
  isInit: false,
  guide: function guide() {
    if (!this.isInit) {
      this.stepGround = Config.guideStep || 0;
      this.setStepGround();
      this.isInit = true;
    }
    var _this = this;
    this.scene = cc.find('Canvas');
    this.menu = cc.find('div_menu');
    cc.loader.loadRes('Prefab/guide', cc.Prefab, function(err, prefab) {
      if (err) {
        console.log(err);
        return;
      }
      var oldGuideNode = cc.find('guide');
      oldGuideNode ? oldGuideNode.removeFromParent() : false;
      _this.menuJS = _this.menu.getComponent('Menu');
      _this.idnexJs = _this.scene.getComponent('Index');
      var guideNode = cc.instantiate(prefab);
      var guideMaskNode = cc.find('mask-guide', guideNode);
      var modalSprite = cc.find('modal', guideMaskNode).getComponent(cc.Sprite);
      var circleNode = cc.find('circle', guideMaskNode);
      switch (_this.step) {
        case 0:
          _this.guideStep0(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 1:
          _this.guideStep1(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 2:
          _this.guideStep2(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 3:
          _this.guideStep3(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 4:
          _this.guideStep4(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 5:
          _this.guideStep5(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 6:
          _this.guideStep6(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 7:
          _this.guideStep7(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 8:
          _this.guideStep8(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 9:
          _this.guideStep9(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 10:
          _this.guideStep10(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
        case 11:
          _this.guideStep11(guideNode, guideMaskNode, modalSprite, circleNode);
          break;
      }
      _this.step++;

      _this.scene.parent.addChild(guideNode, 99);
    });
  },

  guideStep0: function guideStep0(guideNode, guideMaskNode, modalSprite, circleNode) {
    cc.loader.loadRes('guide/pic', cc.SpriteFrame, function(err, spriteFrame) {
      modalSprite.spriteFrame = spriteFrame;
    });
    circleNode.active = false;
    guideNode.on('click', this.guide, this);
  },
  guideStep1: function guideStep1(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;

    //设置position
    var btnMoreNode = cc.find('div_menu/more');
    var pos = btnMoreNode.getPosition();
    var pos_5 = btnMoreNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6);

    var jt = cc.find('jt', guideNode);
    jt.rotation = 30;
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    textintro.active = true;
    jt.setPosition(pos_6.x + 80, pos_6.y + 80);
    textintro.setPosition(pos_6.x + 110, pos_6.y + 110);
    cc.loader.loadRes('guide/pic_1.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = btnMoreNode.height;
    var width = btnMoreNode.width;
    var radius = height > width ? height : width;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;

    //绑定事件
    guideMaskNode.once('click', function() {
      jt.active = false;
      textintro.active = false;
      guideMaskNode.removeFromParent();
      self.menuJS.func.showMenu.call(self.menuJS).then(function() {
        self.guide();
      });
    });
  },
  guideStep2: function guideStep2(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;
    var shopNode = cc.find('div_menu/Menu/MenuList/menuScroll/view/content/shop');

    //设置position
    var pos = shopNode.getPosition();
    var pos_5 = shopNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6);

    var jt = cc.find('jt', guideNode);
    jt.rotation = 80;
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    textintro.active = true;
    jt.setPosition(pos_6.x + 110, pos_6.y + 20);
    textintro.setPosition(pos_6.x + 220, pos_6.y + 20);
    cc.loader.loadRes('guide/pic_2.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = shopNode.height;
    var width = shopNode.width;
    var radius = height > width ? height : width;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;

    //绑定事件
    guideMaskNode.on('click', function() {
      jt.active = false;
      textintro.active = false;
      guideMaskNode.removeFromParent();
      self.menuJS.func.closeMenu.call(self.menuJS);
      self.menuJS.func.loadSceneShop.call(self.menuJS);
    });
  },
  guideStep3: function guideStep3(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;

    var goodsNode = cc.find('bg/PageView/view/content/page_0/goodsList/产蛋鸡', self.scene);

    //设置position
    var pos = goodsNode.getPosition();
    var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6.x, pos_6.y + 45);

    var jt = cc.find('jt', guideNode);
    jt.rotation = 170;
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    textintro.active = true;
    jt.setPosition(pos_6.x + 20, pos_6.y - 80);
    textintro.setPosition(pos_6.x + 20, pos_6.y - 380);
    cc.loader.loadRes('guide/pic_3.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = goodsNode.height;
    var width = goodsNode.width;
    var radius = 110;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;

    //绑定事件
    guideMaskNode.on(
      'click',
      function() {
        jt.active = false;
        textintro.active = false;
        guideMaskNode.removeFromParent();
        goodsNode.emit('maskClick');
        self.guide();
      },
      this
    );
  },
  //确定购买
  guideStep4: function guideStep4(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;

    modalSprite.node.active = false;
    circleNode = cc.find('circle', guideMaskNode);
    circleNode.active = false;
    setTimeout(function() {
      var SellNode = cc.find('Sell', self.scene);
      var enterButton = cc.find('bg/btn-group/enterButton', SellNode);
      //设置position
      var pos = enterButton.getPosition();
      var pos_5 = enterButton.getNodeToWorldTransformAR(pos);
      var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
      guideMaskNode.setPosition(pos_6);

      var jt = cc.find('jt', guideNode);
      jt.rotation = 180;
      var textintro = cc.find('textintro', guideNode);

      jt.active = true;
      textintro.active = true;
      jt.setPosition(pos_6.x, pos_6.y - 120);
      textintro.setPosition(pos_6.x, pos_6.y - 190);
      cc.loader.loadRes('guide/pic_4.png', cc.SpriteFrame, function(err, spriteFrame) {
        textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });

      // 设置mask宽度和高度
      var height = enterButton.height;
      var width = enterButton.width;

      guideMaskNode.height = width;
      guideMaskNode.width = width;
      var ModalNode = cc.find('Modal', SellNode);

      guideMaskNode.on('click', function() {
        jt.active = false;
        textintro.active = false;
        guideMaskNode.removeFromParent();
        //买一只鸡
        self.PostBuy(18, 1).then(function(data) {
          if (data.Code === 1) {
            self.alertMsgNew(4);
            // console.log(self.step);
            var oldGuideNode = cc.find('guide');
            oldGuideNode ? oldGuideNode.removeFromParent() : false;
            cc.director.loadScene('index', self.guide);
          } else {
            Msg.show(data.Message);
          }
        });
      });
    }, 500);
  },
  //显示饲料弹窗
  guideStep5: function guideStep5(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;
    var goodsNode = cc.find('hatch-box', self.scene);

    //设置position
    var pos = goodsNode.getPosition();
    var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6.x, pos_6.y + 45);

    var jt = cc.find('jt', guideNode);
    jt.rotation = 140;
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    textintro.active = true;
    jt.setPosition(pos_6.x + 80, pos_6.y - 40);
    textintro.setPosition(pos_6.x + 200, pos_6.y - 120);
    cc.loader.loadRes('guide/pic_5.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = goodsNode.height;
    var width = goodsNode.width;
    var radius = 110;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;
    // cc.loader.loadRes('guide/pic-4', cc.SpriteFrame, function(err, spriteFrame) {
    //   modalSprite.spriteFrame = spriteFrame;
    // });
    //绑定事件
    guideMaskNode.on(
      'click',
      function() {
        jt.active = false;
        textintro.active = false;
        guideMaskNode.removeFromParent();
        var modalJS = cc.find('hatch-box', self.scene).getComponent('Modal');
        modalJS.func.showModal.call(modalJS);
        self.guide();
      },
      this
    );
  },
  //添加饲料
  guideStep6: function guideStep6(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;
    var goodsNode = cc.find('feedModal/bg/icon-addFeeds');
    var goodsBox = cc.find('feedModal');
    //设置position
    var pos = goodsNode.getPosition();
    var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6);

    var jt = cc.find('jt', guideNode);
    jt.rotation = 180;
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    textintro.active = true;
    jt.setPosition(pos_6.x, pos_6.y - 130);
    textintro.setPosition(pos_6.x, pos_6.y - 330);
    cc.loader.loadRes('guide/pic_6.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = goodsNode.height;
    var width = goodsNode.width;
    var radius = height > width ? height : width;
    guideMaskNode.height = 150;
    guideMaskNode.width = 150;
    cc.loader.loadRes('guide/black', cc.SpriteFrame, function(err, spriteFrame) {
      modalSprite.spriteFrame = spriteFrame;
    });
    //绑定事件
    guideMaskNode.on(
      'click',
      function() {
        jt.active = false;
        textintro.active = false;
        guideMaskNode.removeFromParent();
        self.idnexJs.func.addFeed.call(self.idnexJs);
        self.alertMsgNew(6);
        goodsBox.removeFromParent();
        console.log(self.step);
        var oldGuideNode = cc.find('guide');
        oldGuideNode ? oldGuideNode.removeFromParent() : false;
        self.guide();
      },
      this
    );
  },
  guideStep7: function guideStep7(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;
    var goodsNode = cc.find('bg/house/btn', self.scene);
    self.ModalJs = goodsNode.getComponent('Modal');
    //设置position
    var pos = goodsNode.getPosition();
    var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6);

    var jt = cc.find('jt', guideNode);

    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    jt.rotation = 330;
    textintro.active = true;
    jt.setPosition(pos_6.x - 120, pos_6.y + 120);
    textintro.setPosition(pos_6.x - 180, pos_6.y + 170);
    cc.loader.loadRes('guide/pic_7.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = goodsNode.height;
    var width = goodsNode.width;
    var radius = 200;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;
    // cc.loader.loadRes('guide/pic-6', cc.SpriteFrame, function(err, spriteFrame) {
    //   modalSprite.spriteFrame = spriteFrame;
    // });
    //绑定事件
    guideMaskNode.on(
      'click',
      function() {
        jt.active = false;
        textintro.active = false;
        guideMaskNode.removeFromParent();
        self.ModalJs.func.showModal.call(self.ModalJs);
        self.guide();
      },
      this
    );
  },
  guideStep8: function guideStep8(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;

    var goodsNode = cc.find('eggHouse/bg/content/hole0');
    //设置position
    var pos = goodsNode.getPosition();
    var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6);

    var jt = cc.find('jt', guideNode);
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    jt.rotation = 140;
    textintro.active = true;
    jt.setPosition(pos_6.x + 110, pos_6.y - 50);
    textintro.setPosition(pos_6.x + 350, pos_6.y - 230);
    cc.loader.loadRes('guide/pic_8.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = goodsNode.height;
    var width = goodsNode.width;
    var radius = height > width ? height : width;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;
    var items = 1;
    guideMaskNode.on(
      'click',
      function() {
        var goodsNode = cc.find('eggHouse/bg/content/hole' + items);
        //设置position
        var pos = goodsNode.getPosition();
        var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
        var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
        guideMaskNode.setPosition(pos_6);

        jt.rotation = 180;
        jt.setPosition(pos_6.x, pos_6.y - 100);
        // 设置mask宽度和高度
        var height = goodsNode.height;
        var width = goodsNode.width;
        var radius = height > width ? height : width;
        guideMaskNode.height = radius + 15;
        guideMaskNode.width = radius + 15;

        //绑定事件
        items = items + 1;
        if (items == 6) {
          guideMaskNode.on(
            'click',
            function() {
              jt.active = false;
              textintro.active = false;
              guideMaskNode.removeFromParent();
              cc.find('eggHouse').removeFromParent();
              self.alertMsgNew(8);
              console.log(self.step);
              var oldGuideNode = cc.find('guide');
              oldGuideNode ? oldGuideNode.removeFromParent() : false;
              self.guide();
            },
            this
          );
        }
      },
      this
    );
  },

  //清洁
  guideStep9: function guideStep9(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;
    var goodsNode = cc.find('div_action/clear', self.scene);
    //设置position
    var pos = goodsNode.getPosition();
    var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6);

    var jt = cc.find('jt', guideNode);
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    jt.rotation = 330;
    textintro.active = true;
    jt.setPosition(pos_6.x - 100, pos_6.y + 60);
    textintro.setPosition(pos_6.x - 230, pos_6.y + 100);
    cc.loader.loadRes('guide/pic_9.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = goodsNode.height;
    var width = goodsNode.width;
    var radius = height > width ? height : width;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;
    cc.loader.loadRes('guide/pic-8', cc.SpriteFrame, function(err, spriteFrame) {
      modalSprite.spriteFrame = spriteFrame;
    });
    //绑定事件
    guideMaskNode.on(
      'click',
      function() {
        jt.active = false;
        textintro.active = false;
        guideMaskNode.removeFromParent();
        self.alertMsgNew(9);
        console.log(self.step);
        var oldGuideNode = cc.find('guide');
        oldGuideNode ? oldGuideNode.removeFromParent() : false;
        self.guide();
      },
      this
    );
  },

  //喂食
  guideStep10: function guideStep10(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;
    var goodsNode = cc.find('div_action/feed', self.scene);
    //设置position
    var pos = goodsNode.getPosition();
    var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6);

    var jt = cc.find('jt', guideNode);
    jt.rotation = 180;
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    jt.rotation = 300;
    textintro.active = true;
    jt.setPosition(pos_6.x - 100, pos_6.y + 60);
    textintro.setPosition(pos_6.x - 230, pos_6.y + 100);
    cc.loader.loadRes('guide/pic_10.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = goodsNode.height;
    var width = goodsNode.width;
    var radius = height > width ? height : width;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;
    // cc.loader.loadRes('guide/pic-9', cc.SpriteFrame, function(err, spriteFrame) {
    //   modalSprite.spriteFrame = spriteFrame;
    // });
    //绑定事件
    guideMaskNode.on(
      'click',
      function() {
        jt.active = false;
        textintro.active = false;
        guideMaskNode.removeFromParent();
        self.alertMsgNew(10);
        console.log(self.step);
        var oldGuideNode = cc.find('guide');
        oldGuideNode ? oldGuideNode.removeFromParent() : false;
        self.guide();
      },
      this
    );
  },
  //跳到农场
  guideStep11: function guideStep11(guideNode, guideMaskNode, modalSprite, circleNode) {
    var self = this;
    var goodsNode = cc.find('btn-farm', self.scene);
    //设置position
    var pos = goodsNode.getPosition();
    var pos_5 = goodsNode.getNodeToWorldTransformAR(pos);
    var pos_6 = guideNode.convertToNodeSpace(cc.v2(pos_5.tx, pos_5.ty));
    guideMaskNode.setPosition(pos_6);

    var jt = cc.find('jt', guideNode);
    jt.rotation = 180;
    var textintro = cc.find('textintro', guideNode);

    jt.active = true;
    jt.rotation = 260;
    textintro.active = true;
    jt.setPosition(pos_6.x - 110, pos_6.y - 30);
    textintro.setPosition(pos_6.x - 230, pos_6.y - 60);
    cc.loader.loadRes('guide/pic_11.png', cc.SpriteFrame, function(err, spriteFrame) {
      textintro.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    // 设置mask宽度和高度
    var height = goodsNode.height;
    var width = goodsNode.width;
    var radius = 100;
    guideMaskNode.height = radius + 15;
    guideMaskNode.width = radius + 15;

    //绑定事件
    guideMaskNode.on(
      'click',
      function() {
        guideMaskNode.removeFromParent();
        self.idnexJs.func.loadSceneFarm.call(self.idnexJs);
      },
      this
    );
  },
  PostBuy: function PostBuy(prId, count) {
    count = count || 1;
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            console.log('购买成功');
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('购买失败');
            reject(response);
          }
        }
      };
      // POST方法
      xhr.open('POST', Config.apiUrl + '/T_Base_Property/PostBuy', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + Config.openID + '&count=' + count + '&prId=' + prId);
    });
  },
  alertMsgNew: function alertMsgNew(steps) {
    var self = this;
    cc.loader.loadRes('Prefab/MsgNew', cc.Prefab, function(err, prefab) {
      if (err) {
        console.log(err);
        return;
      }
      self.stepGround++;
      self.setStep(self.stepGround).then(function(data) {
        if (data.Code === 1) {
          var AlertTip = cc.instantiate(prefab);

          var parentNode = cc.find('Canvas');
          console.log(self.step);
          self.setAlertIcon(AlertTip, steps);
          parentNode.parent.addChild(AlertTip, 999);
          AlertTip.opacity = 0;
          AlertTip.runAction(cc.fadeIn(0.3));
          setTimeout(function() {
            AlertTip.runAction(
              cc.sequence(
                cc.fadeOut(0.3),
                cc.callFunc(function() {
                  AlertTip.destroy();
                }, this)
              )
            );
          }, 2000);
          setTimeout(function() {
            self.heardJs = cc.find('div_header');
            self.heardJs.emit('upDataMoney', {
              data: 1
            });
          }, 500);

          return true;
        } else {
          return false;
        }
      });
    });
  },
  setAlertIcon: function setAlertIcon(dom, type) {
    var self = this;
    if (type - 1) {
      var icon1, icon2, icon3, txt1, txt2, txt3, layout1, layout2, layout3;
      layout1 = cc.find('New Node/layout1', dom);
      layout2 = cc.find('New Node/layout2', dom);
      layout3 = cc.find('New Node/layout3', dom);
      icon1 = cc.find('New Node/layout1/New Node/msg-ym', dom);
      icon2 = cc.find('New Node/layout2/New Node/msg-ym', dom);
      icon3 = cc.find('New Node/layout3/New Node/msg-ym', dom);
      txt1 = cc.find('New Node/layout1/label', dom);
      txt2 = cc.find('New Node/layout2/label', dom);
      txt3 = cc.find('New Node/layout3/label', dom);
      switch (type) {
        case 4: {
          self.setIcon('Modal/Repertory/icon-1', icon1);
          txt1.getComponent(cc.Label).string = '饲料*50';
          self.setIcon('Modal/Msg/msg-exp', icon2);
          txt2.getComponent(cc.Label).string = '经验值*150';
          self.setIcon('Modal/Msg/chick', icon3);
          txt3.getComponent(cc.Label).string = '产蛋鸡1只';
          layout1.active = true;
          layout2.active = true;
          layout3.active = true;
          break;
        }
        case 6: {
          self.setIcon('Modal/Repertory/icon-asset02', icon1);
          txt1.getComponent(cc.Label).string = '积分*200';
          self.setIcon('Modal/Msg/msg-exp', icon2);
          txt2.getComponent(cc.Label).string = '经验值*100';
          layout1.active = true;
          layout2.active = true;
          break;
        }
        case 8: {
          self.setIcon('Modal/Repertory/icon-1', icon1);
          txt1.getComponent(cc.Label).string = '饲料*50';
          self.setIcon('Modal/Msg/msg-exp', icon2);
          txt2.getComponent(cc.Label).string = '经验值*100';
          self.setIcon('Modal/Repertory/icon-asset05', icon3);
          txt3.getComponent(cc.Label).string = '鸡蛋*8';
          layout1.active = true;
          layout2.active = true;
          layout3.active = true;
          break;
        }
        case 9: {
          self.setIcon('Modal/Msg/shit', icon1);
          txt1.getComponent(cc.Label).string = '粪便*4';
          self.setIcon('Modal/Msg/msg-exp', icon2);
          txt2.getComponent(cc.Label).string = '经验值*100';
          layout1.active = true;
          layout2.active = true;
          break;
        }
        case 10: {
          self.setIcon('Modal/Msg/msg-exp', icon2);
          txt2.getComponent(cc.Label).string = '经验值*150';
          layout2.active = true;
          break;
        }
        default: {
          break;
        }
      }
    }
  },
  setIcon: function setIcon(src, dom) {
    var self = this;
    cc.loader.loadRes(src, cc.SpriteFrame, function(err, spriteFrame) {
      dom.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
  },
  UpdateUserLoginTime: function UpdateUserLoginTime() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('POST', Config.apiUrl + '/T_Base_User/UpdateUserLoginTime');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('OpenID=' + Config.openID);
    });
  },
  //设置step
  setStep: function setStep(step) {
    var isSkip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log(data.Message);
            reject(response);
          }
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Base_User/NoviceGuidance', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + Config.openID + '&step=' + step + '&isSkip=' + isSkip);
    });
  },

  // 通过stepGround 设置step进行到了哪一步
  setStepGround: function setStepGround() {
    switch (this.stepGround) {
      case 0:
        this.step = 0;
        break;
      case 1:
        this.step = 5;
        break;
      case 2:
        this.step = 7;
        break;
      case 3:
        this.step = 9;
        break;
      case 4:
        this.step = 10;
        break;
      case 5:
        this.step = 11;
        break;
      default:
        this.step = 0;
        break;
    }
  }
};
