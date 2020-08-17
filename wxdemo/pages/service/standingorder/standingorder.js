// pages/adminilist/adminilist.js
var WxSearch = require('../../../wxSearch/wxSearch.js');
var page = 1;
var limit = 15;
var name = '';
var app = getApp()
var value = false;
var Id;
var group;
var url;
var userId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //初始化的时候渲染wxSearchdata
    wx.login({
       success: function (res) {

        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {
            if (res.data[0].groupId == 1) {

              Id = res.data[0].ID
              group = res.data[0].groupId
              url = "https://www.jinlingjiankang.com/nursingms/wechat/attention/list"

            } else {

              url = "https://www.jinlingjiankang.com/nursingms/wechat/old/query"

            }

            wx.request({
              url: url,
              data: {
               "userId": res.data[0].ID,
                page: page,
                limit: limit

              },
               success: function (res) {
                that.setData({
                  array: res.data,
                })
              }
            })


          }
        })
      }
    })

  },
  wxSearchInput: function (e) {
    page = 1;
    var that = this
    name =  e.detail.value
    if(group == 1){

      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms/wechat/old/findElderByUser',
        data: {
          "userId":Id,
          "queryCriteria": name,
          "page": page,
          "limit": limit,
        },
         success: function (res) {
          console.log(res)
          that.setData({
            array: res.data,
          })
        }
      }) 
    }else{
  
      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms//wechat/old/findElder',
        data: {
          "queryCriteria": name,
          "page": page,
          "limit": limit,
        },
         success: function (res) {
          console.log(res)
          that.setData({
            array: res.data,
          })
        }
      })        

    }
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
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    console.log(group);
    // 页数+1
    page = page + 1;
    if (value == false) {
      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms/wechat/old/findElder',
        data: {
        "queryCriteria": name,
          page: page,
          limit: limit,
        },
         success: function (res) {
          console.log(res)
          that.setData({
            array: that.data.array.concat(res.data),
          })
        },

      })
    } else if (value == true) {

      if(group == 1){

        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms//wechat/old/findElderByUsers',
          data: {
            "userId":Id,
            "queryCriteria": name,
            "page": page,
            "limit": limit,
          },
           success: function (res) {
            console.log(res)
            that.setData({
              array: that.data.array.concat(res.data),
            })
          }
        })  

      }else{
    
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms//wechat/old/findElder',
          data: {
            "queryCriteria": name,
            "page": page,
            "limit": limit,
          },
           success: function (res) {
            console.log(res)
            that.setData({
              array: that.data.array.concat(res.data),
            })
          }
        })        

      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})