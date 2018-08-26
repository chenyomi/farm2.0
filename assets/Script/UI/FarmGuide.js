'use strict';

var farmGuid = {
  state: 0,
  prefabItem: null,
  clickBoxPos: null,
  modalSprite: null,
  circleNode: null,
  tool: null,
  tip: null,
  water: null,
  weed: null,
  disinsection: null,
  item: null,
  canvas: null,
  prefabBox: null,
  btnMoreNode: null,
  fertilizer: null,
  fertilizerList: null,
  plantok: null,
  arrow: null,
  pos: null,
  pos_5: null,
  pos_6: null,
  tipPos_: null,
  isTouch: false,
  textintro: null,
  // btn2: null, 跳过按钮
  getPrefab: function getPrefab(i) {
    var self = this;
    cc.loader.loadRes('Prefab/guide', cc.Prefab, function(err, prefab) {
      if (err) {
        console.log(err);
        return;
      }
      self.prefabItem = cc.instantiate(prefab);
      self.clickBoxPos = cc.find('mask-guide', self.prefabItem);
      self.tip = cc.find('tip', self.prefabItem);
      self.item = cc.find('item', self.prefabItem);
      self.modalBlock = cc.find('mask-guide/modal', self.prefabItem);
      // self.btn2 = cc.find('btn2', self.prefabItem);
      self.tool = cc.find('tool', self.prefabItem);
      self.weed = cc.find('plant-weed', self.prefabItem);
      self.water = cc.find('plant-water', self.prefabItem);
      self.plantok = cc.find('plant-ok', self.prefabItem);
      self.fertilizer = cc.find('plant', self.prefabItem);
      self.textintro = cc.find('textintro', self.prefabItem);
      self.fertilizerList = cc.find('fertilizerList', self.prefabItem);
      self.disinsection = cc.find('plant-disinsection', self.prefabItem);
      self.arrow = cc.find('jt', self.prefabItem);
      self.modalSprite = cc.find('modal', self.clickBoxPos).getComponent(cc.Sprite);
      self.circleNode = cc.find('circle', self.clickBoxPos);

      self.canvas = cc.find('Canvas');
      self.prefabBox = self.canvas.parent;
      self.prefabBox.addChild(self.prefabItem);

      switch (i) {
        case 0: {
          self.step0();
          break;
        }
      }
    });
  },

  //设置position
  setPosition_: function setPosition_(src, x, y) {
    var self = this;
    self.btnMoreNode = cc.find(src, self.canvas);
    self.pos = self.btnMoreNode.getPosition();
    self.pos_5 = self.btnMoreNode.getNodeToWorldTransformAR(self.pos);
    self.pos_6 = self.prefabItem.convertToNodeSpace(cc.v2(self.pos_5.tx, self.pos_5.ty));
    if (x) {
      self.clickBoxPos.setPosition(x, y);
    } else {
      self.clickBoxPos.setPosition(self.pos_6);
      self.arrowJump(self.arrow, self.pos_6.x, self.pos_6.y + 100);
    }
  },
  // 设置mask宽度和高度
  setMaskSize_: function setMaskSize_(e) {
    var self = this;
    var height = self.btnMoreNode.height;
    var width = self.btnMoreNode.width;
    if (e) {
      var radius = 100;
    } else {
      var radius = height > width ? height : width;
    }

    self.clickBoxPos.height = radius + 15;
    self.clickBoxPos.width = radius + 15;
  },
  step0: function() {
    var self = this;
    var modalSprite = cc.find('mask-guide/modal', self.prefabItem).getComponent(cc.Sprite);
    cc.loader.loadRes('guide/pic-12', cc.SpriteFrame, function(err, spriteFrame) {
      modalSprite.spriteFrame = spriteFrame;
    });
    self.prefabItem.on('click', function() {
      self.step1();
      self.prefabItem.off('click');
      cc.loader.loadRes('guide/black', cc.SpriteFrame, function(err, spriteFrame) {
        modalSprite.spriteFrame = spriteFrame;
      });
    });
  },

  //播种
  step1: function step1() {
    var self = this;

    var tipBox = cc.find('bg/mapNew/item0', self.canvas);
    var tipPos = tipBox.getPosition();
    self.tipPos_ = tipBox.getNodeToWorldTransformAR(tipPos);
    cc.loader.loadRes('guide/black', cc.SpriteFrame, function(err, spriteFrame) {
      self.modalBlock.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    self.item.setPosition(self.tipPos_.tx, self.tipPos_.ty);
    self.tip.setPosition(self.tipPos_.tx, self.tipPos_.ty);
    self.water.setPosition(self.tipPos_.tx, self.tipPos_.ty);
    self.disinsection.setPosition(self.tipPos_.tx, self.tipPos_.ty);
    self.weed.setPosition(self.tipPos_.tx, self.tipPos_.ty);
    self.fertilizer.setPosition(self.tipPos_.tx, self.tipPos_.ty);
    self.plantok.setPosition(self.tipPos_.tx, self.tipPos_.ty);
    self.tip.active = true;
    self.item.active = true;
    self.textintro.active = true;
    self.arrow.active = true;
    self.setPosition_('tool/layout/farm_icon_01');
    // self.setTxtIntro('guide/farm-text01', self.textintro, self.pos_6.x + 180, self.pos_6.y + 120);
    self.setMaskSize_();
    cc.loader.loadRes('Farm/seed', cc.SpriteFrame, function(err, spriteFrame) {
      self.tip.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    self.endAddListen(self.tip, function() {
      self.step2();
    });
  },
  //浇水
  step2: function step2() {
    var self = this;
    self.setPosition_('tool/layout/farm_icon_02');
    // self.setTxtIntro('guide/farm-text02', self.textintro, self.pos_6.x, self.pos_6.y + 80);
    self.setMaskSize_();
    self.water.active = true;

    self.endAddListen(self.water, function() {
      self.step3();
    });
  },
  //除草
  step3: function step3() {
    var self = this;
    self.setPosition_('tool/layout/farm_icon_03');
    // self.setTxtIntro('guide/farm-text04', self.textintro, self.pos_6.x, self.pos_6.y + 80);
    self.setMaskSize_();
    self.weed.active = true;

    self.endAddListen(self.weed, function() {
      self.step4();
    });
  },
  //除虫
  step4: function step4() {
    var self = this;
    self.setPosition_('tool/layout/farm_icon_04');
    // self.setTxtIntro('guide/farm-text06', self.textintro, self.pos_6.x, self.pos_6.y + 80);
    self.setMaskSize_();
    self.disinsection.active = true;

    self.endAddListen(self.disinsection, function() {
      self.step5();
    });
  },
  //施肥选择肥料
  step5: function step5() {
    var self = this;
    self.setPosition_('tool/layout/farm_icon_05');
    // self.setTxtIntro('guide/farm-text08', self.textintro, self.pos_6.x, self.pos_6.y + 80);
    // self.arrowJump(self.arrow, self.pos_6.x - 60, self.pos_6.y + 300);
    self.setMaskSize_();
    self.fertilizer.active = true;
    self.clickBoxPos.on('click', function() {
      self.fertilizerList.setPosition(self.pos_6.x, self.pos_6.y + 90);
      self.fertilizerList.active = true;
      self.step6();
    });
  },
  //施肥
  step6: function step6() {
    var self = this;
    self.setPosition_('tool/layout/farm_icon_05', self.pos_6.x - 60, self.pos_6.y + 150);
    // self.setTxtIntro('guide/farm-text09', self.textintro, self.pos_6.x - 60, self.pos_6.y + 230);
    self.arrowJump(self.arrow, self.pos_6.x - 60, self.pos_6.y + 300);
    self.setMaskSize_(1);
    self.fertilizer.active = true;
    self.endAddListen(self.fertilizer, function() {
      self.fertilizerList.active = false;
      self.step7();
    });
  },
  //收割
  step7: function step7() {
    var self = this;
    self.setPosition_('tool/layout/farm_icon_06');
    // self.setTxtIntro('guide/farm-text11', self.textintro, self.pos_6.x, self.pos_6.y + 80);
    self.setMaskSize_();
    self.plantok.active = true;
    self.endAddListen(self.plantok, function() {
      self.step8();
    });
  },
  step8: function step8() {
    var _this = this;

    var self = this;

    self.prefabItem.removeFromParent();

    self.alertMdal();
    cc.loader.loadRes('Prefab/guide', function(err, prefab) {
      if (err) {
        console.log(err);
        return;
      }
      var guideNode = cc.instantiate(prefab);
      var guideMaskNode = cc.find('mask-guide', guideNode);
      var modalSprite = cc.find('modal', guideMaskNode).getComponent(cc.Sprite);
      var circleNode = cc.find('circle', guideMaskNode);
      cc.loader.loadRes('guide/pic-11', cc.SpriteFrame, function(err, spriteFrame) {
        modalSprite.spriteFrame = spriteFrame;
      });
      circleNode.active = false;
      guideNode.on('click', _this.finishGuide, _this);
      cc.find('Canvas').parent.addChild(guideNode);
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
      xhr.send('openID=' + Config.openID + '&step=' + step + '&isSkip=0' + isSkip);
    });
  },
  endAddListen: function endAddListen(removedom2, callBack) {
    var self = this;
    self.clickBoxPos.on(
      'click',
      function(e) {
        removedom2.active = false;
        if (callBack) {
          callBack();
        }
      },
      this
    );
  },
  arrowJump: function arrowJump(dom, x, y) {
    var self = this;
    dom.active = true;
    dom.setPosition(x, y);
    dom.stopAllActions();
    dom.runAction(cc.repeatForever(cc.jumpTo(1, x, y, 20, 1)));
  },
  setIcon: function setIcon(src, dom) {
    var self = this;
    cc.loader.loadRes(src, cc.SpriteFrame, function(err, spriteFrame) {
      dom.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
  },
  setTxtIntro: function setTxtIntro(src, dom, x, y) {
    var self = this;
    cc.loader.loadRes(src, cc.SpriteFrame, function(err, spriteFrame) {
      dom.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
    dom.setPosition(x, y);
  },
  alertMdal: function alertMdal() {
    var self = this;
    cc.loader.loadRes('Prefab/MsgNew', cc.Prefab, function(err, prefab) {
      if (err) {
        console.log(err);
        return;
      }
      self.setStep(6).then(function(data) {
        if (data.Code === 1) {
          var AlertTip = cc.instantiate(prefab);
          var parentNode = cc.find('Canvas');
          var layout1 = cc.find('New Node/layout1', AlertTip);
          var layout2 = cc.find('New Node/layout2', AlertTip);
          var layout3 = cc.find('New Node/layout3', AlertTip);
          var icon1 = cc.find('New Node/layout1/New Node/msg-ym', AlertTip);
          var icon2 = cc.find('New Node/layout2/New Node/msg-ym', AlertTip);
          var icon3 = cc.find('New Node/layout3/New Node/msg-ym', AlertTip);
          var txt1 = cc.find('New Node/layout1/label', AlertTip);
          var txt2 = cc.find('New Node/layout2/label', AlertTip);
          var txt3 = cc.find('New Node/layout3/label', AlertTip);
          self.setIcon('Modal/Msg/msg-ym', icon1);
          self.setIcon('Modal/Repertory/icon-asset02', icon2);
          self.setIcon('Modal/Msg/msg-exp', icon3);
          layout1.active = true;
          layout2.active = true;
          layout3.active = true;
          parentNode.parent.addChild(AlertTip, 5);
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
  //新手指引结束

  finishGuide: function finishGuide() {
    var requires = new Promise(function(resolve, reject) {
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
      xhr.open('POST', Config.apiUrl + '/T_Base_User/finishGuidance', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + Config.openID);
    });
    requires.then(function(data) {
      if (data.Code === 1) {
        cc.director.loadScene('index');
        Config.isfinishGuide = 1;
      } else {
        Msg.show('请重新点击');
      }
    });
  }
};
