var Data = require('Data');
var utils = require('utils');
var Func = Data.func;

cc.Class({
  extends: cc.Component,

  properties: {
    MessageItem_Prefab: {
      default: null,
      type: cc.Prefab
    }
  },

  // onLoad () {},

  start() {
    var self = this;
    this.itemBox = cc.find('alertBackground/scrollview/view/layout', this.node);
    this.emptyNode = cc.find('alertBackground/scrollview/empty', this.node);

    var cancelButton = cc.find('close', this.node);
    //关闭模态框
    cancelButton.on('click', () => {
      this.node.active = false;
    });
    this.fetch();
  },
  fetch() {
    Func.AllChickenLayEggTime().then(data => {
      if (data.Code === 1) {
        for (let i = 0; i < data.Lis.length; i++) {
          let allTime;
          let prefab = cc.instantiate(this.MessageItem_Prefab);
          let chickId = cc.find('ChickLayEggBox/New Node/label', prefab).getComponent(cc.Label);
          let barValue = cc.find('ChickLayEggBox/New Node/barbox/progressBar', prefab).getComponent(cc.ProgressBar);
          let maskBar = cc.find('ChickLayEggBox/New Node/barbox/progressBar/maskBar', prefab);
          let bar = cc.find('ChickLayEggBox/New Node/barbox/progressBar/maskBar/bar', prefab).getComponent(cc.Sprite);
          let barText = cc.find('ChickLayEggBox/New Node/barbox/label', prefab).getComponent(cc.Label);
          chickId.string = data.Lis[i].ID;

          if (data.Lis[i].IsStop) {
            barText.string = `饱食度低于80 （暂停下蛋）`;
            cc.loader.loadRes('index/barcolor2', cc.SpriteFrame, (err, spriteFrame) => {
              bar.spriteFrame = spriteFrame;
            });
          } else {
            cc.loader.loadRes('index/barcolor', cc.SpriteFrame, (err, spriteFrame) => {
              bar.spriteFrame = spriteFrame;
            });
            let time = utils.fn.timeDiffHour(data.Lis[i].LayEggRemainTimes);
            barText.string = `距下次产蛋时间：${time.days}天${time.hours}小时${time.mins}分`;
          }
          if (data.Lis[i].LayEggCount == 0) {
            allTime = 25 * 60;
          } else {
            allTime = 36 * 60;
          }
          barValue.progress = 1 - data.Lis[i].LayEggRemainTimes / allTime;
          maskBar.active = true;
          this.itemBox.addChild(prefab);
        }
      } else {
      }
    });
  }

  // update (dt) {},
});
