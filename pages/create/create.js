// pages/create/create.js
import event from '../../utils/event'
const globalData = getApp().globalData
Page({ 

  data: {},
  onLoad: function(options){
    
    this.setData({
      hasUserInfo: wx.getStorageSync('hasUserInfo'),
      failCreate: globalData.failCreate
    })
  },

  getUserInfo: function (e) {
    const userInfo = e.detail.userInfo
    if (userInfo != undefined) {
      this.formSubmit()
      event.emit("getInfo")
    }
  },

  titleInput: function(e) {
    this.setData({
      name: e.detail.value
    }) 
  },

  locationInput: function(e) {
    this.setData({
      location: e.detail.value
    })
  },

  setStartDate: function(e) {
    console.log(e)
    this.setData({startDate:e.detail.value}) 
  },

  setEndDate: function(e) {
    console.log(e)
    this.setData({endDate:e.detail.value}) 
  },
   
  formSubmit: function(e) {
    wx.showLoading({
      title: 'Loading',
    })
    this.setData({ failCreate: false })
    let userId = wx.getStorageSync('user')
    console.log('LINE 35-- ', this.data)
    const holiday = {
      title: this.data.name,
      location: this.data.location,
      start_date: this.data.startDate,
      end_date: this.data.endDate
  }
  wx.request({
    url: `${globalData.host}users/${userId}/trips`,
    method: 'POST',
    data: holiday,
    success(res) {
      if(res.data.error == "Internal Server Error"){
        globalData.failCreate = [true];
        wx.reLaunch({
          url: `/pages/create/create`,
         
        })
      } else {
        globalData.failCreate = [false];
      const user_id = res.data.user_id;
      // const trip_id = res.data.id
      console.log('LINE 54--', res)
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      wx.reLaunch({
        url: `/pages/trips/trips?loadtrips=true` 
      })
    }
    },
  })
  },

})