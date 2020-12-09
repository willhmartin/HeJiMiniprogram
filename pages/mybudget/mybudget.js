// pages/mybudget/mybudget.js
const app = getApp()
const globalData = getApp().globalData

Page({
  data: {
    // budgetId: 1
    hasBudget: false,
    items: [
      {name: true, value: 'Yes'},
      {name: false, value: 'No'}
    ]
  },
  goToPayment: function () {
    console.log('CLICKED--10') 
    // wx.navigateTo({
    //   url: '/pages/payment/payment',
    // })
    this.setData({
      makingPayment: true
    })
    
    console.log(this.makingPayment)
  },
  /**
   * Lifecycle function--Called when page load
   */

  onShow: function (options) {
    console.log("checking 123123")
    this.setData({
      hasUserInfo: wx.getStorageSync('hasUserInfo'),
      userInfo: wx.getStorageSync('userInfo'),
      payment: false
    })
    const makingPayment = this.data.payment
    this.setData({makingPayment})
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
    url: `${globalData.host}trips/${globalData.tempTripId}/budgets`,
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
      url: `${globalData.host}trips/${page.data.TripId}/my_budget?guest_id=${page.data.guestId}`,
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
  //   url: `${globalData.host}trips/${globalData.tripID}/payments`,
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

  },

// Payment rendering functions
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
let group_payment = this.data.inputValue4 == "true" ? "none" : this.data.guestId
const trip_id = this.data.TripId
console.log(this.data.TripId)
// add ?guest_id=${group_payment} to the url in the post request
wx.request({ 
  url: `${globalData.host}trips/${trip_id}/payments?guest_id=${group_payment}`,
  method: 'POST',
  data: payment,
  success(res) {
    console.log('LINE 62---', res)
    
  }
})
this.setData({
  makingPayment: false
})
// wx.reLaunch({
//   url: "/pages/mybudget/mybudget"
// })
  this.getBudget()
}

})