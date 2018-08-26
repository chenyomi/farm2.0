var func = {
  //获取所有数据（index页面）"dedbc83d62104d6da8d4a3c0188dc419",
  openID: 'oEHZa0xT2_SpPtdFpzU5nr7v0HxA',
  GetWholeData(openID) {
    // Loading.show();
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // GET方法
      if (openID) {
        xhr.open('GET', Config.apiUrl + '/T_Base_User/GetWholeData?openID=' + openID, true);
      } else {
        xhr.open('GET', Config.apiUrl + '/T_Base_User/GetWholeData?openID=' + this.openID, true);
      }
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
      // POST方法
      // xhr.open("POST", "http://www.jingongbao.com:4633/T_Base_User/POSTWholeData", true);
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //缺少这句，后台无法获取参数
      // xhr.send("openID=o9AgowGKcD5MAuYIhedEX&pageSize=9");
    });
  },
  //URL:
  //用户饲料槽饲料数是否满的
  GetFeedTroughFull() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_User/GetFeedTroughFull?openID=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获取流转记录
  GetChickenTransaction(cId, page = 1) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', `${Config.apiUrl}/T_Base_Chicken/GetChickenTransaction?cId=${cId}&page=${page}`, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获取产蛋周期
  GetChickenEggRecord(cId, searchTime = '') {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', `${Config.apiUrl}/T_Base_Chicken/GetChickenEggRecord?cId=${cId}&searchTime=${searchTime}`, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //产蛋排行榜 /T_Base_User/GetEggRankings
  GetEggRankings(page) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', `${Config.apiUrl}/T_Base_User/GetEggRankings?openID=${this.openID}&page=${page}`, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },

  //获取用户信息（header)
  GetUserGrade() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_User/GetUserGrade?openID=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获取好友列表
  GetFriendsList(page) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            console.log('成功获取数据');
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl + '/T_Base_User/GetFriendsList?openID=' + this.openID + '&orderby=Grade desc' + '&page=' + page,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
      // POST方法
      // xhr.open("POST", "http://www.jingongbao.com:4633/T_Base_User/POSTWholeData", true);
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //缺少这句，后台无法获取参数
      // xhr.send("openID=o9AgowGKcD5MAuYIhedEX&pageSize=9");
    });
  },
  //获取非好友列表
  GetUserList(search, page) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl + '/T_Base_User/GetUserListByPage?openID=' + this.openID + '&search=' + search + '&page=' + page,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //添加好友接口
  AddFriend(openIds) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_FriendsNotice/PostRequestFriends', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID + '&openIds=' + openIds);
    });
  },
  //同意添加好友
  ConfirmFriends(messageId, result) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_FriendsNotice/PostConfirmFriends', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID + '&messageId=' + messageId + '&result=' + result);
    });
  },
  //通过Id获取小鸡当前的健康值及饥饿度
  GetChickValueById(Id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // POST方法1
      xhr.open('POST', Config.apiUrl + '/T_Base_Chicken/GetModelValue', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('cid=' + Id);
    });
  },
  //获得当月签到的记录数组
  GetSignList() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            reject(response);
          }
        }
      };
      // Get方法
      xhr.open('GET', Config.apiUrl + '/T_Base_SignFlow/GetList?openId=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获得商城的商品
  GetGoodList(index, size) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取商城数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_Property/GetListByPage?page=' + index + '&size=' + size, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获得积分商城的商品
  GetPointGoodList(index, size) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取商城数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_Property/GetPointListByPage?page=' + index + '&size=' + size, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获得交易市场的商品
  GetSellList(type, index, size) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取商城数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl +
          '/T_Base_PlayerTrading/GetTradetLisByPage?type=' +
          type +
          '&page=' +
          index +
          '&pageSize=' +
          size,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },

  //上架列表
  GetShelvesList(index, size) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取商城数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl +
          '/T_Base_PlayerTrading/GetListByPage?openId=' +
          this.openID +
          '&type=' +
          0 +
          '&page=' +
          index +
          '&pageSize=' +
          size,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //上架
  OnShelf(type, unitprice, count) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl +
          '/T_Base_PlayerTrading/OnShelf?openId=' +
          this.openID +
          '&type=' +
          type +
          '&unitprice=' +
          unitprice +
          '&count=' +
          count,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //下架
  OffShelf(playerid) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('POST', Config.apiUrl + '/T_Base_PlayerTrading/OffShelf', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID + '&playerid=' + playerid);
    });
  },
  //产蛋鸡上架
  ChickenONShelf(cID, unitprice) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('POST', Config.apiUrl + '/T_Base_PlayerTrading/ChickenONShelf', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID + '&cID=' + cID + '&unitprice=' + unitprice);
    });
  },
  //产蛋鸡下架
  ChickenOffhelf(id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('POST', Config.apiUrl + '/T_Base_PlayerTrading/ChickenOffShelf', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID + '&playerid=' + id);
    });
  },
  //获取仓库系统道具
  GetSystemListByPage() {
    // Loading.show();
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取仓库数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_Warehouse/GetSystemListByPage?openId=' + this.openID + '&page=1', true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },

  //获得仓库流通物品
  GetRepertoryList() {
    // Loading.show();
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取仓库数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_Warehouse/GetListByPage?openId=' + this.openID + '&page=1', true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },

  // 获取产蛋棚坑位的信息
  getEggLayInfo(openID = this.openID) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // POST方法
      xhr.open('GET', Config.apiUrl + '/T_Base_LayEggsShed/GetPageList?openID=' + openID, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  // 升级产蛋棚
  UpgradeEggsShed(payType) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // POST方法
      xhr.open('POST', Config.apiUrl + '/T_Base_LayEggsShed/LayEggsShedUpGrade', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID + '&payType=' + payType);
    });
  },
  //获取升级产蛋棚需要多少钱
  GetLayUpGrade(grade) {
    // Loading.show();
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_LayEggsShed/GetLayUpGrade?grade=' + grade, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获得牧场 升级需要多少钱
  GeteggsShedUpGradeMoney() {
    // Loading.show();
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_Ranch/GetRanchUpGradeMoney?openId=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //升级牧场
  UpgradeHouse(payType) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('签到失败');
            reject(response);
          }
        }
      };
      // POST方法
      xhr.open('POST', Config.apiUrl + '/T_Base_Ranch/PostRanchRankUpgrade', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID + '&payType=' + payType);
    });
  },
  //获得牧场升级需要多少钱
  GetRanchUpGradeMoney() {
    // Loading.show();
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_Ranch/GetRanchUpGradeMoney?openId=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },

  //  合成材料获取
  GetMakeInfo(makeType, count, id) {
    // Loading.show();
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        `${Config.apiUrl}/T_Base_Convert/GetMakeInfo?makeType=${makeType}&count=${count}&id=${id}&openID=${
          this.openID
        }`,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  // 合成
  postCompound(makeType, count, id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log(data.Message);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open('POST', `${Config.apiUrl}/T_Base_Convert/Marke`, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(`makeType=${makeType}&count=${count}&id=${id}&openID=${this.openID}`);
    });
  },
  //牧场清理 type=1 自己清理
  PostClean() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法
      xhr.open('POST', Config.apiUrl + '/T_Ranch_Clean/PostRanchCleanManual', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID);
    });
  },
  //小鸡治疗
  PostTreat(Id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            reject(response);
          }
        }
      };
      // POST方法
      xhr.open('POST', Config.apiUrl + '/T_Chicken_Treatment/POSTOneTreatment', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('id=' + Id + '&openId=' + this.openID);
    });
  },
  // 帮好友清理
  PostFriendsClean(friendOpenID) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log(data.Message);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Ranch_Clean/POSTNewHelpClean', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(`openID=${this.openID}&friendsopenId=${friendOpenID}`);
    });
  },
  // / T_Base_User/ PostSteaEgg
  PostSteaEgg(friendOpenID) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log(data.Message);
            reject(response);
          }
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Base_User/PostSteaEgg', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(`openID=${this.openID}&friendsopenId=${friendOpenID}`);
    });
  },
  //小鸡喂食
  PostOwnFeeds() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            console.log('喂食成功');
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('喂食失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法
      xhr.open('POST', Config.apiUrl + '/T_Chicken_Feed/POSTOwnFeeds', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openId=' + this.openID);
    });
  },
  //购买商品接口
  PostBuy(prId, count = 1) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            console.log('购买成功');
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('购买失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法
      xhr.open('POST', Config.apiUrl + '/T_Base_Property/PostBuy', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID + '&count=' + count + '&prId=' + prId);
    });
  },
  //购买商品接口
  PostBuyP2P(playerid, buyCount) {
    buyCount = buyCount || 1;
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            console.log('购买成功');
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('购买失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法
      xhr.open(
        'POST',
        Config.apiUrl +
          '/T_Base_PlayerTrading/UserToUserBuy?openID=' +
          this.openID +
          '&playerid=' +
          playerid +
          '&buyCount=' +
          buyCount,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //孵化小鸡
  HatchEgg() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取仓库数据失败');
            reject(response);
          }
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Chicken_Egg/EggHatch', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID);
    });
  },
  //收取产蛋棚鸡蛋
  CollectEgg(eggID) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取鸡蛋失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Base_LayEggsShed/CollectingEggs', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(`openID=${this.openID}&EggId=${eggID}`);
    });
  },
  //收取牧场鸡蛋
  CollectRanchEgg() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取鸡蛋失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Base_Ranch/PostCollectRankEgg', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(`openID=${this.openID}`);
    });
  },
  //收取贵妃鸡
  CollectChick(Id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取鸡蛋失败');
            reject(response);
          }
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Base_User/CollectChicken', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('cId=' + Id);
    });
  },
  //填充饲料槽接口
  AddFeed() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法
      xhr.open('POST', Config.apiUrl + '/T_Base_Ranch/AddFeed', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID);
    });
  },
  //获得饲料槽信息
  GetFeedData() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_Ranch/GetModel?openID=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获得该用户的鸡的列表
  GetChickList(status = 2, openId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('签到失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法

      xhr.open('POST', Config.apiUrl + '/T_Base_Chicken/GetModelList', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      if (openId) {
        xhr.send('openID=' + openId + '&Status=' + status);
      } else {
        xhr.send('openID=' + this.openID + '&Status=' + status);
      }
    });
  },

  //通过Id找到鸡对象（状态及相应的值）
  GetChickById(Id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('签到失败');
            reject(response);
          }
        }
      };
      // POST方法1
      xhr.open('POST', Config.apiUrl + '/T_Base_Chicken/ChickenAndRanch', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('cid=' + Id);
    });
  },
  // 获取兑换列表
  GetRecoverData(page) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;

            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        `${Config.apiUrl}/T_Base_Chicken/GetChickenOwnerShipListByPage?openID=${this.openID}&page=${page}&pagesize=4`,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //回收小鸡  获得小鸡的所有权
  recoverChick(cid) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取鸡蛋失败');
            reject(response);
          }
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Base_Chicken/BuyChickenOwnership', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(`openID=${this.openID}&cid=${cid}`);
    });
  },
  //获取用户中心数据
  GetUserData(pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // POST方法

      xhr.open(
        'POST',
        Config.apiUrl +
          '/T_Base_User/PersonalCore?openId=' +
          this.openID +
          '&page=' +
          pageIndex +
          '&pagesize=' +
          pageSize,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID);
    });
  },
  //获得饲料总数
  GetFeedCount() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // POST方法

      xhr.open('POST', Config.apiUrl + '/T_Base_User/FeedCount', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID);
    });
  },
  //修改姓名
  SaveEditName(updatename) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            reject(response);
          }
        }
      };
      // POST方法1
      xhr.open(
        'POST',
        Config.apiUrl + '/T_Base_User/UpdateName?openId=' + this.openID + '&updatename=' + updatename,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //消息列表
  UserMessage(pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // POST方法

      xhr.open(
        'GET',
        Config.apiUrl +
          '/T_User_Message/GetListByPage?openId=' +
          this.openID +
          '&page=' +
          pageIndex +
          '&pageSize=' +
          pageSize,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID);
    });
  },
  //获取天气信息
  GetWetherData(index, size) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            response = JSON.parse(response.Data);

            resolve(response);
          } else {
            var response = xhr.responseText;
            reject(response);
          }
        }
      };
      // Get方法1
      xhr.open('GET', Config.apiUrl + '/Curl/Weather?page=' + index + '&pagesize=' + size, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //获取当前天气
  GetCurrentWeather() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            response = JSON.parse(response.Data);

            resolve(response);
          }
        }
      };
      // Get方法1
      xhr.open('GET', Config.apiUrl + '/Curl/CurrentWeather', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //上架
  OnShelf(type, unitprice, count) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法

      xhr.open('POST', Config.apiUrl + '/T_Base_PlayerTrading/OnShelf', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID + '&type=' + type + '&unitprice=' + unitprice + '&count=' + count);
    });
  },
  //贵妃鸡兑换
  ExchangeChicken(username, address, phone, count, ischooseChick) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法

      xhr.open('POST', Config.apiUrl + '/T_Base_Exchange/ChickenExchange', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(
        'openID=' +
          this.openID +
          '&username=' +
          username +
          '&address=' +
          address +
          '&phone=' +
          phone +
          '&changeType=' +
          ischooseChick +
          '&count=' +
          count
      );
    });
  },
  //鸡蛋兑换
  ExchangeEgg(username, address, phone, count) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      // POST方法

      xhr.open('POST', window.Config.apiUrl + '/T_Base_Exchange/EggExchange', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(
        'openID=' +
          this.openID +
          '&username=' +
          username +
          '&address=' +
          address +
          '&phone=' +
          phone +
          '&count=' +
          count
      );
    });
  },
  //获取地址列表
  getAddressList() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      xhr.open(
        'GET',
        Config.apiUrl + '/T_User_Addresses/GetListByPage?openId=' + this.openID + '&page=' + 1 + '&pageSize=' + 16,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //获取兑换数量
  GetExchangeCount(type, count) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl + '/T_Base_Exchange/GetExchangeCount?openID=' + this.openID + '&type=' + type + '&count=' + count,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //升级饲料槽
  UpFeedGrade(type) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // POST方法

      xhr.open('POST', window.Config.apiUrl + '/T_Base_User/UpFeedTroughGrade', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send('openID=' + this.openID + '&payType=' + type);
    });
  },
  //添加地址列表
  addAddress(username, telNumber, addressPostalCode, addressDetailInfo) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      xhr.open(
        'POST',
        Config.apiUrl +
          '/T_User_Addresses/Add?OpenID=' +
          this.openID +
          '&username=' +
          username +
          '&telNumber=' +
          telNumber +
          '&addressPostalCode=' +
          addressPostalCode +
          '&addressDetailInfo=' +
          addressDetailInfo +
          '&proviceFirstStageName=温州市' +
          '&addressCitySecondStageName=鹿城区' +
          '&addressCountiesThirdStageName=龙湾区',
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //更新地址列表
  updateAddress(id, username, telNumber, addressPostalCode, addressDetailInfo) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      xhr.open(
        'POST',
        Config.apiUrl +
          '/T_User_Addresses/Update?ID=' +
          id +
          '&OpenID=' +
          this.openID +
          '&username=' +
          username +
          '&telNumber=' +
          telNumber +
          '&addressPostalCode=' +
          addressPostalCode +
          '&proviceFirstStageName=温州市' +
          '&addressCitySecondStageName=鹿城区' +
          '&addressCountiesThirdStageName=龙湾区' +
          '&addressDetailInfo=' +
          addressDetailInfo +
          '&nationalCode=中国' +
          '&IsDefault=' +
          0,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //默认设置地址列表
  setDefaultAddress(id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_User_Addresses/SetIsDefault?ID=' + id, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //删除地址
  delDefaultAddress(id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_User_Addresses/Delete?ID=' + id, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //获取用户牧场币
  GetUserMoney() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);

            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_User/GetUserMoney?openID=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //好友消息列表
  GetFriendListByPage(pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl +
          '/T_Base_FriendsNotice/GetRequestListByPage?openID=' +
          this.openID +
          '&page=' +
          pageIndex +
          '&pageSize=' +
          pageSize,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //未读好友消息数量
  GetRecordCount(pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl + '/T_Base_FriendsNotice/GetRecordCount?openID=' + this.openID + '&type=' + 0,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //好友消息列表
  PostConfirmFriends(id, result) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'POST',
        Config.apiUrl +
          '/T_Base_FriendsNotice/PostConfirmFriends?openID=' +
          this.openID +
          '&Id=' +
          id +
          '&result=' +
          result,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send();
    });
  },
  //农场数据
  getFarmModalData(otherOpenId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      // GET方法
      if (otherOpenId) {
        xhr.open('Get', Config.apiUrl + '/T_Farm_Land/GetList?openID=' + otherOpenId, true);
      } else {
        xhr.open('Get', Config.apiUrl + '/T_Farm_Land/GetList?openID=' + this.openID, true);
      }

      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //添加农作物
  addCrops(landId, propertyId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open(
        'POST',
        Config.apiUrl +
          '/T_Farm_Land/SowSeeds?openId=' +
          this.openID +
          '&landId=' +
          landId +
          '&propertyId=' +
          propertyId,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },
  //解锁土地
  unLockLand(spendType, landId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      xhr.open(
        'POST',
        Config.apiUrl +
          '/T_Farm_Land/UnlockLand?openId=' +
          this.openID +
          '&spendType=' +
          spendType +
          '&landId=' +
          landId,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },
  //植物施肥
  CropsSertilize(cropsId, type) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open(
        'POST',
        Config.apiUrl + '/T_Farm_Crops/CropsSertilize?openId=' + this.openID + '&cropsId=' + cropsId + '&type=' + type,
        true
      );
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },
  //植物浇水&帮好友浇水
  CropsWatering(cropsId, openId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      if (openId) {
        xhr.open('POST', Config.apiUrl + '/T_Farm_Land/FriendsWater?cropsId=' + cropsId + '&openId=' + openId, true);
      } else {
        xhr.open('POST', Config.apiUrl + '/T_Farm_Land/UserWater?cropsId=' + cropsId, true);
      }
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },

  //植物除草&帮好友除草
  CropsWeeding(cropsId, openId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      if (openId) {
        xhr.open('POST', Config.apiUrl + '/T_Farm_Land/FriendsWeed?cropsId=' + cropsId + '&openId=' + openId, true);
      } else {
        xhr.open('POST', Config.apiUrl + '/T_Farm_Land/UserWeed?cropsId=' + cropsId, true);
      }

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },

  //植物除虫&帮好友除虫
  CropsDisinsection(cropsId, openId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      if (openId) {
        xhr.open(
          'POST',
          Config.apiUrl + '/T_Farm_Land/FriendsDisinsection?cropsId=' + cropsId + '&openId=' + openId,
          true
        );
      } else {
        xhr.open('POST', Config.apiUrl + '/T_Farm_Land/UserDisinsection?cropsId=' + cropsId, true);
      }

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },

  //收取农作物&偷取
  CollectCrops(cropsId, openId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open(
        'POST',
        Config.apiUrl + '/T_Farm_Crops/CollectCrops?openId=' + this.openID + '&cropsId=' + cropsId,
        true
      );

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },
  //偷取农作物
  FriendsStealCrops(friendsopenId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open(
        'POST',
        Config.apiUrl + '/T_Farm_Land/FriendsStealCrops?openId=' + this.openID + '&friendsopenId=' + friendsopenId,
        true
      );

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },
  //农场用户种子列表
  GetSeedList() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('Get', Config.apiUrl + '/T_Base_Warehouse/GetSeedList?openID=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //农场用户肥料列表
  GetFertilizerList() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('Get', Config.apiUrl + '/T_Base_Warehouse/GetFertilizerList?openID=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获取用户解锁下一块土地的牧场币，积分，用户等级
  GetNextUnlockLand() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        }
      };
      xhr.open('GET', Config.apiUrl + '/T_Farm_Land/GetNextUnlockLand?openId=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //充值
  UserRecharge(payType, type, rechargeMoney) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            response = JSON.parse(response);
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };
      xhr.open(
        'POST',
        Config.apiUrl +
          '/T_Base_User/UserRecharge?openId=' +
          this.openID +
          '&payType=' +
          payType +
          '&type=' +
          type +
          '&rechargeMoney=' +
          rechargeMoney,
        true
      );

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
    });
  },
  //微信API
  getWxUserShare() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_User/UserShare', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID);
    });
  },
  //鸡的数量以及上限
  RanchChickenCounts() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_Ranch/RanchChickenCounts', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID);
    });
  },
  //仓库中鸡和鸡蛋的数量
  GetChickenAndEggCount() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_Warehouse/GetChickenAndEggCount', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID);
    });
  },
  FarmCropsGrowTime(cropsId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Farm_Crops/FarmCropsGrowTime', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('cropsId=' + cropsId);
    });
  },
  //倒计时
  ChickenLayEggTimeFirst(playerid) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('POST', Config.apiUrl + '/T_Base_Chicken/ChickenLayEggTimeFirst', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID);
    });
  },
  //所有鸡的下单倒计时
  AllChickenLayEggTime() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('POST', Config.apiUrl + '/T_Base_Chicken/AllChickenLayEggTime', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID);
    });
  },
  //老爷爷话术
  GetRanchPeopleShowMessage(playerid) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open('GET', Config.apiUrl + '/T_Base_Ranch/GetRanchPeopleShowMessage?openId=' + this.openID, true);
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  // 交易鸡介绍
  GetChickenOnshelfInfo(id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log(data.Message);
            reject(response);
          }
        }
      };
      xhr.open('POST', `${Config.apiUrl}/T_Base_PlayerTrading/chickenOnshelfInfo`, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(`playerTradingID=${id}`);
    });
  },
  //蛋的介绍
  EggOnShelfInfo(id) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log(data.Message);
            reject(response);
          }
        }
      };
      xhr.open('POST', `${Config.apiUrl}/T_Base_PlayerTrading/EggOnShelfInfo`, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //缺少这句，后台无法获取参数
      xhr.send(`playerTradingID=${id}`);
    });
  },
  //鸡的弃养
  GiveUpChicken(cId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_Chicken/GiveUpChicken', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('cId=' + cId);
    });
  },
  //鸡的置换
  ChangeRanchChicken(count) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_Exchange/ChangeRanchChicken', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID + '&count=' + count);
    });
  },
  //砸金蛋
  SmashGoldEgg(eggId) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          alert('网络连接失败');
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_LayEggsShed/SmashGoldEgg', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID + '&eggId=' + eggId);
    });
  },
  //分享奖励
  UserShareCallback() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_User/UserShareCallback', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID);
    });
  },
  //充值记录
  GetUserRechargeList(page, size) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl +
          '/T_Base_User/GetUserRechargeList?openId=' +
          this.openID +
          '&page=' +
          page +
          '&pagesize=' +
          size,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //交易记录
  GetTransAndExchangeListByPage(page, size, type) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl +
          '/T_Base_User/GetTransAndExchange?openId=' +
          this.openID +
          '&page=' +
          page +
          '&pagesize=' +
          size +
          '&type=' +
          type,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //获取上一个下一个好友
  GetLastAndNextFriend(openIds) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      // GET方法
      xhr.open(
        'GET',
        Config.apiUrl + '/T_Base_User/GetLastAndNextFriend?openId=' + this.openID + '&openIds=' + openIds,
        true
      );
      xhr.setRequestHeader('Content-Type', 'json');
      xhr.send();
    });
  },
  //连续签到
  NewSign() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_SignFlow/NewSign', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID);
    });
  },
  //连续签到
  SignContinueReward(dayFlow, boxType) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };

      xhr.open('POST', Config.apiUrl + '/T_Base_SignFlow/SignContinueReward', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID + '&dayFlow=' + dayFlow + '&boxType=' + boxType);
    });
  },
  //更改首次已经登录
  UpdateUserFirstLoginState() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            resolve(response);
          } else {
            var response = xhr.responseText;
            console.log('获取数据失败');
            reject(response);
          }
        }
      };
      xhr.open('POST', Config.apiUrl + '/T_Base_User/UpdateUserFirstLoginState', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('openId=' + this.openID);
    });
  }
};

module.exports = {
  func: func
};
