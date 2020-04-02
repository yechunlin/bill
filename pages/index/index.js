//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    dated: {},
    list:{}
  },

  onLoad: function () {
    var that = this;
    var dated = util.formatDate(new Date());
    var dateArr = dated.split('-');
    this.setData({
      dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1]), 'str': dateArr[0] + '-' + dateArr[1] }
    })
    if (app.globalData.userInfo == null){
      wx.login({
        success: res => {
          wx.request({
            url: 'https://yechunlin.com/wx/bill/getExtendInfo.php',
            data: { 'code': res.code },
            success: data => {
              if (data.data.code) {
                if (data.data.isNew) {
                  app.globalData.userInfo = {'openid': data.data.data.openid};
                  wx.navigateTo({
                    url: '../login/login',
                  })
                  return;
                } else {
                  app.globalData.userInfo = data.data.data;
                  wx.setStorageSync('userInfo', JSON.stringify(data.data.data));
                  that.getlist();
                }
              }
            }
          })
        }
      })
    }else{
      that.getlist();
    }

  },
  onShow: function(){

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
      dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1]), 'str': e.detail.value}
    })
    this.getlist();
  },
  upDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../note/note?detailId='+id
    })
  },
  getlist:function(){
    var that = this;
    wx.request({
      url: 'https://yechunlin.com/wx/bill/getList.php',
      data: {
        user_id: app.globalData.userInfo.id,
        dated: that.data.dated.str
      },
      success: data => {
        console.log(data)
        if (data.data.code) {
          data.data.ru = data.data.ru.toFixed(2);
          data.data.zhi = data.data.zhi.toFixed(2);
          that.setData({
            list: data.data
          })
        }else{
          that.setData({
            list: {}
          })
        }
      }
    })
  }
})
