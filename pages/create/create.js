// pages/create/create.js
const globalData = getApp().globalData

Page({

  /**
   * Page initial data
   */
  data: {

  },
  titleInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  locationInput: function(e) {
    this.setData({
      location: e.detail.value
    })
  },

  setStartDate: function(e) {
    console.log(e)
    this.setData({startDate:e.detail.value}) 
  },

  setEndDate: function(e) {
    console.log(e)
    this.setData({endDate:e.detail.value}) 
  },
   
  formSubmit: function(e) {
    console.log('form triggers a submit event, carrying the following data: ', e.detail.value)
    const holiday = {
      name: this.data.name,
      location: this.data.location,
      startDate: this.data.startDate,
      endDate: this.data.endDate
  }
  console.log(holiday)
  globalData.holidays.push(holiday)
  this.setData({holiday})


  wx.navigateTo({
    url: `/pages/trips/trips`
  })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
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