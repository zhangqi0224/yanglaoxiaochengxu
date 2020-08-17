// pages/security/diagnosis/diagnosis.js
var userid;
var oldID;
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
    oldID = options.id;

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

  },
  tj: function (e) {
    if (e.detail.value.content == '') {

      wx.showToast({
        title: '巡诊记录不能为空',
        icon: 'none'
      })

      return false;


    }

    wx.login({
       success: function (res) {

        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {

            userid = res.data[0].ID;
            wx.request({
              url: 'https://www.jinlingjiankang.com/nursingms/wechat/carePatrolRecord/add',
              data: {
                "userID": userid,
                "oldId": oldID,
                "content": e.detail.value.content
              },
               success: function (res) {

                if (res.data.code == 1) {
                  wx.showToast({
                    title: '巡诊记录提交成功',
                    icon: 'none'
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }, 1000) //延迟时间 这里是1秒

                }

              }
            })

          }
        })

      }
    })





  }
})