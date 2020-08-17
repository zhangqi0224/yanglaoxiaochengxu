import * as echarts from '../../../ec-canvas/echarts';

const app = getApp();

function setOption(chart) {
  const option = {
    xAxis: {
      type: 'category',
      data: ['8点', '9点', '10点', '11点', '12点', '13点', '14点']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [90,90 , 89,88, 92, 95, 110],
      type: 'line',
      smooth: true
    }]
  };
  chart.setOption(option);
}
function setOptions(one) {
  const option = {
    xAxis: {
      type: 'category',
      data: ['8', '9点', '10点', '11点', '12点', '13点', '14点']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [157, 132, 138, 141, 140, 134, 151],
      type: 'line',
      smooth: true
    }]
  };
  one.setOption(option);
}

Page({

  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
  },

  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    econe: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposeds: false
  },

  // 点击按钮后初始化图表
  init: function () {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  demo: function () {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOptions(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  }
});
