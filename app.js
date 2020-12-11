import event from 'utils/event'

App({
  onLaunch: function () {
    let page = this
    wx.login({
      success: (res) => {
        console.log(res)
      // insert next code here
      wx.request({
        // url: host + 'login',
        url: page.globalData.hostForLogin + 'login',
        method: 'post',
        data: {
          code: res.code
        },
      // insert next code here
      success: (res) => {
        console.log('App.js Login', res);
        let trips = res.data.trips
        let userId = res.data.userId
        page.globalData.userId = userId
        page.globalData.trips = trips
        wx.setStorageSync('user', userId)
        wx.setStorageSync('trips', trips)
        if(trips.length>0){
          event.emit("hasTrips")
        }
        }
      })
    }
  })

  event.on('getInfo', page, page.checkScope)
  this.checkScope()
},

checkScope: function () {
  let page = this
  wx.getSetting({
    success: res => {
      let auth = res.authSetting
      if (auth['scope.userInfo']) {
        console.log("i have userInfo")
        wx.getUserInfo({
          success: res => {
            page.globalData.hasUserInfo = true
            page.globalData.userInfo = res.userInfo
            // page.sendUserInfo(res.userInfo)
            wx.setStorageSync('hasUserInfo', true)
            wx.setStorageSync('userInfo', res.userInfo)
          }
        })
      } else {
        wx.setStorageSync('hasUserInfo', false)
        page.globalData.hasUserInfo = false
      }
      wx.hideLoading()
    }
  })
},

sendUserInfo: function (e) {
  console.log("sendUserInfo")
  let user = e
  user['nickname'] = e.nickName
  user['avatar'] = e.avatarUrl
  wx.request({
    url: `${globalData.host}users/${globalData.userId}`,
  })
},

  globalData: {
    // host
    host: 'http://localhost:3000/api/v1/',
    // host: 'https://heji.wogengapp.cn/api/v1/',
    hostForLogin: 'http://localhost:3000/',
    // hostForLogin: 'https://heji.wogengapp.cn/',
    hasUserInfo: [],
    userInfo: null,
    trips: [],
    monies: [],
    currentDate: [new Date().toJSON().slice(0,10)],
    holidays: [],
    payments: [],
    tripID: [],
    makingPayment: false,

    // for storing temp data
    tempIsGuest: false,
    tempGuestId: 0,
    tempTripId: 0
  }
})