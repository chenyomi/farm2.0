var Data = require('Data');
var Func = Data.func;
var Tool = require('Tool').Tool;
cc.Class({
  extends: cc.Component,

  properties: {},

  // 关闭模态框
  closeModal() {
    Tool.closeModal(this.node);
  },

  signIn() {
    let self = this;
    this.canlendarJs.todayNode.getChildByName('item_do').active = true;
    this.canlendarJs.todayNode.getChildByName('item_undo').active = false;
    Func.NewSign().then(data => {
      if (data.Code === 1) {
        var signButton = cc.find('bg/btn-sign', this.node);
        cc.loader.loadRes('index/btn-hasSign', cc.SpriteFrame, function(err, spriteFrame) {
          signButton.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        Config.SignFlowCount++;
        self.setNewState();
        //更新头部数据
        Tool.updateHeader();
        Msg.show(data.Message);
      }
    });
  },

  onLoad() {
    this.calendarNode = cc.find('bg/calendar', this.node);
    this.canlendarJs = this.calendarNode.getComponent('Calendar');
  },

  start() {
    let self = this;
    this.box1 = cc.find('bg/layout/node1/sign01', this.node);
    this.box2 = cc.find('bg/layout/node2/sign02', this.node);
    this.box3 = cc.find('bg/layout/node3/sign03', this.node);
    this.box4 = cc.find('bg/layout/node4/sign04', this.node);
    Func.GetSignList().then(data => {
      if (data.Code === 1) {
        // 数据的年份 月份
        let year = data.List[0].signtime.match(/\d+/g)[0];
        let month = data.List[0].signtime.match(/\d+/g)[1] - 1; //为什么要减一

        this.canlendarJs.func.initCalendar.call(this.canlendarJs, data.List, year, month);
        //已签到 按钮变灰
        if (this.canlendarJs.todayNode.getChildByName('item_do').active) {
          var signButton = cc.find('bg/btn-sign', this.node);
          cc.loader.loadRes('index/btn-hasSign', cc.SpriteFrame, function(err, spriteFrame) {
            signButton.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            signButton.getComponent(cc.Button).interactable = false;
          });
        }
        this.BoxType1 = 0;
        this.BoxType2 = 0;
        this.BoxType3 = 0;
        this.BoxType4 = 0;
        for (let i = 0; i < data.OpenBoxList.length; i++) {
          switch (data.OpenBoxList[i].BoxType) {
            case 1: {
              this.BoxType1 = 1;
              break;
            }
            case 2: {
              this.BoxType2 = 1;
              break;
            }
            case 3: {
              this.BoxType3 = 1;
              break;
            }
            case 4: {
              this.BoxType4 = 1;
              break;
            }
          }
        }
        self.setNewState();
      } else {
        Msg.show(data.Message);
      }
    });
    console.log(Config.SignFlowCount);
    // Func.SignContinueReward().then(data => {
    //   if (data.Code === 1) {
    //   } else {
    //     Msg.show(data.Message);
    //   }
    // });
  },
  setNewState() {
    let self = this;
    if (Config.SignFlowCount > 4) {
      let imgsrc = '';
      if (this.BoxType1) {
        imgsrc = 'Modal/Sign/sign01_';
      } else {
        imgsrc = 'Modal/Sign/sign01';
        this.bindBoxEvent(self.box1, 5, 1);
      }
      cc.loader.loadRes(imgsrc, cc.SpriteFrame, function(err, spriteFrame) {
        self.box1.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    }
    if (Config.SignFlowCount > 9) {
      let imgsrc = '';
      if (this.BoxType2) {
        imgsrc = 'Modal/Sign/sign02_';
      } else {
        imgsrc = 'Modal/Sign/sign02';
        this.bindBoxEvent(self.box2, 10, 2);
      }
      cc.loader.loadRes(imgsrc, cc.SpriteFrame, function(err, spriteFrame) {
        self.box2.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    }
    if (Config.SignFlowCount > 19) {
      let imgsrc = '';
      if (this.BoxType3) {
        imgsrc = 'Modal/Sign/sign03_';
      } else {
        imgsrc = 'Modal/Sign/sign03';
        this.bindBoxEvent(self.box3, 20, 3);
      }
      cc.loader.loadRes(imgsrc, cc.SpriteFrame, function(err, spriteFrame) {
        self.box3.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    }
    if (Config.SignFlowCount > 29) {
      let imgsrc = '';
      if (this.BoxType4) {
        imgsrc = 'Modal/Sign/sign04_';
      } else {
        imgsrc = 'Modal/Sign/sign04';
        this.bindBoxEvent(self.box4, 30, 4);
      }
      cc.loader.loadRes(imgsrc, cc.SpriteFrame, function(err, spriteFrame) {
        self.box4.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    }
  },
  bindBoxEvent(node, dayFlow, boxType) {
    let self = this;
    node.on('click', function() {
      Func.SignContinueReward(dayFlow, boxType).then(data => {
        if (data.Code === 1) {
          cc.loader.loadRes('Modal/Sign/sign0' + boxType + '_', cc.SpriteFrame, function(err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          Msg.show(data.Message);
        }
      });
    });
  }
});
