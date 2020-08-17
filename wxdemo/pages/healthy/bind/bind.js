// pages/healthy/bind/bind.js
var user;
var type;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: [{
        title: '工作人员',
        id: '1'
      },
      {
        title: '园内老人',
        id: '2'
      }
    ],
    index: '',



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
       success: function (res) {
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {
            user = res.data[0].ID
            console.log(user)
          }
        })
      }
    })

  },
  bindPickerChange: function (e) {
    var index = e.detail.value;
    type = e.detail.value;
    var that = this;
    that.setData({
      index: e.detail.value,
    })
    if (type == 0) {
      that.setData({
        older: false,
        emp: true
      })

    } else if (type == 1) {
      that.setData({
        older: true,
        emp: false
      })
    }
  },
  bind: function (e) {
    console.log(user)
    console.log(e)

    if (type == 0) {
      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/emp',
        data: {
          id: user,
          userName: e.detail.value.username,
          password: e.detail.value.password
        },
         success: function (res) {
          console.log(res)

          if (res.data[0].code == 0) {

            wx.showToast({
              title: '您输入的认证信息不正确',
              icon: 'none'
            })

          } else if (res.data[0].code == 1) {

            wx.showToast({
              title: '绑定成功',
              icon: 'none'
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
             }, 1000) //延迟时间 这里是1秒

          }

          console.log(res.data[0].code)

        }
      })


    } else if (type == 1) {
      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/older',
        data: {
          id: user,
          oldName: e.detail.value.oldName,
          idCardNo: e.detail.value.idCardNo
        },
         success: function (res) {

          if (res.data[0].code == 0) {

            wx.showToast({
              title: '您输入的认证信息不正确',
              icon: 'none'
            })

          } else if (res.data[0].code == 1) {
            wx.showToast({
              title: '绑定成功',
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