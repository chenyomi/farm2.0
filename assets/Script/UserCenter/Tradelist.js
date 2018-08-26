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
    self.tabIndex = 1;
    self.fillertype = 0;
    self.tab1 = cc.find('tab/label1', self.node);
    self.tab2 = cc.find('tab/label2', self.node);
    self.tab3 = cc.find('tab/label3', self.node);
    self.lab1 = cc.find('label', self.tab1);
    self.lab2 = cc.find('label', self.tab2);
    self.lab3 = cc.find('label', self.tab3);
    self.PrefabParent = cc.find('scrollview/view/layout/list', self.node);
    self.tab1.on('click', function() {
      if (self.tabIndex != 1) {
        self.PrefabParent.removeAllChildren();
        self.pageIndex = 1;
        self.tabIndex = 1;
        self.lab1.color = cc.color('#F05757');
        self.lab2.color = cc.color('#666666');
        self.lab3.color = cc.color('#666666');
        //全部
        self.fillertype = 0;
        self.getDataList(self.fillertype);
      }
    });
    self.tab2.on('click', function() {
      if (self.tabIndex != 2) {
        self.PrefabParent.removeAllChildren();
        self.pageIndex = 1;
        self.tabIndex = 2;
        self.lab1.color = cc.color('#666666');
        self.lab2.color = cc.color('#F05757');
        self.lab3.color = cc.color('#666666');
        //收入
        self.fillertype = 4;
        self.getDataList(self.fillertype);
      }
    });
    self.tab3.on('click', function() {
      if (self.tabIndex != 3) {
        self.PrefabParent.removeAllChildren();
        self.pageIndex = 1;
        self.tabIndex = 3;
        self.lab1.color = cc.color('#666666');
        self.lab2.color = cc.color('#666666');
        self.lab3.color = cc.color('#F05757');
        //支出
        self.fillertype = 3;
        self.getDataList(self.fillertype);
      }
    });

    Config.backArr.indexOf('tradelist') == -1 ? Config.backArr.push('tradelist') : false;
    console.log(Config.backArr);

    this.scrollview.node.on('scroll-to-bottom', this.updataByBottom, this);
    //全部
    Data.func.GetTransAndExchangeListByPage(1, 16, 0).then(data => {
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
        if (data.List[i].PrID != 0) {
          switch (data.List[i].ShowType) {
            case 0: {
              //商城购买
              data.List[i].PropType
                ? ((imgSrc = 'Modal/Repertory/icon-asset01'), (name_1.string = '牧场币'))
                : ((imgSrc = 'Modal/Repertory/icon-asset02'), (name_1.string = '积分'));

              switch (data.List[i].PrID) {
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

              num_1.string = '-' + data.List[i].PropValue * data.List[i].BuyCount;
              num_2.string = '+' + data.List[i].BuyCount * counts;
              name_2.string = data.List[i].PropName;
              cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                icon_1.spriteFrame = spriteFrame;
              });
              cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                icon_2.spriteFrame = spriteFrame;
              });
              day.string = utils.fn.formatNumToDate(data.List[i].CreateTime);
              time.string = utils.fn.formatNumToDateTime(data.List[i].CreateTime);
              this.PrefabParent.addChild(PropertyList);
              Tool.RunAction(PropertyList, 'fadeIn', 0.15);
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
              num_1.string = '+' + data.List[i].RanchMoney;
              num_2.string = '';
              name_2.string = '成功充值' + data.List[i].RechargeMoney + '元';
              day.string = utils.fn.formatNumToDate(data.List[i].CreateTime);
              time.string = utils.fn.formatNumToDateTime(data.List[i].CreateTime);
              this.PrefabParent.addChild(PropertyList);
              Tool.RunAction(PropertyList, 'fadeIn', 0.15);
              break;
            }
            case 2: {
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
              break;
            }
            case 3: {
              //买方交易记录
              imgSrc = 'Modal/Repertory/icon-asset01';
              if (data.List[i].PrID == 18) {
                //鸡
                imgSrc_ = 'Modal/Repertory/icon-asset04';
                cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_1.spriteFrame = spriteFrame;
                });
                cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_2.spriteFrame = spriteFrame;
                });
                name_1.string = '牧场币';
                num_1.string = '-' + data.List[i].BuyValues;
                name_2.string = '产蛋鸡';
                num_2.string = '+' + data.List[i].BuyCount;
              } else if (data.List[i].PrID == 26) {
                //鸡蛋
                imgSrc_ = 'Modal/Repertory/icon-asset05';
                cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_1.spriteFrame = spriteFrame;
                });
                cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_2.spriteFrame = spriteFrame;
                });
                name_1.string = '牧场币';
                num_1.string = '-' + data.List[i].BuyValues;
                name_2.string = '鸡蛋';
                num_2.string = '+' + data.List[i].BuyCount;
              }
              day.string = utils.fn.formatNumToDate(data.List[i].CreateTime);
              time.string = utils.fn.formatNumToDateTime(data.List[i].CreateTime);
              this.PrefabParent.addChild(PropertyList);
              Tool.RunAction(PropertyList, 'fadeIn', 0.15);
              break;
              break;
            }
            case 4: {
              //卖方交易记录
              imgSrc = 'Modal/Repertory/icon-asset01';
              if (data.List[i].PrID == 18) {
                //鸡
                imgSrc_ = 'Modal/Repertory/icon-asset04';
                cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_1.spriteFrame = spriteFrame;
                });
                cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_2.spriteFrame = spriteFrame;
                });
                name_1.string = '牧场币';
                num_1.string = '+' + data.List[i].BuyValues;
                name_2.string = '产蛋鸡';
                num_2.string = '-' + data.List[i].BuyCount;
              } else if (data.List[i].PrID == 26) {
                //鸡蛋
                imgSrc_ = 'Modal/Repertory/icon-asset05';
                cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_1.spriteFrame = spriteFrame;
                });
                cc.loader.loadRes(imgSrc_, cc.SpriteFrame, (err, spriteFrame) => {
                  icon_2.spriteFrame = spriteFrame;
                });
                name_1.string = '牧场币';
                num_1.string = '+' + data.List[i].BuyValues;
                name_2.string = '鸡蛋';
                num_2.string = '-' + data.List[i].BuyCount;
              }
              day.string = utils.fn.formatNumToDate(data.List[i].CreateTime);
              time.string = utils.fn.formatNumToDateTime(data.List[i].CreateTime);
              this.PrefabParent.addChild(PropertyList);
              Tool.RunAction(PropertyList, 'fadeIn', 0.15);
              break;
            }
          }
        }
      }
    } else {
      console.log(data.Message);
    }
  },
  updataByBottom() {
    this.pageIndex++;
    if (this.hasMore) {
      Data.func.GetTransAndExchangeListByPage(this.pageIndex, this.pageSize, this.fillertype).then(data => {
        this.setBuyPropertyList(data);
      });
    }
  }

  // update (dt) {},
});
