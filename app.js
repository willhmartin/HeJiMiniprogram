App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  const host = 'http://localhost:3000/'
  console.log('beginning login')
  wx.login({
    success: (res) => {
      console.log(res)
    // insert next code here
    wx.request({
      url: host + 'login',
      method: 'post',
      data: {
        code: res.code
      },
    // insert next code here
    success: (res) => {
      console.log(res)
      this.globalData.userId = res.data.userId
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