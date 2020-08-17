var time = require('../../../../utils/util.js');
var mid = "";
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
    console.log(options)
    // 获取id
    mid = options.id;
    var that = this;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/longtermadvice/query',
      data: {
        id: options.id
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
            res.data[i].adviceDate = time.toDay(res.data[i].adviceDate/1000) ;
            res.data[i].executeTime = time.toDay(res.data[i].executeTime/1000) ;
          } 
          that.setData({ 
            array:res.data  
          }) 
        } else{

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