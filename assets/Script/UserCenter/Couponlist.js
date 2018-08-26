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
    Config.backArr.indexOf('CouPonList') == -1 ? Config.backArr.push('CouPonList') : false;
    console.log(Config.backArr);
    // this.scrollview.node.on("scroll-to-bottom", this.updataByBottom, this);
    // Data.func.GetUserData(1, 16).then(data => {
    //   this.setBuyPropertyList(data);
    // });
  },

  start() {},
  setBuyPropertyList(data) {
    //PropType  0：积分  1：牧场币
    if (data.Model.BuyPropertyList == null) {
      let nodata = cc.find('scrollview/view/layout/sprite/label', this.node).getComponent(cc.Label);
      nodata.string = '没有更多内容';
      return (this.hasMore = false);
    } else if (data.Model.BuyPropertyList.length < 15) {
      let nodata = cc.find('scrollview/view/layout/sprite/label', this.node).getComponent(cc.Label);
      nodata.string = '没有更多内容';
    }
    if (data.Code == 1) {
      for (let i = 0; i < data.Model.BuyPropertyList.length; i++) {
        const PropertyList = cc.instantiate(this.PropertyList_Prefab);
        const PrefabParent = cc.find('scrollview/view/layout/list', this.node);
        let icon_1 = cc.find('flex-left/icon-asset01', PropertyList).getComponent(cc.Sprite);
        let icon_2 = cc.find('flex-left/icon-asset04', PropertyList).getComponent(cc.Sprite);
        let name_1 = cc.find('flex-left/name1', PropertyList).getComponent(cc.Label);
        let name_2 = cc.find('flex-left/name2', PropertyList).getComponent(cc.Label);
        let num_1 = cc.find('flex-left/num1', PropertyList).getComponent(cc.Label);
        let num_2 = cc.find('flex-left/num2', PropertyList).getComponent(cc.Label);
        let day = cc.find('flex-right/value', PropertyList).getComponent(cc.Label);
        let time = cc.find('flex-right/time', PropertyList).getComponent(cc.Label);
        let imgSrc, imgSrc_;
        data.Model.BuyPropertyList[i].PropType
          ? ((imgSrc = 'Modal/Repertory/icon-asset01'), (name_1.string = '牧场币'))
          : ((imgSrc = 'Modal/Repertory/icon-asset02'), (name_1.string = '积分'));

        switch (data.Model.BuyPropertyList[i].PropertyTypeID) {
          //普通饲料
          case 4: {
            imgSrc_ = 'Modal/Repertory/icon-1';
            break;
          }
          //玉米种子
          case 6: {
            imgSrc_ = 'Modal/Repertory/ymzz_xs';
            break;
          }
          //普通肥料
          case 7: {
            imgSrc_ = 'Modal/Repertory/hf_xs';
            break;
          }
          //超级肥料
          case 9: {
            imgSrc_ = 'Modal/Repertory/hf_xs';
            break;
          }
          //改名卡
          case 14: {
            imgSrc_ = 'Modal/Repertory/icon-1';
            break;
          }
          //产蛋鸡
          case 13: {
            imgSrc_ = 'Modal/Repertory/icon-asset04';
            break;
          }
          //自动清洁机
          case 12: {
            imgSrc_ = 'Modal/Repertory/icon-bot-xs';
            break;
          }
        }

        cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
          icon_1.spriteFrame = spriteFrame;
        });
        cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
          icon_2.spriteFrame = spriteFrame;
        });
        num_1.string = '-' + data.Model.BuyPropertyList[i].PropValue;
        num_2.string = '+' + data.Model.BuyPropertyList[i].Count;
        name_2.string = data.Model.BuyPropertyList[i].PropName;
        day.string = utils.fn.formatNumToDate(data.Model.BuyPropertyList[i].CreateTime);
        time.string = utils.fn.formatNumToDateTime(data.Model.BuyPropertyList[i].CreateTime);
        PrefabParent.addChild(PropertyList);
        Tool.RunAction(PropertyList, 'fadeIn', 0.15);
      }
    } else {
      console.log(data.Message);
    }
  },
  updataByBottom() {
    this.pageIndex++;
    if (this.hasMore) {
      Data.func.GetUserData(this.pageIndex, this.pageSize).then(data => {
        this.setBuyPropertyList(data);
      });
    }
  }

  // update (dt) {},
});
