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
cc.Class({
  extends: cc.Component,

  properties: {
    item_perfab: {
      default: null,
      type: cc.Prefab
    }
  },
  //itemList插入的位置
  contentNode: null,
  //获取天气数据 （index表示当前页 size表示加载多少页）
  index: null,
  size: null,
  //初始化的数据
  data: null,
  bindNode() {
    this.scrollviewNode = cc.find('bg/ScrollView', this.node);
    this.scrollView = this.scrollviewNode.getComponent(cc.ScrollView);
    //Label节点绑定
    this.temLabel = cc.find('div-title/tem', this.node).getComponent(cc.Label);
    this.timeLabel = cc.find('div-title/div-time/time', this.node).getComponent(cc.Label);
    this.windsLabel = cc.find('Grid/winds/value', this.node).getComponent(cc.Label);
    this.winddLabel = cc.find('Grid/windd/value', this.node).getComponent(cc.Label);
    this.humLabel = cc.find('Grid/hum/value', this.node).getComponent(cc.Label);
    this.pmLabel = cc.find('Grid/pm/value', this.node).getComponent(cc.Label);
    this.pmTipLabel = cc.find('Grid/pm/tip/text', this.node).getComponent(cc.Label);
    this.rainLabel = cc.find('Grid/rain/value', this.node).getComponent(cc.Label);
    this.paLabel = cc.find('Grid/pa/value', this.node).getComponent(cc.Label);
    this.co2Label = cc.find('Grid/co2/value', this.node).getComponent(cc.Label);
    this.soiltemLabel = cc.find('Grid/soiltem/value', this.node).getComponent(cc.Label);
    this.soilwaterLabel = cc.find('Grid/soilwater/value', this.node).getComponent(cc.Label);
    this.ecLabel = cc.find('Grid/ec/value', this.node).getComponent(cc.Label);
    this.noiLabel = cc.find('Grid/noi/value', this.node).getComponent(cc.Label);
    this.noiTipLabel = cc.find('Grid/noi/tip/text', this.node).getComponent(cc.Label);
    this.powerLabel = cc.find('Grid/power/value', this.node).getComponent(cc.Label);

    //内容节点（插入数据）
    this.contentNode = cc.find('bg/ScrollView/view/content', this.node);
    //背景图片节点
    this.bgNode = cc.find('div-title', this.node);
  },
  onLoad() {
    this.bindNode();
    this.index = 1;
    this.size = 4;
    //加载数据
    this.updateData(0).then(data => {
      this.assignData(data);
    });

    //滑动到最右侧 加载数据
    this.scrollviewNode.on(
      'bounce-right',
      () => {
        this.updateData(1);
      },
      this
    );
    //同步滑动
    // this.titleScrollNode.on("scrolling", this.titleScrollEvent, this);
    // this.scrollviewNode.on("scrolling", this.scrollEvent, this);
  },
  //加载数据
  updateData(type) {
    return new Promise((resolve, reject) => {
      Func.GetWetherData(this.index, this.size).then(res => {
        let data = res.data.weatherdata;
        for (let i = 0; i < data.length; i++) {
          let info = data[i];
          //初始化的数据(第一次加载数据时 将第一条数据返回resolve 然后填充数据)
          resolve(data[0]);

          //时间item
          let itemNode = cc.instantiate(this.item_perfab);
          let timeLabel = cc.find('value', itemNode).getComponent(cc.Label);
          timeLabel.string = info.intime;

          if (type === 0 && i === 0) {
            this.addActive(itemNode);
          }

          itemNode.on(
            'click',
            event => {
              this.assignData(info);
              this.removeActive();
              this.addActive(itemNode);
            },
            this
          );
          this.contentNode.addChild(itemNode);
        }

        this.index += 1;
      });
    });
  },

  //赋值
  assignData(data) {
    this.temLabel.string = data.tem + '℃';
    this.timeLabel.string = data.intime;
    this.windsLabel.string = data.winds;
    this.winddLabel.string = data.windd;
    this.pmLabel.string = data.light;
    this.rainLabel.string = data.rain;
    this.paLabel.string = data.pa;
    this.co2Label.string = data.co2;
    this.soiltemLabel.string = data.soiltem;
    this.soilwaterLabel.string = data.soilwater;
    this.ecLabel.string = data.ec;
    this.noiLabel.string = data.noi;
    this.powerLabel.string = data.power;
    this.humLabel.string = data.hum;

    //负氧离子指数
    let noitip = '';
    if (data.noi > 5000) {
      noitip = '优';
    } else if (data.noi > 2000 && data.noi <= 5000) {
      noitip = '良';
    } else if (data.noi > 500 && data.noi <= 2000) {
      noitip = '中';
    } else {
      noitip = '差';
    }
    this.noiTipLabel.string = noitip;
  },
  //选中效果
  addActive(itemNode) {
    itemNode.setColor(cc.color('#ff4c4c'));
    itemNode.children.forEach(childNode => {
      childNode.setColor(cc.color('#ffffff'));
    });
  },
  //移除选中效果
  removeActive() {
    this.contentNode.children.forEach(childNode => {
      childNode.setColor(cc.color('#f8f8f8'));

      let valueNode = cc.find('value', childNode);
      let btnNode = cc.find('btn', childNode);

      valueNode.setColor(cc.color('#666666'));
      btnNode.setColor(cc.color('#ff4c4c'));
    });
  },

  start() {},
  loadSceneIndex() {
    cc.director.loadScene('index');
  }
  //   update(dt) {
  //     //console.log(this.scrollviewNode.getComponent(cc.ScrollView).getContentPosition());
  //   }
});
