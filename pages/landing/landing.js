// pages/landing/landing.js 
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');

Page({  

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  

  onLoad: function (options) {
    let page = this
    console.log("checking profile")
    wx.getSetting({
      success(res){
        console.log("checking from login", res, res.authSetting['scope.userInfo'])
        let auth = res.authSetting
        if(auth['scope.userInfo']){
          // globalData.hasUserInfo = true
          page.setData({
            hasUserInfo: true
          })
        }
      }
    })
  },

  getUserInfo: function (e) {
    console.log('clicked')
    const userDetails = e.detail.userInfo
    console.log(e.detail.userInfo)
     const user = {
      name: userDetails.nickName,
      
    }
    console.log(user)
    wx.request({
      url: `http://localhost:3000/api/v1/users/${app.globalData.userId}`,
      method: 'PUT',
      data: user,
      success(res) {
        console.log('works?', res)
      }
    })

    wx.navigateTo({
      url: '/pages/create/create',
    })

  },

  goToCreate: function () {
    console.log('clicked')
       wx.navigateTo({
      url: '/pages/create/create',
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function (options) {
    let page = this
    
    if (options) {
      console.log(options.name)
    const holiday = options

    }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})