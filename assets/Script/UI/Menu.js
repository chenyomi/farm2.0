var Data = require('Data');
var Func = Data.func;
var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
cc.Class({
  extends: cc.Component,

  properties: {
    //菜单栏 节点 Node MenuList
    MenuListNode: {
      default: null,
      type: cc.Node
    },
    MenuModalNode: {
      default: null,
      type: cc.Node
    },
    btnMoreNode: {
      default: null,
      type: cc.Node
    }
  },
  onLoad() {
    let self = this;
    Func.getShare()
   
    this.node.on('step1', function (event) {
      self.showMenu();
    });
    this.getWeather();

    cc.sys.localStorage.clear();
  },
  start() {
    let self = this;
    if (!Config.menuNode) {
      Config.menuNode = this.node;
      cc.game.addPersistRootNode(this.node);
    }
    this.btnMoreSprite = this.btnMoreNode.getComponent(cc.Sprite);
    this.func = {
      showMenu: this.showMenu,
      closeMenu: this.closeMenu,
      removePersist: this.removePersist,
      loadSceneShop: this.loadSceneShop
    };
    this.getStorageCount(); //初始化消息数量
   
    self.node.on('upDataFriend', function(event) {
      self.getStorageCount();
    });
  },

  //显示菜单栏 动画
  showMenu: function() {
    var self = this;

    return new Promise((resolve, reject) => {
      if (!this.MenuListNode.active) {
        //弹出
        cc.loader.loadRes('index/btn-retract', cc.SpriteFrame, function(err, spriteFrame) {
          self.btnMoreSprite.spriteFrame = spriteFrame;
        });
        var fadeIn = cc.fadeIn(0.3);
        this.MenuModalNode.runAction(fadeIn);
        this.MenuListNode.active = !this.MenuListNode.active;
        var action = cc.sequence(
          cc.moveTo(0.3, cc.p(0, -50)),
          cc.callFunc(() => {
            resolve(1);
          })
        );

        this.MenuListNode.runAction(action);
      } else {
        //收回
        cc.loader.loadRes('index/btn-more', cc.SpriteFrame, function(err, spriteFrame) {
          self.btnMoreSprite.spriteFrame = spriteFrame;
        });

        var action = cc.sequence(
          cc.moveTo(0.3, cc.p(0, -800)),
          cc.callFunc(() => {
            this.MenuListNode.active = !this.MenuListNode.active;
          }, this)
        );
        this.MenuListNode.runAction(action);

        //菜单栏 半透明背景
        this.MenuModalNode.runAction(cc.fadeOut(0.3));
      }
    });
  },
  closeMenu() {
    var self = this;
    return new Promise((resolve, reject) => {
      //收回
      cc.loader.loadRes('index/btn-more', cc.SpriteFrame, function(err, spriteFrame) {
        self.btnMoreSprite.spriteFrame = spriteFrame;
      });

      var action = cc.sequence(
        cc.moveTo(0.3, cc.p(0, -800)),
        cc.callFunc(() => {
          this.MenuListNode.active = !this.MenuListNode.active;
        }, this)
      );
      this.MenuListNode.runAction(action);

      //菜单栏 半透明背景
      this.MenuModalNode.runAction(cc.fadeOut(0.3));
    });
  },
  //读取/暂存消息数量
  getStorageCount() {
    var messageCount = cc.find('Menu/MenuList/menuScroll/view/content/message/point01', this.node);
    var messageCount2 = cc.find('more/point01', this.node);
    // let StorageCount = cc.sys.localStorage.getItem(Func.openID); //获取缓存
    Func.GetRecordCount().then(data => {
      if (data.Code === 1) {
        if (data.Model > 0) {
          cc.find('label', messageCount).getComponent(cc.Label).string = data.Model;
          cc.find('label', messageCount2).getComponent(cc.Label).string = data.Model;
          messageCount.active = true;
          messageCount2.active = true;
        } else {
          messageCount.active = false;
          messageCount2.active = false;
        }
      } else {
        console.log('首页数据加载失败');
      }
    });
  },

  getWeather() {
    Func.GetCurrentWeather().then(res => {
      if (res.data.rain !== 0) {
        //下雨
        Config.weather = -1;
      } else if (res.data.light === 2 || res.data.light === 3) {
        //阴天
        Config.weather = 0;
      } else if (res.data.light === 1) {
        Config.weather = 1;
      }
    });
  },
  loadSceneRepertory() {
    cc.director.loadScene('repertory', this.onLoadFadeIn);
    this.removePersist();
  },
  loadSceneShop() {
    cc.director.loadScene('shop', this.onLoadFadeIn);
    this.removePersist();
  },
  loadSceneMonitor() {
    cc.director.loadScene('monitor', this.onLoadFadeIn);
    this.removePersist();
  },
  onLoadFadeIn() {
    let canvas = cc.find('Canvas');
    Tool.RunAction(canvas, 'fadeIn', 0.15);
  },
  removePersist() {
    Config.menuNode.active = false;
    Config.SlideNode.active = false;
    Config.hearderNode.active = false;
  }
  // update (dt) {},
});
