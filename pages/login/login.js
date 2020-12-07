// pages/login/login.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * Lifecycle function--Called when page load
   */
  

  onLoad: function (options) {
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // User authorization is obtained. You can directly call the `getUserInfo` API to get the profile photo and alias.
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },


  getUserInfo: function (e) {
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

    wx.reLaunch({

      url: `/pages/landing/landing`
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
  onShow: function () {

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