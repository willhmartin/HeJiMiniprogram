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
  onLoad: function (options) {
    let page = this
    console.log('LINE 28--', options)
    this.setData({ // setting options avail to use in page
      guest_id: options.guest_id,
      // trip_id: options.trip_id
    })
    
  },

  submit: function(e) {
    console.log("LINE 39--SUBMIT")
    const budget = {
      amount: this.data.inputValue,
      guest_id: globalData.guestId,
      trip_id: globalData.tempTripId
  }
  console.log(globalData)
  globalData.myBudget = []
  globalData.myBudget.push(budget.amount)
  console.log("LINE 47---",budget)
  this.setData({budget})
  let page = this
  wx.request({ 
    url: `http://localhost:3000/api/v1/trips/${globalData.tempTripId}/budgets`,
    method: 'POST',
    data: budget,
    success(res) {
      console.log('LINE 55---', res)

  wx.switchTab({
    url: `/pages/mybudget/mybudget`
  })
}
})
  },

  /**
   * Lifecycle function--Called when page load
   */
  
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