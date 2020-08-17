// pages/service/service.js
var loginId;
var RoleId;
var codeId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: "",
    group:"",
    accessment: true
  },
  /*二维码*/
  two_dimensionalcode: function () {
    var that = this;

    wx.scanCode({

      success(res) {

        codeId = res.result;
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/scancode',
          data: {
            "id": res.result,
            "gourpId": RoleId
          },
           success: function (res) {

            if (res.data.data == "") {

              wx.showToast({
                title: '二维码信息错误',
                icon: 'none'
              })
              return false;
            }

            if (RoleId == 1) {

              wx.request({
                url: 'https://www.jinlingjiankang.com/nursingms/wechat/visit/checkCode',
                data: {
                  "id": codeId
                },
                 success: function (res) {

                  if (res.data.code == 0) {
                    wx.showToast({
                      title: '不是有效的安保部门二维码',
                      icon: 'none'
                    })

                  } else if (res.data.code == 1) {

                    wx.request({
                      url: 'https://www.jinlingjiankang.com/nursingms/wechat/attention/oldCount',
                      data: {
                        "userId": loginId
                      },
                       success: function (res) {

                        if (res.data.count <= 0) {

                          wx.showToast({
                            title: '您尚未关注老人',
                            icon: 'none'
                          })
                          setTimeout(function () {
                            wx.navigateTo({
                              url: '../addold/addold?codeId='+codeId
                            })
                          }, 1000) //延迟时间 这里是1秒   


                        } else {

                          wx.navigateTo({
                            url: '../visit/visit?codeId='+codeId
                          })

                        }

                      }
                    })


                  }
                }
              })
            } else if (RoleId == 2) {


            } else if (RoleId == 3) {

              var oldId = res.data.data[0].id
              wx.navigateTo({
                url: '../out/out?id=' + oldId
              })

            } else if (RoleId == 4 || RoleId == 5 || RoleId == 6 || RoleId == 7 || RoleId == 9) {

              var oldId = res.data.data[0].id
              wx.navigateTo({
                url: '../security/security?id=' + oldId
              })

            }else if(RoleId == 0){

              wx.request({
                url: 'https://www.jinlingjiankang.com/nursingms/wechat/visit/checkCode',
                data: {
                  "id": codeId
                },
                success:function(res){

                  if(res.data.code == 0){

                    wx.showToast({
                      title: '不是有效的二维码',
                      icon: 'none'
                    })

                  }else if(res.data.code == 1){

                    wx.navigateTo({
                      url: '../realname/realname?id=' + loginId+"&codeId="+codeId,
                    })

                  }

                }
              })




            }

          }
        })

      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/banner',
       success: function (res) {
        console.log(res.data.data)

        that.setData({
          banner: res.data.data
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
       success: function (res) {
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          
          data: {
            code: res.code
          },
          success(res) {
            console.log(res)
            loginId = res.data[0].ID;
            RoleId = res.data[0].groupId;
           
           




            that.setData({ 
              group:RoleId,
              accessment: res.data[0].ROLE_ID
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

  }

})