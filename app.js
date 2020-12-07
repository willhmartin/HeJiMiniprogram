App({
  onLaunch: function () {
    let page = this

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
      page.globalData.userId = res.data.userId
    }

    })
    }
  })

  wx.getSetting({
    success(res){
      console.log("checking get setting", res, res.authSetting['scope.userInfo'])
      let auth = res.authSetting
      if(auth['scope.userInfo']){
        page.globalData.hasUserInfo = true
        wx.getUserInfo({
          success: res=>{
            page.globalData.userInfo = res.userInfo
          }
        })
      }
    }
  })
},

  globalData: {
    hasUserInfo: false,
    userInfo: null,
    trips: [],
    monies: [],
    currentDate: [new Date().toJSON().slice(0,10)],
    holidays: [],
    payments: [],
    tripID: []
  }
})