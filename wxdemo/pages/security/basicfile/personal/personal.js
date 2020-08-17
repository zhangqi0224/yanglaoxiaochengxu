// pages/security/basicfile/personal/personal.js
var dressing = "";
var washing1 = "";
var washing2 = "";
var washing3 = "";
var washing4 = "";
var washing5 = "";
var washing6 = "";
var undress = "";
var userid;
var oldID;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dressing: ['协助穿衣', '帮助穿衣'],
    washing1: ['协助洗漱', '帮助洗漱', '帮助口腔护理'],
    washing2: ['协助中餐前洗手/饭后漱口', '帮助中餐前洗手/饭后漱口'],
    washing3: ['协助晚餐前洗手/饭后漱口 ', '帮助晚餐前洗手/饭后漱口'],
    washing4: ['协助洗/泡脚 ', '帮助洗/泡脚'],
    washing5: ['协助洗漱', '帮助洗漱', '清洗/浸泡义齿'],
    washing6: ['协助清洗下体/会阴部', '帮助清洗下体/会阴部', '协助擦身', '帮助擦身'],
    undress: ['协助脱衣', '帮助脱衣'],
    washing1index: '',
    washing2index: '',
    washing3index: '',
    washing4index: '',
    washing5index: '',
    washing6index: '',
    undressindex: '',
    dressingindex: '',

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
  /*提交数据*/
  tj: function () {

    if (dressing == "" && washing1 == "" && washing2 == "" && washing3 == "" && washing4 == "" && washing5 == "" && washing6 == "" & undress == "") {


      wx.showToast({
        title: '不能提交空数据记录',
        icon: 'none'
      })

      return false;
    }

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

            userid = res.data[0].ID;
            wx.request({
              url: 'https://www.jinlingjiankang.com/nursingms/wechat/careNursingRecord/add',
              data: {
                "userId": userid,
                "oldId": oldID,
                "dressing": dressing,
                "washing1": washing1,
                "washing2": washing2,
                "washing3": washing3,
                "washing4": washing4,
                "washing5": washing5,
                "washing6": washing6,
                "undress": undress
              },
                    header: {

        
             'content-type':'application/json;charset=iso-8859-1'
        
        },
      success: function (res) {

                if (res.data.code == 1) {
                  wx.showToast({
                    title: '提交成功',
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
  },
  /*picker数据*/
  bindPickerDressing(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    dressing = Number(e.detail.value) + 2
    this.setData({
      dressingindex: e.detail.value
    })
  },
  bindPickerWashing1(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    washing1 = Number(e.detail.value) + 2
    this.setData({
      washing1index: e.detail.value
    })
  },
  bindPickerWashing2(e) {
    var that = this;
    washing2 = Number(e.detail.value) + 2
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      washing2index: e.detail.value
    })
  },
  bindPickerWashing3(e) {
    var that = this;
    washing3 = Number(e.detail.value) + 2
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      washing3index: e.detail.value
    })
  },
  bindPickerWashing4(e) {
    var that = this;
    washing4 = Number(e.detail.value) + 2
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      washing4index: e.detail.value
    })
  },
  bindPickerWashing5(e) {
    washing5 = Number(e.detail.value) + 2
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      washing5index: e.detail.value
    })
  },
  bindPickerWashing6(e) {
    washing6 = Number(e.detail.value) + 1
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      washing6index: e.detail.value
    })
  },
  bindPickerUndress(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    undress = Number(e.detail.value) + 2
    this.setData({
      undressindex: e.detail.value
    })
  },




})