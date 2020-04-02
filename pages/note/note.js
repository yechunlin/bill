// pages/note/note.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailId:0,
    num:0,
    type:1,
    dated: { 'year': 2020, 'month': 3, 'day': 1, 'str':'2020-03-01'},
    belong: ['饮食', '出行', '住房', '服饰', '娱乐', '生活用品', '通信', '工资', '转账', '理财', '红包', '医疗', '慈善', '捡钱'],
    belong_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.detailId){
      this.getDetail(options.detailId);
    }else{
      var dated = util.formatDate(new Date());
      var dateArr = dated.split('-');
      this.setData({
        dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1]), 'day': Number(dateArr[2]), 'str': dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2]}
      })
    }
  },
  getDetail: function(id){
    var that = this;
    if(Number(id)){
      wx.request({
        url: 'https://yechunlin.com/wx/bill/getDetail.php?detailId='+id,
        success: data => {
          if (data.data.code) {
            //console.log(data.data.data)
            var dateArr = data.data.data.dated.split('-');
            that.setData({
              detailId: data.data.data.id,
              num: data.data.data.num,
              type: Number(data.data.data.type),
              belong_id: data.data.data.belong,
              dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1]), 'day': Number(dateArr[2]), 'str': dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2] }
            })
          }
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindRadioChange: function (e) {
    this.setData({
      type: Number(e.detail.value)
    })
  },
  bindBelongChange:function(e){
    this.setData({
      belong_id: Number(e.detail.value)
    })
  },
  //日期选择
  bindDateChange: function (e) {
    var dateArr = e.detail.value.split('-');
    this.setData({
      dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1]), 'day': Number(dateArr[2]), 'str': e.detail.value}
    })
  },
  formSubmit: function (e) {
    var formData = e.detail.value;
    formData.detailId = this.data.detailId;
    formData.user_id = Number(app.globalData.userInfo.id);
    formData.type = this.data.type;
    formData.belong = this.data.belong_id;
    formData.dated = this.data.dated.str;
    wx.request({
      url: 'https://yechunlin.com/wx/bill/setDetail.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: formData,
      success: data => {
        if (data.data.code) {
          wx.switchTab({
            url: '../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      }
    })
  }
})