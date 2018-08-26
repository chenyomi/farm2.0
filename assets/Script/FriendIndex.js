var Data = require('Data');
var Func = Data.func;
var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
cc.Class({
  extends: cc.Component,

  properties: {},

  bindNode() {
    this.backButton = cc.find('bg/btn-back', this.node);

    this.nameLabel = cc.find('bg/name', this.node).getComponent(cc.Label);
    this.handNode = cc.find('Hand', this.node);
    this.handAnim = this.handNode.getComponent(cc.Animation);
    // this.eggNode = cc.find('bg/house/shouquEgg', this.node);
    this.houseNode = cc.find('bg/house', this.node);
    // this.moneyLabel = cc.find("div_header/gold/money", this.node).getComponent(cc.Label);
    //天气
    // this.wether = this.node.getChildByName('div_wether');
    //饲料数量
    // this.feedCountLabel = cc.find('div_action/feed/icon-tip/count', this.node).getComponent(cc.Label);
    //星星盒子
    this.starsBox = cc.find('bg/starsBox', this.node);
    this.moon = cc.find('bg/moon', this.node);

    this.scene = cc.find('Canvas');
    this.hatchBoxNode = cc.find('hatch-box', this.node);
    this.bgNode = cc.find('bg', this.node);
    this.cloud1Node = cc.find('cloud01', this.bgNode);
    this.cloud2Node = cc.find('cloud02', this.bgNode);
    this.chickList = [];
    this.shitBoxNode = cc.find('shit-box', this.node);
    this.botNode = cc.find('bot', this.node);
    this.eggMoreNode = cc.find('eggMore', this.node);
    this.eggCountLabel = cc.find('count', this.eggMoreNode).getComponent(cc.Label);
    //风车
    this.windmillNode = cc.find('windmill', this.bgNode);
    this.flabellumNode = cc.find('flabellum', this.windmillNode);
  },
  initData(data) {
    document.title = `${data.UserModel.RealName}的牧场`;
    let friendImg = cc.find('div_header/advisor/advisor', this.node);
    let Lv = cc.find('div_header/level-icon/New Label', this.node).getComponent(cc.Label);
    this.setHeadImg(friendImg, data.UserModel.Headimgurl);
    Lv.string = data.UserModel.Grade;
    //产蛋棚等级
    let eggsShedRank = data.EggsShed.ShedRank;
    let RanchRank = data.RanchModel.RanchRank;
    this.eggsShedRank = eggsShedRank;
    this.RanchRank = RanchRank;

    // 初始化 粪便
    for (let i = 0; i < data.RanchModel.FaecesCount; i++) {
      cc.loader.loadRes('Prefab/Index/shit', cc.Prefab, (err, prefab) => {
        let shitNode = cc.instantiate(prefab);
        shitNode.setPosition(Tool.random(0, 400), Tool.random(0, 200));
        this.shitBoxNode.addChild(shitNode);
      });
    }

    //初始化机器人
    this.botNode.active = data.RanchModel.IsHasCleaningMachine;
    if (data.RanchModel.IsHasCleaningMachine) {
      Tool.RunAction(this.botNode, 'fadeIn', 0.15);
    }

    //初始化牧场是否显示鸡蛋
    this.eggMoreNode.active = data.RanchModel.EggCount > 0 ? true : false;
    this.eggCountLabel.string = `x${data.RanchModel.EggCount}`;

    //初始化产蛋棚是否显示鸡蛋
    // this.eggNode.active = data.EggsShed.EggCount > 0 ? true : false;

    let upOrDown = true;
    // this.schedule(() => {
    //   let action = upOrDown ? cc.moveBy(0.5, 0, 20) : cc.moveBy(0.5, 0, -20);
    //   this.eggNode.runAction(action);
    //   upOrDown = !upOrDown;
    // }, 0.5);
    // this.updateWeatherBox();
    this.updateWeather().then(() => {
      this.initChick();
      this.initEggShed(eggsShedRank);
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
  //只运行一次
  initChick() {
    let self = this;
    //获取正常的鸡
    Func.GetChickList(1, Config.friendOpenId).then(data => {
      if (data.Code == 1) {
        //初始化鸡是否显示
        let length = data.List.length;

        //调用setId接口 给鸡传Id 默认最后那只鸡
        for (let i = 0; i < length; i++) {
          let element = data.List[i];
          var chickNode = cc.find(`Chick${i}`, this.node);
          chickNode.active = true;
          Tool.RunAction(chickNode, 'fadeIn', 0.15);
          chickNode.setPosition(250 - Math.random() * 500, Math.random() * -250 - 200);
          // let feedNode = cc.find('feed', chickNode);
          // feedNode.active = element.IsHunger;
          this.chickJs = chickNode.getComponent('ChickFriend');
          this.chickJs.setId(data.List[i].ID);
          this.chickJs._status = data.List[i].Status;

          this.chickList.push(chickNode);
          // });
        }
      }
    });
  },
  setChickPositionX(i) {
    if (i > 6) {
      return (i - 6) * 100 - 350;
    } else {
      return (i + 1) * 100 - 350;
    }
  },
  setChickPositionY(i) {
    if (i > 4) {
      return -450;
    } else {
      return -300;
    }
  },
  animates() {
    cc.loader.loadRes('Prefab/Modal/House', cc.Prefab, function(error, prefab) {
      if (error) {
        cc.error(error);
        return;
      }
      let box = cc.find('Canvas');
      // 实例
      var alert = cc.instantiate(prefab);
      alert.setPosition(390, 300);
      box.parent.addChild(alert);
    });
  },
  //点击清理事件
  showClearAlert: function() {
    var self = this;
    //调用接口
    Func.PostFriendsClean(Config.friendOpenId)
      .then(data => {
        if (data.Code === 1) {
          self.animates();
          //清洁动画

          this.shitBoxNode.removeAllChildren();
        } else {
          //牧场不脏 弹出提示框
          Msg.show(data.Message);
        }
      })
      .catch(reason => {
        Msg.show('failed:' + reason);
      });
  },
  // 偷取鸡蛋
  stealEgg() {
    Func.PostSteaEgg(Config.friendOpenId).then(data => {
      if (data.Code == 1) {
        let action = cc.sequence(
          cc.fadeOut(0.3),
          cc.callFunc(() => {
            let countnow = Number(this.eggCountLabel.string.slice(1)) - 1;
            if (countnow > 0) {
              this.eggCountLabel.string = `x${countnow}`;
            } else {
              this.eggMoreNode.active = false;
            }
          }, this)
        );
        this.eggMoreNode.runAction(action);
        Msg.show(data.Message);
      } else {
        Msg.show(data.Message);
      }
    });
  },
  //更新 饲料tip的数量
  updateFeedCount() {
    Func.GetFeedCount().then(data => {
      if (data.Code === 1) {
        this.feedCountLabel.string = data.Model;
      } else {
        Msg.show(data.Message);
      }
    });
  },
  //更新天气box数据
  updateWeatherBox() {
    Func.GetWetherData(1, 1).then(res => {
      let wetherItem1 = cc.find('soiltem', this.wether).getComponent(cc.Label);
      let wetherItem2 = cc.find('div/date', this.wether).getComponent(cc.Label);

      let time = res.data.weatherdata[0].intime.split(' ');
      let date = time[0].split('-');
      wetherItem1.string = res.data.weatherdata[0].soiltem + '℃';
      wetherItem2.string = date[1] + '月' + date[2] + '日';
    });
  },
  //根据天气情况 判断牧场的背景
  updateWeather() {
    let myDate = new Date();
    let rainNode = cc.find('ParticleRain', this.node);
    let self = this;
    // let wetherIcon = cc.find('div/icon', this.wether).getComponent(cc.Sprite);
    return Func.GetCurrentWeather().then(res => {
      if (res.data.rain !== 0) {
        //下雨
        Config.weather = -1;

        if (this.RanchRank == 1) {
          cc.loader.loadRes('jpg/rain-bg1', cc.SpriteFrame, (err, spriteFrame) => {
            this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        } else if (this.RanchRank == 2) {
          cc.loader.loadRes('jpg/rain-bg2', cc.SpriteFrame, (err, spriteFrame) => {
            this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        } else if (this.RanchRank == 3) {
          cc.loader.loadRes('jpg/rain-bg3', cc.SpriteFrame, (err, spriteFrame) => {
            this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        }
        //图标
        // cc.loader.loadRes('weather/rain', cc.SpriteFrame, (err, spriteFrame) => {
        //   wetherIcon.spriteFrame = spriteFrame;
        // });
        //云
        cc.loader.loadRes('index/rain/cloud01', cc.SpriteFrame, (err, spriteFrame) => {
          this.cloud1Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes('index/rain/cloud02', cc.SpriteFrame, (err, spriteFrame) => {
          this.cloud2Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        //食盆
        cc.loader.loadRes('index/rain/hatchBox', cc.SpriteFrame, (err, spriteFrame) => {
          this.hatchBoxNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        //风车
        cc.loader.loadRes('index/rain/windmill', cc.SpriteFrame, (err, spriteFrame) => {
          this.windmillNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes('index/rain/flabellum', cc.SpriteFrame, (err, spriteFrame) => {
          this.flabellumNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        rainNode.active = true;
      } else if (res.data.light === 2 || res.data.light === 3) {
        //阴天
        Config.weather = 0;
        if (this.RanchRank == 1) {
          cc.loader.loadRes('jpg/cloud-bg1', cc.SpriteFrame, (err, spriteFrame) => {
            this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        } else if (this.RanchRank == 2) {
          cc.loader.loadRes('jpg/cloud-bg2', cc.SpriteFrame, (err, spriteFrame) => {
            this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        } else if (this.RanchRank == 3) {
          cc.loader.loadRes('jpg/cloud-bg3', cc.SpriteFrame, (err, spriteFrame) => {
            this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        }
        // cc.loader.loadRes('weather/overcast', cc.SpriteFrame, (err, spriteFrame) => {
        //   wetherIcon.spriteFrame = spriteFrame;
        // });
        //云
        cc.loader.loadRes('index/cloud/cloud01', cc.SpriteFrame, (err, spriteFrame) => {
          this.cloud1Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes('index/cloud/cloud02', cc.SpriteFrame, (err, spriteFrame) => {
          this.cloud2Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        //食盆
        cc.loader.loadRes('index/cloud/hatchBox', cc.SpriteFrame, (err, spriteFrame) => {
          this.hatchBoxNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        //风车
        cc.loader.loadRes('index/cloud/windmill', cc.SpriteFrame, (err, spriteFrame) => {
          this.windmillNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes('index/cloud/flabellum', cc.SpriteFrame, (err, spriteFrame) => {
          this.flabellumNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        rainNode.active = false;
      } else if (res.data.light === 1) {
        Config.weather = 1;
        if (myDate.getHours() > 18) {
          this.moon.active = true;
          cc.loader.loadRes('jpg/night', cc.SpriteFrame, (err, spriteFrame) => {
            this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.loader.loadRes('index/sun/cloud01', cc.SpriteFrame, (err, spriteFrame) => {
            this.cloud1Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.loader.loadRes('index/sun/cloud02', cc.SpriteFrame, (err, spriteFrame) => {
            this.cloud2Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          //食盆
          cc.loader.loadRes('index/sun/hatchBox', cc.SpriteFrame, (err, spriteFrame) => {
            this.hatchBoxNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          //风车
          cc.loader.loadRes('index/sun/windmill', cc.SpriteFrame, (err, spriteFrame) => {
            this.windmillNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.loader.loadRes('index/sun/flabellum', cc.SpriteFrame, (err, spriteFrame) => {
            this.flabellumNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          rainNode.active = false;
          //星星
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
        } else {
          if (this.RanchRank == 1) {
            cc.loader.loadRes('jpg/sun-bg1', cc.SpriteFrame, (err, spriteFrame) => {
              this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
          } else if (this.RanchRank == 2) {
            cc.loader.loadRes('jpg/sun-bg2', cc.SpriteFrame, (err, spriteFrame) => {
              this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
          } else if (this.RanchRank == 3) {
            cc.loader.loadRes('jpg/sun-bg3', cc.SpriteFrame, (err, spriteFrame) => {
              this.bgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
          }
          // cc.loader.loadRes('weather/sun', cc.SpriteFrame, (err, spriteFrame) => {
          //   wetherIcon.spriteFrame = spriteFrame;
          // });
          //云
          cc.loader.loadRes('index/sun/cloud01', cc.SpriteFrame, (err, spriteFrame) => {
            this.cloud1Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.loader.loadRes('index/sun/cloud02', cc.SpriteFrame, (err, spriteFrame) => {
            this.cloud2Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          //食盆
          cc.loader.loadRes('index/sun/hatchBox', cc.SpriteFrame, (err, spriteFrame) => {
            this.hatchBoxNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          //风车
          cc.loader.loadRes('index/sun/windmill', cc.SpriteFrame, (err, spriteFrame) => {
            this.windmillNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.loader.loadRes('index/sun/flabellum', cc.SpriteFrame, (err, spriteFrame) => {
            this.flabellumNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          rainNode.active = false;
        }
      }
    });
  },
  //初始化产蛋棚图片 （未加入到init中，后台没有数据）
  initEggShed(rank) {
    if (Config.weather === -1) {
      cc.loader.loadRes('index/rain/house_3', cc.SpriteFrame, (err, spriteFrame) => {
        this.houseNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    } else if (Config.weather === 0) {
      cc.loader.loadRes('index/cloud/house_3', cc.SpriteFrame, (err, spriteFrame) => {
        this.houseNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    } else if (Config.weather === 1) {
      cc.loader.loadRes('index/sun/house_3', cc.SpriteFrame, (err, spriteFrame) => {
        this.houseNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    }
    Tool.RunAction(this.houseNode, 'fadeIn', 0.15);
  },

  //跳转天气数据列表
  gotoWetherPage() {
    cc.director.loadScene('weatherInfo');
  },
  loadIndexScene() {
    cc.director.loadScene('index', () => {
      let canvas = cc.find('Canvas');
      Tool.RunAction(canvas, 'fadeIn', 0.15);
    });
  },
  gotoFriendFarm() {
    let self = this;
    cc.director.loadScene('FriendFarm', () => {
      let canvas = cc.find('Canvas');
      Tool.RunAction(canvas, 'fadeIn', 0.15);
    });
  },

  onLoad() {},

  start() {
    let self = this;
    this.bindNode();
    Tool.touchMove(this.node, function(e) {
      Func.GetLastAndNextFriend(Config.friendOpenId).then(res => {
        if (res.Code === 1) {
          Config.friendOpenId = res.LastFriend;
          if (e == 0) {
          } else if (e == 1) {
            Config.friendOpenId = res.NestFriend;
          }
        }
        cc.director.loadScene('FriendIndex', () => {
          let canvas = cc.find('Canvas');
          Tool.RunAction(canvas, 'fadeIn', 0.15);
        });
      });
    });
    Func.GetWholeData(Config.friendOpenId).then(data => {
      if (data.Code === 1) {
        this.initData(data);
      } else {
        console.log('首页数据加载失败');
      }
    });
  }

  // update (dt) {},
});
