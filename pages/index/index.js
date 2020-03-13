//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dated: {'year':2020,'month':3,'str':'2020-03'},
    list:{}
  },

  onLoad: function () {
    var that = this;
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
  onShow: function(){
    var that = this;
    wx.request({
      url: 'https://yechunlin.com/wx/getList.php',
      data: {
        user_id: app.globalData.userInfo.id,
        dated: that.data.dated.str
      },
      success: data => {
        console.log(data)
        if (data.data.code) {
          that.setData({
            list: data.data
          })
        }
      }
    })
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
