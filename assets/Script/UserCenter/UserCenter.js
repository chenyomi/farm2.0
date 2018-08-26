var Data = require('Data');
var utils = require('utils');
var Tool = require('Tool').Tool;
cc.Class({
  extends: cc.Component,

  properties: {
    PropertyList_Prefab: {
      default: null,
      type: cc.Prefab
    }
  },
  btnBackEvent() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },
  btnGoTradeEvent() {
    cc.director.loadScene('tradelist');
  },
  btnGocoupon() {
    cc.director.loadScene('CouPonList');
  },
  btnHelpCenter() {
    cc.director.loadScene('Help');
  },
  btnGoAddressList() {
    cc.director.loadScene('AddressList');
  },
  btnGotorep() {
    cc.director.loadScene('repertory');
  },
  btnGotorechargeList() {
    cc.director.loadScene('rechargeList');
  },
  btnGotorecoverList() {
    cc.director.loadScene('recoverList');
  },
  outLogin() {
    window.location = 'http://wxapi.zjytny.cn';
  },
  onLoad() {
    let self = this;
    Config.backArr.indexOf('userCenter') == -1 ? Config.backArr.push('userCenter') : false;
    console.log(Config.backArr);
    Data.func.GetUserData(1, 4).then(data => {
      this.setData(data);
      this.setBuyPropertyList(data);
    });
    this.EditName();
    this.Contact();
    this.getAddress();
  },
  setHeadImg(dom) {
    if (Config.headImg !== '') {
      cc.loader.load({ url: Config.headImg, type: 'png' }, function(err, texture) {
        var frame = new cc.SpriteFrame(texture);
        dom.getComponent(cc.Sprite).spriteFrame = frame;
      });
    }
  },
  //获取用户参数
  setData(data) {
    if (data.Code == 1) {
      let userName = cc.find('scrollview/view/layout/info/nameEdit/label', this.node);
      let Grade = cc.find('scrollview/view/layout/info/level/label', this.node);
      let HeadImg = cc.find('scrollview/view/layout/info/advisor/advisor', this.node);
      let GradeEXP = cc.find('scrollview/view/layout/info/level/label2', this.node);
      let ExperienceValue = cc.find('scrollview/view/layout/info/level/progressBar', this.node);
      let RanchMoney = cc.find('scrollview/view/layout/myAssets1/box/flex-right/value', this.node);
      let PointValue = cc.find('scrollview/view/layout/myAssets1/box2/flex-right/value', this.node);

      Grade.getComponent(cc.Label).string = 'LV.' + data.Model.Grade;
      GradeEXP.getComponent(cc.Label).string = data.Model.ExperienceValue + '/' + data.Model.GradeExperienceValue;
      userName.getComponent(cc.Label).string = data.Model.RealName;
      ExperienceValue.getComponent(cc.ProgressBar).progress =
        data.Model.ExperienceValue / data.Model.GradeExperienceValue;
      RanchMoney.getComponent(cc.Label).string = data.Model.RanchMoney;
      PointValue.getComponent(cc.Label).string = data.Model.Point;
      this.setHeadImg(HeadImg);
    } else {
      // console.log(data.Message);
    }
  },

  setBuyPropertyList(data) {
    //PropType  0：积分  1：牧场币
    this.emptyNode = cc.find('scrollview/view/layout/myAssets2/empty', this.node);
    this.emptyNode.active = false;
    if (data.Code == 1) {
      if (data.Model.BuyPropertyList) {
        for (let i = 0; i < data.Model.BuyPropertyList.length; i++) {
          const PropertyList = cc.instantiate(this.PropertyList_Prefab);
          const PrefabParent = cc.find('scrollview/view/layout/myAssets2/layout', this.node);
          let icon_1 = cc.find('flex-left/icon-asset01', PropertyList).getComponent(cc.Sprite);
          let icon_2 = cc.find('flex-left/icon-asset04', PropertyList).getComponent(cc.Sprite);
          let name_1 = cc.find('flex-left/name1', PropertyList).getComponent(cc.Label);
          let name_2 = cc.find('flex-left/name2', PropertyList).getComponent(cc.Label);
          let num_1 = cc.find('flex-left/num1', PropertyList).getComponent(cc.Label);
          let num_2 = cc.find('flex-left/num2', PropertyList).getComponent(cc.Label);
          let day = cc.find('flex-right/value', PropertyList).getComponent(cc.Label);
          let time = cc.find('flex-right/time', PropertyList).getComponent(cc.Label);
          let imgSrc, imgSrc_, counts;
          if (data.Model.BuyPropertyList[i].PrID != 0) {
            switch (data.Model.BuyPropertyList[i].ShowType) {
              case 0: {
                data.Model.BuyPropertyList[i].PropType
                  ? ((imgSrc = 'Modal/Repertory/icon-asset01'), (name_1.string = '牧场币'))
                  : ((imgSrc = 'Modal/Repertory/icon-asset02'), (name_1.string = '积分'));

                switch (data.Model.BuyPropertyList[i].PrID) {
                  //普通饲料
                  case 1: {
                    imgSrc_ = 'Modal/Repertory/icon-1';
                    counts = 2;
                    break;
                  }
                  case 2: {
                    imgSrc_ = 'Modal/Repertory/icon-1';
                    counts = 1;
                    break;
                  }
                  //普通肥料
                  case 13: {
                    imgSrc_ = 'Modal/Repertory/hf_xs';
                    counts = 1;
                    break;
                  }
                  case 15: {
                    imgSrc_ = 'Modal/Repertory/icon-1';
                    counts = 50;
                    break;
                  }
                  case 16: {
                    imgSrc_ = 'Modal/Repertory/icon-1';
                    counts = 100;
                    break;
                  }
                  case 17: {
                    imgSrc_ = 'Modal/Repertory/icon-1';
                    counts = 500;
                    break;
                  }
                  //普通肥料
                  case 19: {
                    imgSrc_ = 'Modal/Repertory/hf_xs';
                    counts = 1;
                    break;
                  }
                  //超级肥料
                  case 20: {
                    imgSrc_ = 'Modal/Repertory/hf_xs';
                    counts = 1;
                    break;
                  }
                  //玉米种子
                  case 12: {
                    imgSrc_ = 'Modal/Repertory/ymzz_xs';
                    counts = 1;
                    break;
                  }
                  //改名卡
                  case 21: {
                    imgSrc_ = 'Modal/Repertory/icon-name_xs';
                    counts = 1;
                    break;
                  }
                  //产蛋鸡
                  case 18: {
                    imgSrc_ = 'Modal/Repertory/icon-asset04';
                    counts = 1;
                    break;
                  }
                  //自动清洁机
                  case 22: {
                    imgSrc_ = 'Modal/Repertory/icon-bot-xs';
                    counts = 1;
                    break;
                  }
                  //玉米种子*12
                  case 23: {
                    imgSrc_ = 'Modal/Repertory/ymzz_xs';
                    counts = 12;
                    break;
                  }
                  //可交易鸡蛋*26
                  case 26: {
                    imgSrc_ = 'Modal/Repertory/icon-asset05';
                    counts = 1;
                    break;
                  }
                  default: {
                    break;
                  }
                }
                num_1.string = '-' + data.Model.BuyPropertyList[i].PropValue * data.Model.BuyPropertyList[i].BuyCount;
                num_2.string = '+' + data.Model.BuyPropertyList[i].BuyCount * counts;
                name_2.string = data.Model.BuyPropertyList[i].PropName;
                cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_1.spriteFrame = spriteFrame;
                });
                cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_2.spriteFrame = spriteFrame;
                });
                day.string = utils.fn.formatNumToDate(data.Model.BuyPropertyList[i].CreateTime);
                time.string = utils.fn.formatNumToDateTime(data.Model.BuyPropertyList[i].CreateTime);
                PrefabParent.addChild(PropertyList);
                break;
              }
              case 1: {
                //充值记录;
                imgSrc = 'Modal/Repertory/icon-asset01';
                name_1.string = '牧场币';
                cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_1.spriteFrame = spriteFrame;
                });
                cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_2.spriteFrame = spriteFrame;
                });
                let icon_2_dom = cc.find('flex-left/icon-asset04', PropertyList);
                icon_2_dom.active = false;
                num_1.string = '+' + data.Model.BuyPropertyList[i].RanchMoney;
                num_2.string = '';
                name_2.string = '成功充值' + data.Model.BuyPropertyList[i].RechargeMoney + '元';
                day.string = utils.fn.formatNumToDate(data.Model.BuyPropertyList[i].CreateTime);
                time.string = utils.fn.formatNumToDateTime(data.Model.BuyPropertyList[i].CreateTime);
                PrefabParent.addChild(PropertyList);
                break;
              }
              case 2: {
                if (data.Model.BuyPropertyList[i].TradingType == 1) {
                  //兑换贵妃鸡
                  imgSrc = 'Modal/Repertory/icon-asset04';
                  cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_1.spriteFrame = spriteFrame;
                  });
                  cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_2.spriteFrame = spriteFrame;
                  });
                  name_1.string = '虚拟贵妃鸡';
                  num_1.string = '-' + data.Model.BuyPropertyList[i].PCount * 1;
                  name_2.string = '真实贵妃鸡';
                  num_2.string = '+' + data.Model.BuyPropertyList[i].PCount;
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
                  num_1.string = '-' + data.Model.BuyPropertyList[i].PCount * 12;
                  name_2.string = '真实鸡蛋';
                  num_2.string = '+' + data.Model.BuyPropertyList[i].PCount;
                  day.string = utils.fn.formatNumToDate(data.Model.BuyPropertyList[i].CreateTime);
                  time.string = utils.fn.formatNumToDateTime(data.Model.BuyPropertyList[i].CreateTime);
                  PrefabParent.addChild(PropertyList);
                }
                break;
              }
              case 3: {
                //买方交易记录
                imgSrc = 'Modal/Repertory/icon-asset01';
                if (data.Model.BuyPropertyList[i].PrID == 18) {
                  //鸡
                  imgSrc_ = 'Modal/Repertory/icon-asset04';
                  cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_1.spriteFrame = spriteFrame;
                  });
                  cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_2.spriteFrame = spriteFrame;
                  });
                  name_1.string = '牧场币';
                  num_1.string = '-' + data.Model.BuyPropertyList[i].BuyValues;
                  name_2.string = '产蛋鸡';
                  num_2.string = '+' + data.Model.BuyPropertyList[i].BuyCount;
                } else if (data.Model.BuyPropertyList[i].PrID == 26) {
                  //鸡蛋
                  imgSrc_ = 'Modal/Repertory/icon-asset05';
                  cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_1.spriteFrame = spriteFrame;
                  });
                  cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_2.spriteFrame = spriteFrame;
                  });
                  name_1.string = '牧场币';
                  num_1.string = '-' + data.Model.BuyPropertyList[i].BuyValues;
                  name_2.string = '鸡蛋';
                  num_2.string = '+' + data.Model.BuyPropertyList[i].BuyCount;
                }
                day.string = utils.fn.formatNumToDate(data.Model.BuyPropertyList[i].CreateTime);
                time.string = utils.fn.formatNumToDateTime(data.Model.BuyPropertyList[i].CreateTime);
                PrefabParent.addChild(PropertyList);
                break;
                break;
              }
              case 4: {
                //卖方交易记录
                imgSrc = 'Modal/Repertory/icon-asset01';
                if (data.Model.BuyPropertyList[i].PrID == 18) {
                  //鸡
                  imgSrc_ = 'Modal/Repertory/icon-asset04';
                  cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_1.spriteFrame = spriteFrame;
                  });
                  cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_2.spriteFrame = spriteFrame;
                  });
                  name_1.string = '牧场币';
                  num_1.string = '+' + data.Model.BuyPropertyList[i].BuyValues;
                  name_2.string = '产蛋鸡';
                  num_2.string = '-' + data.Model.BuyPropertyList[i].BuyCount;
                } else if (data.Model.BuyPropertyList[i].PrID == 26) {
                  //鸡蛋
                  imgSrc_ = 'Modal/Repertory/icon-asset05';
                  cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_1.spriteFrame = spriteFrame;
                  });
                  cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                    icon_2.spriteFrame = spriteFrame;
                  });
                  name_1.string = '牧场币';
                  num_1.string = '+' + data.Model.BuyPropertyList[i].BuyValues;
                  name_2.string = '鸡蛋';
                  num_2.string = '-' + data.Model.BuyPropertyList[i].BuyCount;
                }
                day.string = utils.fn.formatNumToDate(data.Model.BuyPropertyList[i].CreateTime);
                time.string = utils.fn.formatNumToDateTime(data.Model.BuyPropertyList[i].CreateTime);
                PrefabParent.addChild(PropertyList);
                break;
              }
            }
          }
        }
      } else {
        this.emptyNode.active = true;
      }
    } else {
      this.emptyNode.active = true;
    }
  },
  start() {},
  goRecharge() {
    cc.director.loadScene('recharge');
  },
  //模态框修改昵称
  EditName() {
    const fillterButton = cc.find('scrollview/view/layout/info/nameEdit', this.node);
    let nameValue = cc.find('label', fillterButton).getComponent(cc.Label);
    fillterButton.on('click', event => {
      Alert.show('0', null, null, null, null, null, 'Prefab/Modal/Usercenter/NameEdit', function() {
        var self = this;
        cc.loader.loadRes(Alert._newPrefabUrl, cc.Prefab, function(error, prefab) {
          if (error) {
            cc.error(error);
            return;
          }
          // 实例
          var alert = cc.instantiate(prefab);
          // Alert 持有
          Alert._alert = alert;
          //动画加载
          self.ready();
          // 父视图
          Alert._alert.parent = cc.find('Canvas');
          // 展现 alert
          self.startFadeIn();
          //自定义事件
          var saveButton = cc.find('alertBackground/enterButton', alert);
          //保存
          saveButton.on('click', () => {
            Tool.closeModal(alert);
            let name = cc.find('alertBackground/input/editbox', alert);
            Data.func.SaveEditName(name.getComponent(cc.EditBox).string).then(data => {
              if (data.Code == 1) {
                Msg.show(data.Message);
                nameValue.string = data.Name;
              } else {
                Msg.show(data.Message);
              }
            });
          });
          //取消
          self.newButtonEvent(alert, 'close');
        });
      });
    });
  },
  getAddress() {
    Data.func.getAddressList().then(data => {
      if (data.Code == 1) {
        let addressValue = cc
          .find('scrollview/view/layout/myAssets3/box/flex-right/value', this.node)
          .getComponent(cc.Label);
        for (let i = 0; i < data.List.length; i++) {
          if (data.List[i].IsDefault) {
            addressValue.string = data.List[i].addressDetailInfo;
          }
        }
      }
    });
  },
  Contact() {
    const fillterButton = cc.find('scrollview/view/layout/info/tel', this.node);
    fillterButton.on('click', event => {
      Alert.show('0', null, null, null, null, null, 'Prefab/Modal/AlertTemp', function() {
        var self = this;
        cc.loader.loadRes(Alert._newPrefabUrl, cc.Prefab, function(error, prefab) {
          if (error) {
            cc.error(error);
            return;
          }
          // 实例
          var alert = cc.instantiate(prefab);
          // Alert 持有
          Alert._alert = alert;
          //动画加载
          self.ready();
          // 父视图
          Alert._alert.parent = cc.find('Canvas');
          // 展现 alert
          self.startFadeIn();
          self.newButtonEvent(alert, 'close');
        });
      });
    });
  },
  Help() {
    Alert.show('0', null, null, null, null, null, 'Prefab/Modal/levelIntro', function() {
      var self = this;
      cc.loader.loadRes(Alert._newPrefabUrl, cc.Prefab, function(error, prefab) {
        if (error) {
          cc.error(error);
          return;
        }
        // 实例
        var alert = cc.instantiate(prefab);
        // Alert 持有
        Alert._alert = alert;
        //动画加载
        self.ready();
        // 父视图
        Alert._alert.parent = cc.find('Canvas');
        // 展现 alert
        self.startFadeIn();
        self.newButtonEvent(alert, 'close');
      });
    });
  },
  update(dt) {}
});
