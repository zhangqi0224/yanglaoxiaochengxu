// pages/healthy/healthy.js
//获取应用实例
var nowid;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    dlbutton: true,
    bind: false,
    img: "",
    islogin: false,
    ischeck: false,
    userdata: "",
    nologin: true,
    accessment: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



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

    that.setData({
      bind: false
    })
    wx.login({
       success: function (res) {

        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {
           
            wx.request({
              url: 'https://www.jinlingjiankang.com/nursingms/wechat/attention/oldCount',
              data: {
                "userId": res.data[0].ID
              },
               success: function (res) {

               

                that.setData({
                  Oldcount: res.data.count
                })


              }
            })

            that.setData({
              userdata: res.data,
              accessment: res.data[0].ROLE_ID
            })
            if (res.data[0].ASSOCIATED_STATES == 0 && res.data[0].ischeck == 0) {
              that.setData({
                ischeck: false,
                bind: true
              })
            } else if (res.data[0].ASSOCIATED_STATES == 1) {

              that.setData({
                bind: false
              })

            } else if (res.data[0].ischeck == 1) {
              that.setData({

                ischeck: true
              })

            } else if (res.data[0].ischeck == 0) {

              that.setData({
                bind: false,
                ischeck: false
              })

            }
          }
        })
      }
    })
    wx.getSetting({
      success(e) {
        if (e.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(e) {
              that.setData({
                img: e.userInfo.avatarUrl,
                hasUserInfo: true,
                dlbutton: false,
                islogin: true,
                nologin: false
              })
            }
          })
        } else {

        }
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
  //登录
  dl: function () {
    var that = this;
    wx.login({
       success: function (res) {

        wx.getSetting({
          success(e) {
            if (e.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success(e) {
                  that.setData({
                    img: e.userInfo.avatarUrl,
                    hasUserInfo: true,
                    dlbutton: false,
                    islogin: true,
                    nologin: false
                  })

                }
              })
              wx.request({
                url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
                data: {
                  code: res.code
                },
                success(res) {
                  wx.request({
                    url: 'https://www.jinlingjiankang.com/nursingms/wechat/attention/oldCount',
                    data: {
                      "userId": res.data[0].ID
                    },
                     success: function (res) {
                      that.setData({
                        Oldcount: res.data.count,
                        accessment: res.data[0].ROLE_ID
                      })

                    }
                  })
                  that.setData({
                    userdata: res.data
                  })
                  wx.getSetting({
                    success(res) {


                    }
                  })

                  if (res.data[0].ASSOCIATED_STATES == 0 && res.data[0].ischeck == 0) {
                    that.setData({
                      ischeck: false,
                      bind: true
                    })
                  } else if (res.data[0].ASSOCIATED_STATES == 1) {

                    that.setData({
                      bind: false
                    })

                  } else if (res.data[0].ischeck == 1) {
                    that.setData({

                      ischeck: true
                    })

                  } else if (res.data[0].ischeck == 0) {

                    that.setData({
                      bind: false,
                      ischeck: false
                    })

                  }

                }
              })

            } else {

            }
          }
        })
      }
    })

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