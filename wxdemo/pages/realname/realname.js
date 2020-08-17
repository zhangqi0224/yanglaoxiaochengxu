// pages/healthy/add/add.js
var id;
var codeId
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
    codeId = options.codeId
  //获取用户ID
    wx.login({
      success: function(res) {
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          header: {
             'content-type':'application/json;charset=iso-8859-1'
            },
          success(res) {
            id = res.data[0].ID
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
   * 认证提交
   */
  authentication:function(e){

    console.log(id)


    if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {

      wx.showToast({
      
      title: '姓名有误',
      
      duration: 2000,
      
      icon: 'none'
      
      });
      
      return false;
      
      }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e.detail.value.cardNo))) {

      wx.showToast({
      
      title: '身份证号码有误',
      
      duration: 2000,
      
      icon: 'none'
      });

      return false;
      
      }
      console.log("a")
     wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/check',
       data:{
         "id":id,
         "name":e.detail.value.name,
         "cardNo":e.detail.value.cardNo,
       },
       success:function(res){

        if(res.data.code == 1){
          wx.showToast({
            title: '信息认证成功',
            icon: 'none'
          })
          setTimeout(function () {
           
            wx.navigateTo({
              url: '../addold/addold?id='+id+"&codeId="+codeId,
            })



           }, 1000) //延迟时间 这里是1秒          
        }else if(res.data.code == 0){
          wx.showToast({
            title: '实名信息已经认证',
            icon: 'none'
          })
          setTimeout(function () {
           
            wx.navigateTo({
              url: '../addold/addold?id='+id+"&codeId="+codeId,
            })



           }, 1000) //延迟时间 这里是1秒  

        }

       }
     })
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