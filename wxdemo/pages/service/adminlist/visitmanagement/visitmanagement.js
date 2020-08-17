// pages/adminlist/visitmanagement/visitmanagement.js
var time = require('../../../../utils/util.js');
var mid=" ";
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
     array:"",
     notHave:false
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      // 获取id
      mid=options.id;
      var that=this;
      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms/wechat/visit/findvistit',
        data:{
          id:options.id
        },
        success:function(res){ 
          that.setData({ 
            array:res.data, 
          }); 
          console.log(res);      
          if(res.data.length>0){ 
            for (var i = 0; i < res.data.length; i++) { 
     
              res.data[i].leaveDate = time.toDay(res.data[i].leaveDate/1000)
              res.data[i].visitDate = time.toDay(res.data[i].visitDate/1000)
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