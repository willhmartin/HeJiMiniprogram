// pages/login/login.js
const app = getApp()
const globalData = getApp().globalData
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
    let page = this
    console.log("checking profile")
    wx.getSetting({
      success(res){
        console.log("checking from login", res, res.authSetting['scope.userInfo'])
        let auth = res.authSetting
        if(auth['scope.userInfo']){
          globalData.hasUserInfo = true
          page.setData({
            hasUserInfo: true
          })
        }
      }
    })
    // console.log("checking profile", globalData)
    // this.setData({
    //   hasUserInfo: globalData.hasUserInfo
    // })
  },


  getUserInfo: function (e) {
    const userDetails = e.detail.userInfo
    console.log(e.detail.userInfo)
     const user = {
      name: userDetails.nickName,
      
    }
    console.log(user)
    wx.request({
      url: `${globalData.host}users/${app.globalData.userId}`,
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