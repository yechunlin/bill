// pages/tj/tj.js
var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
var app = getApp();
var pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dated:{},
    showDetail:false,
    type:0,
    series:[]
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dated = util.formatDate(new Date());
    var dateArr = dated.split('-');
    this.setData({
      dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1]), 'str': dateArr[0] + '-' + dateArr[1] }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTj();
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
  bindRadioChange:function(e){
    this.setData({
      type: e.detail.value
    })
    this.getTj();
  },
  //日期选择
  bindDateChange: function (e) {
    var dateArr = e.detail.value.split('-');
    this.setData({
      dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1]), 'str': e.detail.value }
    })
    this.getTj();
  },
  getTj:function(){
    var that = this;
    var id = app.globalData.userInfo.id;
    var type = this.data.type;
    var dated = this.data.dated.str;
    wx.request({
      url: 'https://yechunlin.com/wx/bill/getTj.php',
      data:{
        'user_id': id,
        'type': type,
        'dated': dated
      },
      success: res=> {
        if(res.data.code){
          that.setData({
            series: res.data.data,
            showDetail: true
          })
          that.showPie();
        }else{
          that.setData({
            showDetail: false
          })
        }
      }
    })
  },
  showPie:function(){
    var that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    console.log(that.data.series)
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: that.data.series,
      width: windowWidth,
      height: 300,
      dataLabel: true,
      legend: true
    });
  }
})