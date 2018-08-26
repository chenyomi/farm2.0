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
var Tool = require('Tool').Tool;
cc.Class({
  extends: cc.Component,

  properties: {},

  ctor() {},
  btnBackEvent() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },
  bindNode() {
    let self = this;
    this.moneyLabel = cc.find('bg/container/div/gold/money', this.node).getComponent(cc.Label);
    this.moneyPay = cc.find('bg/container/btn-pay', this.node);
    this.moneyPay.on('click', function() {
      self.paySelfMoney();
    });
  },
  initData() {
    Func.GetUserMoney().then(data => {
      if (data.Code === 1) {
        this.moneyLabel.string = data.Model;
      } else {
        Msg.show(data.Message);
      }
    });
  },
  onLoad() {
    Config.backArr.indexOf('repertory') == -1 ? Config.backArr.push('repertory') : false;
    console.log(Config.backArr);
    this.bindNode();
    this.initData();
  },
  onBridgeReady(data) {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: data.appId, //公众号名称，由商户传入
        timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
        nonceStr: data.nonceStr, //随机串
        package: data.packageValue,
        signType: 'MD5', //微信签名方式：
        paySign: data.paySign //微信签名
      },
      function(res) {
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          Msg.show('支付成功');
          setTimeout(function() {
            Func.GetUserGrade().then(data => {
              if (data.Code === 1) {
                self.moneyLabel.string = data.Model.RanchMoney;
              }
            });
          }, 500);

          Tool.updateHeader();
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      }
    );
  },
  isInteger(obj) {
    return typeof obj === 'number' && obj % 1 === 0; //是整数，则返回true，否则返回false
  },
  paymoney(e) {
    let self = this;

    Func.UserRecharge(1, 1, this.setType(Number(e.currentTarget._name.substring(3)))).then(data => {
      if (data.appId !== '') {
        if (typeof WeixinJSBridge == 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          self.onBridgeReady(data);
        }
      } else {
        Msg.show(data.msg);
      }
    });
  },
  setType(n) {
    let self = this;
    let num = 1;
    switch (n) {
      case 1:
        num = 1;
        break;
      case 2:
        num = 58;
        break;
      case 3:
        num = 108;
        break;
      case 4:
        num = 208;
        break;
      case 5:
        num = 1888;
        break;
    }
    return num;
  },
  paySelfMoney() {
    let self = this;

    let input = cc.find('bg/container/div_input/input', this.node).getComponent(cc.EditBox);
    console.log(Number(input.string));
    if (this.isInteger(Number(input.string))) {
      if (Number(input.string) >= 1) {
        Func.UserRecharge(1, 1, Number(input.string)).then(data => {
          if (data.appId !== '') {
            if (typeof WeixinJSBridge == 'undefined') {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            } else {
              self.onBridgeReady(data);
            }
          } else {
            Msg.show(data.msg);
          }
        });
      } else {
        Msg.show('充值金额必须大于1');
      }
    } else {
      Msg.show('请输入整数');
    }
  },
  start() {}

  // update (dt) {},
});
