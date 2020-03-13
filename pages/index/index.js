//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dated: {'year':2020,'month':3}
  },

  onLoad: function () {
    if (app.globalData.userInfo == null){
      wx.login({
        success: res => {
          wx.request({
            url: 'https://yechunlin.com/wx/getExtendInfo.php',
            data: { 'code': res.code },
            success: data => {
              console.log(data)
              if (data.data.code) {
                if (data.data.isNew) {
                  app.globalData.userInfo = {'openid': data.data.data.openid};
                  wx.navigateTo({
                    url: '../login/login',
                  })
                } else {
                  app.globalData.userInfo = data.data.data;
                  wx.setStorageSync('userInfo', JSON.stringify(data.data.data));
                }
              }
            }
          })
        }
      })
    }
  },
  //记账
  writeNum:function(){
    wx.navigateTo({
      url: '../note/note',
    })
  },
  //日期选择
  bindDateChange: function (e) {
    var dateArr = e.detail.value.split('-');
    this.setData({
      dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1])}
    })
  },
})
