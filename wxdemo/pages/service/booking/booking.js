// pages/security/monitor/monitor.js
var userid;
var oldID;
var style = '';
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
var time = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: "",
    endDate: "",
    multiArray: [
      ['今天', '明天', '3-2', '3-3', '3-4', '3-5'],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 10, 20]
    ],
    multiIndex: [0, 0, 0],
    valuearray: ['预约参观', '预约评估'],
    nativePlace: ['自理', '半自理', '不能自理'],
    incomeindex: '',
    income: ['3000以下', '3000-5000', '6000-10000', '10000以上'],
    nativePlaceindex: '',
    index: '',
    valuearrayone: false,
    valuearraytwo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    oldID = options.id;

  },
  bindPickerChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    style = e.detail.value;
    if (style == 0) {
      that.setData({
        valuearrayone: true,
        valuearraytwo: false
      })

    } else if (style == 1) {
      that.setData({
        valuearraytwo: true,
        valuearrayone: false
      })

    }
    this.setData({
      index: e.detail.value
    })
  },
  bindPickernativePlaceChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nativePlaceindex: e.detail.value
    })
  },
  bindPickerincomeChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      incomeindex: e.detail.value
    })
  },
  tj: function (e) {

    console.log(e)

    if (style == '') {

      wx.showToast({
        title: '请确认内容填充完整',
        icon: 'none'
      })

      return false;

    } else if (style == 0) {

      if (e.detail.value.oldName == '' || e.detail.value.oldPhone == '' || e.detail.value.oldAge == '' || e.detail.value.selfCareAbility == '' || e.detail.value.nativePlace == '' || e.detail.value.addr == '' || e.detail.value.income == '' || e.detail.value.childrenName == '' || e.detail.value.childrenPhone == '' || e.detail.value.visitTime == '' || e.detail.value.visitNumber == '') {

        wx.showToast({
          title: '请确认内容填充完整',
          icon: 'none'
        })

        return false;

      }else if(e.detail.value.remark == ''){

        e.detail.value.remark = '/';
      }
      //预约参观
      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms/wechat/order/addvisit',
        data: {
          oldName:e.detail.value.oldName,
          oldPhone:e.detail.value.oldPhone,
          oldAge:e.detail.value.oldAge,
          selfCareAbility:e.detail.value.selfCareAbility,
          nativePlace:e.detail.value.nativePlace,
          addr:e.detail.value.addr,
          income:e.detail.value.income,
          childrenName:e.detail.value.childrenName,
          childrenPhone:e.detail.value.childrenPhone,
          visitTime:e.detail.value.visitTime,
          visitNumber:e.detail.value.visitNumber,
          remark:e.detail.value.remark
        },
         success: function (res) {

          console.log(res)
          if(res.data.code == 1){

            wx.showToast({
              title: '预约信息提交成功',
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
    } else if (style == 1) {

      if (e.detail.value.oldName == '' || e.detail.value.oldPhone == '' || e.detail.value.oldAge == '' || e.detail.value.selfCareAbility == '' ||e.detail.value.childrenName == '' || e.detail.value.childrenPhone == '' || e.detail.value.assessmentTime == '') {

        wx.showToast({
          title: '请确认内容填充完整',
          icon: 'none'
        })

        return false;

      }else if(e.detail.value.remark == ''){

        e.detail.value.remark = '/';
      }

      //预约评估
      wx.request({
        url: 'https://www.jinlingjiankang.com/nursingms//wechat/order/addassessment',
        data:{
          oldName:e.detail.value.oldName,
          oldPhone:e.detail.value.oldPhone,
          oldAge:e.detail.value.oldAge,
          selfCareAbility:e.detail.value.selfCareAbility,
          childrenName:e.detail.value.childrenName,
          childrenPhone:e.detail.value.childrenPhone,
          assessmentTime:e.detail.value.assessmentTime,
          remark:e.detail.value.remark
        },
        success:function(res){

          if(res.data.code == 1){

            wx.showToast({
              title: '预约信息提交成功',
              icon: 'none'
            })

            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
             }, 1000) //延迟时间 这里是1秒

          }

          console.log(res)

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

  },
  pickerTap: function () {
    date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },
  pickerTaps: function () {
    date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },



  bindMultiPickerColumnChange: function (e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },
  bindMultiPickerColumnChanges: function (e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function (hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = month + "-" + day;
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "-" + date1.getDate();

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "-" + day;
    }

    var year = date.getFullYear();

    var startDate = year + "-" + monthDay + " " + hours + ":" + minute;
    that.setData({
      startDate: startDate
    })
  },
  bindStartMultiPickerChanges: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = month + "-" + day;
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "-" + date1.getDate();

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "-" + day;
    }

    var year = date.getFullYear();

    var startDate = year + "-" + monthDay + " " + hours + ":" + minute;
    that.setData({
      endDate: startDate
    })
  }
})