window.Config = {
  shopP2P: 1, //交易市场场景切换参数
  apiUrl: 'http://wxapi.zjytny.cn',
  shareID: null,
  backArr: [],
  openID: null,
  hearderNode: null,
  menuNode: null,
  chickID: null,
  //兑换物品的数据
  newSocket: null,
  exchangeData: {
    actualName: null,
    virtualName: null,
    actualCount: null,
    virtualCount: null,
    goodsType: null
  },
  friendOpenId: null,
  friendName: null,
  realName: null,
  UserData: null, //所有用户信息
  headImg: null, //头像
  addressId: 0, //地址ID，
  propertyId: 0, //播种时种子的ID
  fertilizerId: 0, //肥料的ID
  firstLogin: false,
  guideStep: 1,
  EggCount: 0,
  CollectNumber: 0,
  allcount: 0,
  guideIntro: 0,
  SignFlowCount: 0,
  messageCount: 0,
  addressId: 0, //地址ID
  weather: 1, //天气情况（-1代表下雨，0代表阴天，1代表晴天）
  UserModel: null,
  isfinishGuide: 0
};
