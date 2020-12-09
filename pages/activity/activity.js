// pages/activity/activity.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
const globalData = getApp().globalData

Page({
  data: {
    steps: [
      {
        text: '12:00pm',
        desc: '',
      },
      {
        text: 'french',
        desc: 'random',
      }
    ],
  },
  
  goToActivities: function(){
    wx.navigateTo({
      url: `/pages/activities/activities?tripID=${this.data.trip.id}`,
    })
  },

  onShow: function(){
    this.getTripInfo()
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
        console.log(res.data.activities)
        const activityList = res.data.activities
         page.setData({
           trip: res.data.trip,
          is_guest: res.data.is_guest,
          activityList: res.data.activities
        })
      } 
    })
  },
})