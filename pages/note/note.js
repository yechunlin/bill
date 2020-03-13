// pages/note/note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dated: { 'year': 2020, 'month': 3, 'day': 1},
    belong: ['饮食', '出行', '住房', '服饰','娱乐','生活用品','话费','工资','转账','理财','红包','乞讨','捡钱','抢','偷'],
    belong_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(e)
  },
  bindBelongChange:function(e){
    console.log(e)
    this.setData({
      belong_id: Number(e.detail.value)
    })
  },
  //日期选择
  bindDateChange: function (e) {
    var dateArr = e.detail.value.split('-');
    this.setData({
      dated: { 'year': Number(dateArr[0]), 'month': Number(dateArr[1]), 'day': Number(dateArr[2])}
    })
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this
    var formData = e.detail.value;
  }
})