//index.js
//获取应用实例
const app = getApp()
const globalData = getApp().globalData


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo') 
  },

  bindViewTap: function() {
    wx.switchTo({
      url: '../logs/logs' 
    })
  },
  onLoad: function (options) {
    let page = this
    console.log('LINE 22--', options)
    const user_id = options.user_id
    wx.request({
        
      url: `http://localhost:3000/api/v1/users/31/trips`,
      // url: `http://localhost:3000/api/v1/users/${user_id}/trips`,
      method: 'GET',
      success(res) { 
        console.log('LINE 30--', res)
        const trips = res.data
        page.setData({trips})
      }

    })
    
  },

  goToTrip: function (event) {
    console.log(event.currentTarget)
    const id_for_trip = event.currentTarget.dataset.id
    console.log(id_for_trip)

    globalData.tripID = []


    globalData.tripID.push(id_for_trip)
    globalData.tempTripId = id_for_trip //can't pass options because of switchTab
    wx.switchTab({
      url: `/pages/homepage/homepage` //this is the 'options' we access on homepage.js
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  goToCreate: function () {
    console.log('clicked')
    wx.navigateTo({
      url: '/pages/create/create',
    })
  },

  onShow: function () {
    this.setData({
      holidays: globalData.holidays
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
