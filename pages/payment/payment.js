const globalData = getApp().globalData

Page({
  data: {
      focus: false,
      items: [
        {name: true, value: 'Yes'},
        {name: false, value: 'No'}
      ]
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
    radioChange: function(e) {
      this.setData({inputValue4: e.detail.value})
      console.log('LINE 23---', e.detail.value)
  
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
      console.log('LINE 38---', e)
      this.setData({
        date: e.detail.value
      })
    },
    submit: function(e) {
      console.log('LINE 43---', e.detail.value)
      const payment = {
        amount: this.data.inputValue1,
        split: this.data.inputValue4,
        category: this.data.inputValue2,
        content: this.data.inputValue3,
        date: this.data.date,
    }
    console.log('LINE 52---', payment)
    globalData.payments.push(payment)
    console.log(payment, "Checking globalData", globalData)
    this.setData({payment})
    let group_payment = this.data.inputValue4 == "true" ? "none" : this.data.guest_id
    const trip_id = this.data.trip_id
    // add ?guest_id=${group_payment} to the url in the post request
    wx.request({ 
      url: `http://localhost:3000/api/v1/trips/${trip_id}/payments?guest_id=${group_payment}`,
      method: 'POST',
      data: payment,
      success(res) {
        console.log('LINE 62---', res)
        wx.switchTab({
          url: `/pages/mybudget/mybudget?id=${res.data.id}`
        })
      }
    })
    },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const guest_id = 13 // get it from options
    const trip_id = 24 // get it from options
    this.setData({guest_id, trip_id})
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