//index.js
//获取应用实例
const app = getApp()
const globalData = getApp().globalData
import event from '../../utils/event'



Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasTrips: false
  },

  onLoad: function (options) {
    event.on("hasTrips", this, this.loadTrips)
    console.log("checking options", options)
    if(options.loadtrips == "true") {
      this.getTrips()
    }
  },

  getTrips: function(){
    let userId = wx.getStorageSync('user')
    wx.request({
      url: `${globalData.host}users/${userId}/trips`,
      method: "GET",
      success: res=>{
        this.setData({
          trips: res.data, 
          hasTrips: true
        })
      }
    })
  },

  loadTrips: function(){
    let trips = wx.getStorageSync('trips')
    this.setData({
      trips: trips,
      hasTrips: true
    })
  },

  goToTrip: function (event) {
    const id_for_trip = event.currentTarget.dataset.id
    globalData.tempTripId = id_for_trip //can't pass options because of switchTab
    wx.switchTab({
      url: `/pages/homepage/homepage` //this is the 'options' we access on homepage.js
    })
  },
  
  getUserInfo: function (e) {
    const userInfo = e.detail.userInfo
    if (userInfo != undefined) {
      this.goToCreate()
      event.emit("getInfo")
    }
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
