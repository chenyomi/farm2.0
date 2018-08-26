var Alert = {
  _alert: null, // prefab
  _detailLabel: null, // 内容
  _cancelButton: null, // 确定按钮
  _enterButton: null, // 取消按钮
  _enterCallBack: null, // 回调事件
  _bgButton: null, // 黑色半透明背景（点击关闭）
  _icon: null, // Alert头部图标
  _animSpeed: 0.3, // 动画速度
  _titleLabel: null,
  _newPrefabUrl: 'Prefab/Alert1',
  _newPrefabCallBack: null
};

/**
 * 更改更改更改更改更改
 * detailString :   内容 string 类型 .
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
 * iconPic:         icon图标路径
 */
// enterCallBack:   确定点击事件回调  function 类型.
Alert.show = function(
  detailString,
  enterCallBack,
  iconPic,
  title,
  needCancel,
  animSpeed,
  newPrefabUrl,
  newPrefabCallBack
) {
  // 引用
  var self = this;

  // 判断
  if (Alert._alert != undefined) Alert._alert.destroy();

  //
  Alert._animSpeed = animSpeed ? animSpeed : Alert._animSpeed;

  // 加载 prefab 创建
  if (newPrefabUrl == undefined) {
    cc.loader.loadRes('Prefab/Alert1', cc.Prefab, function(error, prefab) {
      if (error) {
        cc.error(error);
        return;
      }

      // 实例
      var alert = cc.instantiate(prefab);

      // Alert 持有
      Alert._alert = alert;
      // 获取子节点
      Alert._detailLabel = cc.find('alertBackground/detailLabel', alert).getComponent(cc.Label);
      Alert._cancelButton = cc.find('alertBackground/New Node/cancelButton', alert);
      Alert._enterButton = cc.find('alertBackground/New Node/enterButton', alert);
      Alert._bgButton = cc.find('bg', alert);
      Alert._iconNode = cc.find('alertBackground/icon', alert);
      Alert._icon = cc.find('alertBackground/icon', alert).getComponent(cc.Sprite);
      Alert._titleLabel = cc.find('alertBackground/title', alert).getComponent(cc.Label);

      self.ready();
      //设置图标
      if (iconPic) {
        cc.loader.loadRes(iconPic, cc.SpriteFrame, function(err, spriteFrame) {
          Alert._icon.spriteFrame = spriteFrame;
        });
      } else {
        Alert._iconNode.active = false;
      }

      // 添加点击事件
      Alert._enterButton.on('click', self.onButtonClicked, self);
      Alert._cancelButton.on('click', self.onButtonClicked, self);
      Alert._bgButton.on('click', self.onButtonClicked, self);
      Alert._alert.width = cc.winSize.width;
      // 父视图
      cc.find('Canvas').parent.addChild(Alert._alert, 3);

      // 展现 alert
      // self.startFadeIn();
      // 参数
      self.configAlert(detailString, title, enterCallBack, needCancel, animSpeed);
    });
  } else {
    Alert._newPrefabUrl = newPrefabUrl;
    Alert._newPrefabCallBack = newPrefabCallBack;
    self._newPrefabCallBack();
  }
  // 参数
  self.configAlert = function(detailString, title, enterCallBack, needCancel, animSpeed) {
    // 回调
    Alert._enterCallBack = enterCallBack;

    // 内容
    Alert._detailLabel.string = detailString;
    Alert._titleLabel.string = title || '标题';
    // 是否需要取消按钮
    if (needCancel || needCancel == undefined) {
      // 显示
      Alert._cancelButton.active = true;
    } else {
      // 隐藏
      Alert._cancelButton.active = false;
      Alert._enterButton.x = 0;
    }
  };
  //加载动画
  self.ready = function() {
    var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
    var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
    self.actionFadeIn = cc.sequence(cc.fadeTo(Alert._animSpeed, 255), cbFadeIn);
    self.actionFadeOut = cc.sequence(cc.fadeTo(Alert._animSpeed, 0), cbFadeOut);
  };
  // 执行弹进动画
  self.startFadeIn = function() {
    cc.eventManager.pauseTarget(Alert._alert, true);
    Alert._alert.position = cc.p(0, 0);
    Alert._alert.opacity = 0;
    Alert._alert.runAction(self.actionFadeIn);
  };

  // 执行弹出动画
  self.startFadeOut = function() {
    cc.eventManager.pauseTarget(Alert._alert, true);
    Alert._alert.runAction(self.actionFadeOut);
  };

  // 弹进动画完成回调
  self.onFadeInFinish = function() {
    cc.eventManager.resumeTarget(Alert._alert, true);
  };

  // 弹出动画完成回调
  self.onFadeOutFinish = function() {
    self.onDestory();
  };

  // 按钮点击事件
  self.onButtonClicked = function(event) {
    if (event.target.name == 'enterButton') {
      if (self._enterCallBack) {
        self._enterCallBack();
      }
    }
    // self.startFadeOut();
    self.onDestory();
  };
  //自定义按钮事件
  self.newButtonEvent = function(prefab, buttonUrl, event) {
    if (!event && prefab && buttonUrl) {
      var cancelButton = cc.find(buttonUrl, prefab);
      cancelButton.on('click', function() {
        // var action = cc.sequence(cc.fadeOut(0.3), cc.callFunc(prefab.removeFromParent, prefab));
        // prefab.runAction(action);
        self.onDestory();
      });
    }
  };
  // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
  self.onDestory = function() {
    // var sceneNode = cc.find("Canvas");
    Alert._alert.destroy();
    // cc.find("Alert1", sceneNode).removeFromParent();
    Alert._enterCallBack = null;
    Alert._alert = null;
    Alert._detailLabel = null;
    Alert._cancelButton = null;
    Alert._enterButton = null;
    Alert._animSpeed = 0.3;
    Alert._newPrefabUrl = null;
    Alert._newPrefabCallBack = null;
  };
};
