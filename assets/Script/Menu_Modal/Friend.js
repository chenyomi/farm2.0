// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var Data = require('Data');
var Func = Data.func;
var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
cc.Class({
  extends: cc.Component,

  properties: {
    itemTop3: {
      default: null,
      type: cc.Prefab
    },
    itemFriend: {
      default: null,
      type: cc.Prefab
    },
    itemSearch: {
      default: null,
      type: cc.Prefab
    },
    itemBoth: {
      default: null,
      type: cc.Prefab
    },
    iconBtn01: {
      default: null,
      type: cc.SpriteFrame
    },
    iconBtn02: {
      default: null,
      type: cc.SpriteFrame
    },
    iconBtn03: {
      default: null,
      type: cc.SpriteFrame
    }
  },
  closeModal() {
    var self = this;
    // var action = cc.fadeOut(0.3);
    // this.node.runAction(action);
    this.node.active = false;
    // scrollView.removeFromParent();
    // this.node.removeChild(Modal);
  },

  // update (dt) {},
  setHeadImg(dom, friendImg) {
    if (friendImg !== '') {
      cc.loader.load({ url: friendImg, type: 'png' }, function(err, texture) {
        var frame = new cc.SpriteFrame(texture);
        dom.getComponent(cc.Sprite).spriteFrame = frame;
      });
    }
  },
  //绑定数据（好友列表）
  updateData() {
    this.emptyNode = cc.find('bg-repertory/friendList/empty', this.node);
    this.emptyNode.active = false;
    this.contentNode = cc.find('bg-repertory/friendList/view/content', this.node);
    this.updataDone = false;
    Func.GetFriendsList(this.friend_page).then(data => {
      if (data.Code === 1) {
        var friendList = data.List;

        if (friendList.length === 0 && this.friend_page === 1) {
          this.emptyNode.active = true;
        } else {
          this.emptyNode.active = false;
          for (let i = 0; i < friendList.length; i++) {
            this.assignFriendData(friendList[i]);
          }

          this.friend_page++;
          this.updataDone = true;
        }
      } else {
        if (this.friend_page === 1) {
          this.emptyNode.active = true;
        } else {
          Msg.show('没有更多数据了');
        }
      }
    });
  },
  //搜索功能(搜索好友)
  search() {
    //输入框的值
    this.option = 2;
    this.searchStr = this.inputEditBox.string;
    this.contentNode.removeAllChildren();
    this.search_page = 1;
    this.updateSearchData();
  },
  updateSearchData() {
    this.emptyNode.active = false;
    Func.GetUserList(this.searchStr, this.search_page).then(data => {
      if (data.Code === 1) {
        var friendList = data.List;
        if (friendList.length === 0 && this.search_page === 1) {
          this.emptyNode.active = true;
        } else {
          this.emptyNode.active = false;
          for (let i = 0; i < friendList.length; i++) {
            if (friendList[i].IsFriends) {
              this.assignFriendData(friendList[i], true);
            } else {
              this.assignNoFriendData(friendList[i]);
            }
          }
          this.search_page++;
        }
      } else {
        if (this.search_page === 1) {
          this.emptyNode.active = true;
        } else {
          Msg.show('没有更多数据了');
        }
      }
    });
  },
  bindEvent() {
    //滚动到底部加载数据
    this.friendListNode.on(
      'bounce-bottom',
      () => {
        if (this.option === 1) {
          if (this.updataDone) {
            this.updateData();
          }
        } else {
          this.updateSearchData();
        }
      },
      this
    );

    //input 如果为空 加载好友数据
    this.inputNode.on(
      'text-changed',
      () => {
        if (this.inputEditBox.string == '') {
          this.contentNode.removeAllChildren();
          this.option = 1;
          this.friend_page = 1;
          this.search_page = 1;
          this.contentNode.removeAllChildren;
          this.updateData();
        }
      },
      this
    );
  },
  //sort = true 显示排名
  assignFriendData(data, sort) {
    const element = data;
    var advisor = element.path || '';
    var name = element.RealName;
    var grade = element.Grade;
    //排名（字段不确定）
    var rank = element.Row || i;
    var clean = element.IsClean;
    var crops = element.IsCrops;
    var feed = element.IsFeed;
    var water = element.IsDry;
    var steal = element.IsSteal;
    var stealLayEggShed = element.IsStealLayEggShed;
    var weed = element.IsWeeds;
    var worm = element.IsDisinsection;
    let openIds = element.OpenID;

    let i = 0;

    // 判断加载哪一个prefab
    if (!sort) {
      if (rank <= 3) {
        //Top3
        var item = cc.instantiate(this.itemTop3);
        var rankNode = cc.find('item-content/icon-no2', item);
        switch (rank) {
          case 1:
            rankNode.getComponent(cc.Sprite).spriteFrame = this.iconBtn01;
            break;
          case 2:
            rankNode.getComponent(cc.Sprite).spriteFrame = this.iconBtn02;
            break;
          case 3:
            rankNode.getComponent(cc.Sprite).spriteFrame = this.iconBtn03;
            break;
        }
        //好友头像
        var itemImg = cc.find('item-content/advisor-box/adviosr-mask/advisor', item);
        this.setHeadImg(itemImg, element.Headimgurl);
      } else {
        //大于3 的排名

        var item = cc.instantiate(this.itemFriend);
        var rankLabel = cc.find('item-content/rank/text', item).getComponent(cc.Label);
        rankLabel.string = rank;
        //好友头像
        var itemImg = cc.find('item-content/advisor-box/adviosr-mask/advisor', item);
        this.setHeadImg(itemImg, element.Headimgurl);
      }

      //icon赋值
      var cleanNode = cc.find('item-content/status/clean', item);
      var feedNode = cc.find('item-content/status/feed', item);
      var waterNode = cc.find('item-content/status/water', item);
      var stealNode = cc.find('item-content/status/steal', item);
      var weedNode = cc.find('item-content/status/weed', item);
      var wormNode = cc.find('item-content/status/worm', item);

      if (clean && i < 4) {
        cleanNode.active = true;
        i++;
      }
      if (water && i < 4) {
        waterNode.active = true;
        i++;
      }
      if ((crops || stealLayEggShed) && i < 4) {
        stealNode.active = true;
        i++;
      }
      if (weed && i < 4) {
        weedNode.active = true;
        i++;
      }
      if (worm && i < 4) {
        wormNode.active = true;
        i++;
      }
    } else {
      //搜索好友 排名不显示
      var item = cc.instantiate(this.itemBoth);
      //好友头像
      var itemImg = cc.find('item-content/advisor-box/adviosr-mask/advisor', item);
      this.setHeadImg(itemImg, element.Headimgurl);
    }

    var advisorSprite = cc.find('item-content/advisor-box/adviosr-mask/advisor', item).getComponent(cc.Sprite);
    var nameLabel = cc.find('item-content/advisor-box/name', item).getComponent(cc.Label);
    var gradeLabel = cc.find('item-content/level-box/textbox/label', item).getComponent(cc.Label);

    nameLabel.string = name;
    gradeLabel.string = 'Lv.' + grade;
    console.log();
    item.on('click', () => {
      Config.friendName = name;
      if (cc.find('Canvas').parent._name == 'index') {
        Config.friendOpenId = openIds;
        cc.director.loadScene('FriendIndex', () => {
          let canvas = cc.find('Canvas');
          Tool.RunAction(canvas, 'fadeIn', 0.15);
        });
      } else if (cc.find('Canvas').parent._name == 'FriendIndex') {
        Config.friendOpenId = openIds;
        cc.director.loadScene('FriendIndex', () => {
          let canvas = cc.find('Canvas');
          Tool.RunAction(canvas, 'fadeIn', 0.15);
        });
      } else if (cc.find('Canvas').parent._name == 'FriendFarm') {
        Config.friendOpenId = openIds;
        cc.director.loadScene('FriendFarm', () => {
          let canvas = cc.find('Canvas');
          Tool.RunAction(canvas, 'fadeIn', 0.15);
        });
      } else {
        Config.friendOpenId = openIds;
        cc.director.loadScene('FriendFarm', () => {
          let canvas = cc.find('Canvas');
          Tool.RunAction(canvas, 'fadeIn', 0.15);
        });
      }

      this.removePersist();
    });
    this.contentNode.addChild(item);
    Tool.RunAction(item, 'fadeIn', 0.15);
  },
  removePersist() {
    Config.menuNode.active = false;
    Config.hearderNode.active = false;
  },
  assignNoFriendData(data) {
    const element = data;
    var advisor = element.path;
    var name = element.RealName;
    var grade = element.Grade;
    let openIds = element.OpenID;
    //排名（字段不确定）

    var item = cc.instantiate(this.itemSearch);

    var advisorSprite = cc.find('item-content/advisor-box/adviosr-mask/advisor', item).getComponent(cc.Sprite);
    var nameLabel = cc.find('item-content/advisor-box/name', item).getComponent(cc.Label);
    var gradeLabel = cc.find('item-content/level-box/textbox/label', item).getComponent(cc.Label);
    let addButton = cc.find('item-content/add', item);

    //好友头像
    var itemImg = cc.find('item-content/advisor-box/adviosr-mask/advisor', item);
    this.setHeadImg(itemImg, element.Headimgurl);

    nameLabel.string = name;
    gradeLabel.string = 'Lv.' + grade;
    addButton.on(
      'click',
      () => {
        Func.AddFriend(openIds).then(data => {
          if (data.Code === 1) {
            Msg.show(data.Message);

            if (data.Message == '请求成功！') {
              let str = "{name:'" + openIds + "',type:'friend'}";
              Config.newSocket.send(str);
            }
          } else {
            Msg.show(data.Code);
          }
        });
      },
      this
    );

    this.contentNode.addChild(item);
  },
  onLoad() {
    this.friendListNode = cc.find('bg-repertory/friendList', this.node);
    this.inputNode = cc.find('bg-repertory/form/input', this.node);
    this.inputEditBox = this.inputNode.getComponent(cc.EditBox);
    this.contentNode = cc.find('bg-repertory/friendList/view/content', this.node);
    this.emptyNode = cc.find('bg-repertory/friendList/empty', this.node);
    this.friend_page = 1;
    this.search_page = 1;
    this.option = 1; // 1代表好友列表  2.代表非好友列表
    this.updataDone = true;
    this.bindEvent();
    //得到好友列表数据 并调用绑定方法
    this.updateData();
  },
  start() {}
});
