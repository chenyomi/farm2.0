var Data = require('Data');
var Func = Data.func;
var Tool = require('Tool').Tool;
var DateFormat = require('utils').fn;

cc.Class({
  extends: cc.Component,

  properties: {},
  //材料的名称
  makeName: null,
  productCount: null,
  makeType: null,

  ctor() {
    this.makeName = '玉米';
    this.productCount = 1;
    //制作成饲料
    this.productType = 1;
    // 玉米的Id
    this.makeId = 6;
  },
  bindNode() {
    this.closeButton = cc.find('btn-close', this.node);
    this.textLabel = cc.find('bg/layout/text', this.node).getComponent(cc.Label);
    this.makingNode = cc.find('bg/layout/content/makings/img', this.node);
    this.makingLabel = cc.find('bg/layout/content/makings/value', this.node).getComponent(cc.Label);
    this.productNode = cc.find('bg/layout/content/product/img', this.node);

    this.payPointLabel = cc.find('bg/layout/pointBox/pay/point/value', this.node).getComponent(cc.Label);
    this.balancePointLabel = cc.find('bg/layout/pointBox/balance/point/value', this.node).getComponent(cc.Label);

    this.compoundButton = cc.find('bg/layout/compound', this.node);
    this.addButton = cc.find('bg/layout/content/product/choose/add', this.node);
    this.minusButton = cc.find('bg/layout/content/product/choose/minus', this.node);
    this.productValueLabel = cc.find('bg/layout/content/product/choose/value', this.node).getComponent(cc.Label);
    this.errorLabel = cc.find('bg/layout/error', this.node).getComponent(cc.Label);
  },
  bindEvent() {
    // 关闭模态框
    this.closeButton.on('click', () => {
      Tool.closeModal(this.node);
    });
    // add按钮
    this.addButton.on('click', () => {
      this.productCount++;
      this.updateData();
    });
    // minus按钮
    this.minusButton.on('click', () => {
      this.productCount > 1 ? this.productCount-- : 1;
      this.updateData();
    });
    //合成按钮
    this.compoundButton.on('click', () => {
      Func.postCompound(this.productType, this.productCount, this.makeId).then(data => {
        if (data.Code === 1) {
          Msg.show(data.Message);
          Tool.closeModal(this.node);
          cc.find('modal', this.node.parent).removeFromParent();
          this.updateSystemPage();
        } else {
          this.errorLabel.string = data.Message;
        }
      });
    });
  },
  updateData() {
    Func.GetMakeInfo(this.productType, this.productCount, this.makeId).then(data => {
      if (data.Code === 1) {
        this.assignData(data.Model);
      } else {
        Msg.show(data.Message);
      }
    });
  },
  //赋值
  assignData(data) {
    let repertoryCount = data.WarehouseCount;
    // 用户剩余积分数
    let userPoint = data.UserMoney;
    let makeCount = data.UpgradeCount;
    let payPoint = data.PayMoney;
    let productName;
    switch (this.productType) {
      case 1:
        productName = '饲料';
        break;
      case 2:
        productName = '肥料';
        break;
      case 3:
        productName = '超级肥料';
        break;
    }
    this.assignSprite(this.makingNode, this.makeName);
    this.assignSprite(this.productNode, productName);

    this.textLabel.string = `合成一份${productName}需要${makeCount / this.productCount}份${this.makeName}`;
    this.payPointLabel.string = payPoint;
    this.balancePointLabel.string = userPoint;
    this.makingLabel.string = `${makeCount}/${repertoryCount}`;
    this.productValueLabel.string = this.productCount;

    //设置字体颜色
    let color = repertoryCount >= makeCount ? '#74DA72' : '#FF4C4C';
    this.makingLabel.node.setColor(cc.color(color));
  },
  //合成之后 更新仓库数据
  updateSystemPage() {
    this.sceneJs = cc.find('Canvas').getComponent('Repertory');
    this.sceneJs.func.GetSystemListByPage.call(this.sceneJs);
  },
  // 根据不同的名称 加载不同的图片
  assignSprite(node, name) {
    let resName;
    switch (name) {
      case '玉米':
        resName = 'ym';
        break;
      case '饲料':
        resName = 'sl';
        break;
      case '粪便':
        resName = 'fb';
        break;
      case '超级肥料':
        resName = 'cjhf';
        break;
      case '肥料':
        resName = 'hf';
        break;

      default:
        break;
    }
    cc.loader.loadRes(`Modal/Repertory/compound/${resName}`, cc.SpriteFrame, (err, spriteFrame) => {
      node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
  },
  onLoad() {
    this.bindNode();
    this.updateData();
    this.bindEvent();
  },

  start() {}

  // update (dt) {},
});
