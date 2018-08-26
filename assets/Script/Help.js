cc.Class({
  extends: cc.Component,

  properties: {},

  // onLoad () {},

  start() {},
  slideToggle(e) {
    let self = this;
    Config.guideIntro = Number(e.currentTarget._name.substr(5));
    cc.director.loadScene('HelpDetail');
  },
  back() {
    Config.backArr.pop();
    cc.director.loadScene(Config.backArr[Config.backArr.length - 1]);
  },
  onLoad() {
    Config.backArr.indexOf('Help') == -1 ? Config.backArr.push('Help') : false;
  }
  // update (dt) {},
});
