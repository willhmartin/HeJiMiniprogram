import event from 'utils/event'

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

  // wx.getSetting({
  //   success(res){
  //     console.log("checking get setting", res, res.authSetting['scope.userInfo'])
  //     let auth = res.authSetting
  //     if(auth['scope.userInfo']){
  //       page.globalData.hasUserInfo = true
  //       wx.getUserInfo({
  //         success: res=>{
  //           page.globalData.userInfo = res.userInfo
  //         }
  //       })
  //     }
  //   }
  // })
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
          }
        })
      } else if (auth['scope.userInfo'] == false) {
        console.log("i dont have userInfo")
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
    hasUserInfo: [],
    userInfo: null,
    trips: [],
    monies: [],
    currentDate: [new Date().toJSON().slice(0,10)],
    holidays: [],
    payments: [],
    tripID: []
  }
})