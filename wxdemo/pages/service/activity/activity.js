// pages/index/index.js

var time = require('../../../utils/util.js');
var page = 1;
var limit = 5;


Page({


  /**
   * 页面的初始数据
   */
  data: {

    array: '',
    banner: ''



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //接口接收数据方法
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/video/query',
      data: {
        page: page,
        limit: limit
      },
      //成功回调 res为接收值
       success: function (res) {

        console.log(res)

        //建立for循环 长度为 res.data.length
        for (var i = 0; i < res.data.data.length;i++) {
          //此步为转换时间戳
          res.data.data[i].createtime = time.toData(res.data.data[i].createtime/1000)

        }
        //重新赋值
        that.setData({
          array: res.data.data

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
    var that = this;
    page = 1;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/video/query',
      data: {
        page: page,
        limit: limit
      },
       success: function (res) {

      },
      success(res) {

        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].createtime = time.toData(res.data.data[i].createtime)
          res.data.data[i].content = res.data.data[i].content.replace(/<[^>]+>/g, ' ')
          res.data.data[i].content = res.data.data[i].content.replace(/&nbsp;/g, ' ')
          // res.data.data[i].content = res.data.data[i].content.replace("<img[^>]*/>", "");
        }
        console.log(res)
        that.setData({
          array: res.data[0]

        })

      }
    })

    wx.stopPullDownRefresh()


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this;
    page = page + 1;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/video/query',
      data: {
        page: page,
        limit: limit
      },
       success: function (res) {

        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].createtime = time.toData(res.data.data[i].createtime),
            res.data.data[i].content = res.data.data[i].content.replace(/<[^>]+>/g, ' ')
          res.data.data[i].content = res.data.data[i].content.replace(/&nbsp;/g, ' ')
          // res.data.data[i].content = res.data.data[i].content.replace("<img[^>]*/>", "");
        }
        that.setData({
          array: that.data.array.concat(res.data[0]),
        })
        if (res.data.length == 0) {
          wx.showToast({
            title: '已经是最后的信息了',
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