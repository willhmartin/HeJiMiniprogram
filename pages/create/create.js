// pages/create/create.js
const globalData = getApp().globalData
Page({ 

  data: {},

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
      const user_id = res.data.user_id;
      // const trip_id = res.data.id
      console.log('LINE 54--', res)
      wx.reLaunch({
        url: `/pages/trips/trips?loadtrips=true` 
      })
    }
  })
  },

})