'use strict';

var Msg = {
  _text: null,
  _timer: null,
  _animSpeed: 0.3,
  _timeout: 2000,
  MsgNode: null
};

Msg.show = function(text, animSpeed, timeout) {
  var _this = this;
  if (_this.MsgNode != undefined) {
    _this.MsgNode.removeFromParent();
    clearTimeout(_this._timer);
  }

  this._animSpeed = animSpeed ? animSpeed : this._animSpeed;
  this._timeout = timeout ? timeout : this._timeout;
  cc.loader.loadRes('Prefab/Msg', cc.Prefab, function(err, Prefab) {
    _this.MsgNode = cc.instantiate(Prefab);
    _this.modalNode = cc.find('modal', _this.MsgNode);
    var msgLabel = cc.find('modal/message', _this.MsgNode).getComponent(cc.Label);
    var msgBgOpation = cc.find('modal', _this.MsgNode);
    msgBgOpation.cascadeOpacity = false;
    msgLabel.string = text;
    var parentNode = cc.find('Canvas');
    parentNode.parent.addChild(_this.MsgNode, 5);

    _this.MsgNode.opacity = 0;
    _this.MsgNode.runAction(cc.fadeIn(_this._animSpeed));
    //2秒后移除
    clearTimeout(_this._timer);
    var action = cc.sequence(
      cc.fadeOut(_this._animSpeed),
      cc.callFunc(function() {
        if (_this.MsgNode) _this.MsgNode.removeFromParent();
      }, _this)
    );
    _this._timer = setTimeout(function() {
      // _this.MsgNode.runAction(action);
      if (_this.MsgNode) _this.MsgNode.removeFromParent();
    }, _this._timeout);
    _this.modalNode.on('click', function() {
      _this.MsgNode.setOpacity(0);
    });
  });
};
