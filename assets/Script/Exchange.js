var Data = require('Data');
var Func = Data.func;
cc.Class({
  extends: cc.Component,

  properties: {},
  _actualName: null,
  _actualCount: null,
  _virtualName: null,
  _virtualCount: null,
  _goodsType: null,
  _userName: null,
  _phone: null,
  _address: null,

  ctor() {
    //从config文件中初始化
    this._actualName = Config.exchangeData.actualName;
    this._actualCount = Config.exchangeData.actualCount;
    this._virtualName = Config.exchangeData.virtualName;
    this._virtualCount = Config.exchangeData.virtualCount;
    this._goodsType = Config.exchangeData.goodsType;
  },

  bindNode() {
    this.infoNameLabel = cc.find('bg/info/layout/name', this.node).getComponent(cc.Label);
    this.infoPhoneLabel = cc.find('bg/info/layout/phone', this.node).getComponent(cc.Label);
    this.addressLabel = cc.find('bg/info/address', this.node).getComponent(cc.Label);
    this.actualNameLabel = cc.find('bg/lay/actual/name', this.node).getComponent(cc.Label);
    this.minusButton = cc.find('bg/lay/actual/layout/btn-minus', this.node);
    this.addButton = cc.find('bg/lay/actual/layout/btn-add', this.node);
    this.actualCountLabel = cc.find('bg/lay/actual/layout/rect-border/count', this.node).getComponent(cc.Label);
    this.virtualNameLabel = cc.find('bg/lay/virtual/name', this.node).getComponent(cc.Label);
    this.virtualCountLabel = cc.find('bg/lay/virtual/count', this.node).getComponent(cc.Label);
    this.exchangeButton = cc.find('bg/enterButton', this.node);
    this.rightButton = cc.find('bg/info/btn-right', this.node);

    this.ischooseChick = 1;
    this.chooseChickNode = cc.find('bg/lay/choose', this.node);
    this.chooseChickTypeM = cc.find('bg/lay/choose/layout/muji', this.node);
    this.chooseChickTypeG = cc.find('bg/lay/choose/layout/gongji', this.node);
    this.chooseChickTypeMText = cc.find('bg/lay/choose/layout/muji/count', this.node);
    this.chooseChickTypeGText = cc.find('bg/lay/choose/layout/gongji/count', this.node);
  },
  initData() {
    this.actualNameLabel.string = this._actualName;
    this.actualCountLabel.string = this._actualCount;
    this.virtualNameLabel.string = this._virtualName;
    switch (this._goodsType) {
      case 1: //贵妃鸡
        this.virtualCountLabel.string = this._virtualCount;
        this.chooseChickNode.active = true;
        break;
      case 2: //鸡蛋
        this.virtualCountLabel.string = this._virtualCount * 12;
        break;
    }

    //收货信息
    Func.getAddressList().then(data => {
      if (data.Code === 1) {
        let list = data.List;
        let info = list.forEach(element => {
          if (element.IsDefault) {
            this._userName = element.username;
            this._phone = element.telNumber;
            this._address = element.addressDetailInfo;
          }
        });

        this.infoNameLabel.string = this._userName;
        this.infoPhoneLabel.string = this._phone;
        this.addressLabel.string = this._address;
      } else Msg.show(data.Message);
    });
  },

  bindEvent() {
    //选择公鸡母鸡
    let self = this;
    this.chooseChickTypeM.on('click', function() {
      cc.loader.loadRes('Modal/rect-border2', cc.SpriteFrame, function(err, spriteFrame) {
        self.chooseChickTypeM.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      cc.loader.loadRes('Modal/rect-border', cc.SpriteFrame, function(err, spriteFrame) {
        self.chooseChickTypeG.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      self.chooseChickTypeMText.color = cc.color('#ff4c4c');
      self.chooseChickTypeGText.color = cc.color('#444444');
      self.ischooseChick = 0;
    });

    this.chooseChickTypeG.on('click', function() {
      cc.loader.loadRes('Modal/rect-border', cc.SpriteFrame, function(err, spriteFrame) {
        self.chooseChickTypeM.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      cc.loader.loadRes('Modal/rect-border2', cc.SpriteFrame, function(err, spriteFrame) {
        self.chooseChickTypeG.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
      self.chooseChickTypeMText.color = cc.color('#444444');
      self.chooseChickTypeGText.color = cc.color('#ff4c4c');
      self.ischooseChick = 1;
    });
    //减号按钮事件
    this.minusButton.on('click', () => {
      this._actualCount = this._actualCount - 1 < 0 ? 0 : this._actualCount - 1;
      Func.GetExchangeCount(this._goodsType, this._actualCount).then(data => {
        this._virtualCount = data.Model;
        this.actualCountLabel.string = this._actualCount;
        this.virtualCountLabel.string = this._virtualCount;
      });
    });
    //加号按钮事件
    this.addButton.on('click', () => {
      this._actualCount++;
      Func.GetExchangeCount(this._goodsType, this._actualCount).then(data => {
        if (data.Code === 1) {
          this._virtualCount = data.Model;
          this.actualCountLabel.string = this._actualCount;
          this.virtualCountLabel.string = this._virtualCount;
        } else {
          this._actualCount--;
          Msg.show(data.Message);
        }
      });
    });
    //兑换事件
    this.exchangeButton.on('click', () => {
      switch (this._goodsType) {
        case 1: //贵妃鸡
          Func.ExchangeChicken(this._userName, this._address, this._phone, this._actualCount, this.ischooseChick).then(
            data => {
              if (data.Code === 1) {
                Msg.show(data.Message);
              } else {
                Msg.show(data.Message);
              }
            }
          );
          break;
        case 2: //鸡蛋
          Func.ExchangeEgg(this._userName, this._address, this._phone, this._actualCount).then(data => {
            if (data.Code === 1) {
              Msg.show(data.Message);
            } else {
              Msg.show(data.Message);
            }
          });
          break;
      }
    });
    //跳转到地址列表事件
    this.rightButton.on('click', () => {
      this.loadAddressListScene();
    });
  },
  loadAddressListScene() {
    cc.director.loadScene('UserCenter/AddressList');
  },
  loadRepertory() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },
  onLoad() {
    Config.backArr.indexOf('exchange') == -1 ? Config.backArr.push('exchange') : false;
    console.log(Config.backArr);
    this.bindNode();
  },
  start() {
    this.initData();
    this.bindEvent();
  }
});
