//app.js
App({
  onLaunch: function () {
    var that = this;
    var userInfoStr = wx.getStorageSync("userInfo");
    if (userInfoStr) {
      that.globalData.userInfo = JSON.parse(userInfoStr)
      console.log(that.globalData)
    }
  },
  globalData: {
    userInfo: null
  }
})