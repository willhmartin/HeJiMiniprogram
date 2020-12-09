// pages/mybudget/mybudget.js
const app = getApp()
const globalData = getApp().globalData

Page({
  data: {
    // budgetId: 1
    hasBudget: false
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

  onShow: function (options) {
    console.log("checking 123123")
    this.setData({
      hasUserInfo: wx.getStorageSync('hasUserInfo'),
      userInfo: wx.getStorageSync('userInfo'),
    })
    let isGuest= globalData.tempIsGuest
    if (isGuest){
      this.setData({
        isGuest: true,
        guestId: globalData.tempGuestId,
        TripId: globalData.tempTripId
      })
      this.getBudget()
    } else {
      this.setData({
        isGuest: false
      })
    }
      // if (page.data.budget === null) {
      //   wx.navigateTo({
      //     url: '/pages/createbudget/createbudget', ## think of user and trip
      //   })
      // }

  },
  /**
   * Lifecycle function--Called when page show
   */


  bindKeyInput: function(e) {
    console.log("LINE 49", e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },


  createBudget: function(e) {
    console.log("LINE 39--SUBMIT", e.detail.value)
    const budget = {
      amount: this.data.inputValue,
      guest_id: globalData.tempGuestId,
      // trip_id: 24
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
    page.setData({
      newBudget: res.data.amount,
      hasBudget: true
    })
  }
     
})
  },





  getBudget: function(){
    let page = this 
    wx.request({
      url: `http://localhost:3000/api/v1/trips/${page.data.TripId}/my_budget?guest_id=${page.data.guestId}`,
      method: 'GET',
      success(res) {
        console.log("checking get budget!!!", res)
        if (!res.data.budget) {
          page.setData({
            hasBudget: false
          })
        } else {
          console.log('fetched budget', res)
          page.setData({
            hasBudget: true
          })
        }
        // code to run if there is a budget
        console.log('LINE 25---', res)
        const displayBudget = res.data
        console.log(displayBudget)
        page.setData({displayBudget})
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
  },

  onShareAppMessage: function () {

  }
})