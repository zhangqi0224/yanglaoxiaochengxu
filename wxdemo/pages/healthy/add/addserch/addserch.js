// pages/healthy/add/addserch/addserch.js
var name;
var page = 1;
var limit = 10000;
var count;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    name = options.name;
    page = 1;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/old/findElder',
      data: {
        "queryCriteria": options.name,
        "page": page,
        "limit": limit,
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        
        that.setData({
          array: res.data,
          count:res.data.length
        })
      }
    })
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