var Data = require('Data');
var utils = require('utils');
var Func = Data.func;
var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
cc.Class({
  extends: cc.Component,

  properties: {
    MessageItem_Prefab: {
      default: null,
      type: cc.Prefab
    },
    friendMessage_Prefab: {
      default: null,
      type: cc.Prefab
    },
    //今日、昨日、更早判断
    today: true,
    yesterday: true,
    more: true,
    //分页
    pageIndex: 1,
    pageSize: 5,
    itemBox: null,
    //是否还有数据
    hasMore: true,
    TabId: 1
  },

  // onLoad () {},

  start() {
    var self = this;
    this.itemBox = cc.find('alertBackground/scrollview/view/layout', this.node);
    this.emptyNode = cc.find('alertBackground/scrollview/empty', this.node);
    //监听滚动时间
    const addListenScroll = cc.find('alertBackground/scrollview', this.node);
    const leftBtn = cc.find('alertBackground/New Node/left', this.node);
    const rightBtn = cc.find('alertBackground/New Node/right', this.node);
    addListenScroll.on('scroll-to-bottom', this.updataByBottom, this);
    var cancelButton = cc.find('close', this.node);
    //关闭模态框
    cancelButton.on('click', () => {
      this.node.active = false;
      // var action = cc.fadeOut(0.3);
      // this.node.runAction(action);
      // setTimeout(() => {
      //   this.node.active = false;
      // }, 400);
      this.clearData();
      this.hasMore = true;
    });
    leftBtn.on('click', function() {
      self.tabToggle(0);
    });
    rightBtn.on('click', function() {
      self.tabToggle(1);
    });
    this.friendMessage();
  },

  tabToggle(TabId) {
    const leftBtn = cc.find('alertBackground/New Node/left', this.node);
    const rightBtn = cc.find('alertBackground/New Node/right', this.node);
    const leftValue = cc.find('alertBackground/New Node/left/label', this.node);
    const righValue = cc.find('alertBackground/New Node/right/label', this.node);
    const leftLine = cc.find('alertBackground/New Node/left/line', this.node);
    const righLine = cc.find('alertBackground/New Node/right/line', this.node);
    this.TabId = TabId;
    switch (TabId) {
      case 0: {
        leftValue.color = cc.color('#FE6262');
        righValue.color = cc.color('#999999');
        leftLine.active = true;
        righLine.active = false;
        this.itemBox.removeAllChildren();
        this.clearData();
        this.MessageLst();
        break;
      }
      case 1: {
        leftValue.color = cc.color('#999999');
        righValue.color = cc.color('#FE6262');
        leftLine.active = false;
        righLine.active = true;
        this.itemBox.removeAllChildren();
        this.clearData();
        this.friendMessage();
        break;
      }
    }
  },

  //好友列表 分页  IsNotice 0, 请求   1.已通过  2.拒绝的
  friendMessage() {
    this.emptyNode = cc.find('alertBackground/scrollview/empty', this.node);
    this.emptyNode.active = false;
    Data.func.GetFriendListByPage(this.pageIndex, this.pageSize).then(data => {
      // console.log(data);

      if (data.Code) {
        let imgSrc;
        if (data.List.length == 0 && this.pageIndex == 1) {
          this.emptyNode ? (this.emptyNode.active = true) : false;
          return (this.hasMore = false);
        }
        for (let i = 0; i < data.List.length; i++) {
          let item = cc.instantiate(this.friendMessage_Prefab);
          let left_icon = cc.find('messageBgf/left/New Node/New Node/messageIcon', item).getComponent(cc.Sprite);
          let msg_title = cc.find('messageBgf/left/New Node/label', item).getComponent(cc.Label);
          let acceptBtn = cc.find('messageBgf/right/acc_messageBgf', item);
          let rejuseptBtn = cc.find('messageBgf/right/can_messageBgf', item);
          let isNotic = cc.find('messageBgf/right/label', item);
          let isNotic2 = cc.find('messageBgf/right/label2', item);
          let rightBox = cc.find('messageBgf/right', item);
          let hasAdd = cc.find('messageBgf/hasAdd', item);
          //未操作的请求
          if (data.List[i].IsNotice == 0) {
            isNotic.active = false;
            isNotic2.active = false;
            acceptBtn.active = true;
            rejuseptBtn.active = true;
          } else if (data.List[i].IsNotice == 1) {
            isNotic.active = true;
            isNotic2.active = false;
            acceptBtn.active = false;
            rejuseptBtn.active = false;
          } else {
            isNotic.active = false;
            isNotic2.active = true;
            acceptBtn.active = false;
            rejuseptBtn.active = false;
          }
          msg_title.string = data.List[i].RealName;

          //设置好友头像
          var itemImg = cc.find('messageBgf/left/New Node/New Node/messageIcon', item);
          this.setHeadImg(itemImg, data.List[i].Headimgurl);

          //接受
          acceptBtn.on('click', function() {
            Data.func.PostConfirmFriends(data.List[i].ID, true).then(msg => {
              Msg.show(msg.Message);
              isNotic.active = true;
              isNotic2.active = false;
              acceptBtn.active = false;
              rejuseptBtn.active = false;
            });
            let str = "{name:'" + Func.openID + "',type:'friend'}";
            Config.newSocket.send(str);
            // Config.newSocket.emit("add", [Func.openID, Func.openID]);
          });
          //拒绝
          rejuseptBtn.on('click', function() {
            Data.func.PostConfirmFriends(data.List[i].ID, false).then(msg => {
              Msg.show('拒绝好友成功');
              isNotic.active = false;
              isNotic2.active = true;
              acceptBtn.active = false;
              rejuseptBtn.active = false;
            });
            let str = "{name:'" + Func.openID + "',type:'friend'}";
            Config.newSocket.send(str);
            // Config.newSocket.emit("add", [Func.openID, Func.openID]);
          });
          this.itemBox.addChild(item);
          Tool.RunAction(item, 'fadeIn', 0.15);
        }
        this.emptyNode = null;
      } else {
        this.emptyNode ? (this.emptyNode.active = true) : false;
        console.log(data.Message);
      }
    });
  },
  //信息列表 分页
  MessageLst() {
    const newDate = utils.fn.formatStringToDate(new Date());
    this.emptyNode = cc.find('alertBackground/scrollview/empty', this.node);
    this.emptyNode.active = false;
    Data.func.UserMessage(this.pageIndex, this.pageSize).then(data => {
      // console.log(data);

      if (data.Code) {
        let imgSrc;
        if (data.List.length == 0 && this.pageIndex == 1) {
          this.emptyNode ? (this.emptyNode.active = true) : false;
          return (this.hasMore = false);
        }
        for (let i = 0; i < data.List.length; i++) {
          let item = cc.instantiate(this.MessageItem_Prefab);
          let left_icon = cc.find('today-msg', item).getComponent(cc.Sprite);
          let msg_title = cc.find('right/message-textbg/time', item).getComponent(cc.Label);
          let msg_content = cc.find('right/message-textbg/text', item).getComponent(cc.Label);
          if (utils.fn.DateDiff(newDate, utils.fn.formatNumToDate(data.List[i].CreateTime)) == 0 && this.today) {
            imgSrc = 'Modal/message/today-msg';
            this.today = false;
          } else if (utils.fn.DateDiff(newDate, utils.fn.formatNumToDate(data.List[i].CreateTime)) == 0) {
            imgSrc = 'Modal/message/notip-msg';
          } else if (
            utils.fn.DateDiff(newDate, utils.fn.formatNumToDate(data.List[i].CreateTime)) == 1 &&
            this.yesterday
          ) {
            imgSrc = 'Modal/message/yesterday-msg';
            this.yesterday = false;
          } else if (utils.fn.DateDiff(newDate, utils.fn.formatNumToDate(data.List[i].CreateTime)) == 1) {
            imgSrc = 'Modal/message/notip-msg';
          } else if (utils.fn.DateDiff(newDate, utils.fn.formatNumToDate(data.List[i].CreateTime)) == 2 && this.more) {
            imgSrc = 'Modal/message/more-msg';
            this.more = false;
          } else if (utils.fn.DateDiff(newDate, utils.fn.formatNumToDate(data.List[i].CreateTime)) >= 2) {
            imgSrc = 'Modal/message/noall';
          }

          cc.loader.loadRes(imgSrc, cc.SpriteFrame, (err, spriteFrame) => {
            left_icon.spriteFrame = spriteFrame;
          });
          msg_title.string =
            utils.fn.formatNumToDate(data.List[i].CreateTime) +
            ' ' +
            utils.fn.formatNumToDateTime(data.List[i].CreateTime);
          msg_content.string = data.List[i].Remark;
          this.itemBox.addChild(item);
          Tool.RunAction(item, 'fadeIn', 0.15);
        }
        this.emptyNode = null;
      } else {
        this.emptyNode ? (this.emptyNode.active = true) : false;
        console.log(data.Message);
      }
    });
  },
  //设置好友头像
  setHeadImg(dom, friendImg) {
    if (friendImg !== '') {
      cc.loader.load({ url: friendImg, type: 'png' }, function(err, texture) {
        var frame = new cc.SpriteFrame(texture);
        dom.getComponent(cc.Sprite).spriteFrame = frame;
      });
    }
  },
  //上拉触底刷新数据
  updataByBottom() {
    if (this.hasMore) {
      this.pageIndex++;
      if (this.TabId == 0) {
        this.MessageLst();
      } else {
        this.friendMessage();
      }
    }
  },
  //清除数据 我们从头再来
  clearData() {
    this.pageIndex = 1;
    this.pageSize = 5;
    this.today = true;
    this.yesterday = true;
    this.more = true;
    this.hasMore = true;
  }
  // update (dt) {},
});
