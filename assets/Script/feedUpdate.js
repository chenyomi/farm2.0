// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
var Data = require('Data');
var Func = Data.func;
var Tool = require('Tool').Tool;
cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    this.initFeedState();
  },
  initFeedState() {
    Func.GetFeedData().then(data => {
      if (data.Code == 1) {
        let capacity = data.Model.FeedTroughCapacity;
        let value = data.Model.FeedCount;
        let lv = data.Model.FeedTroughGrade;
        let feedProgressBar = cc.find('bg/feedState/layout/Bar', this.node).getComponent(cc.ProgressBar);
        let feedBar = feedProgressBar.node.getChildByName('bar');
        let feedLabel = cc.find('bg/feedState/layout/value', this.node).getComponent(cc.Label);
        this.value = value;
        this.capacity = capacity;
        feedLabel.string = value + '/ ' + capacity;
        feedProgressBar.progress = value / capacity;
        Tool.setBarColor(feedBar, value / capacity);
        this.setLeverTip(lv);
      } else {
        Msg.show(data.Message);
      }
    });
  },
  //添加饲料后 前端更新bar
  updataFeedCountByC(theCountNow) {
    let self = this;
    let feedProgressBar = cc.find('bg/feedState/layout/Bar', this.node).getComponent(cc.ProgressBar);
    let feedBar = feedProgressBar.node.getChildByName('bar');
    let feedLabel = cc.find('bg/feedState/layout/value', this.node).getComponent(cc.Label);
    let offerFeedCount = 0;
    if (theCountNow < this.capacity - this.value) {
      offerFeedCount = 0;
      feedLabel.string = this.value + theCountNow + '/ ' + this.capacity;
      feedProgressBar.progress = (this.value + theCountNow) / this.capacity;
      Tool.setBarColor(feedBar, (this.value + theCountNow) / this.capacity);
    } else if (theCountNow > this.capacity - this.value) {
      offerFeedCount = theCountNow - (this.capacity - this.value);
      feedLabel.string = this.capacity + '/ ' + this.capacity;
      feedProgressBar.progress = this.capacity / this.capacity;
      Tool.setBarColor(feedBar, this.capacity / this.capacity);
    }
    self.div_Index = cc.find('Canvas');
    self.div_Index.emit('updataFeedCount', {
      data: offerFeedCount
    });
  },
  setLeverTip(lv) {
    let textLable1 = cc.find('bg/upbg4/message', this.node).getComponent(cc.Label);
    let textLable2 = cc.find('bg/upbg4/label', this.node).getComponent(cc.Label);
    switch (lv) {
      case 1: {
        textLable1.string = `lv.1升级为lv.2,花费198牧场币(无等级限制)`;
        textLable2.string = `或者20000积分同时用户等级达到lv.5`;
        break;
      }
      case 2: {
        textLable1.string = `lv.2升级为lv.3,花费198牧场币(无等级限制)`;
        textLable2.string = `或者50000积分同时用户等级达到lv.15`;
        break;
      }
      case 3: {
        textLable1.string = `您的饲料槽等级为lv.3，已经满级`;
        textLable2.string = `无需升级`;
        break;
      }
    }
  },
  //添加饲料
  addFeed() {
    let self = this;
    let theCountNow = 0;
    this.indexJs = cc.find('Canvas').getComponent('Index');
    Func.GetFeedCount().then(data => {
      if (data.Code === 1) {
        theCountNow = data.Model;
        Func.AddFeed().then(data => {
          if (data.Code === 1) {
            self.updataFeedCountByC(theCountNow);
            let str = "{name:'" + Config.openID + "',type:'updataChat'}";
            Config.newSocket.send(str);
            Msg.show(data.Message);
          } else if (data.Code === -4) {
            Alert.show(
              '立刻前往购买',
              function() {
                cc.director.loadScene('shop');
                self.removePersist();
              },
              'Shop/icon-1_',
              '剩余的饲料不足'
            );
          } else {
            Msg.show(data.Message);
          }
        });
      } else {
        Msg.show(data.Message);
      }
    });
  },
  closeFeedState() {
    // Tool.closeModal(this.node);
    this.node.active = false;
  },
  removePersist() {
    Config.menuNode.active = false;
    Config.hearderNode.active = false;
  },
  start() {}

  // update (dt) {},
});
