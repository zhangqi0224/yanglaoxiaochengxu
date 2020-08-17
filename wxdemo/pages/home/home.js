// pages/home/home.js
const app = getApp();
var WxSearch = require('../../wxSearch/wxSearch.js');
var time = require('../../utils/util.js');
var page = 1;
var limit = 10000; 
Page({

  /**
   * 页面的初始数据
   */

  data: {
    array1: " ",
    array2: " ",
    array3: " ",
    array4: " ",
    selected1: true,
    selected2: false,
    selected3: false,
    selected4: false
  },
  selected1: function (e) {
    this.setData({
      selected1: true,
      selected2: false,
      selected3: false,
      selected4: false
    })
  },
  selected2: function (e) {
    this.setData({
      selected1: false,
      selected2: true,
      selected3: false,
      selected4: false
    })
  },
  selected3: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false
    })
  },
  selected4: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that);
    WxSearch.initMindKeys();
    // 房间预约
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/book',
      data: {
        page: page,
        limit: limit
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {

        for (var i = 0; i < res.data.length; i++) {
          res.data[i].checkInDate = time.toDay(res.data[i].checkInDate/1000)
        }

        that.setData({
          array1: res.data
        })
        console.log(res)
      }
    });
    // 房间试住
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/trytolive',
      data: {
        page: page,
        limit: limit
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].checkInDate = time.toDay(res.data[i].checkInDate/1000)
        }

        that.setData({
          array2: res.data
        })
        console.log(res)
      }
    });
    // 房间入住
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/checkin',
      data: {
        page: page,
        limit: limit
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {

        for (var i = 0; i < res.data.length; i++) {
          res.data[i].checkInDate = time.toDay(res.data[i].checkInDate/1000)
        }

        that.setData({
          array3: res.data
        })
        console.log(res)
      }
    });
    // 预计退房
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/out',
      data: {
        page: page,
        limit: limit
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        that.setData({
          array4: res.data
        })
        console.log(res)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})