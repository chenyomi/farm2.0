var Data = require('Data');
var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
cc.Class({
  extends: cc.Component,
  properties: {
    Tool_Prefab: {
      default: null,
      type: cc.Prefab
    },
    Item_Prefab: {
      default: null,
      type: cc.Prefab
    },
    ItemSeed_Prefab: {
      default: null,
      type: cc.Prefab
    }
  },
  Value: null,
  Prefab: null,
  onLoad() {
    //设置好友农场名称
    var self = this;
    document.title = `${Config.friendName}的农场`;
    this.oldData = null;
    this.allcount = 0;
    this.FarmJs = cc.find('Canvas');
    //星星盒子
    self.starsBox = cc.find('bg/starsBox', this.node);
    self.moon = cc.find('moon', this.node);

    //好友农场的好友ID
    self.getHearder(Config.friendOpenId);
    self.getWhether();
    //初始化加载数据
    self.fatchData();

    self.schedule(function() {
      self.onlyUpdataPlant();
      console.warn('60秒刷新一波');
    }, 60);
    //初始加载工具栏
    this.getToolPositon();

    //更新于植物状态变动
    this.node.on('updataPlant', function(event) {
      let List = event.detail.data;
      self.clearAllDom(List); //清除植物数据
      self.setLocData(List);
      self.fatchPlant(List); //重新加载植物
    });
  },
  getHearder(friendOpenID) {
    let self = this;
    let friendImg = cc.find('div_header/advisor/advisor', this.node);
    let Lv = cc.find('div_header/level-icon/New Label', this.node).getComponent(cc.Label);

    //经验值
    Data.func.GetWholeData(friendOpenID).then(data => {
      if (data.Code === 1) {
        self.setHeadImg(friendImg, data.UserModel.Headimgurl);
        Lv.string = data.UserModel.Grade;
      } else {
        console.log('数据加载失败');
      }
    });
  },
  setHeadImg(dom, friendImg) {
    if (friendImg !== '') {
      cc.loader.load({ url: friendImg, type: 'png' }, function(err, texture) {
        var frame = new cc.SpriteFrame(texture);
        dom.getComponent(cc.Sprite).spriteFrame = frame;
      });
    }
  },
  //获取天气
  getWhether() {
    let self = this;
    let myDate = new Date();
    let bgNode = cc.find('bg', this.node);
    let cloud01 = cc.find('cloud01', this.node);
    let cloud02 = cc.find('cloud02', this.node);
    let fengcheHome = cc.find('New Node/fengcheHome', this.node);
    let fengche = cc.find('New Node/fengche', this.node);
    let ParticleRain = cc.find('ParticleRain', this.node);
    if (Config.weather == -1) {
      ParticleRain.active = true;
    }
    if (Config.weather == 1 && myDate.getHours() > 18) {
      //星星
      self.moon.active = true;
      for (let i = 0; i < 6; i++) {
        if (self.starsBox) {
          cc.loader.loadRes('Prefab/stars', cc.Prefab, (err, prefab) => {
            let box = cc.find('Canvas');
            let shitNode = cc.instantiate(prefab);
            shitNode.setPosition(Tool.random(20, 730), Tool.random(20, 330));
            setTimeout(function() {
              self.starsBox.addChild(shitNode);
            }, Math.random() * 3000);
          });
        }
      }
    }
    self.setWhetherIcon(bgNode, 4);
    self.setWhetherIcon(cloud01, 5);
    self.setWhetherIcon(cloud02, 6);
    self.setWhetherIcon(fengcheHome, 7);
    self.setWhetherIcon(fengche, 8);
  },
  //初始加载所有数据
  fatchData() {
    var self = this;

    Data.func.getFarmModalData(Config.friendOpenId).then(data => {
      if (data.Code === 1) {
        //土地渲染
        self.clearAllDom(data.Model); //清除植物数据
        self.setLandOption(data.Model); //重新加载土地
      }
      self.setLocData(data.Model, 'all');
      self.setLocalStorageData(data.Model); //重新加载土地（包括植物）
    });
  },
  //仅仅 更新 植物状态
  onlyUpdataPlant() {
    var self = this;

    //获取所有数据
    Data.func.getFarmModalData(Config.friendOpenId).then(data => {
      if (data.Code === 1) {
        //土地渲染
        self.clearAllDom(data.Model); //清除植物数据
        self.fatchPlant(data.Model); //重新加载植物
      }
    });
  },

  //仅仅更新土地
  setLandOption(data) {
    let self = this;
    let mapNew = cc.find('bg/mapNew', this.node);
    self.setWhetherIcon(mapNew, 13);
    for (let i = 0; i < data.length; i++) {
      let itemBoxNode = cc.find('bg/mapNew/item' + i, this.node);
      let itemBox = cc.find('bg/mapNew/item' + i, this.node);

      //是否解锁土地
      if (data[i].IsLock) {
        self.setWhetherIcon(itemBox, 1);
      } else {
        self.setWhetherIcon(itemBox, 2);
      }
    }
  },
  setWhetherIcon(dom, i) {
    if (!dom) {
      return;
    }
    let myDate = new Date();
    let imgSrcArr = [];
    if (Config.weather == 1) {
      if (myDate.getHours() > 18) {
        imgSrcArr[1] = 'Farm/itemG-rain';
        imgSrcArr[2] = 'Farm/item-rain';
        imgSrcArr[3] = 'Farm/extend-rain';
        imgSrcArr[4] = 'jpg/night2';
        imgSrcArr[5] = 'index/rain/cloud01';
        imgSrcArr[6] = 'index/rain/cloud02';
        imgSrcArr[7] = 'Farm/fengcheHome-rain';
        imgSrcArr[8] = 'Farm/fengche-rain';
        imgSrcArr[9] = 'Farm/itemdemo-xs-rain';
        imgSrcArr[10] = 'Farm/itemdemo-md-rain';
        imgSrcArr[11] = 'Farm/itemdemo-lg-rain';
        imgSrcArr[12] = 'Farm/itemdemo-ok-rain';
        imgSrcArr[13] = 'Farm/mapNew-rain';
      } else {
        imgSrcArr[1] = 'Farm/itemG'; //草地
        imgSrcArr[2] = 'Farm/item'; //土地
        imgSrcArr[3] = 'Farm/extend'; //拓建
        imgSrcArr[4] = 'jpg/farmBg'; //农场背景
        imgSrcArr[5] = 'index/sun/cloud01'; //云1
        imgSrcArr[6] = 'index/sun/cloud02'; //云2
        imgSrcArr[7] = 'Farm/fengcheHome'; //风车
        imgSrcArr[8] = 'Farm/fengche'; //风车
        imgSrcArr[9] = 'Farm/itemdemo-xs'; //幼苗
        imgSrcArr[10] = 'Farm/itemdemo-md';
        imgSrcArr[11] = 'Farm/itemdemo-lg';
        imgSrcArr[12] = 'Farm/itemdemo-ok'; //成熟植物
        imgSrcArr[13] = 'Farm/mapNew';
      }
    } else if (Config.weather == 0) {
      imgSrcArr[1] = 'Farm/itemG-wind';
      imgSrcArr[2] = 'Farm/item-wind';
      imgSrcArr[3] = 'Farm/extend-wind';
      imgSrcArr[4] = 'jpg/farmBg-wind';
      imgSrcArr[5] = 'index/cloud/cloud01';
      imgSrcArr[6] = 'index/cloud/cloud02';
      imgSrcArr[7] = 'Farm/fengcheHome-wind';
      imgSrcArr[8] = 'Farm/fengche-wind';
      imgSrcArr[9] = 'Farm/itemdemo-xs-wind';
      imgSrcArr[10] = 'Farm/itemdemo-md-wind';
      imgSrcArr[11] = 'Farm/itemdemo-lg-wind';
      imgSrcArr[12] = 'Farm/itemdemo-ok-wind';
      imgSrcArr[13] = 'Farm/mapNew-wind';
    } else if (Config.weather == -1) {
      imgSrcArr[1] = 'Farm/itemG-rain';
      imgSrcArr[2] = 'Farm/item-rain';
      imgSrcArr[3] = 'Farm/extend-rain';
      imgSrcArr[4] = 'jpg/farmBg-rain';
      imgSrcArr[5] = 'index/rain/cloud01';
      imgSrcArr[6] = 'index/rain/cloud02';
      imgSrcArr[7] = 'Farm/fengcheHome-rain';
      imgSrcArr[8] = 'Farm/fengche-rain';
      imgSrcArr[9] = 'Farm/itemdemo-xs-rain';
      imgSrcArr[10] = 'Farm/itemdemo-md-rain';
      imgSrcArr[11] = 'Farm/itemdemo-lg-rain';
      imgSrcArr[12] = 'Farm/itemdemo-ok-rain';
      imgSrcArr[13] = 'Farm/mapNew-rain';
    }
    cc.loader.loadRes(imgSrcArr[i], cc.SpriteFrame, (err, spriteFrame) => {
      dom.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
  },
  setLocData(data, all) {
    let self = this;
    if (all) {
      this.Value = {
        List: data,
        toolType: 0
      };
    }
    //不清除toolType工具id
    else {
      this.Value.List = data;
    }
    //缓存数据并加载植物
    cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.Value));
  },
  //缓存数据并刷新数据
  setLocalStorageData(data) {
    let self = this;
    this.Value = {
      List: data,
      toolType: 0
    };
    //缓存数据并加载植物
    cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.Value));
    if (self.Value.List !== null) {
      let newValueList = self.Value.List;
      self.fatchPlant(newValueList);
    }
  },

  //加载农作物
  fatchPlant(ValueList) {
    let self = this;
    for (let i = 0; i < ValueList.length; i++) {
      if (self.oldData !== null) {
        if (
          self.oldData[i].CropsIsFertilization !== ValueList[i].CropsIsFertilization ||
          self.oldData[i].CropsStatus !== ValueList[i].CropsStatus ||
          self.oldData[i].IsDisinsection !== ValueList[i].IsDisinsection ||
          self.oldData[i].IsDry !== ValueList[i].IsDry ||
          self.oldData[i].IsWeeds !== ValueList[i].IsWeeds ||
          self.oldData[i].IsLock !== ValueList[i].IsLock
        ) {
          console.log(i);
          self.upData(ValueList, i);
        }
      }
      if (self.oldData == null) {
        self.upData(ValueList, i);
      }
    }
    self.oldData = ValueList;
  },
  upData(ValueList, i) {
    let self = this;
    let bg = cc.find('bg', this.node);
    let Prefab = cc.instantiate(self.Item_Prefab);
    if (Prefab) {
      //浮动小提示dom
      let PrefabPlant_xs = cc.find('plant-xs', Prefab);
      let PrefabPlant_md = cc.find('plant-md', Prefab);
      let PrefabPlant_lg = cc.find('plant-lg', Prefab);
      let PrefabNewNode = cc.find('New Node', Prefab);
      let PrefabPlant_ok = cc.find('plant-ok', Prefab);
      let PrefabPlant_tip = cc.find('New Node/reap', Prefab);
      //天气图标变化
      self.setWhetherIcon(PrefabPlant_xs, 9);
      self.setWhetherIcon(PrefabPlant_md, 10);
      self.setWhetherIcon(PrefabPlant_lg, 11);
      self.setWhetherIcon(PrefabPlant_ok, 12);
      //初始化清空显示
      PrefabPlant_xs.active = false;
      PrefabPlant_md.active = false;
      PrefabPlant_lg.active = false;
      PrefabPlant_ok.active = false;
      PrefabNewNode.active = false;
      PrefabPlant_tip.active = false;
      //提示图标的类型切换
      self.setTipType(ValueList[i], PrefabPlant_tip, PrefabNewNode);
      let itemBox = cc.find('bg/mapNew/item' + i, this.node);
      let itemPos = itemBox.getPosition();
      let pos = itemBox.getNodeToWorldTransformAR(itemPos);

      if (ValueList[i].CropsStatus == 1) {
        //小树苗
        PrefabPlant_xs.active = true;
        Tool.RunAction(PrefabPlant_xs, 'fadeIn', 0.3);
      } else if (ValueList[i].CropsStatus == 2) {
        //中端
        PrefabPlant_md.active = true;
        Tool.RunAction(PrefabPlant_md, 'fadeIn', 0.3);
      } else if (ValueList[i].CropsStatus == 3) {
        //成熟
        PrefabPlant_lg.active = true;
        Tool.RunAction(PrefabPlant_lg, 'fadeIn', 0.3);
      } else if (ValueList[i].CropsStatus == 4) {
        //成熟
        PrefabPlant_ok.active = true;
        PrefabPlant_tip.active = true; //显示可收割
        Tool.RunAction(PrefabPlant_ok, 'fadeIn', 0.3);
        Tool.RunAction(PrefabPlant_tip, 'fadeIn', 0.3);
      }
      //重置名字赋值
      Prefab.name = 'Prefab' + i;
      //定位于碰撞事件触发的点
      Prefab.setPosition(pos.tx, pos.ty - 20);
      bg.addChild(Prefab);
    }
  },
  //提示图标的类型切换
  setTipType(ValueList, obj, isActive) {
    //除虫tip
    if (ValueList.IsDisinsection && ValueList.CropsStatus != 0) {
      cc.loader.loadRes('Farm/disinsection', cc.SpriteFrame, function(err, spriteFrame) {
        obj.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      obj.active = true;
      isActive.active = true;
    }
    //浇水tip
    else if (ValueList.IsDry && !ValueList.IsDisinsection && ValueList.CropsStatus != 0) {
      cc.loader.loadRes('Farm/water', cc.SpriteFrame, function(err, spriteFrame) {
        obj.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      obj.active = true;
      isActive.active = true;
    }
    //除草tip
    else if (ValueList.IsWeeds && !ValueList.IsDisinsection && !ValueList.IsDry && ValueList.CropsStatus != 0) {
      cc.loader.loadRes('Farm/weed', cc.SpriteFrame, function(err, spriteFrame) {
        obj.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      obj.active = true;
      isActive.active = true;
    }
  },

  //菜单按钮监听触摸
  getToolPositon() {
    let self = this;
    for (let i = 1; i < 7; i++) {
      if (i == 2 || i == 3 || i == 4 || i == 6) {
        let tool = cc.find('tool/layout/farm_icon_0' + i, this.node);
        tool.on('click', function() {
          self.dataList = JSON.parse(cc.sys.localStorage.getItem('FarmData')); //缓存机制
          self.setEvent(i);
        });
      }
    }
  },
  setEvent(n) {
    let self = this;
    Config.allcount = 0;
    for (let i = 0; i < 12; i++) {
      clearTimeout(this.timers); //清理定时器
      clearTimeout(this.timers2); //清理定时器
      switch (n) {
        case 2: {
          this.water(i);
          break;
        }
        case 3: {
          this.weed(i);

          break;
        }
        case 4: {
          this.disinsection(i);

          break;
        }
      }
    }
    if (n == 6) {
      this.collectCrops(i);
    }
  },

  //浇水
  water(id) {
    let self = this;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let IsDisinsection = this.dataList.List[id].IsDisinsection;
    let IsWater = this.dataList.List[id].IsDry;
    let IsWeeds = this.dataList.List[id].IsWeeds;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus !== 0 && !IsLock && IsWater) {
      if (!IsDisinsection && IsWater) {
        Config.allcount = Config.allcount + 1;
        Data.func.CropsWatering(CropsID, Config.openID).then(data => {
          if (data.Code === 1) {
            self.timers = setTimeout(function() {
              Data.func.getFarmModalData(Config.friendOpenId).then(data2 => {
                self.FarmJs.emit('updataPlant', {
                  data: data2.Model
                });
              });
            }, 1500);
          } else {
          }
        });
      }
    }
    if (id == 11 && Config.allcount == 0) {
      Msg.show('不需要浇水哦！');
    } else if (id == 11 && Config.allcount > 0) {
      Msg.show('帮助好友浇水成功，经验+' + Config.allcount * 5);
    }
  },
  //除草
  weed(id) {
    let self = this;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let IsDisinsection = this.dataList.List[id].IsDisinsection;
    let IsWater = this.dataList.List[id].IsDry;
    let IsWeeds = this.dataList.List[id].IsWeeds;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus !== 0 && !IsLock && IsWeeds) {
      if (IsWeeds && !IsDisinsection && !IsWater) {
        Config.allcount = Config.allcount + 1;
        Data.func.CropsWeeding(CropsID, Config.openID).then(data => {
          if (data.Code === 1) {
            self.timers = setTimeout(function() {
              Data.func.getFarmModalData(Config.friendOpenId).then(data2 => {
                self.FarmJs.emit('updataPlant', {
                  data: data2.Model
                });
              });
            }, 1500);
          } else {
          }
        });
      }
    }
    if (id == 11 && Config.allcount == 0) {
      Msg.show('不需要除草哦！');
    } else if (id == 11 && Config.allcount > 0) {
      Msg.show('帮助好友除草成功，经验+' + Config.allcount * 5);
    }
  },
  //除虫
  disinsection(id) {
    let self = this;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let IsDisinsection = this.dataList.List[id].IsDisinsection;
    let IsWater = this.dataList.List[id].IsDry;
    let IsWeeds = this.dataList.List[id].IsWeeds;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus !== 0 && !IsLock && IsDisinsection) {
      if (IsDisinsection) {
        Config.allcount = Config.allcount + 1;
        Data.func.CropsDisinsection(CropsID, Config.openID).then(data => {
          if (data.Code === 1) {
            self.timers = setTimeout(function() {
              Data.func.getFarmModalData(Config.friendOpenId).then(data2 => {
                self.FarmJs.emit('updataPlant', {
                  data: data2.Model
                });
              });
            }, 1500);
          } else {
          }
        });
      }
    }
    if (id == 11 && Config.allcount == 0) {
      Msg.show('不需要除虫哦！');
    } else if (id == 11 && Config.allcount > 0) {
      Msg.show('帮助好友除虫成功，经验+' + Config.allcount * 5);
    }
  },
  //收取农作物
  collectCrops(id) {
    let self = this;
    Data.func.FriendsStealCrops(Config.friendOpenId).then(data => {
      if (data.Code === 1) {
        Msg.show(data.Message);
      } else {
        Msg.show(data.Message);
      }
    });
  },
  //工具图片显示  浇水、除草、种子、镰刀
  imgSrcSelect(i) {
    var self = this;
    let src_ = '';

    switch (i) {
      case 1: {
        src_ = 'Farm/bozhong';
        break;
      }
      case 2: {
        src_ = 'Farm/jiaoshui';
        break;
      }
      case 3: {
        src_ = 'Farm/chucao';
        break;
      }
      case 4: {
        src_ = 'Farm/chuchong';
        break;
      }
      case 5: {
        src_ = 'Farm/zhongzi';
        break;
      }
      case 6: {
        src_ = 'Farm/liandao';
        break;
      }
    }
    return src_;
  },

  //清空植物
  clearAllDom(ValueList) {
    let self = this;
    let bg = cc.find('bg', this.node);
    for (let i = 0; i < 12; i++) {
      if (self.oldData !== null && ValueList[i].CropsID > 0) {
        if (
          self.oldData[i].CropsIsFertilization !== ValueList[i].CropsIsFertilization ||
          self.oldData[i].CropsStatus !== ValueList[i].CropsStatus ||
          self.oldData[i].IsDisinsection !== ValueList[i].IsDisinsection ||
          self.oldData[i].IsDry !== ValueList[i].IsDry ||
          self.oldData[i].IsWeeds !== ValueList[i].IsWeeds
        ) {
          console.log(i);
          let clearItem = cc.find('Prefab' + i, bg);
          if (clearItem) {
            clearItem.removeFromParent();
          }
        }
      }
      if (self.oldData == null) {
        let clearItem = cc.find('Prefab' + i, bg);
        if (clearItem) {
          clearItem.removeFromParent();
        }
      }
    }
  },

  gotoMuChange: function() {
    let self = this;
    cc.director.loadScene('FriendIndex', () => {
      let canvas = cc.find('Canvas');
      Tool.RunAction(canvas, 'fadeIn', 0.15);
    });
  },
  back: function() {
    cc.director.loadScene('index', () => {
      let canvas = cc.find('Canvas');
      Tool.RunAction(canvas, 'fadeIn', 0.15);
    });
  },
  start() {
    let self = this;
    Tool.touchMove(this.node, function(e) {
      Data.func.GetLastAndNextFriend(Config.friendOpenId).then(res => {
        if (res.Code === 1) {
          Config.friendOpenId = res.LastFriend;
          if (e == 0) {
          } else if (e == 1) {
            Config.friendOpenId = res.NestFriend;
          }
        }
        cc.director.loadScene('FriendFarm', () => {
          let canvas = cc.find('Canvas');
          Tool.RunAction(canvas, 'fadeIn', 0.15);
        });
      });
    });
  },
  update(dt) {
    // this.fatchData();
  }
});
