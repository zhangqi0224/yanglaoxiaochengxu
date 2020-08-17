// pages/service/activity/index-detail/index-detail.js
var time = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/video/findbyid',
      header: {
        'Content-Type': 'application/x-www-form-urlencode'
      },
      data: {
        'id': options.id
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {

        console.log(res)

        that.setData({

          video: res.data.data[0].url,
          title:res.data.data[0].title,
          time:time.toData(res.data.data[0].createtime/1000)

        })

      }
    })

    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/video/click',
      data: {
        'id': options.id
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {}
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