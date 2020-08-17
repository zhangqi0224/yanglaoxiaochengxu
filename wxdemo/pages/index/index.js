import * as echarts from '../../ec-canvas/echarts';
var dataList = [];
var datatwolist = [];
Page({
  data: {
    ecBar: {
      lazyLoad: true // 延迟加载
    },
    ecScatter: {
      lazyLoad: true // 延迟加载
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.echartsComponnet = that.selectComponent('#mychart');

    that.echartsComponnets = that.selectComponent('#mycharttwo');

    that.getData(); //获取数据
    that.getDatatwo();


  },

  getData: function () {
    var that = this;
    /**
     * 此处的操作：
     * 获取数据json
     */
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/getReasonCount',
      success: function (res) {

        dataList = res.data;

        that.init_echarts(); //初始化图表
      }
    })
  },
  getDatatwo: function () {
    var that = this;
    /**
     * 此处的操作：
     * 获取数据json
     */
    wx.request({
      url: 'https://www.jinlingjiankang.com/nursingms/wechat/main/countdate',
      success: function (res) {

        datatwolist = res.data;

        that.inittwo_echarts(); //初始化图表
      }
    })
  },
  //初始化图表
  init_echarts: function () {
    var that = this;
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(that.getBarOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  //初始化图表
  inittwo_echarts: function () {
    var that = this;
    that.echartsComponnets.init((canvas, width, height) => {
      // 初始化图表
      const Charts = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Charts.setOption(that.getScatterOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Charts;
    });
  },
  getBarOption: function () {

    console.log(dataList)
    return {
      title: {
        text: '养老院概况',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}人"
      },
      series: [{
        name: '',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: dataList,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
  },
  getScatterOption: function () {


    var axisCommon = {
      axisLabel: {
        textStyle: {
          color: '#C8C8C8'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#C8C8C8'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#C8C8C8',
          type: 'solid'
        }
      }
    };

    return {
      title: {
        text: '本周入住人数',
        x: 'center'
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '入住人数：',
        type: 'bar',
        barWidth: '60%',
        data: datatwolist
      }]
    }
  },

  onReady() {}
});