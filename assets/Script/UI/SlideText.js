var Data = require('Data');
var Func = Data.func;
var ToolJs = require('Tool');
var Tool = ToolJs.Tool;
cc.Class({
  extends: cc.Component,

  properties: {},

  start() {
    let self = this;
    this.NoticeList = []
    if (!Config.SlideNode) {
      Config.SlideNode = this.node;
      cc.game.addPersistRootNode(this.node);
    }
    this.getNotice()//获取公告信息
    Tool.slidePluign(cc.find('New Node/label', this.node), null,null,null,1)
    self.schedule(function () {
      self.getNotice()
    }, 10);

  },
  getNotice() {
    let self = this;
    Func.GetSysNotice().then(data => {
      if (data.Code === 1) {
        if (data.List.length > 0) {
          let DataList = data.List.reverse();
          if(this.NoticeList.length == 0){
            this.NoticeList = DataList;
          }
          if (DataList[0].ID > this.NoticeList[0].ID) {

            if (!Config.noticeIsSlide) {
              Tool.slidePluign(cc.find('New Node/label', this.node), cc.find('New Node/label', this.node).getComponent(cc.Label), this.NoticeList, (DataList[0].ID - this.NoticeList[0].ID))
              this.NoticeList = DataList;
             
            }

          }
        }
        console.log(this.NoticeList);
      } else {
        console.log('首页数据加载失败');
      }
    });
  },
  Notice() {
    clearTimeout(this.NoticeTimer);
    let showNode = cc.find('farmer/farmer-text', this.node);
    let showNodeText = cc.find('farmer/farmer-text/text', this.node).getComponent(cc.Label);
    if (this.speakList.length == 1) {
      this.speakType = 0;
    }
    if (this.speakList[this.speakType] != undefined) {
      showNodeText.string = this.speakList[this.speakType];
      this.speakType++;
      if (this.speakType >= this.speakList.length) {
        this.speakType = 0;
      }

      showNode.active = true;
      this.NoticeTimer = setTimeout(() => {
        showNode.active = false;
      }, 5000);
    }
  },
  setHeardData() {

  },



  // update (dt) {},
});
