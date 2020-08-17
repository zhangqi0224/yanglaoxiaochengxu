var time = require('../../utils/util.js');
var mid;
var RoleId;
var openId;
var openIdtwo;
var token;
var oldName;
var oldId;
var valuetext;
var nowTime
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
       success: function (res) {
        if(res.data == ""){
          wx.showToast({
            title: '二维码信息错误',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000) //延迟时间 这里是1秒

          return false;

        }
        console.log(res.data[0].OLD_STATUS)

        if (res.data[0].OLD_STATUS == 4 || res.data[0].OLD_STATUS == 5) {

          that.setData({

            status: true
          })

        } else if (res.data[0].OLD_STATUS == 0) {

          that.setData({
            status: false
          })
        } else {

          wx.showToast({
            title: '当前老人状态错误',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000) //延迟时间 这里是1秒

        }
        that.setData({
          array: res.data,
        })

        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].createDate = time.toDay(res.data[i].createDate)
          }
          that.setData({
            array: res.data
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
    var that = this;
    wx.login({
       success: function (res) {
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {

            that.setData({
              group: res.data[0].groupId
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

  },
/*老人通知*/
  registerFormSubmit: function (e) {

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 

    nowTime = Y + '年'  + M+ '月' + D+ '日';
    console.log(e);

    oldName = e.detail.value.oldName;
    oldId = e.detail.value.id;
    if(e.detail.value.OLD_STATUS == 4||e.detail.value.OLD_STATUS == 5){

      valuetext = "老人:" + oldName + "已经离开园区";

    }else{

      valuetext = "老人:" + oldName + "已经进入园区";
    }
    

/**/
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/old/changestatus',
      data:{
        id:oldId
      },
      success: function (user) {
        


        if (user.data.length > 0) {

          openId = user.data[0]
          openIdtwo = user.data[1]

          wx.request({
            url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/token',
             success: function (res) {
              token = res.data.access_token
              wx.request({
                url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + res.data.access_token,
                method: "POST",
                data: {
                  "touser": openId,
                  "template_id": "f3IAq6nvdq7y4oibjwg_JkXijdIvHcPxj4bt053jG84",
                  "page": "index/index",
                  "data": {

                    "thing1": {
                      "value": valuetext
                    },
                    "time2": {
                      "value": nowTime
                    }

                  },

                },
                 success: function (res) {
                  wx.request({
                    url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/token',
                     success: function (res) {
                      wx.request({
                        url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + token,
                        method: "POST",
                        data: {
                          "touser": openIdtwo,
                          "template_id": "f3IAq6nvdq7y4oibjwg_JkXijdIvHcPxj4bt053jG84",
                          "page": "index/index",
                          "data": {

                            "thing1": {
                              "value": valuetext
                            },
                            "time2": {
                              "value": nowTime
                            }

                          },

                        },
                         success: function (res) {


                        },

                      })




                    }
                  })

                },

              })




            }
          })
        }

        wx.showToast({
          title: '操作成功',
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
         }, 1000) //延迟时间 这里是1秒


      }
    })









  },
})