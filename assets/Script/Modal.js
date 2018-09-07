var Modal = cc.Class({
  extends: cc.Component,
  properties: {
    Prefab: {
      default: null,
      type: cc.Prefab
    }
  },
  _Modal: null,

  // 动画

  showModal: function(event, data) {
    this._Modal = {}; //初始化
    // this.ParentBox = cc.find("Canvas", this.node.parent);
    //查找dom默认为根节点
    this.ParentBox = cc.find('Canvas');
    if (!this.ParentBox) {
      this.ParentBox = this.node.parent;
    }
    if (!this.ParentBox.getChildByName(this.Prefab.name)) {
      this._Modal = cc.instantiate(this.Prefab);
      this.ParentBox.parent.addChild(this._Modal);
    } else {
      this._Modal = this.ParentBox.getChildByName(this.Prefab.name);
    }
    this.RunAction("fadeIn"); //默认
  },
  closeModal: function() {
    var self = this;
    var action = cc.sequence(cc.scaleTo(0.3, 0,0), cc.callFunc(this.Modal.active = false, this._Modal));
    this._Modal.runAction(action);
  },

  //弹出动画 （默认fadeIn）
  RunAction(type) {
    var action = null;
    switch (type) {
      case 'fadeIn':
        this._Modal.scale = 0
        this._Modal.active = true;
        action = cc.sequence(cc.scaleTo(0.3, 1.05, 1.05), cc.scaleTo(0.15, 1, 1));
        this._Modal.runAction(action);
        break;
      case 'moveIn':
        var shareNode = cc.find('bg-share', this._Modal);
        action = cc.moveTo(0.3, cc.p(0, -474));
        shareNode.runAction(action);
        break;
      default:
        this._Modal.active = true;
        // this._Modal.opacity = 0;
        // action = cc.fadeIn(0.3);
        // this._Modal.runAction(action);
        break;
    }

    return action;
  },

  onLoad: function() {
    this.func = {
      showModal: this.showModal,
      closeModal: this.closeModal
    };
  }
});
