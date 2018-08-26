var Data = require('Data');
var utils = require('utils');
var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
cc.Class({
  extends: cc.Component,

  properties: {
    PropertyList_Prefab: {
      default: null,
      type: cc.Prefab
    },
    scrollview: cc.ScrollView,
    pageIndex: 1,
    pageSize: 16,
    hasMore: true
  },

  // LIFE-CYCLE CALLBACKS:
  btnBackEvent() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },
  onLoad() {
    let self = this;
    self.PrefabParent = cc.find('scrollview/view/layout/list', self.node);
    Config.backArr.indexOf('recoverList') == -1 ? Config.backArr.push('recoverList') : false;
    console.log(Config.backArr);
    this.scrollview.node.on('scroll-to-bottom', this.updataByBottom, this);
    //全部
    Data.func.GetTransAndExchangeListByPage(1, 16, 2).then(data => {
      this.setBuyPropertyList(data);
    });
  },
  getDataList(type) {
    Data.func.GetTransAndExchangeListByPage(1, 16, type).then(data => {
      this.setBuyPropertyList(data);
    });
  },
  start() {},
  setBuyPropertyList(data) {
    //PropType  0：积分  1：牧场币
    if (data.List == null) {
      let nodata = cc.find('scrollview/view/layout/sprite/label', this.node).getComponent(cc.Label);
      nodata.string = '没有更多内容';
      return (this.hasMore = false);
    } else if (data.List.length < 15) {
      let nodata = cc.find('scrollview/view/layout/sprite/label', this.node).getComponent(cc.Label);
      nodata.string = '没有更多内容';
    }
    if (data.Code == 1) {
      for (let i = 0; i < data.List.length; i++) {
        const PropertyList = cc.instantiate(this.PropertyList_Prefab);
        let icon_1 = cc.find('flex-left/icon-asset01', PropertyList).getComponent(cc.Sprite);
        let icon_2 = cc.find('flex-left/icon-asset04', PropertyList).getComponent(cc.Sprite);
        let name_1 = cc.find('flex-left/name1', PropertyList).getComponent(cc.Label);
        let name_2 = cc.find('flex-left/name2', PropertyList).getComponent(cc.Label);
        let num_1 = cc.find('flex-left/num1', PropertyList).getComponent(cc.Label);
        let num_2 = cc.find('flex-left/num2', PropertyList).getComponent(cc.Label);
        let day = cc.find('flex-right/value', PropertyList).getComponent(cc.Label);
        let time = cc.find('flex-right/time', PropertyList).getComponent(cc.Label);
        let imgSrc, imgSrc_, counts;
        //兑换鸡或鸡蛋
        if (data.List[i].TradingType == 1) {
          //兑换贵妃鸡
          imgSrc = 'Modal/Repertory/icon-asset04';
          cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
            icon_1.spriteFrame = spriteFrame;
          });
          cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
            icon_2.spriteFrame = spriteFrame;
          });
          name_1.string = '虚拟贵妃鸡';
          num_1.string = '-' + data.List[i].PCount * 1;
          name_2.string = '真实贵妃鸡';
          num_2.string = '+' + data.List[i].PCount;
        } else {
          //兑换鸡蛋
          imgSrc = 'Modal/Repertory/icon-asset05';
          cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
            icon_1.spriteFrame = spriteFrame;
          });
          cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
            icon_2.spriteFrame = spriteFrame;
          });
          name_1.string = '虚拟鸡蛋';
          num_1.string = '-' + data.List[i].PCount * 12;
          name_2.string = '真实鸡蛋';
          num_2.string = '+' + data.List[i].PCount;
          day.string = utils.fn.formatNumToDate(data.List[i].CreateTime);
          time.string = utils.fn.formatNumToDateTime(data.List[i].CreateTime);
          this.PrefabParent.addChild(PropertyList);
          Tool.RunAction(PropertyList, 'fadeIn', 0.15);
        }
      }
    } else {
      console.log(data.Message);
    }
  },
  updataByBottom() {
    this.pageIndex++;
    if (this.hasMore) {
      Data.func.GetTransAndExchangeListByPage(this.pageIndex, this.pageSize, 2).then(data => {
        this.setBuyPropertyList(data);
      });
    }
  }

  // update (dt) {},
});
