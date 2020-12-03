// pages/budget/budget.js
const globalData = getApp().globalData
Page({
  /**
   * Page initial data
   */
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
  
  // bindReplaceInput: function(e) {
  //   var value = e.detail.value
  //   var pos = e.detail.cursor
  //   if(pos != -1){
  //     //The cursor is in the center
  //     var left = e.detail.value.slice(0,pos)
  //     //Calculate the position of the cursor
  //     pos = left.replace(/11/g,'2').length
  //   }
  //   return {
  //     value: value.replace(/11/g,'2'),
  //     cursor: pos
  //   }
  // },
  formSubmit: function(e) {
    console.log('Form triggers submit event, carrying this data: ', e.detail.value)

    const budget = {
      amount: this.data.inputValue
  }
  globalData.monies.push(budget)
  console.log("BUDGET!!!",budget)
  this.setData({budget})

  wx.request({ 
    url: `http://localhost:3000/api/v1/trips/23/budgets`,
    method: 'POST',
    data: budget,
    success(res) {
      console.log('WORKS???', res)

  wx.navigateTo({
    url: `/pages/mybudget/mybudget?budget=${budget}`
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