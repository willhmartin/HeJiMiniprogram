// pages/activity/activity.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');

Page({

  /**
   * Page initial data
   */
  data: {
    steps: [
      {
        text: '12:00pm',
        desc: '',
      },
      {
        text: 'french',
        desc: 'random',
      }
    ],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    wx.request({
      url: "http://localhost:3000/api/v1/trips/29",
      method: 'GET',
      success(res) {
        console.log('LINE 36--', res)
        const activities = res.data
        page.setData({activities})
      }
      
    })
  },
  
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})