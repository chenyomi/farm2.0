var Data = require('Data');
var utils = require('utils');
var Func = Data.func;
var DateFormat = require('utils').fn;
cc.Class({
  extends: cc.Component,
  properties: {
    chickItem_Prefab: {
      default: null,
      type: cc.Prefab
    }
  },
  Id: null,
  //产蛋周期 page
  eggTime: null,
  prevTime: null,
  nextTime: null,
  //流转记录 page
  recordPage: null,
  chickList: null,
  ctor() {
    this.recordPage = 1;
  },
  bindNode() {
    this.backButton = cc.find('bg-f3/bg/backIndex', this.node);
    this.idLabel = cc.find('bg-f3/bg/info/id', this.node).getComponent(cc.Label);
    this.sexLabel = cc.find('bg-f3/bg/info/sex', this.node).getComponent(cc.Label);
    this.hungryLabel = cc.find('bg-f3/bg/info/hungry', this.node).getComponent(cc.Label);
    this.timerLabel = cc.find('bg-f3/bg/info/timer', this.node).getComponent(cc.Label);
    this.lifeLabel = cc.find('bg-f3/bg/info/life', this.node).getComponent(cc.Label);
    // this.healthLabel = cc.find('bg-f3/bg/info/health', this.node).getComponent(cc.Label);
    this.collectButton = cc.find('bg-f3/bg/collect', this.node);
    this.growNode = cc.find('bg-f3/bg/grow/progressBar', this.node);
    this.growProgressBar = cc.find('bg-f3/bg/grow/progressBar', this.node).getComponent(cc.ProgressBar);
    this.growBar = cc.find('bg-f3/bg/grow/progressBar/bar', this.node);
    this.growLabel = cc.find('bg-f3/bg/grow/value', this.node).getComponent(cc.Label);

    this.growthButton = cc.find('bg-f3/btn-group/btn-growth', this.node);
    this.growthLabelNode = cc.find('bg-f3/btn-group/btn-growth/label', this.node);
    this.growthLineNode = cc.find('line', this.growthButton);
    this.recordButton = cc.find('bg-f3/btn-group/btn-record', this.node);
    this.recordLineNode = cc.find('line', this.recordButton);
    this.recordLabelNode = cc.find('bg-f3/btn-group/btn-record/label', this.node);
    // chickList滚动视图 内容节点
    this.contentNode = cc.find('chickList/view/content', this.node);
    //Tab切换的内容
    this.content1Node = cc.find('bg-f3/content1', this.node);
    this.content2Node = cc.find('bg-f3/content2', this.node);
    //流转记录滚动视图 内容节点
    this.transactionNode = cc.find('scrollView/view/content', this.content2Node);
    this.content2ListNode = cc.find('scrollView', this.content2Node);
    this.calendarNode = cc.find('calendar', this.content1Node);
    this.calendarJs = this.calendarNode.getComponent('Calendar');
    //按钮
    this.leftButton = cc.find('left', this.content1Node);
    this.rightButton = cc.find('right', this.content1Node);
    this.yearMonthLabel = cc.find('yearMonth', this.content1Node).getComponent(cc.Label);
  },
  initData() {
    this.growNode.cascadeOpacity = false;
    //初始化小鸡详情
    this.initChickData();
    //初始化小鸡列表
    this.initChickList();
  },
  //初始化小鸡详情
  initChickData() {
    this.transactionNode.removeAllChildren();
    this.recordPage = 1;
    //初始化小鸡信息
    this.initChickInfo();
    // 初始化小鸡 流转记录
    this.initChickTransaction();
    // 初始化小鸡 产蛋记录
    this.initEggRecord('');
  },

  //初始化小鸡列表
  initChickList() {
    //  获取正常的小鸡
    Func.GetChickList(4).then(data => {
      if (data.Code === 1) {
        let list = data.List;
        let item = null;

        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          if (this.Id == element.ID) {
            item = list.splice(i, 1)[0];
            break;
          }
        }
        list.unshift(item);
        this.assignChickList(list);
        this.chickList = list;
      }
    });
  },
  //小鸡列表赋值1
  assignChickList(list) {
    // let loop = true
    for (let i = 0; i < list.length; i++) {
      let itemNode = cc.instantiate(this.chickItem_Prefab);
      let idLbael = cc.find('id', itemNode).getComponent(cc.Label);
      let imgNode = cc.find('img', itemNode);

      idLbael.string = list[i].ID;
      this.contentNode.addChild(itemNode);

      if (this.Id == list[i].ID) {
        itemNode.setScale(1.3, 1.3);
        cc.loader.loadRes('chickDetail/2', cc.SpriteFrame, (err, spriteFrame) => {
          imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
      }

      itemNode.on('click', () => {
        this.Id = list[i].ID;
        this.initChickData();
        for (let i = 0; i < this.chickList.length; i++) {
          const element = this.chickList[i];
          this.contentNode.children[i].setScale(1, 1);
          cc.loader.loadRes('chickDetail/1', cc.SpriteFrame, (err, spriteFrame) => {
            cc.find('img', this.contentNode.children[i]).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        }
        cc.loader.loadRes('chickDetail/2', cc.SpriteFrame, (err, spriteFrame) => {
          imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        itemNode.setScale(1.3, 1.3);
      });
    }
  },
  //切换小鸡选中效果
  switchChickActive(id) {
    if (this.Id === id) {
    }
  },
  //根据小鸡状态 显示不同的图片
  showChickState(imgNode, hungry, shit) {
    if (hungry) {
      //饥饿状态
      !shit
        ? cc.loader.loadRes('chickDetail/hungry', cc.SpriteFrame, (err, spriteFrame) => {
            imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          })
        : false;
      //饥饿+肮脏状态
      shit
        ? cc.loader.loadRes('chickDetail/hungry_shit', cc.SpriteFrame, (err, spriteFrame) => {
            imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          })
        : false;
    }
    if (shit) {
      //肮脏状态
      !hungry
        ? cc.loader.loadRes('chickDetail/shit', cc.SpriteFrame, (err, spriteFrame) => {
            imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          })
        : false;
      //肮脏+饥饿状态
      hungry
        ? cc.loader.loadRes('chickDetail/hungry_shit', cc.SpriteFrame, (err, spriteFrame) => {
            imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          })
        : false;
    }
  },
  initChickInfo() {
    Func.GetChickValueById(this.Id).then(data => {
      if (data.Code === 1) {
        this.assignChickInfo(data);
      }
    });
  },
  //小鸡数据赋值
  assignChickInfo(data) {
    this.idLabel.string = `编号：${this.Id}`;
    this.sexLabel.string = `性别：${data.Sex ? '小姐姐' : '小哥哥'}`;
    this.hungryLabel.string = `饱食度：${data.StarvationValue}`;
    // let createTime = data.NextLayEgg.match(/\d+/g)[0];

    // let endTime = parseInt(createTime) + 48 * 60 * 60 * 1000;
    // let nowDate = Date.parse(new Date());
    let time = utils.fn.timeDiffHour(data.LayEggRemainTimes);

    if (data.IsStop) {
      this.timerLabel.string = `产蛋时间：${time.days}天${time.hours}小时${time.mins}分(暂停)`;
    } else {
      this.timerLabel.string = `下次产蛋时间：${time.days}天${time.hours}小时${time.mins}分`;
    }
    this.lifeLabel.string = `产蛋次数：${data.LayEggCounts}/60次`;
    this.growProgressBar.progress = Math.round(data.StarvationValue) / 100;
    this.growLabel.string = `${Math.round(data.StarvationValue)}/100`;

    this.collectButton.on('click', () => {
      //收取贵妃鸡
      Func.CollectChick(this.Id).then(data => {
        if (data.Code == 1) {
          let action = cc.sequence(
            cc.fadeOut(0.3),
            cc.callFunc(() => {
              this.Chick.active = false;
            }, this)
          );
          this.Chick.runAction(action);
          Msg.show(data.Message);
        } else {
          Msg.show(data.Message);
        }
      });
    });
    // 是否已被收取
    if (data.CallBack) {
      cc.loader.loadRes('chickDetail/collected', cc.SpriteFrame, (err, spriteFrame) => {
        this.collectButton.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        this.collectButton.getComponent(cc.Button).interactable = false;
      });
    } else {
      // 是否能被收取
      if (data.ReturnBack) {
        cc.loader.loadRes('chickDetail/collect', cc.SpriteFrame, (err, spriteFrame) => {
          this.collectButton.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
      }
      // else {
      //   cc.loader.loadRes('chickDetail/noCollect', cc.SpriteFrame, (err, spriteFrame) => {
      //     this.collectButton.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      //     this.collectButton.getComponent(cc.Button).interactable = false;
      //   });
      // }
    }
  },
  // 流转记录
  initChickTransaction() {
    Func.GetChickenTransaction(this.Id, this.recordPage).then(data => {
      if (data.Code === 1) {
        this.assignChickTransaction(data.List);
        this.recordPage++;
      } else if (data.Code === -1) {
        //empty
      } else {
        Msg.show(data.Message);
      }
    });
  },
  // 流转记录赋值
  assignChickTransaction(list) {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      let time = element.CreateTime.match(/\d+/g)[0];
      time = DateFormat.formatNumToDate(time);

      let name = element.RealName;
      let money = element.Money;
      let rearingDays = element.RearingDays;

      cc.loader.loadRes('Prefab/chickDetail/dealItem', cc.Prefab, (err, prefab) => {
        let itemNode = cc.instantiate(prefab);
        let timeLabel = cc.find('time', itemNode).getComponent(cc.Label);
        let nameLabel = cc.find('name', itemNode).getComponent(cc.Label);
        let moneyLabel = cc.find('price/money', itemNode).getComponent(cc.Label);
        let buyLabel = cc.find('price/label', itemNode).getComponent(cc.Label);
        let chickLabel = cc.find('chick', itemNode).getComponent(cc.Label);

        timeLabel.string = time;
        nameLabel.string = name;
        moneyLabel.string = money;
        chickLabel.string = `${rearingDays}天的贵妃鸡`;

        this.transactionNode.addChild(itemNode);
      });
    }
  },
  //产蛋周期
  initEggRecord(time) {
    Func.GetChickenEggRecord(this.Id, time).then(data => {
      if (data.Code === 1) {
        this.assignEggRecord(data.List);
      } else {
        Msg.show(data.Message);
      }
    });
  },
  //产蛋周期赋值
  assignEggRecord(list) {
    let year = parseInt(list[0].eggtime.match(/\d+/g)[0]);
    let month = parseInt(list[0].eggtime.match(/\d+/g)[1]);

    let nextYear, nextMonth, prevYear, PrevMonth;
    // if (month < 12) {
    //   this.nextTime = `${year}-${month + 1}-1`;
    // } else {
    //   this.nextTime = `${year + 1}-${1}-1`;
    // }
    month < 12 ? (this.nextTime = `${year}-${month + 1}-1`) : (this.nextTime = `${year + 1}-${1}-1`);
    // if (month > 1) {
    //   this.prevTime = `${year}-${month - 1}-1`;
    // } else {
    //   this.prevTime = `${year - 1}-${12}-1`;
    // }
    month > 1 ? (this.prevTime = `${year}-${month - 1}-1`) : (this.prevTime = `${year - 1}-${12}-1`);
    this.yearMonthLabel.string = `${year}年${month}月`;
    this.calendarJs.func.initCalendar.call(this.calendarJs, list, year, month - 1);
  },
  // 绑定事件
  bindEvent() {
    //返回index页面
    this.backButton.on('click', () => {
      cc.director.loadScene('index');
    });
    // 生长周期Tab
    this.growthButton.on('click', () => {
      this.growthLabelNode.color = cc.color('#FF4A4A');
      this.recordLabelNode.color = cc.color('#B2B2B2');
      this.growthLineNode.active = true;
      this.recordLineNode.active = false;
      this.content1Node.active = true;
      this.content2Node.active = false;
    });
    //转手记录Tab
    this.recordButton.on('click', () => {
      this.growthLabelNode.color = cc.color('#B2B2B2');
      this.recordLabelNode.color = cc.color('#FF4A4A');
      this.recordLineNode.active = true;
      this.growthLineNode.active = false;
      this.content1Node.active = false;
      this.content2Node.active = true;
    });
    // 流转记录 下拉加载
    this.content2ListNode.on('bounce-bottom', () => {
      this.initChickTransaction();
    });

    this.leftButton.on('click', () => {
      this.eggtime = this.prevTime;
      this.initEggRecord(this.eggtime);
    });

    this.rightButton.on('click', () => {
      this.eggtime = this.nextTime;
      this.initEggRecord(this.eggtime);
    });
  },

  onLoad() {
    Config.backArr.indexOf('chickDetail') == -1 ? Config.backArr.push('chickDetail') : false;
  },

  start() {
    this.Id = Config.chickID;
    this.bindNode();
    this.bindEvent();
    this.initData();
  },
  goToHelp() {
    cc.director.loadScene('Help');
  }
  // update (dt) {},
});
