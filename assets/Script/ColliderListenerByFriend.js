var Data = require('Data');

cc.Class({
  extends: cc.Component,

  properties: {},
  dataList: null,
  // use this for initialization
  onLoad: function() {
    cc.director.getCollisionManager().enabled = true;
    this.touchingNumber = 0;
    this.CollectNumber = 0;
    this.iscollectCrops = false;
  },

  onCollisionEnter: function(other) {
    let self = this;

    // setTimeout(function() {
    //   other.node.color = cc.Color.WHITE;
    // }, 500);
    this.touchingNumber++;

    this.dataList = JSON.parse(cc.sys.localStorage.getItem('FarmData')); //缓存机制
    this.FarmJs = cc.find('Canvas');
    let id = Number(other.node.name.slice(4));
    let propertyId = Config.propertyId; //种子ID
    let type = Config.fertilizerId; //肥料ID
    clearTimeout(this.timers); //清理定时器
    clearTimeout(this.timers2); //清理定时器
    if (self.dataList.toolType == 2) {
      self.water(id, other);
    } else if (self.dataList.toolType == 3) {
      self.weed(id, other);
    } else if (self.dataList.toolType == 4) {
      self.disinsection(id, other);
    } else if (self.dataList.toolType == 6) {
      self.collectCrops(id, other);
    }
  },
  //浇水
  water(id, other) {
    let self = this;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let IsDisinsection = this.dataList.List[id].IsDisinsection;
    let IsWater = this.dataList.List[id].IsDry;
    let IsWeeds = this.dataList.List[id].IsWeeds;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus !== 0 && !IsLock && IsWater) {
      if (!IsDisinsection && IsWater) {
        this.isallow = true;
        self.timers2 = setTimeout(function() {
          Msg.show('帮助好友浇水成功，经验+5');
        }, 500);
        Data.func.CropsWatering(CropsID, Config.openID).then(data => {
          if (data.Code === 1) {
            self.timers = setTimeout(function() {
              Data.func.getFarmModalData(Config.friendOpenId).then(data2 => {
                // FarmJs.fn.setLocalStorageData.call(FarmJs, data2);
                self.FarmJs.emit('updataPlant', {
                  data: data2.Model
                });
              });
            }, 1500);
          } else {
          }
        });
      } else {
        this.isallow = false;
      }
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
    }
  },
  //除草
  weed(id, other) {
    let self = this;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let IsDisinsection = this.dataList.List[id].IsDisinsection;
    let IsWater = this.dataList.List[id].IsDry;
    let IsWeeds = this.dataList.List[id].IsWeeds;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus !== 0 && !IsLock && IsWeeds) {
      if (IsWeeds && !IsDisinsection && !IsWater) {
        this.isallow = true;
        self.timers2 = setTimeout(function() {
          Msg.show('帮助好友除草成功，经验+5');
        }, 500);
        Data.func.CropsWeeding(CropsID, Config.openID).then(data => {
          if (data.Code === 1) {
            self.timers = setTimeout(function() {
              Data.func.getFarmModalData(Config.friendOpenId).then(data2 => {
                // FarmJs.fn.setLocalStorageData.call(FarmJs, data2);
                self.FarmJs.emit('updataPlant', {
                  data: data2.Model
                });
              });
            }, 1500);
          } else {
          }
        });
      } else {
        this.isallow = false;
      }
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
    }
  },
  //除虫
  disinsection(id, other) {
    let self = this;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let IsDisinsection = this.dataList.List[id].IsDisinsection;
    let IsWater = this.dataList.List[id].IsDry;
    let IsWeeds = this.dataList.List[id].IsWeeds;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus !== 0 && !IsLock && IsDisinsection) {
      if (IsDisinsection) {
        this.isallow = true;
        self.timers2 = setTimeout(function() {
          Msg.show('帮助好友除虫成功，经验+5');
        }, 500);
        Data.func.CropsDisinsection(CropsID, Config.openID).then(data => {
          if (data.Code === 1) {
            self.timers = setTimeout(function() {
              Data.func.getFarmModalData(Config.friendOpenId).then(data2 => {
                // FarmJs.fn.setLocalStorageData.call(FarmJs, data2);
                self.FarmJs.emit('updataPlant', {
                  data: data2.Model
                });
              });
            }, 1500);
          } else {
          }
        });
      } else {
        this.isallow = false;
      }
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
    }
  },
  //收取农作物
  collectCrops(id, other) {
    let self = this;
    let IsLock = this.dataList.List[id].IsLock;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus == 4 && !IsLock) {
      this.isallow = true;
      if (!this.iscollectCrops) {
        Data.func.FriendsStealCrops(Config.friendOpenId).then(data => {
          if (data.Code === 1) {
            this.iscollectCrops = true;
            Msg.show(data.Message);
          } else {
            this.iscollectCrops = true;
            Msg.show(data.Message);
          }
        });
      } else {
        this.isallow = false;
      }
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
    }
  },
  onCollisionStay: function(other) {},

  onCollisionExit: function(other) {
    //碰撞后的状态显示
    this.touchingNumber--;
    // if (this.touchingNumber === 0) {
    //   other.node.color = cc.Color.WHITE;
    // }
    //找到当前预置资源
    let id = Number(other.node.name.slice(4));
    let ParentNodes = other.node.parent.parent;
    let PlantNodes = cc.find('Prefab' + id, ParentNodes);
    let PlantNodesTip = cc.find('Prefab' + id + '/New Node/reap', ParentNodes);
    //是否存在预置资源

    if (PlantNodes) {
      //是否成熟并且选择是镰刀收割工具
      // if (
      //   this.dataList.List[id].CropsStatus == 4 &&
      //   this.dataList.toolType == 6 &&
      //   !this.dataList.List[id].IsDisinsection &&
      //   !this.dataList.List[id].IsDry &&
      //   !this.dataList.List[id].IsWeeds
      // ) {
      //   var action = cc.sequence(cc.moveBy(0.3, 0, 20), cc.fadeOut(0.5), cc.callFunc(PlantNodes.removeFromParent));
      //   PlantNodes.runAction(action);
      // }
      //浇水
      if (this.dataList.List[id].IsDry && this.dataList.toolType == 2) {
        var action = cc.fadeOut(0.5);
        PlantNodesTip.runAction(action);
      }
      //除草
      if (this.dataList.List[id].IsWeeds && this.dataList.toolType == 3) {
        var action = cc.fadeOut(0.5);
        PlantNodesTip.runAction(action);
      }
      //除虫
      if (this.dataList.List[id].IsDisinsection && this.dataList.toolType == 4) {
        var action = cc.fadeOut(0.5);
        PlantNodesTip.runAction(action);
      }
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
