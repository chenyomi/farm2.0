var Data = require('Data');
var Func = Data.func;
//************
// month from 0 ~ 11
cc.Class({
  extends: cc.Component,

  properties: {
    parentNode: {
      default: null,
      type: cc.Node
    }
  },
  todayNode: null, //item 节点
  // use this for initialization
  newyear: null,
  newmonth: null,
  newday: null,
  List: null,
  onLoad: function() {
    var date = new Date();
    this.newyear = date.getFullYear();
    this.newmonth = date.getMonth();
    this.newday = date.getDate();
    console.log(this.newmonth, this.newday, 1);
    this.func = {
      initCalendar: this.initCalendar
    };
  },
  //渲染日历（）
  renderCalendar() {
    // 获取这月有多少天
    var currentDay = this.getMonthsDay(this.newyear, this.newmonth);
    // 获取当月第一天星期几
    var firstDay = this.getMonthFirst(this.newyear, this.newmonth);
    var lastMonth = this.newmonth - 1 >= 0 ? this.newmonth - 1 : 12;
    var lastDay = this.getMonthsDay(this.newyear, lastMonth);
    var newlastDay = lastDay;
    //几号
    var newCurrentDay = 1;
    console.log(this.newyear + ' ' + this.newmonth);
    console.log(Config.UserModel.CreateTime);
    for (var i = firstDay; i < currentDay + firstDay; i++) {
      var itemNode = this.node.getChildByName(`item${i}`);
      var dayNode = itemNode.getChildByName('item_undo').getChildByName('day'); //日期节点(item)
      if (newCurrentDay == this.newday) {
        dayNode.color = new cc.Color(65, 205, 225);
        this.todayNode = this.node.getChildByName(`item${i}`);
      }
      dayNode.getComponent(cc.Label).string = newCurrentDay++;

      for (let j = 0; j < this.List.length; j++) {
        //是否签到
        const state = this.List[j].IsSign;
        //如果签到了 设置为签到状态
        if (i == j + firstDay && state) {
          itemNode.getChildByName('item_do').active = true;
          itemNode.getChildByName('item_undo').active = false;
        }
        //  else if (newCurrentDay - 1 !== this.newday) {
        //   cc.find('icon-1', itemNode.getChildByName('item_undo')).active = true;
        //   itemNode.on('click', function() {
        //     console.log(1);
        //   });
        // }
      }
    }
  },
  //为日历赋值（后台获取的数据）
  initCalendar(list, year, month) {
    this.List = list;
    this.newyear = year;
    this.newmonth = month;

    this.judgeDate(this.newyear, this.newmonth) ? false : (this.newday = null);
    this.resetCalendar();
    this.renderCalendar();
  },
  resetCalendar() {
    for (var i = 0; i < 41; i++) {
      let itemNode = this.node.getChildByName(`item${i}`);
      let item_doNode = cc.find('item_do', itemNode);
      item_doNode.active = false;
      let item_undoNode = cc.find('item_undo', itemNode);
      item_undoNode.active = true;
      let dayLabel = cc.find('day', item_undoNode).getComponent(cc.Label);
      dayLabel.string = '';
      let dayNode = cc.find('day', item_undoNode);
      dayNode.color = cc.color('#999999');
    }
  },
  //判断是否是本月
  judgeDate(year, mouth) {
    let date = new Date();
    let nowYear = date.getFullYear();
    let nowMouth = date.getMonth();

    if (nowYear == year && nowMouth == mouth) {
      return true;
    }
    return false;
  },
  // 获取那年那月有多少天
  getMonthsDay(year, month) {
    var year = year;
    var month = month;
    if (arguments.length == 0) {
      var date = new Date();
      year = date.getFullYear();
      month = data.getMonth();
    }

    if (arguments.length == 1) {
      var date = new Date();
      month = data.getMonth();
    }

    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      monthDays[1] = 29;
    }
    return monthDays[month];
  },

  // 获取这个月第一天星期几
  getMonthFirst(year, month) {
    var year = year;
    var month = month;
    if (arguments.length == 0) {
      var date = new Date();
      year = date.getFullYear();
      month = data.getMonth();
    }

    if (arguments.length == 1) {
      var date = new Date();
      month = data.getMonth();
    }

    var newDate = new Date(year, month, 1);
    return newDate.getDay();
  }
});
