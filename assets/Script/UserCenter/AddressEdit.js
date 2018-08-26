var Data = require('Data');
var utils = require('utils');
cc.Class({
  extends: cc.Component,
  id: null,
  username: null,
  tel: null,
  info: null,
  pro: null,
  btnBackEvent() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },

  updataAddress() {
    let self = this;

    Data.func.updateAddress(self.id, self.username.string, self.tel.string, '000000', self.info.string).then(data => {
      cc.director.loadScene('AddressList');
    });
  },
  onLoad() {
    Config.backArr.indexOf('AddressEdit') == -1 ? Config.backArr.push('AddressEdit') : false;
    console.log(Config.backArr);
  },

  start() {
    var self = this;
    self.id = Config.addressId;
    self.username = cc.find('layout/address1/right/editbox', self.node).getComponent(cc.EditBox); //姓名
    self.tel = cc.find('layout/address2/right/editbox', self.node).getComponent(cc.EditBox); //电话
    self.info = cc.find('layout/address3/right/editbox', self.node).getComponent(cc.EditBox); //地址
    Data.func.getAddressList().then(data => {
      for (let i = 0; i < data.List.length; i++) {
        if (data.List[i].ID == self.id) {
          self.username.string = data.List[i].username;
          self.tel.string = data.List[i].telNumber;
          self.info.string = data.List[i].addressDetailInfo;
        }
      }
    });
  }

  // update (dt) {},
});
