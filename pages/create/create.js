// pages/create/create.js
const globalData = getApp().globalData
Page({ 

  data: {},

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
    let userId = wx.getStorageSync('user')
    console.log('LINE 35-- ', e.detail.value)
    const holiday = {
      title: this.data.name,
      location: this.data.location,
      start_date: this.data.startDate,
      end_date: this.data.endDate
  }
  wx.request({
    url: `http://localhost:3000/api/v1/users/${userId}/trips`,
    method: 'POST',
    data: holiday,
    success(res) {
      console.log('LINE 52--', res)
      const user_id = res.data.user_id;
      // const trip_id = res.data.id
      console.log('LINE 54--', user_id)
      wx.navigateTo({
        url: `/pages/trips/trips?user_id=${user_id}` //need to go to trips of specific user???
      })
    }
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