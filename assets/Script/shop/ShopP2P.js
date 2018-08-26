const Data = require('Data');
const Func = Data.func;
var Tool = require('Tool').Tool;
cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      default: null,
      type: cc.Prefab
    },
    //商品
    goods_Prefab: {
      default: null,
      type: cc.Prefab
    },
    //可上下架商品
    goods2_Prefab: {
      default: null,
      type: cc.Prefab
    },
    pageIndex: 1,
    hasLoad: 1,
    pageSize: 9,
    WholeCount: 0,
    goodsType: 1,
    projectList: []
  },
  goodsListNode: null,
  fillterListNode: null,
  onLoad() {
    let self = this;
    //商品类型 1全部  2我的商品 3鸡蛋 4 贵妃鸡
    self.fillterClickEvent();
    self.goodsType = Config.shopP2P;
    self.initfillterButton(self.goodsType);
    self.getInitIndicatorInIt(0, 9, self.goodsType);
  },
  start() {
    let self = this;
  },
  //筛选按钮自定义模态弹框
  fillterClickEvent() {
    let self = this;
    self.fillterButton = cc.find('bg/mygoods', self.node);
    self.fillterButton.on('click', event => {
      Alert.show('0', null, null, null, null, null, 'Prefab/Modal/Shop/filterGoods', function() {
        let selfAlert = this;
        cc.loader.loadRes(Alert._newPrefabUrl, cc.Prefab, function(error, prefab) {
          if (error) {
            cc.error(error);
            return;
          }
          // 实例
          let alert = cc.instantiate(prefab);
          Alert._alert = alert;
          //动画
          selfAlert.ready();
          Alert._alert.parent = cc.find('Canvas');
          selfAlert.newButtonEvent(alert, 'close');
          //绑定四个筛选按钮的筛选事件
          self.bindClickEvent(cc.find('alertBackground/scrollview/view/content/item1', alert));
          self.bindClickEvent(cc.find('alertBackground/scrollview/view/content/item2', alert));
          self.bindClickEvent(cc.find('alertBackground/scrollview/view/content/item3', alert));
          self.bindClickEvent(cc.find('alertBackground/scrollview/view/content/item4', alert));
        });
      });
    });
  },
  //筛选按钮事件绑定
  bindClickEvent(obj) {
    let self = this;
    obj.on('click', function() {
      Config.shopP2P = Number(obj._name.slice(4));
      cc.director.loadScene('shopP2P');
    });
  },

  //初始化筛选按钮
  initfillterButton(type) {
    let self = this;
    let buttonVal = cc.find('bg/mygoods/text', self.node).getComponent(cc.Label);
    switch (type) {
      case 1:
        buttonVal.string = '全部商品';
        break;
      case 2:
        buttonVal.string = '我的商品';
        break;
      case 3:
        buttonVal.string = '鸡蛋';
        break;
      case 4:
        buttonVal.string = '产蛋鸡';
        break;
    }
  },
  //渲染商品数据
  dataFetch(index, size, data, type) {
    var self = this;
    const goodsList = data.List;
    let box = cc.find('bg/PageView/view/content', this.node);
    let goodsListNode = cc.find('page_' + index + '/goodsList', box);
    for (let i = 0; i < goodsList.length; i++) {
      const goods = goodsList[i];
      let goodsNode, onSell, goodSprite, goodsLabel, priceLabel, count, clicknode;

      if (type == 2) {
        goodsNode = cc.instantiate(this.goods2_Prefab);
        clicknode = cc.find('xia', goodsNode);
        onSell = cc.find('xia/text', goodsNode);
        onSell.getComponent(cc.Label).string = '下架';
        //绑定我的商品的 点击事件
        if (goods.Type == 3) {
          self.bindSellEvent(clicknode, goods.OffType, goods.ID);
        } else if (goods.Type == 2) {
          self.OffShelf(clicknode, goods.OffType, goods.ID);
        }
      } else {
        goodsNode = cc.instantiate(self.goods2_Prefab);
        // //绑定其余的购买商品的点击事件
        if (goods.Type == 3) {
          goodsNode = self.bindGoodsEvent(type, goods);
        } else if (goods.Type == 2) {
          goodsNode = self.bindEggsEvent(type, goods);
        }
      }

      goodSprite = cc.find('pic-box/pic', goodsNode).getComponent(cc.Sprite);
      goodsLabel = cc.find('price-box/goods_label', goodsNode).getComponent(cc.Label);
      priceLabel = cc.find('price-box/bg-price/price', goodsNode).getComponent(cc.Label);
      count = 1;
      //渲染商品列表

      if (goods.Type == 3) {
        cc.loader.loadRes('Shop/guifeiji', cc.SpriteFrame, function(err, spriteFrame) {
          goodSprite.spriteFrame = spriteFrame;
        });
        goodsLabel.string = '产蛋鸡(' + goods.layEggCount + '/60次)';
      } else if (goods.Type == 2) {
        cc.loader.loadRes('Shop/icon-egg', cc.SpriteFrame, function(err, spriteFrame) {
          goodSprite.spriteFrame = spriteFrame;
        });
        goodsLabel.string = '鸡蛋×' + goods.NowCount;
      }
      priceLabel.string = goods.NowALLRanchMoney;
      goodsListNode.addChild(goodsNode);
      Tool.RunAction(goodsNode, 'fadeIn', 0.15);
    }
  },

  //鸡下架事件
  bindSellEvent(obj, e, playerid) {
    obj.on('click', event => {
      Func.ChickenOffhelf(playerid).then(data => {
        if (data.Code === 1) {
          Msg.show('下架成功');
          setTimeout(function() {
            cc.director.loadScene('shopP2P');
          }, 1500);
        } else {
          Msg.show(data.Message);
        }
      });
    });
  },
  //蛋下架事件
  OffShelf(obj, e, playerid) {
    obj.on('click', event => {
      Func.OffShelf(playerid).then(data => {
        if (data.Code === 1) {
          Msg.show('下架成功');
          setTimeout(function() {
            cc.director.loadScene('shopP2P');
          }, 1500);
        } else {
          Msg.show(data.Message);
        }
      });
    });
  },
  //鸡蛋事件绑定
  bindEggsEvent(type, data) {
    var self = this;
    let goods;
    //选择预置资源类型
    goods = cc.instantiate(this.goods_Prefab);
    goods.on('click', event => {
      Alert.show('0', null, null, null, null, null, 'Prefab/Sell', function() {
        let selfAlert = this;
        cc.loader.loadRes(Alert._newPrefabUrl, cc.Prefab, function(error, prefab) {
          if (error) {
            cc.error(error);
            return;
          }
          // 实例

          let alert = cc.instantiate(prefab);
          let choose = cc.find('bg/content', alert);
          let guifeiji = cc.find('guifeiji', alert);
          let guifeijiSprite = cc.find('guifeiji', alert).getComponent(cc.Sprite);
          let label1 = cc.find('bg/label1', alert);
          let label2 = cc.find('bg/label2', alert);
          let label3 = cc.find('bg/label3', alert);
          let label4 = cc.find('bg/money/str2', alert);

          Func.EggOnShelfInfo(data.ID).then(data => {
            if (data.Code === 1) {
              label1.getComponent(cc.Label).string = '上架人：' + data.Model.eggOwner;
              label2.getComponent(cc.Label).string = '数量：' + data.Model.eggCount;
              // label3.getComponent(cc.Label).string = '产蛋次数：' + data.Model.chickenLayEggTimes + '/60次';
              guifeiji.setPositionY(220);
              cc.loader.loadRes('Shop/icon-egg__', cc.SpriteFrame, function(err, spriteFrame) {
                guifeijiSprite.spriteFrame = spriteFrame;
              });
              choose.active = false;
              label1.active = true;
              label2.active = true;
              label3.active = false;
              label4.active = false;
            } else {
              Msg.show(data.Message);
            }
          });

          Alert._alert = alert;
          //动画
          selfAlert.ready();
          Alert._alert.parent = cc.find('Canvas');
          // selfAlert.startFadeIn();
          // 关闭按钮
          selfAlert.newButtonEvent(alert, 'bg/btn-group/cancelButton');
          self.P2PBuyData(alert, data, 1);
        });
      });
    });
    return goods;
  },
  //产蛋鸡事件绑定
  bindGoodsEvent(type, data) {
    var self = this;
    let goods;
    //选择预置资源类型
    goods = cc.instantiate(this.goods_Prefab);
    goods.on('click', event => {
      Alert.show('0', null, null, null, null, null, 'Prefab/Sell', function() {
        let selfAlert = this;
        cc.loader.loadRes(Alert._newPrefabUrl, cc.Prefab, function(error, prefab) {
          if (error) {
            cc.error(error);
            return;
          }
          // 实例

          let alert = cc.instantiate(prefab);
          let choose = cc.find('bg/content', alert);
          let guifeiji = cc.find('/guifeiji', alert);
          let label1 = cc.find('bg/label1', alert);
          let label2 = cc.find('bg/label2', alert);
          let label3 = cc.find('bg/label3', alert);
          let label4 = cc.find('bg/money/str2', alert);
          Func.GetChickenOnshelfInfo(data.ID).then(data => {
            if (data.Code === 1) {
              label1.getComponent(cc.Label).string = '上架人：' + data.Model.chickenOwner;
              label2.getComponent(cc.Label).string = '饱食度：' + data.Model.chickenStarvationValue;
              label3.getComponent(cc.Label).string = '产蛋次数：' + data.Model.chickenLayEggTimes + '/60次';
              guifeiji.setPositionY(250);
              choose.active = false;
              label1.active = true;
              label2.active = true;
              label3.active = true;
              label4.active = false;
            } else {
              Msg.show(data.Message);
            }
          });

          Alert._alert = alert;
          //动画
          selfAlert.ready();
          Alert._alert.parent = cc.find('Canvas');
          // selfAlert.startFadeIn();
          // 关闭按钮
          selfAlert.newButtonEvent(alert, 'bg/btn-group/cancelButton');
          self.P2PBuyData(alert, data, 0);
        });
      });
    });
    return goods;
  },
  //初始化轮播分页
  getInitIndicator(index, size, data, type) {
    var self = this;
    self.WholeCount = data.RecordCount;
    let box = cc.find('bg/PageView/view/content', this.node);
    let boxTemp = cc.find('bg/PageView', this.node).getComponent(cc.PageView); //获取pageView组件
    for (let i = 0; i < Math.ceil(self.WholeCount / self.pageSize); i++) {
      let clone = cc.instantiate(this.target);
      clone._name = 'page_' + i;

      boxTemp.addPage(clone); //动态添加页面
    }
    self.dataFetch(index, size, data, type);
    boxTemp.node.on('page-turning', function() {
      let goodsListNode = cc.find('page_' + boxTemp.getCurrentPageIndex(), box);
      let indexNum = boxTemp.getCurrentPageIndex();
      let diff = indexNum - self.hasLoad;
      if (diff == 0) {
        self.hasLoad++;
        self.getList(indexNum, 9, self.goodsType);
      }
    });
  },
  //切换数据接口，用于初始化轮播导航
  getInitIndicatorInIt(index, size, e) {
    let self = this;
    if (e == 1) {
      Func.GetSellList(0, index + 1, size).then(data => {
        self.getInitIndicator(index, size, data, e);
      });
    } else if (e == 2) {
      Func.GetShelvesList(index + 1, size).then(data => {
        self.getInitIndicator(index, size, data, e);
      });
    } else if (e == 3) {
      Func.GetSellList(2, index + 1, size).then(data => {
        self.getInitIndicator(index, size, data, e);
      });
    } else if (e == 4) {
      Func.GetSellList(3, index + 1, size).then(data => {
        self.getInitIndicator(index, size, data, e);
      });
    }
  },
  //切换数据接口，用于数据列表
  getList(index, size, e) {
    let self = this;
    if (e == 1) {
      Func.GetSellList(0, index + 1, size).then(data => {
        self.dataFetch(index, size, data, e);
      });
    } else if (e == 2) {
      Func.GetShelvesList(index + 1, size).then(data => {
        self.dataFetch(index, size, data, e);
      });
    } else if (e == 3) {
      Func.GetSellList(2, index + 1, size).then(data => {
        self.dataFetch(index, size, data, e);
      });
    } else if (e == 4) {
      Func.GetSellList(3, index + 1, size).then(data => {
        self.dataFetch(index, size, data, e);
      });
    }
  },
  //购买商品模态框数据绑定
  P2PBuyData(obj, data, type) {
    //初始总价
    let sumMoney = cc.find('bg/money/value', obj).getComponent(cc.Label);
    let editBox = cc.find('bg/content/rect-border/text', obj).getComponent(cc.Label);
    let editBtn1 = cc.find('bg/content/btn-minus', obj);
    let editBtn2 = cc.find('bg/content/btn-add', obj);
    let value = cc.find('bg/money/value', obj);
    let confirm = cc.find('bg/btn-group/enterButton', obj);
    let valueComp = cc.find('bg/money/value', obj).getComponent(cc.Label);
    let icon = cc.find('guifeiji', obj).getComponent(cc.Sprite);
    let title = cc.find('bg/name', obj).getComponent(cc.Label);
    let count = 1;
    cc.loader.loadRes('Shop/guifeiji__', cc.SpriteFrame, function(err, spriteFrame) {
      icon.spriteFrame = spriteFrame;
    });
    if (type == 1) {
      title.string = '鸡蛋';
      count = data.NowCount;
    } else if (type == 0) {
      count = 1;
      title.string = '产蛋鸡(' + data.layEggCount + '/60次)';
    }

    valueComp.string = data.RanchMoney * count + '（价值' + (data.RanchMoney * count) / 10 + '元人民币）';
    editBtn1.on('click', function() {
      if (count > 1) {
        count--;
        editBox.string = count;
        valueComp.string = data.RanchMoney * count;
      }
    });
    editBtn2.on('click', function() {
      if (count < data.NowCount) {
        count++;
        editBox.string = count;
        valueComp.string = data.RanchMoney * count;
      }
    });
    //绑定input变化事件
    //商品购买事件
    confirm.on('click', () => {
      if (count > data.NowCount) {
        Msg.show('您输入的数量不能大于' + data.NowCount);
        return;
      }
      Func.PostBuyP2P(data.ID, count).then(data => {
        if (data.Code === 1) {
          Msg.show('购买成功');
          Tool.updateHeader();
          setTimeout(function() {
            cc.director.loadScene('shopP2P');
          }, 1000);
        } else if (data.Code === -4) {
          Alert.show(
            data.Message,
            function() {
              cc.director.loadScene('recharge');
            },
            null,
            '牧场币不足'
          );
        } else {
          Msg.show(data.Message);
        }
      });
    });
  },
  //返回
  backEvent() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },
  //切换系统商城
  gotoPageShopPoint() {
    cc.director.loadScene('shopPoint');
  },
  gotoPageShop() {
    cc.director.loadScene('shop');
  }

  // update (dt) {},
});
