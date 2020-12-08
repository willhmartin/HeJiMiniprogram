// pages/mybudget/mybudget.js
const app = getApp()
const globalData = getApp().globalData

Page({
  data: {
    // budgetId: 1
  },
  goToPayment: function () {
    console.log('CLICKED--10') 
    wx.navigateTo({
      url: '/pages/payment/payment',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    

      // if (page.data.budget === null) {
      //   wx.navigateTo({
      //     url: '/pages/createbudget/createbudget', ## think of user and trip
      //   })
      // }
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
    console.log(globalData)
    let page = this 
      wx.request({
        url: `http://localhost:3000/api/v1/trips/${globalData.tempTripId}/my_budget?guest_id=${globalData.guestId}`,
        method: 'GET',
        success(res) {
          if (!res.data.budget) {
            wx.navigateTo({
              url: '/pages/createbudget/createbudget',
            })
          } else {
            console.log('fetched budget', res)
          }
          // code to run if there is a budget
          // console.log('LINE 25---', res)
          // const budget = res.data
          // console.log(budget)
          // page.setData({budget})
        }
      })
    // wx.request({
    //   url: `http://localhost:3000/api/v1/trips/${globalData.tripID}/payments`,
    //   method: 'GET',
    //   success(res) {
    //     console.log('LINE 56--', res)
    //     const payments = res.data.payments
    //     console.log(payments)
    //     page.setData({
    //       payments: payments, 
    //       total_payment: res.data.total_amount 
    //       // total_payment defined in payments controller / setting local data here to call in wxml
    //     })
    //   }
    // }),
    
    // this.setData({
    //   budget: globalData.budget
    // }),
    // this.setData({
    //   payment: globalData.payment
    // })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  
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