// pages/security/monitor/monitor.js
var userid;
var oldID;
var OLD_STATUS;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StoolCondition:['正常','便秘','腹泻'],
    StoolConditionIndex:"",
    MedicationCompliance:['规律','间断','不服药'],
    MedicationComplianceindex:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    oldID = options.id;
    OLD_STATUS = options.OLD_STATUS;
    console.log(options)

  },
  tj:function(e){
    if(e.detail.value.testRate == ''){

      wx.showToast({
        title: '测量频率不能为空',
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
              url: 'https://www.jinlingjiankang.com/nursingms/wechat/elderlyDailyMonitoring/add',
              data:{
                "userId":userid,
                "oldId":oldID,
                "testRate":e.detail.value.testRate,
                "systolicPressure":e.detail.value.systolicPressure,
                "diastolicPressure":e.detail.value.diastolicPressure,
                "heartRate":e.detail.value.heartRate,
                "breathing":e.detail.value.breathing,
                "temperature":e.detail.value.temperature,
                "bloodSugar":e.detail.value.bloodSugar,
                "afterBloodSugar":e.detail.value.afterBloodSugar,
                "stoolCondition":e.detail.value.stoolCondition,
                "medicationCompliance":e.detail.value.medicationCompliance,
                "remark":e.detail.value.remark,
                "OLD_STATUS":OLD_STATUS
              },
              success:function(res){
          
                if(res.data.code == 1){
                  wx.showToast({
                    title: '记录提交成功',
                    icon: 'none'
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1,
                    })
                   }, 1000) //延迟时间 这里是1秒
          
                }else if(res.data.code == 0){

                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }
          
              }
            })
            

          }
        })

      }
    })
  },
  bindPickerStoolCondition: function (e) {
    var that = this;

    that.setData({
      StoolConditionIndex: e.detail.value,
    })
  },
  bindPickerMedicationCompliance: function (e) {
    var that = this;

    that.setData({
      MedicationComplianceindex: e.detail.value,
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