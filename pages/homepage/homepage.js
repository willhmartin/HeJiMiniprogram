// pages/homepage/homepage.js
var bmap = require('../bmap-wx.js'); 

const app = getApp()
const globalData = getApp().globalData
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
    wx.request({
      url: `http://localhost:3000/api/v1/trips/32`,
      method: 'GET',
      success(res) {
        console.log('works?', res)
        const activities = res.data.weather.list
        // console.log(activities.weather[0].icon)
        
        
        const utc = new Date().toJSON().slice(0,10);
        console.log(utc)
        page.setData({
          dateNow: globalData.currentDate
        })
        page.setData({activities})
        globalData.currentDate.push(utc)
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() { 
    var that = this; 
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({ 
        ak: 'WgxDm56IA3eSDtfDeZwGAprVaG34aKjC' 
    }); 
    var fail = function(data) { 
        console.log("checking baidu api", data) 
    }; 
    var success = function(data) { 
        var weatherData = data.currentWeather[0]; 
        weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n'; 
        that.setData({ 
            weatherData: weatherData 
        }); 
    } 
    // 发起weather请求 
    BMap.weather({ 
        fail: fail, 
        success: success 
    }); 
} ,

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

  },
  
})