var time = require('../../../../../utils/util.js');
var userid;
var oldid;
var mid;
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
    mid = options.id;
    var that = this;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/old/findelderbyid',
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
            res.data[i].createDate = time.toDay(res.data[i].createDate) 
          }

          that.setData({ 
            array:res.data  
          }) 
        }


      }
    })
  },
  isadd:function(){
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
            console.log(res.data[0].ID)
            console.log(mid)
            wx.request({
              url: 'https://www.jinlingjiankang.com/nursingms/wechat/attention/older',
              data:{
                "userId":res.data[0].ID,
                "oldId":mid
              },
              success:function(res){
                if(res.data.code == 0){

                  wx.showToast({
                    title: '已关注过该老人',
                    icon: 'none'
                  })

                }else if(res.data.code == 1){
                  wx.showToast({
                    title: '关注成功',
                    icon: 'none'
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 2,
                    })
                   }, 1000) //延迟时间 这里是1秒

                  

                }

                console.log(res)

              }
            })
            
          }
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