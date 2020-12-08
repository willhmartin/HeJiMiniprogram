// pages/activities/activities.js
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

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("checking options", options)
  },

  setStartDate: function(e){
    console.log("setting start date", e.detail.value)
    this.setData({
      selectedDate: e.detail.value
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
     date: this.data.selectedDate
   }
   console.log("checking")
   wx.request({
     url: `http://localhost:3000/api/v1/trips/${globalData.tripID}`,
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

