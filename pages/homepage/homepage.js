// pages/homepage/homepage.js
var bmap = require('../bmap-wx.js'); 
import event from '../../utils/event'

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

  onLoad: function (options) {
    this.setData({
      hasUserInfo: wx.getStorageSync('hasUserInfo')
    })
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
  onShow: function(){
    console.log("checking where im")
    this.getTripInfo()
  },

  goToTrips: function() {
    wx.navigateTo({
      url: `/pages/trips/trips?user_id=${globalData.userId}`
    })
  },

  goToActivities: function(){
    wx.navigateTo({
      url: `/pages/activities/activities?tripID=${this.data.tripID}`,
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
      event.emit("getInfo")
      this.createGuest()
    }
    
  },

  createGuest: function(){
    let userId = wx.getStorageSync('user')
    wx.request({
      url: `${globalData.host}${userId}/guests`,
      method: 'POST',
      data: {trip_id: this.data.trip.id, name: this.data.userInfo.nickName, user_id: userId},
      success(res){
        const guest_id = res.data.id

        this.setData({
          // is_guest: false
          is_guest: true
        })
      }
    })
  },

  getTripInfo: function(){
    let tripId = globalData.tempTripId
    let userId = wx.getStorageSync('user')
    console.log("checking if globalData has tripId", globalData.tempTripId)

    let page = this
    wx.request({
       url: `${globalData.host}trips/${tripId}`,
      method: 'GET',
      data: {user_id: userId},
      success(res) {
        console.log(res)
         page.setData({
           trip: res.data.trip,
          is_guest: res.data.is_guest,
          activities: res.data.activities
        })
      } 
    })
  },

  
})