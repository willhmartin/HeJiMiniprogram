// pages/homepage/homepage.js
var bmap = require('../bmap-wx.js'); 

const app = getApp()
const globalData = getApp().globalData
console.log('LINE 6--,', globalData)

Page({

  /**
   * Page initial data
   */
  data: {
    tripID: 49,
    userId: 75
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // let page = this
    // console.log('LINE 21--', options)

    // wx.request({


    //   url: `http://localhost:3000/api/v1/trips/${globalData.tripID}`,

    //   // url: `http://localhost:3000/api/v1/trips/${app.globalData.tripID[0]}`,


    //   method: 'GET',
    //   success(res) {
    //     console.log('LINE 28--', res)
    //     const activities = res.data
    //     console.log(activities.weather.list[0].weather[0].icon)
    //     console.log(activities)
        
        
    //     const utc = new Date().toJSON().slice(0,10);
    //     console.log(utc)
    //     page.setData({
    //       dateNow: globalData.currentDate
    //     })
    //     page.setData({activities})
    //     globalData.currentDate.push(utc)
    //   }
    // })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  goToTrips: function() {
    wx.navigateTo({
      url: `/pages/trips/trips?id=${globalData.userId}`
    })
  },

  onReady: function() { 

} ,

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function (options) {
    let page = this
    page.getAuth()
    console.log('LINE 24--', globalData.tripID, options.tripId)
    
    // console.log('LINE 21--', globalData.tempTripId)
    wx.request({

      // url: `http://localhost:3000/api/v1/trips/${page.data.tripID}`,
      url: `http://localhost:3000/api/v1/trips/${this.data.tripID}?user_id=${this.data.userId}`,

      // url: `http://localhost:3000/api/v1/trips/${app.globalData.tripID[0]}?user_id=${this.data.userId}`,

      method: 'GET',
      success(res) {
        console.log('LINE 36--', res)
        const activities = res.data
        console.log(activities.weather.list[0].weather[0].icon)
        console.log(activities)
        
        
        const utc = new Date().toJSON().slice(0,10);
        console.log(utc)
        page.setData({
          dateNow: globalData.currentDate,
          // is_guest: res.data.is_guest
        })
        page.setData({activities})
        globalData.currentDate.push(utc)
      } 
    })
  },

  getUserInfo: function(e){
    if (e.detail.userInfo != undefined){
      globalData.hasUserInfo = true
      globalData.userInfo = e.detail.userInfo
      this.setData({
        hasUserInfo: true,
        userInfo: e.detail.userInfo
      })
      this.createGuest()
    }
    
  },

  createGuest: function(){
    let userId = globalData.userId
    let tripId = this.data.tripID
    wx.request({
      url: `http://localhost:3000/api/v1/users/${this.data.userId}/guests`,
      method: 'POST',
      data: {trip_id: tripId, name: this.data.userInfo.nickName, user_id: this.data.userId},
      success(res){
        console.log("LINE 75- CHECKING POST", res)
        this.setData({
          is_guest: false
          // is_guest: true
        })
      }
    })
  },

  getAuth: function(){
    let page = this
    wx.getSetting({
      success(res){
        console.log("CHECKING FROM LOGIN", res, res.authSetting['scope.userInfo'])
        let auth = res.authSetting
        if(auth['scope.userInfo']){
          globalData.hasUserInfo = true
          wx.getUserInfo({
            success: res=>{
              console.log("CHECK wx.getuserInfo", res.userInfo)
              page.setData({
                userInfo: res.userInfo
              })
            }
          })
          page.setData({
            hasUserInfo: true
          })
        }
      }
    })
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

  },
  
})