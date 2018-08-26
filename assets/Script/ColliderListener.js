var utils = require('utils');
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
    this.dataList = JSON.parse(cc.sys.localStorage.getItem('FarmData')); //缓存机制
  },

  onCollisionEnter: function(other) {
    let self = this;

    this.touchingNumber++;
    this.dataList = JSON.parse(cc.sys.localStorage.getItem('FarmData')); //缓存机制

    this.FarmJs = cc.find('Canvas');
    let id = Number(other.node.name.slice(4));
    let propertyId = Config.propertyId; //种子ID
    let type = Config.fertilizerId; //肥料ID
    clearTimeout(this.timers); //清理定时器
    clearTimeout(this.timers2); //清理定时器
    if (self.dataList.toolType == 1) {
      self.crops(id, propertyId, other);
    } else if (self.dataList.toolType == 2) {
      self.water(id, other);
    } else if (self.dataList.toolType == 3) {
      self.weed(id, other);
    } else if (self.dataList.toolType == 4) {
      self.disinsection(id, other);
    } else if (self.dataList.toolType == 5) {
      self.cropsSertilize(id, type, other);
    } else if (self.dataList.toolType == 6) {
      self.collectCrops(id, other);
    }
  },
  //播种
  crops(id, propertyId, other) {
    let self = this;
    let landId = this.dataList.List[id].ID;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    if (CropsID == 0 && !IsLock) {
      this.isallow = true;
      self.timers2 = setTimeout(function() {
        Msg.show('播种成功，经验+5');
      }, 500);
      Data.func.addCrops(landId, propertyId).then(data => {
        if (data.Code == 1) {
          this.dataList.List[id].CropsStatus = 1;
          cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        }
        // self.timers = setTimeout(function() {
        //   if (data.Code == 1) {
        //     // self.FarmJs.emit('updataPlant', {
        //     //   data: self.dataList.List
        //     // });
        //   } else {
        //   }
        // }, 1500);
      });
    } else {
      this.isallow = false;
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
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
      this.isallow = true;
      if (!IsDisinsection && IsWater) {
        self.timers2 = setTimeout(function() {
          Msg.show('浇水成功，经验+5');
        }, 500);
        console.log(this.dataList, id);
        this.dataList.List[id].IsDry = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        console.log(this.dataList, id);
        Data.func.CropsWatering(CropsID).then(data => {
          // self.timers = setTimeout(function() {
          //   if (data.Code === 1) {
          //     // self.FarmJs.emit('updataPlant', {
          //     //   data: self.dataList.List
          //     // });
          //   } else {
          //   }
          // }, 1500);
        });
      } else {
        this.isallow = false;
        // self.timers2 = setTimeout(function() {
        //   Msg.show('我现在不需要浇水哦~');
        // }, 500);
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
      if (!IsDisinsection && !IsWater && IsWeeds) {
        this.isallow = true;
        self.timers2 = setTimeout(function() {
          Msg.show('除草成功，经验+5');
        }, 500);
        console.log(this.dataList);
        this.dataList.List[id].IsWeeds = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        console.log(this.dataList);
        Data.func.CropsWeeding(CropsID).then(data => {
          // self.timers = setTimeout(function() {
          //   if (data.Code === 1) {
          //     // self.FarmJs.emit('updataPlant', {
          //     //   data: self.dataList.List
          //     // });
          //   } else {
          //   }
          // }, 1500);
        });
      } else {
        this.isallow = false;
        // self.timers2 = setTimeout(function() {
        //   Msg.show('我现在不需要除草哦~');
        // }, 500);
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
          Msg.show('除虫成功，经验+5');
        }, 500);
        console.log(this.dataList);
        this.dataList.List[id].IsDisinsection = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        console.log(this.dataList);
        Data.func.CropsDisinsection(CropsID).then(data => {
          // self.timers = setTimeout(function() {
          //   if (data.Code === 1) {
          //     // self.FarmJs.emit('updataPlant', {
          //     //   data: self.dataList.List
          //     // });
          //   } else {
          //   }
          // }, 1500);
        });
      } else {
        this.isallow = false;
        // self.timers2 = setTimeout(function() {
        //   Msg.show('我现在不需要除虫哦~');
        // }, 500);
      }
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
    }
  },
  //施肥
  cropsSertilize(id, type, other) {
    let self = this;
    let IsLock = this.dataList.List[id].IsLock;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    let isCropsSpreadCount = this.dataList.List[id].CropsSpreadCount;
    if (CropsStatus !== 0 && !IsLock) {
      Data.func.getFarmModalData().then(data2 => {
        let CropsID = data2.Model[id].CropsID;
        if (data2.Code === 1) {
          Data.func.FarmCropsGrowTime(CropsID).then(data3 => {
            if (data3.Code > 0) {
              let createTime = data3.Model.match(/\d+/g)[0];
              let endTime = parseInt(createTime) + 48 * 60 * 60 * 1000;
              let nowDate = Date.parse(new Date());
              let time = utils.fn.timeDiff(nowDate, endTime);
              let progressNum = (time.days - 2) * 24 * 60 + time.hours * 60 + time.mins;

              Data.func.CropsSertilize(CropsID, type).then(data => {
                if (data.Code === 1) {
                  self.timers2 = setTimeout(function() {
                    Msg.show(data.Message);
                  }, 1500);

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
                } else {
                  //Msg.show(data.Message);
                }
              });
            }
          });
        } else {
          Msg.show(data2.Message);
        }
      });
    }
    if (isCropsSpreadCount) {
      this.isallow = false;
    } else {
      this.isallow = true;
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
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus == 4 && !IsLock) {
      this.isallow = true;
      Data.func.CollectCrops(CropsID).then(data => {
        if (data.Code === 1) {
          self.CollectNumber += Number(data.Model);
          self.timers2 = setTimeout(function() {
            Msg.show('收取 × ' + self.CollectNumber);
            self.CollectNumber = 0;
          }, 500);
          self.dataList.List[id].CropsStatus = 0;
          self.dataList.List[id].CropsID = 0;
          self.dataList.List[id].CropsSpreadCount = 0;
          cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        } else {
        }
      });
    } else {
      this.isallow = false;
      // self.timers2 = setTimeout(function() {
      //   Msg.show('我现在还不能收取哦~');
      // }, 500);
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
    }
  }, //播种
  crops(id, propertyId, other) {
    let self = this;
    let landId = this.dataList.List[id].ID;
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    if (CropsID == 0 && !IsLock) {
      this.isallow = true;
      self.timers2 = setTimeout(function() {
        Msg.show('播种成功，经验+5');
      }, 500);
      Data.func.addCrops(landId, propertyId).then(data => {
        if (data.Code == 1) {
          this.dataList.List[id].CropsStatus = 1;
          cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        }
        // self.timers = setTimeout(function() {
        //   if (data.Code == 1) {
        //     // self.FarmJs.emit('updataPlant', {
        //     //   data: self.dataList.List
        //     // });
        //   } else {
        //   }
        // }, 1500);
      });
    } else {
      this.isallow = false;
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
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
      this.isallow = true;
      if (!IsDisinsection && IsWater) {
        self.timers2 = setTimeout(function() {
          Msg.show('浇水成功，经验+5');
        }, 500);
        console.log(this.dataList, id);
        this.dataList.List[id].IsDry = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        console.log(this.dataList, id);
        Data.func.CropsWatering(CropsID).then(data => {
          // self.timers = setTimeout(function() {
          //   if (data.Code === 1) {
          //     // self.FarmJs.emit('updataPlant', {
          //     //   data: self.dataList.List
          //     // });
          //   } else {
          //   }
          // }, 1500);
        });
      } else {
        this.isallow = false;
        // self.timers2 = setTimeout(function() {
        //   Msg.show('我现在不需要浇水哦~');
        // }, 500);
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
      if (!IsDisinsection && !IsWater && IsWeeds) {
        this.isallow = true;
        self.timers2 = setTimeout(function() {
          Msg.show('除草成功，经验+5');
        }, 500);
        console.log(this.dataList);
        this.dataList.List[id].IsWeeds = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        console.log(this.dataList);
        Data.func.CropsWeeding(CropsID).then(data => {
          // self.timers = setTimeout(function() {
          //   if (data.Code === 1) {
          //     // self.FarmJs.emit('updataPlant', {
          //     //   data: self.dataList.List
          //     // });
          //   } else {
          //   }
          // }, 1500);
        });
      } else {
        this.isallow = false;
        // self.timers2 = setTimeout(function() {
        //   Msg.show('我现在不需要除草哦~');
        // }, 500);
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
          Msg.show('除虫成功，经验+5');
        }, 500);
        console.log(this.dataList);
        this.dataList.List[id].IsDisinsection = false;
        cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        console.log(this.dataList);
        Data.func.CropsDisinsection(CropsID).then(data => {
          // self.timers = setTimeout(function() {
          //   if (data.Code === 1) {
          //     // self.FarmJs.emit('updataPlant', {
          //     //   data: self.dataList.List
          //     // });
          //   } else {
          //   }
          // }, 1500);
        });
      } else {
        this.isallow = false;
        // self.timers2 = setTimeout(function() {
        //   Msg.show('我现在不需要除虫哦~');
        // }, 500);
      }
    }
    if (this.isallow) {
      other.node.color = cc.Color.CYAN;
    } else {
      other.node.color = cc.Color.MAGENTA;
    }
  },
  //施肥
  cropsSertilize(id, type, other) {
    let self = this;
    let IsLock = this.dataList.List[id].IsLock;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    let isCropsSpreadCount = this.dataList.List[id].CropsSpreadCount;
    if (CropsStatus !== 0 && !IsLock) {
      Data.func.getFarmModalData().then(data2 => {
        let CropsID = data2.Model[id].CropsID;
        if (data2.Code === 1) {
          Data.func.FarmCropsGrowTime(CropsID).then(data3 => {
            if (data3.Code > 0) {
              let createTime = data3.Model.match(/\d+/g)[0];
              let endTime = parseInt(createTime) + 48 * 60 * 60 * 1000;
              let nowDate = Date.parse(new Date());
              let time = utils.fn.timeDiff(nowDate, endTime);
              let progressNum = (time.days - 2) * 24 * 60 + time.hours * 60 + time.mins;

              Data.func.CropsSertilize(CropsID, type).then(data => {
                if (data.Code === 1) {
                  self.timers2 = setTimeout(function() {
                    Msg.show(data.Message);
                  }, 1500);

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
                } else {
                  //Msg.show(data.Message);
                }
              });
            }
          });
        } else {
          Msg.show(data2.Message);
        }
      });
    }
    if (isCropsSpreadCount) {
      this.isallow = false;
    } else {
      this.isallow = true;
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
    let CropsID = this.dataList.List[id].CropsID;
    let IsLock = this.dataList.List[id].IsLock;
    let CropsStatus = this.dataList.List[id].CropsStatus;
    if (CropsStatus == 4 && !IsLock) {
      this.isallow = true;
      Data.func.CollectCrops(CropsID).then(data => {
        if (data.Code === 1) {
          self.CollectNumber += Number(data.Model);
          self.timers2 = setTimeout(function() {
            Msg.show('收取 × ' + self.CollectNumber);
            self.CollectNumber = 0;
          }, 500);
          self.dataList.List[id].CropsStatus = 0;
          self.dataList.List[id].CropsID = 0;
          self.dataList.List[id].CropsSpreadCount = 0;
          cc.sys.localStorage.setItem('FarmData', JSON.stringify(this.dataList));
        } else {
        }
      });
    } else {
      this.isallow = false;
      // self.timers2 = setTimeout(function() {
      //   Msg.show('我现在还不能收取哦~');
      // }, 500);
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
    if (this.touchingNumber === 0) {
      // other.node.color = cc.Color.WHITE;
    }
    //找到当前预置资源
    let id = Number(other.node.name.slice(4));
    let ParentNodes = other.node.parent.parent;
    let PlantNodes = cc.find('Prefab' + id, ParentNodes);
    let PlantNodesTip = cc.find('Prefab' + id + '/New Node/reap', ParentNodes);
    //是否存在预置资源

    if (PlantNodes) {
      //是否成熟并且选择是镰刀收割工具
      if (
        this.dataList.List[id].CropsStatus == 4 &&
        this.dataList.toolType == 6 &&
        !this.dataList.List[id].IsDisinsection &&
        !this.dataList.List[id].IsDry &&
        !this.dataList.List[id].IsWeeds
      ) {
        var action = cc.sequence(cc.moveBy(0.3, 0, 20), cc.fadeOut(0.5), cc.callFunc(PlantNodes.removeFromParent));
        PlantNodes.runAction(action);
      }
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
