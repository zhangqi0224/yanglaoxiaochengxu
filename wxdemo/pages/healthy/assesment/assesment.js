var time = require('../../../utils/util.js');
var mid;
var RoleId;
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
    console.log(options)
    // 获取id
    mid = options.ID;
    var that = this;

    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/assessment/view',
      data: {
         ID: options.ID
      },
       header: { 
           'content-type':'application/json;charset=iso-8859-1' 
        },
      success: function (res) { 
        console.log(res.data.oldEvalue)
         that.setData({ 
            array:res.data.oldEvalue  
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
    var that = this;
    wx.login({
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {

            that.setData({ 
              group:res.data[0].groupId 
            }) 
          }
        })
      }
    })



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

  },
  show:function(){

    wx.showToast({
        title: '功能开发中',
        icon: 'none'
      })


  }
})