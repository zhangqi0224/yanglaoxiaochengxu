// pages/service/adminlist/adminserch/adminserch.js
var page = 1;
var limit = 15;
var name;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: "",
    box_null: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  wxSearchInput: function (e) {
    page = 1;
    var that = this
    console.log(e)
    if (e.detail.value == '') {

      that.setData({
        box_null: true,
      })

    }
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms//wechat/old/findElder',
      data: {
        "queryCriteria": e.detail.value,
        "page": page,
        "limit": limit,
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        console.log(res)
        if (e.detail.value == '') {
          that.setData({
            box_null: true,
          })
        }
        else if (res.data.length > 0) {
          name = e.detail.value;
          that.setData({
            box_null: false,
            array: res.data
          })
        }

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
    var that = this;
    page = 1;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms//wechat/old/findElder',
      data: {
        page: page,
        limit: limit,
        queryCriteria: name
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        that.setData({
          array: that.data.array.concat(res.data),
        })
        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无更多',
            icon: 'none',

          })
        }

        wx.stopPullDownRefresh()

      }

    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 页数+1
    page = page + 1;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms//wechat/old/findElder',
      data: {
        page: page,
        limit: limit,
        queryCriteria: name
      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        that.setData({
          array: that.data.array.concat(res.data),
        })
        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无更多',
            icon: 'none',

          })
        }
      }

    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})