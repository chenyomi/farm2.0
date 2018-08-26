var Data = require('Data');
var utils = require('utils');
cc.Class({
  extends: cc.Component,

  properties: {
    AddressList_Prefab: {
      default: null,
      type: cc.Prefab
    },
    noTip_Prefab: {
      default: null,
      type: cc.Prefab
    }
  },
  defaultId: 0,
  check_Prefab: null,
  btnBackEvent() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },
  btnGoAddressAdd() {
    cc.director.loadScene('AddressAdd');
  },
  getAddressList() {
    let self = this;
    Data.func.getAddressList().then(data => {
      if (data.List) {
        const PrefabParent = cc.find('scrollview/view/layout/toggleGroup', this.node);
        for (let i = 0; i < data.List.length; i++) {
          const PropertyList = cc.instantiate(this.AddressList_Prefab);
          let UserName = cc.find('toggle/New Node/label', PropertyList).getComponent(cc.Label);
          let Address = cc.find('toggle/New Node/label2', PropertyList).getComponent(cc.Label);
          let box = cc.find('toggle', PropertyList).getComponent(cc.Toggle);
          let checkButton = cc.find('toggle', PropertyList);
          let rightButton = cc.find('right', PropertyList);
          console.log(PropertyList._name);
          if (data.List[i].IsDefault) {
            self.defaultId = data.List[i].ID;
            box.isChecked = true;
            self.check_Prefab = PropertyList;
          }
          box.toggleGroup = PrefabParent.getComponent(cc.ToggleGroup);
          UserName.string = data.List[i].username + '  ' + data.List[i].telNumber;
          Address.string = data.List[i].addressDetailInfo;
          checkButton.on('click', function() {
            self.defaultId = data.List[i].ID;
            self.check_Prefab = PropertyList;
          });
          rightButton.on('click', () => {
            Config.addressId = data.List[i].ID;
            cc.director.loadScene('AddressEdit');
          });
          PrefabParent.addChild(PropertyList);
        }
        console.log(self.defaultId);
      } else {
        const PropertyList = cc.instantiate(this.noTip_Prefab);
        const PrefabParent = cc.find('scrollview/view/layout/toggleGroup', this.node);
        PrefabParent.addChild(PropertyList);
      }
    });
  },
  setDefaultId() {
    let self = this;
    Data.func.setDefaultAddress(self.defaultId).then(data => {
      Msg.show('地址设置成功');
      setTimeout(function() {
        Config.backArr.pop();
        cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
      }, 2000);
    });
  },
  delDefaultId() {
    let self = this;
    Data.func.delDefaultAddress(self.defaultId).then(data => {
      Msg.show('地址删除成功');
      const PrefabParent = cc.find('scrollview/view/layout/toggleGroup', this.node);
      setTimeout(function() {
        PrefabParent.removeAllChildren();
        self.getAddressList();
      }, 2000);
    });
  },
  onLoad() {
    Config.backArr.indexOf('AddressList') == -1 ? Config.backArr.push('AddressList') : false;
    console.log(Config.backArr);
    this.getAddressList();
  },

  start() {},

  update(dt) {}
});
