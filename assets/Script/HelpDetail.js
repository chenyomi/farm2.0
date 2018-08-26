var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
cc.Class({
  extends: cc.Component,

  properties: {},

  // onLoad () {},

  start() {},

  back() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },
  onLoad() {
    let self = this;
    Config.backArr.indexOf('HelpDetail') == -1 ? Config.backArr.push('HelpDetail') : false;
    this.ImgNode = cc.find('bg/scrollview/view/page', this.node).getComponent(cc.Sprite);
    this.labels = cc.find('bg/info/label', this.node).getComponent(cc.Label);
    cc.loader.loadRes('Modal/guides0' + Config.guideIntro, cc.SpriteFrame, (err, spriteFrame) => {
      self.ImgNode.spriteFrame = spriteFrame;
    });
    switch (Config.guideIntro) {
      case 0: {
        this.labels.string = '关于我们';
        break;
      }
      case 1: {
        this.labels.string = '认养与弃养';
        break;
      }
      case 2: {
        this.labels.string = '产蛋棚与牧场';
        break;
      }
      case 3: {
        this.labels.string = '饲养与产蛋';
        break;
      }
      case 4: {
        this.labels.string = '贵妃鸡与贵妃鸡蛋';
        break;
      }
      case 5: {
        this.labels.string = '鸡蛋的兑换与交易';
        break;
      }
      case 6: {
        this.labels.string = '鸡的兑换、置换与交易';
        break;
      }
      case 7: {
        this.labels.string = '牧场币与积分';
        break;
      }
      case 8: {
        this.labels.string = '清洁';
        break;
      }
      case 9: {
        this.labels.string = '农场';
        break;
      }
      case 10: {
        this.labels.string = '好友操作';
        break;
      }
    }
  }
  // update (dt) {},
});
