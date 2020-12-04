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
      this.setData({item:this.data.items[e.detail.value]})
      console.log('LINE 23---', e.detail.value)
      const picked = e.detail.valie
  
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
        split: this.data.items,
        category: this.data.inputValue2,
        content: this.data.inputValue3,
        date: this.data.date
    }
    console.log('LINE 52---', payment)
    globalData.payments.push(payment)
    console.log(payment, "Checking globalData", globalData)
    this.setData({payment})

    wx.request({ 
      url: `http://localhost:3000/api/v1/trips/23/payments`,
      method: 'POST',
      data: payment,
      success(res) {
        console.log('LINE 62---', res)
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