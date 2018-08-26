var Data = require('Data');
var utils = require('utils');
cc.Class({
  extends: cc.Component,
  btnBackEvent() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },

  addAddress() {
    let self = this;
    let name = cc.find('layout/address1/right/editbox', self.node).getComponent(cc.EditBox); //姓名
    let tel = cc.find('layout/address2/right/editbox', self.node).getComponent(cc.EditBox); //电话
    let info = cc.find('layout/address3/right/editbox', self.node).getComponent(cc.EditBox); //地址
    Data.func.addAddress(name.string, tel.string, '000000', info.string).then(data => {
      if (data.Code == 0) {
        Msg.show(data.Message);
      } else {
        Msg.show(data.Message);
        setTimeout(function() {
          cc.director.loadScene('AddressList');
        }, 2000);
      }
    });
  },
  onLoad() {
    Config.backArr.indexOf('AddressAdd') == -1 ? Config.backArr.push('AddressAdd') : false;
    console.log(Config.backArr);
    var self = this;
  },

  start() {}

  // update (dt) {},
});
