// pages/activity/activity.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
const globalData = getApp().globalData

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



      url: `http://localhost:3000/api/v1/trips/${globalData.tripID}`,


      method: 'GET',
      success(res) {
        console.log('LINE 36--', res)
        const activities = res.data
        page.setData({activities})
      }
      
    })
  },
  goToActivity: function () {
    console.log('clicked')
    wx.navigateTo({
      url: '/pages/activities/activities',
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
    let page = this
    wx.request({
      url: `http://localhost:3000/api/v1/trips/${globalData.tripID}`,
      method: 'GET',
      success(res) {
        console.log('works?', res)
        const activities = res.data
        page.setData({activities})
      }
    })
  },

  goToTrip: function (event) {
    console.log(event.currentTarget)
    const id_for_trip = event.currentTarget.dataset.id
    console.log(id_for_trip)

    globalData.tripID = []


    globalData.tripID.push(id_for_trip)
    globalData.tempTripId = id_for_trip //can't pass options because of switchTab
    wx.switchTab({
      url: `/pages/activities/activities` //this is the 'options' we access on homepage.js
    })
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