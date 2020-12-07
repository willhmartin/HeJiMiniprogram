App({
  onLaunch: function () {
    const host = 'http://localhost:3000/'
    wx.login({
      success: (res) => {
        wx.request({
          url: host + 'login',
          method: 'POST',
          data: { code: res.code },
          success: (res) => {
            console.log('App.js Login', res);
            this.globalData.userId = res.data.userId
            wx.setStorageSync('user', res.data.userId)
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    trips: [],
    monies: [],
    currentDate: [new Date().toJSON().slice(0,10)],
    holidays: [],
    payments: [],
    tripID: []
  }
})