//app.js
App({
  login:function(){
    wx.login({
      success: function (res) {
        console.log(res)
        wx.request({
          url: 'http://192.168.126.215/nursingms/wechat/main/login',
          data: {
            code: res.code
          },
          success(res) {
            console.log(res.data.msg)
           
          }
        })

      }
    })
  },

  loginData:function(){
    this.login
  },
})