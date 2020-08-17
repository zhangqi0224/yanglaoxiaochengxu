// pages/home/home.js
const app = getApp()
var serchone = "";
var serchtwo = "";
var serchthree= "";
var LVL = 1;
var roomStatus = 2;
var specialStatus =1;
var BulidID = "";
var FloorId = "";
var RoomId  = "";
var page = 1;
var limit = 5;

Page({

  /**
   * 页面的初始数据
   */

  data: {
    selected1: true,
    selected2: false,
    selected3: false,
    selected4: false,
    special1: true,
    special2: false,
    special3: false,
    state:"",
    roomRegion:"",
    roomType:"",
    arr:[],
    floorindex: '',
    storiedindex: 0,
    testname:"",
    testid:"",
    floorname:"",
    floorid:"",
    roomname:"",
    roomid:"",
    homeindex: '',
  },
  special1: function (e) {
    this.setData({
      special1: true,
      special2: false,
      special3: false,
    })
  },
  special2: function (e) {
    this.setData({
      special1: false,
      special2: true,
      special3: false,
    })
    specialStatus = 2
  },
  special3: function (e) {
    this.setData({
      special1: false,
      special2: false,
      special3: true,
   
    })
    specialStatus = 3
  },
  selected1: function (e) {
    this.setData({
      selected1: true,
      selected2: false,
      selected3: false,
      selected4: false,
    })
  },
  selected2: function (e) {
    this.setData({
      selected1: false,
      selected2: true,
      selected3: false,
      selected4: false,
    })
    roomStatus = 2
  },
  selected3: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false,
    })
    roomStatus = 4
  },
  selected4: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true,
    })
    roomStatus = 0
  },
  //确定楼栋
  bindPickerStoried(e) {
    var that = this;
    var florrarr = [];
    var florridarr = [];
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      storiedindex: e.detail.value
    })
    BulidID = serchone[e.detail.value];
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/selectfloor',
      data:{
        "id":BulidID
      },
      success:function(res){
        console.log(res)
        for (let i = 0; i < res.data[0].length; ++i) {
          florrarr[i] = res.data[1][i];
          florridarr[i] = res.data[0][i];
        }
        serchtwo = florridarr;
        that.setData({
          floorname: florrarr,
          floorid: florridarr
        })
      }
    })

  },
  //确定楼层
  bindPickerChange(e) {
    var that = this;
    var roomarr = [];
    var roomidarr = [];
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      floorindex: e.detail.value
    })
    console.log(serchtwo);
    FloorId = serchtwo[e.detail.value];
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/selectroom',
      data:{
        "id":FloorId
      },
      success:function(res)
      {
        console.log(res)
        for (let i = 0; i < res.data[0].length; ++i) {
          roomarr[i] = res.data[1][i];
          roomidarr[i] = res.data[0][i];
        }
        serchthree = roomidarr;
        that.setData({
          rooname: roomarr,
          rooid: roomidarr
        })
      }
    })
  },
  //确定房间
  bindPickerHome(e){



    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      homeindex: e.detail.value
    })
    RoomId = serchthree[e.detail.value]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var arr = [];
    var idarr = [];
    var roomarr = [];
    var roomidarr = [];
    var florrarr = [];
    var florridarr = [];
  //获取楼栋
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/selectbuild',
      success:function(res){
        for (let i = 0; i < res.data[0].length; ++i) {
          arr[i] = res.data[1][i]['BUILD_NAME'];
          idarr[i] = res.data[0][i]['ID'];
        }
        serchone = idarr;
        console.log(that)
        that.setData({
          testname:arr,
          testid:idarr
        })
        BulidID = res.data[0][0]['ID']
        wx.request({
          url: 'https://www.jinlingjiankang.com/nursingms/wechat/bed/selectfloor',
          data: {
            "id": BulidID
          },
           success: function (res) {
            console.log(res)
            for (let i = 0; i < res.data[0].length; ++i) {
              florrarr[i] = res.data[1][i];
              florridarr[i] = res.data[0][i];
            }
            serchtwo = florridarr;
            that.setData({
              floorname: florrarr,
              floorid: florridarr
            })
          }
        })
      }
    })
  },
  // 点击搜索
  serchall: function () {
    var id = "";
    // console.log(roomStatus)
    // console.log(specialStatus)
    // console.log(BulidID)
    // console.log(FloorId)
    // console.log(RoomId)
    if (FloorId ==''){
      LVL = 1;
      id = BulidID;
    } else if (RoomId ==''){
      LVL = 2;
      id = FloorId;
    }else{
      LVL = 3;
      id = RoomId;
    }
    console.log(LVL)
    console.log(id)
    wx.navigateTo({
      url: 'searchresult/searchresult?roomStatus=' + roomStatus + "&specialStatus=" + specialStatus + "&id=" + id +"&LVL="+LVL,
    })
 
  },
 
// 点击重置
reset:function(){
  this.setData({
    special1: true,
    floorindex: '',
    storiedindex: 0, 
    homeindex: ''
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    LVL = 1 ;

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    LVL = 1;

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    LVL = 1;

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