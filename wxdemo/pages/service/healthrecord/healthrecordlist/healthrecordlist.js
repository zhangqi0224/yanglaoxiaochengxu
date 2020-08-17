
var mid = "";
var page = 1;
var limit = 15;
var time = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notHave:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1;

    console.log(options)
    // 获取id
    mid = options.id;
    var that = this;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/healthRecord/query',
      data: {
        id: options.id,
        page: page,
        limit: limit

      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        console.log(res)
        that.setData({
          array: res.data,
        })
        if(res.data.length>0){ 
          for (var i = 0; i < res.data.length; i++) { 
            res.data[i].recordDate = time.toDay(res.data[i].recordDate/1000) 
          }

          that.setData({ 
            array:res.data  
          }) 
        }else{
          that.setData({
            notHave:true

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
    // 获取id
    
    page = 1;
    var that = this;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/healthRecord/query',
      data: {
        id:mid,
        page: page,
        limit: limit

      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        console.log(res)
        that.setData({
          array: res.data,
        })
        if(res.data.length>0){ 
          for (var i = 0; i < res.data.length; i++) { 
            res.data[i].recordDate = time.toDay(res.data[i].recordDate/1000) 
          }

          that.setData({ 
            array:res.data  
          }) 
        }

      }
    })
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
    page = page+1;
    var that = this;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/healthRecord/query',
      data: {
        id:mid,
        page: page,
        limit: limit

      },
            header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {
        if (res.data.length == 0) {
          wx.showToast({
            title: '已经是最后的信息了',
            icon: 'none',

          })


        }
        if(res.data.length>0){ 
          for (var i = 0; i < res.data.length; i++) { 
            res.data[i].recordDate = time.toDay(res.data[i].recordDate/1000) 
          }
          that.setData({
            array: that.data.array.concat(res.data),
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