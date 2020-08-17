// pages/service/consultation/consultation.js
var relationshipNum = "";
var sex = "";
var oldsex = "";
var intentionNum = "";
var mid;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    relationship: ['母女', '母子','父女','父子'],
    oldsex: ['男', '女'],
    intention: ['是', '否'],
    intentionindex:"",
    index:"",
    sexindex:"",
    oldsexindex:""


  },
  bindPickerChange(e) {
    var that = this;
   
    this.setData({
      index: e.detail.value
    })

    relationshipNum = Number(e.detail.value)+1;
    console.log(relationshipNum);
  },
  bindPickerChangesex(e) {
    var that = this;
   
    this.setData({
      sexindex: e.detail.value
    })

    sex = Number(e.detail.value)+1;
    console.log(sex);
  },
  bindPickerChangeoldsex(e) {
    var that = this;
   
    this.setData({
      oldsexindex: e.detail.value
    })

    oldsex = Number(e.detail.value)+1;
    console.log(oldsex);
  },
  bindPickerChangeintention(e) {
    var that = this;
   
    this.setData({
      intentionindex: e.detail.value
    })

    intentionNum = Number(e.detail.value)+1;
    console.log(intentionNum);
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
  tj:function(e){

    console.log(e)
    console.log(relationshipNum)
    console.log(sex)
    console.log(oldsex)
    
    if(e.detail.value.name == ''||relationshipNum == ''||e.detail.value.oldName == ''||oldsex == ''||intentionNum== ''||e.detail.value.selfCare == ''||e.detail.value.oldAge == ''){
      wx.showToast({
        title: '请确认信息填充完整',
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

            mid = res.data[0].ID


            wx.request({
              url: 'https://www.jinlingjiankang.com/nursingms//wechat/consult/add',
              data:{
                "userId":mid,
                "name":e.detail.value.name,
                "relationship":relationshipNum,
                "oldName":e.detail.value.oldName,
                "oldSex":oldsex,
                "intentio":intentionNum,
                "selfCare":e.detail.value.selfCare,
                "oldAge":e.detail.value.oldAge,
                "phone":e.detail.value.phone
              },
              success:function(res){

              if(res.data.code == 1){

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





  }
})