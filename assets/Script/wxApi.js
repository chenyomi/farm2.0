var jssdk = document.createElement('script');
jssdk.async = true;
jssdk.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
document.body.appendChild(jssdk);

// var xhr = new XMLHttpRequest();
// var id = getUrlParms("openid");
// xhr.open('POST', 'http://wxapi.zjytny.cn/T_Base_User/UserShare', true);
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// xhr.send('openId=' + id);
// xhr.onreadystatechange = function () {
//   if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
//     if (xhr.status == 200) {
//       var response = xhr.responseText;
//       response = JSON.parse(response);
//       var shareId = Number(response.shareId);
//       var urlshare = '';
//       if (shareId > 0) {
//         urlshare = 'http://wxapi.zjytny.cn/?shareID=' + shareId;
//       } else {
//         urlshare = 'http://wxapi.zjytny.cn';
//       }
//       wx.config({
//         appId: response.appId, // 必填，公众号的唯一标识
//         timestamp: response.timestamp, // 必填，生成签名的时间戳
//         nonceStr: response.nonceStr, // 必填，生成签名的随机串
//         signature: response.signature, // 必填，签名，见附录1
//         jsApiList: [
//           'onMenuShareTimeline',
//           'onMenuShareAppMessage',
//           'onMenuShareQQ',
//           'onMenuShareWeibo',
//           'onMenuShareQZone',
//           'chooseImage',
//           'uploadImage'
//         ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//       });
//       wx.ready(function () {
//         var shareContent = {
//           title: '快来玩转你的专属农场', // 分享标题
//           link: urlshare, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//           imgUrl: 'http://wxapi.zjytny.cn/web-mobile/loading.jpg', // 分享图标
//           desc: '璞心农业虚拟农场，线上认养，线下收获，好玩又实惠！', // 分享描述
//           success: function () {
//             var xhr2 = new XMLHttpRequest();
//             xhr2.open('POST', Config.apiUrl + '/T_Base_User/UserShareCallback', true);
//             xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             xhr2.send('openId=' + id);
//             xhr2.onreadystatechange = function () {
//               if (xhr2.readyState == 4 && (xhr2.status >= 200 && xhr2.status < 400)) {
//                 if (xhr2.status == 200) {
//                   var response = xhr2.responseText;
//                   response = JSON.parse(response);
//                   alert(response.Message);
//                 } else {
//                   var response = xhr2.responseText;
//                   console.log('获取数据失败');
//                 }
//               }
//             };
           
//           },
//           cancel: function () { }
//         };

//         function _shareCfuc() {
//           wx.onMenuShareTimeline(shareContent);
//           wx.onMenuShareAppMessage(shareContent);
//           wx.onMenuShareQQ(shareContent);
//           wx.onMenuShareWeibo(shareContent);
//           wx.onMenuShareQZone(shareContent);
//         }
//         _shareCfuc();
//       });
//       wx.error(function (res) {
//         alert('分享失败，请稍后再试！');
//       });
//     } else {
//       var response = xhr.responseText;
//       console.log('获取数据失败');

//     }
//   }
// };

// function getUrlParms(name) {
//   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//   var r = window.location.search.substr(1).match(reg);
//   if (r != null)
//     return unescape(r[2]);
//   return null;
// }
/*---------JSSDK初始化-----------*/
