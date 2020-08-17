// pages/service/consultation/consultation.js
var relationshipNum = "";
var sex = "";
var oldsex = "";
var intentionNum = "";
var mid;
var userId;
var oldId = [];
var Old;
var Group3Id;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    relationship: ['母女', '母子', '父女', '父子'],
    index: "",
    oldArray: "",
    oldIndex: ""


  },
  bindPickerChange(e) {
    var that = this;
    relationshipNum = Number(e.detail.value)+1;
    this.setData({
      index: e.detail.value
    })


  },
  bindPickerChangeold(e) {

    var that = this;
    Old = oldId[e.detail.value];
    console.log(Old)
    this.setData({
      oldIndex: e.detail.value
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    Group3Id = options.codeId

    var that = this;

    wx.login({
       success: function (res) {
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {
            userId = res.data[0].ID;

            if (userId) {

              wx.request({
                url: 'https://www.jinlingjiankang.com/nursingms/wechat/attention/findOldList',
                data: {
                  "userId": userId
                },
                 success: function (res) {

                  oldId = res.data[0]

                  that.setData({

                    oldArray: res.data[1]


                  })


                }
              })


            }


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

  },
  tj: function (e) {


    wx.login({
       success: function (res) {
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {

            mid = res.data[0].ID


            wx.request({
              url: 'https://www.jinlingjiankang.com/nursingms/wechat/visit/add',
              data: {
                "userId": Group3Id,
                "oldId": Old,
                "visitName": e.detail.value.visitName,
                "phone": e.detail.value.phone,
                "visitReason": e.detail.value.visitReason,
                "remarks": e.detail.value.remarks,
                "relation": relationshipNum
              },
               success: function (res) {

                if (res.data.code == 1) {

                  wx.showToast({
                    title: '登记成功',
                    icon: 'none'
                  })
                  setTimeout(function () {
                    
                    wx.switchTab({
                      url: '../service/service'
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