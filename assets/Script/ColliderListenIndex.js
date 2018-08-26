cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
  },
  dataList: null,
  // use this for initialization
  onLoad: function() {
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;
    // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    this.touchingNumber = 0;
  },

  onCollisionEnter: function(other) {
    console.log(other.name.substring(0, 4));
    if (other.name.substring(0, 4) == 'tool') {
      this.node.color = cc.Color.GREEN;
    }
    this.touchingNumber++;
  },

  onCollisionStay: function(other) {},

  onCollisionExit: function() {
    //碰撞后的状态显示
    this.node.color = cc.Color.WHITE;
    this.touchingNumber--;
    if (this.touchingNumber === 0) {
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
