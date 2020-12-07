// pages/homepage/homepage.js
var bmap = require('../bmap-wx.js'); 

const app = getApp()
const globalData = getApp().globalData
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this

    wx.request({
      url: `http://localhost:3000/api/v1/trips/${app.globalData.tripID[0]}`,
      method: 'GET',
      success(res) {
        console.log('works?', res)
        const activities = res.data
        console.log(activities.weather.list[0].weather[0].icon)
        console.log(activities)
        
        
        const utc = new Date().toJSON().slice(0,10);
        console.log(utc)
        page.setData({
          dateNow: globalData.currentDate
        })
        page.setData({activities})
        globalData.currentDate.push(utc)
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  goToTrips: function() {
    wx.navigateTo({
      url: `/pages/trips/trips`
    })
  },

  onReady: function() { 

} ,

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

  },
  
})