var Data = require('Data');
var ToolJs = require('Tool');
var utils = require('utils');
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
  // Value: null,
  // Prefab: null,
  onLoad() {
    document.title = `${Config.realName}的农场`;
    this.oldData = null;
    let self = this;

    Config.backArr = ['farm'];
    let org = document.body.clientHeight / document.body.clientWidth;

    if (org > 700 / 375) {
      let setButtomSpace = cc.find('tool/layout', this.node).getComponent(cc.Layout);
      setButtomSpace.spacingX = 8;
    }
    if (Config.firstLogin) farmGuid.getPrefab(0);

    //星星盒子
    self.starsBox = cc.find('bg/starsBox', this.node);
    this.moon = cc.find('moon', this.node);

    self.addPersist();
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

    cc.director.preloadScene('index', function() {
      console.log('Next scene index');
    });
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
      this.moon.active = true;
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

    Data.func.getFarmModalData().then(data => {
      if (data.Code === 1) {
        //土地渲染
        self.clearAllDom(data.Model); //清除植物数据
      }
      self.setLocData(data.Model, 'all');
      self.setLocalStorageData(data.Model); //重新加载土地（包括植物）
    });
  },
  //仅仅 更新 植物状态
  onlyUpdataPlant() {
    var self = this;
    //获取所有数据
    Data.func.getFarmModalData().then(data => {
      if (data.Code === 1) {
        //土地渲染
        self.clearAllDom(data.Model); //清除植物数据
        self.fatchPlant(data.Model); //重新加载植物
      }
    });
  },

  setWhetherIcon(dom, i) {
    if (!dom) {
      return;
    }
    let self = this;
    let myDate = new Date();
    let imgSrcArr = [];
    if (Config.weather == 1) {
      if (myDate.getHours() > 18) {
        imgSrcArr[1] = 'Farm/itemG-rain';
        imgSrcArr[2] = 'Farm/item-rain';

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
          self.oldData[i].CropsSpreadCount !== ValueList[i].CropsSpreadCount ||
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
      let PrefabPlant_ok = cc.find('plant-ok', Prefab);
      let PrefabNewNode = cc.find('New Node', Prefab);
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
        Prefab.on('click', function() {
          Data.func.getFarmModalData().then(data => {
            if (data.Code === 1) {
              self.showFarmTimer(this, data.Model);
            }
          });
        });
        Tool.RunAction(PrefabPlant_xs, 'fadeIn', 0.3);
      } else if (ValueList[i].CropsStatus == 2) {
        //中端
        PrefabPlant_md.active = true;
        Prefab.on('click', function() {
          Data.func.getFarmModalData().then(data => {
            if (data.Code === 1) {
              self.showFarmTimer(this, data.Model);
            }
          });
        });
        Tool.RunAction(PrefabPlant_md, 'fadeIn', 0.3);
      } else if (ValueList[i].CropsStatus == 3) {
        //成熟
        PrefabPlant_lg.active = true;
        Prefab.on('click', function() {
          Data.func.getFarmModalData().then(data => {
            if (data.Code === 1) {
              self.showFarmTimer(this, data.Model);
            }
          });
        });
        Tool.RunAction(PrefabPlant_lg, 'fadeIn', 0.3);
      } else if (ValueList[i].CropsStatus == 4) {
        //成熟
        PrefabPlant_ok.active = true;
        Prefab.on('click', function() {
          Data.func.getFarmModalData().then(data => {
            if (data.Code === 1) {
              self.showFarmTimer(this, data.Model);
            }
          });
        });
        Tool.RunAction(PrefabPlant_ok, 'fadeIn', 0.3);
        Tool.RunAction(PrefabPlant_tip, 'fadeIn', 0.3);
      }
      //是否施肥
      if (ValueList[i].CropsSpreadCount == 1) {
        let itemBox = cc.find('bg/mapNew/item' + i, this.node);
        self.setWhetherIcon(itemBox, 1);
      } else {
        let itemBox = cc.find('bg/mapNew/item' + i, this.node);
        self.setWhetherIcon(itemBox, 2);
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
    //已经成熟
    else if (ValueList.CropsStatus == 4) {
      cc.loader.loadRes('Farm/reap', cc.SpriteFrame, function(err, spriteFrame) {
        obj.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      obj.active = true;
      isActive.active = true;
    }
    //没有提示的时候隐藏
    else if (ValueList.CropsStatus !== 0) {
      isActive.active = false;
    }
    //播种tip
    if (!ValueList.IsLock && ValueList.CropsStatus == 0) {
      cc.loader.loadRes('Farm/seed', cc.SpriteFrame, function(err, spriteFrame) {
        obj.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      obj.active = true;
      isActive.active = true;
    }
  },
  //种子列表
  getSeed() {
    let self = this;
    let seedBox = cc.find('bg_farm', self.node);
    if (!seedBox.active) {
      seedBox.active = false;
      let theCount = 0;
      seedBox.removeAllChildren();
      Data.func.GetSeedList().then(data => {
        if (data.Code === 1) {
          for (let i = 0; i < data.List.length; i++) {
            theCount = theCount + data.List[i].Count;
            let prefab = cc.instantiate(self.ItemSeed_Prefab);
            let Img = cc.find('ymzz', prefab).getComponent(cc.Sprite);
            let ImgSrc;
            let Label = cc.find('label', prefab).getComponent(cc.Label);
            ImgSrc = 'Modal/Repertory/ymzz';
            Label.string = data.List[i].TypeName + '×' + data.List[i].Count;
            prefab.on('click', function() {
              Config.propertyId = data.List[i].PropertyTypeID;
              self.setEvent(1);
            });

            cc.loader.loadRes(ImgSrc, cc.SpriteFrame, function(err, spriteFrame) {
              Img.spriteFrame = spriteFrame;
            });
            seedBox.addChild(prefab, 999);
          }
          if (theCount == 0) {
            Msg.show('请到商城购买种子！');
          } else {
            Tool.RunAction(seedBox, 'fadeIn', 0.3);
          }
        } else {
          Msg.show('请到商城购买种子！');
        }
      });
    } else {
      seedBox.active = false;
      seedBox.removeAllChildren();
    }
  },
  //菜单按钮监听触摸
  getToolPositon() {
    let self = this;
    for (let i = 1; i < 7; i++) {
      let tool = cc.find('tool/layout/farm_icon_0' + i, this.node);
      if (i !== 1 && i !== 5) {
        tool.on('click', function() {
          self.dataList = JSON.parse(cc.sys.localStorage.getItem('FarmData')); //缓存机制
          self.setEvent(i);
        });
      }
      if (i == 1) {
        tool.on('click', function() {
          self.dataList = JSON.parse(cc.sys.localStorage.getItem('FarmData')); //缓存机制
          self.getSeed();
        });
      }
      if (i == 5) {
        tool.on('click', function() {
          self.dataList = JSON.parse(cc.sys.localStorage.getItem('FarmData')); //缓存机制
          let seedBox = cc.find('bg_farm', self.node);
          if (!seedBox.active) {
            seedBox.active = false;
            let theCount = 0;
            seedBox.removeAllChildren();
            Data.func.GetFertilizerList().then(data => {
              if (data.Code === 1) {
                for (let i = 0; i < data.List.length; i++) {
                  theCount = theCount + data.List[i].Count;
                  let prefab = cc.instantiate(self.ItemSeed_Prefab);
                  let Img = cc.find('ymzz', prefab).getComponent(cc.Sprite);
                  let ImgSrc;
                  let Label = cc.find('label', prefab).getComponent(cc.Label);
                  if (data.List[i].TypeName == '超级肥料') {
                    ImgSrc = 'Shop/cjfl_1';
                  } else {
                    ImgSrc = 'Shop/fertilizer';
                  }
                  Label.string = data.List[i].TypeName + '×' + data.List[i].Count;
                  prefab.on('click', function() {
                    Config.fertilizerId = data.List[i].PropertyTypeID;
                    self.setEvent(5);
                  });
                  cc.loader.loadRes(ImgSrc, cc.SpriteFrame, function(err, spriteFrame) {
                    Img.spriteFrame = spriteFrame;
                  });
                  seedBox.addChild(prefab);
                }
                if (theCount == 0) {
                  Msg.show('请到商城购买肥料！');
                } else {
                  Tool.RunAction(seedBox, 'fadeIn', 0.3);
                }
              } else {
                Msg.show('请到商城购买肥料！');
              }
            });
          } else {
            seedBox.active = false;
            seedBox.removeAllChildren();
          }
        });
      }
    }
  },
  setEvent(n) {
    let self = this;
    let propertyId = Config.propertyId; //种子ID (玉米)
    let type = Config.fertilizerId; //肥料ID
    Config.allcount = 0;
    Config.CollectNumber = 0;
    for (let i = 0; i < 12; i++) {
      clearTimeout(this.timers); //清理定时器
      clearTimeout(this.timers2); //清理定时器
      switch (n) {
        case 1: {
          this.crops(i, propertyId);
          break;
        }
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
        case 5: {
          this.cropsSertilize(i, type);

          break;
        }
        case 6: {
          this.collectCrops(i);

          break;
        }
      }
    }
    let bg_farm = cc.find('bg_farm', this.node);
    self.upLocDataByPlant();
    if (self.Value.toolType != 0) {
      self.Prefab.removeFromParent();
    }
    bg_farm.active = false; //种子选择的浮窗
    bg_farm.opacity = 1;
    bg_farm.removeAllChildren();
  },
  //播种
  crops(id, propertyId) {
    let self = this;
    let landId = this.dataList.List[id].ID;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    if (CropsID == 0 && !IsLock) {
      Config.allcount = Config.allcount + 1;
      Data.func.addCrops(landId, propertyId).then(data => {
        if (data.Code == 1) {
          this.dataList.List[id].CropsStatus = 1;
          cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        }
      });
    }
    if (id == 11 && Config.allcount == 0) {
      Msg.show('已经种满啦！');
    } else if (id == 11 && Config.allcount > 0) {
      Msg.show('播种成功，经验+' + 10 * Config.allcount);
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
      Config.allcount = Config.allcount + 1;
      if (!IsDisinsection && IsWater) {
        this.dataList.List[id].IsDry = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        Data.func.CropsWatering(CropsID).then(data => {});
      }
    }
    if (id == 11 && Config.allcount == 0) {
      Msg.show('不需要浇水哦！');
    } else if (id == 11 && Config.allcount > 0) {
      Msg.show('浇水成功，经验+' + 5 * Config.allcount);
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
      if (!IsDisinsection && !IsWater && IsWeeds) {
        Config.allcount = Config.allcount + 1;
        this.dataList.List[id].IsWeeds = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        Data.func.CropsWeeding(CropsID).then(data => {});
      }
    }
    if (id == 11 && Config.allcount == 0) {
      Msg.show('不需要除草哦！');
    } else if (id == 11 && Config.allcount > 0) {
      Msg.show('除草成功，经验+' + 5 * Config.allcount);
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
        this.dataList.List[id].IsDisinsection = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        Data.func.CropsDisinsection(CropsID).then(data => {});
      }
    }
    if (id == 11 && Config.allcount == 0) {
      Msg.show('不需要除虫哦！');
    } else if (id == 11 && Config.allcount > 0) {
      Msg.show('除虫成功，经验+' + 5 * Config.allcount);
    }
  },
  //施肥
  cropsSertilize(id, type) {
    let self = this;
    let IsLock = this.dataList.List[id].IsLock;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    let isCropsSpreadCount = this.dataList.List[id].CropsSpreadCount;
    if (CropsStatus !== 0 && !IsLock) {
      let CropsID = this.dataList.List[id].CropsID;
      Data.func.FarmCropsGrowTime(CropsID).then(data3 => {
        if (data3.Code > 0) {
          let createTime = data3.Model.match(/\d+/g)[0];
          let endTime = parseInt(createTime) + 48 * 60 * 60 * 1000;
          let nowDate = Date.parse(new Date());
          let time = utils.fn.timeDiff(nowDate, endTime);
          let progressNum = (time.days - 2) * 24 * 60 + time.hours * 60 + time.mins;

          Data.func.CropsSertilize(CropsID, type).then(data => {
            if (data.Code === 1) {
              Config.allcount = Config.allcount + 1;
              //普通肥料的时候
              if (type == 7) {
                if (progressNum < 300) {
                  //升级了
                  if (CropsStatus < 4) {
                    this.dataList.List[id].CropsStatus = CropsStatus + 1;
                  }
                }
              } else if (type == 9) {
                if (progressNum < 600) {
                  //升级了
                  this.dataList.List[id].CropsStatus = CropsStatus + 1;
                }
              }

              this.dataList.List[id].CropsSpreadCount = 1;
              cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
            }
            if (id == 11 && Config.allcount > 0) {
              Msg.show('施肥成功！');
            } else if (id == 11 && Config.allcount == 0) {
              Msg.show('已经都施过肥啦！');
            }
          });
        }
      });
    }
  },
  //收取农作物
  collectCrops(id) {
    let self = this;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus == 4 && !IsLock) {
      Config.allcount = Config.allcount + 1;
      Data.func.CollectCrops(CropsID).then(data => {
        if (data.Code === 1) {
          Config.CollectNumber = Config.CollectNumber + data.Model;

          self.dataList.List[id].CropsStatus = 0;
          self.dataList.List[id].CropsID = 0;
          self.dataList.List[id].CropsSpreadCount = 0;
          cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
          if (id == 11) {
            Msg.show('收取 × ' + Config.CollectNumber);
          }
        }
      });
    }
    if (id == 11 && Config.allcount == 0) {
      Msg.show('无可收取植物！');
    }
  },

  //更新数据
  upLocDataByPlant() {
    let self = this;
    setTimeout(() => {
      let datas = JSON.parse(cc.sys.localStorage.getItem('FarmData'));
      console.log(datas);
      self.clearAllDom(datas.List); //清除植物数据
      self.setLocData(datas.List);
      self.fatchPlant(datas.List); //重新加载植物
    }, 500);
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
      if (self.oldData !== null && !ValueList[i].IsLock) {
        if (
          self.oldData[i].CropsIsFertilization !== ValueList[i].CropsIsFertilization ||
          self.oldData[i].CropsStatus !== ValueList[i].CropsStatus ||
          self.oldData[i].IsDisinsection !== ValueList[i].IsDisinsection ||
          self.oldData[i].IsDry !== ValueList[i].IsDry ||
          self.oldData[i].IsWeeds !== ValueList[i].IsWeeds ||
          self.oldData[i].CropsSpreadCount !== ValueList[i].CropsSpreadCount ||
          self.oldData[i].IsLock !== ValueList[i].IsLock
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
    cc.director.loadScene('index', () => {
      let canvas = cc.find('Canvas');
      Tool.RunAction(canvas, 'fadeIn', 0.15);
    });
  },
  start() {},
  loadAnimates() {
    cc.loader.loadRes('Prefab/Modal/load', cc.Prefab, function(error, prefab) {
      if (error) {
        cc.error(error);
        return;
      }
      let box = cc.find('Canvas');
      // 实例
      var alert = cc.instantiate(prefab);
      box.parent.addChild(alert);
    });
  },
  addPersist() {
    if (Config.menuNode) {
      Config.menuNode.active = true;
      Config.hearderNode.active = true;
    }
  },
  showFarmTimer(e, list) {
    //显示节点（动画）
    Data.func.FarmCropsGrowTime(list[Number(e._name.slice(6))].CropsID).then(data => {
      if (data.Code > 0) {
        this.setTimeBar(e, data);
      }
    });
  },
  setTimeBar(e, data) {
    let totallenth;
    if (data.Code == 1) {
      totallenth = 8 * 60;
    } else {
      totallenth = 16 * 60;
    }
    let showNode = cc.find('timer', e);
    showNode.setLocalZOrder(1);
    let showNodeTime = cc.find('timer/text', e).getComponent(cc.Label);
    let ProgressBar = cc.find('timer/progressBar', e).getComponent(cc.ProgressBar);
    let ProgressMask = cc.find('timer/progressBar/Mask', e);
    let createTime = data.Model.match(/\d+/g)[0];
    let endTime = parseInt(createTime) + 48 * 60 * 60 * 1000;
    let nowDate = Date.parse(new Date());
    let time = utils.fn.timeDiff(nowDate, endTime);
    let progressNum = (time.hours * 60 + time.mins) / totallenth;
    ProgressBar.progress = 1 - progressNum;

    showNode.active = false;
    if (data.Code == 1) {
      showNodeTime.string = `距离成长期还需${time.hours}小时${time.mins}分`;
    } else if (data.Code == 2) {
      showNodeTime.string = `距离成熟期还需${time.hours}小时${time.mins}分`;
    } else if (data.Code == 3) {
      showNodeTime.string = `距离收获期还需${time.hours}小时${time.mins}分`;
    }

    clearTimeout(timer);
    showNode.active = true;
    ProgressMask.active = true;

    let timer = setTimeout(() => {
      if (!Config.firstLogin) {
        showNode.active = false;
        ProgressMask.active = false;
      }
    }, 2000);
  },

  update(dt) {
    // this.fatchData();
  }
});
