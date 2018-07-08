// pages/NewsDaily/index/index.js
var app = getApp()
var myutils = require('../../../util/myutil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [],
      duration: 2000,
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      loading: false,
      plain: false
  },
  bindViewTap: function(e){
      wx.navigateTo({
          url: '../detail/detail?id=' + e.target.dataset.id,
      })
  },
  loadMore: function(e){
      if(this.data.list.length === 0) return
      var date = this.getNextDate()
      var that = this
      that.setData({ loading: true})
      wx.request({
          url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(myutils.formatDate(date)) + 1),
          headers: {
              'Content-Type': 'application/json'
          },
          success: function(res){
              that.setData({
                  loading: false,
                  list: that.data.list.concat([{ header: myutils.formatDate(date, '-')}]).concat(res.data.stories)
              })
          }
      })
    },
    getNextDate: function(){
        var now = new Date()
        now.setDate(now.getDate() - this.index++)
        return now
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      wx.request({
          url: 'http://news-at.zhihu.com/api/4/news/latest',
          header:{
              'Content-Type': 'application/json'
          },
          success: function(res){
              that.setData({
                  banner: res.data.top_stories,
                  list: [{ header:'今日舆情'}].concat(res.data.stories)
              })
          }
      })
      this.index = 1
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
  
  }
})