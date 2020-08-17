// pages/search/searchresult/searchresult.js
var page = 1;
var limit = 99999;
var time = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      array:"",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      console.log(options)
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/selectbed',
      data: {
        "roomStatus": options.roomStatus,
        "specialStatus": options.specialStatus,
        "id": options.id,
        "LVL": options.LVL,
        "page": page,
        "limit": limit
      },
      success:function(res){
        console.log(res)
        if(res.data.length>0){ 
          for (var i = 0; i < res.data.length; i++) { 
            res.data[i].checkInDate = time.toDay(res.data[i].checkInDate/1000) 
          }

          that.setData({ 
            array:res.data  
          }) 
        }else{

          wx.showToast({
            title: '暂无搜索数据',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
           }, 1500) //延迟时间 这里是1秒



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