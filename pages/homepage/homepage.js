// pages/homepage/homepage.js
var bmap = require('../bmap-wx.js'); 
import event from '../../utils/event'

const app = getApp()
const globalData = getApp().globalData
console.log('LINE 6--,', globalData)

Page({
  data: {
    
  },

  onLoad: function (options) {
    this.setData({
      hasUserInfo: wx.getStorageSync('hasUserInfo')
    })

  },
  onShow: function(){
    this.getTripInfo()
  },

  goToTrips: function() {
    wx.reLaunch({
      url: `/pages/trips/trips?loadtrips=true` //need to go to trips of specifi
    })
  },

  goToActivities: function(){
    wx.navigateTo({
      url: `/pages/activities/activities?tripID=${this.data.trip.id}`,
    })
  },

  getUserInfo: function(e){
    console.log(e)
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

    let page = this
    let userId = wx.getStorageSync('user')
    wx.request({
      url: `${globalData.host}users/${userId}/guests`,
     
               
      method: 'POST',
      data: {trip_id: this.data.trip.id, name: this.data.userInfo.nickName, user_id: userId},
      success(res){
        const guest_id = res.data.id
        

        page.setData({
          guest_id: res.data.id,          
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
          activities: res.data.activities,
          guest_id: res.data.guest_id
        })
        getApp().globalData.guestId = res.data.guest_id
      } 
    })
  },

  
})