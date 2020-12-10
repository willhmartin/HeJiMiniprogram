// pages/activities/activities.js
const globalData = getApp().globalData

Page({
  data: {
    // form value
    location: '',
    time: '',
    content: '',
    transportation: '',
    lodging: '',
    selectedDate: ''
    // date
  },


  onLoad: function (options) {
    console.log("checking options", options);
    this.setData({
      tripId: options.tripID
    })
  },

  setStartDate: function(e){
    console.log("setting start date", e.detail.value)
    this.setData({
      selectedDate: e.detail.value
    })
  },

  setTime: function(e) {
    console.log(e)
    this.setData({
      time: e.detail.value
    }) 
  },

 submit: function(e) {
   console.log('LINE 43---', e.detail.value)
   const activity = {
     location: this.data.location,
     time: this.data.time,
     content: this.data.content,
     transportation: this.data.transportation,
     lodging: this.data.lodging,
     date: this.data.selectedDate,
     user_id: wx.getStorageSync('user')
   }
   wx.request({
     url: `${globalData.host}trips/${this.data.tripId}/activities`,
     method: 'POST',
     data: activity,
     success: (res) => {
      wx.switchTab({
        url: '/pages/activity/activity',
      })
    }
   })
 },

 reset: function(){
   console.log("im at reset")
  this.setData({
    location: '',
    time: '',
    content: '',
    transportation: '',
    lodging: '',
    selectedDate: ''
  })
 },
 
 input(e){
   let value = e.detail.value
   let key = e.target.dataset.name
   this.setData({
     [key]: value
   })
 },

 goToActivity: function () {
  console.log('clicked')
  wx.switchTab({
    url: '/pages/activity/activity',
  })
},
})

