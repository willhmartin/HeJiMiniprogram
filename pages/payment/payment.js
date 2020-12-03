const globalData = getApp().globalData

Page({
  data: {
      focus: false
      // inputValue1: ''
      // inputValue2: ''
    },
    bindButtonTap: function(e) {
      this.setData({
        focus: true
      })
    },
    bindAmountInput: function(e) {
      this.setData({
        inputValue1: e.detail.value
      })
    },
    bindCatInput: function(e) {
      console.log("CHECKING", e)
      this.setData({
        inputValue2: e.detail.value
      })
    },
    bindNoteInput: function(e) {
      console.log("CHECKING", e)
      this.setData({
        inputValue3: e.detail.value
      })
    },
    setDate: function(e) {
      console.log('IT WORKS?', e)
      this.setData({
        date: e.detail.value
      })
    },
    formSubmit: function(e) {
      console.log('Form triggers submit event, carrying this data: ', e.detail.value)
      const payment = {
        amount: this.data.inputValue1,
        category: this.data.inputValue2,
        content: this.data.inputValue3,
        date: this.data.date
    }
    console.log('THIS IS WHAT I WANT', payment)
    globalData.payments.push(payment)
    console.log(payment, "Checking globalData", globalData)
    this.setData({payment})

    wx.request({ 
      url: `http://localhost:3000/api/v1/trips/23/payments`,
      method: 'POST',
      data: payment,
      success(res) {
        console.log('WORKS???', res)
        wx.navigateTo({
          url: `/pages/mybudget/mybudget`
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