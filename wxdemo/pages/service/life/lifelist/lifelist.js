// pages/service/life/lifelist/lifelist.js
var page = 1;
var limit = 15;
var mid;
var time = require('../../../../utils/util.js');
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
      var that = this;
      mid = options.id;
      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms/wechat/careliferecord/findbyid',
        data:{

          "oldId":options.id,
          "page":page,
          "limit":limit

        },
        success:function(res){

          that.setData({

            array:res.data.data

          })
          if(res.data.data.length>0){ 
            for (var i = 0; i < res.data.data.length; i++) { 
              res.data.data[i].recordDate = time.toDay(res.data.data[i].recordDate/1000) 
            }
  
            that.setData({ 
              array:res.data.data  
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
    page = page+1;
    var that = this;
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/careliferecord/findbyid',
      data:{

        "oldId":mid,
        "page":page,
        "limit":limit

      },
      success:function(res){
        if(res.data.data.length == 0){

          wx.showToast({
            title: '已经是最后的记录了',
            icon: 'none',

          })

          return false;

        }
        that.setData({
          array: res.data.data,
        })

        if(res.data.data.length>0){ 
          for (var i = 0; i < res.data.data.length; i++) { 
            res.data.data[i].recordDate = time.toDay(res.data.data[i].recordDate/1000) 
          }

          that.setData({ 
            array:res.data.data  
          }) 
        }

      }
    })


  }
})