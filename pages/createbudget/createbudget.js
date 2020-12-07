// pages/budget/budget.js
const globalData = getApp().globalData
Page({

  data: {
    focus: false,
    inputValue: ''
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  reset: function(){
    this.setData({
      inputValue: ''
    })
  },

  submit: function(e) {
    console.log("LINE 27--SUBMIT")
    const budget = {
      amount: this.data.inputValue,
      guest_id: 12,
      trip_id: 23
  }
  globalData.monies.push(budget)
  console.log("LINE 34---",budget)
  this.setData({budget})

  wx.request({ 
    url: `localhost:3000/v1/trips/23/budgets`,
    method: 'POST',
    data: budget,
    success(res) {
      console.log('LINE 42---', res)

  wx.navigateTo({
    url: `/pages/mybudget/mybudget?id=${res.data.id}`
  })
}
})
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('options', options)
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