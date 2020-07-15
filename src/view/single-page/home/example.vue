<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      legend: {
        selectedMode: false, // 不可点击
        data: ['BUG数量', '工作量', '工作质量', 'BUG密度']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          splitLine: {
            show: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '数量',
          splitLine: { // 不显示分割线
            show: false
          },
          axisLabel: {
            formatter: '{value} 个'
          }
        },
        {
          type: 'value',
          name: '密度',
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'BUG数量',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          color: '#ff9900'
        },
        {
          name: '工作量',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
          color: '#19be6b'
        },
        {
          name: '工作质量',
          type: 'bar',
          data: [1.6, 3.9, 9.0, 36.4, 28.7, 80.7, 175.6, 82.2, 98.7, 38.8, 6.0, 2.3],
          color: '#ed3f14'
        },
        {
          name: 'BUG密度',
          type: 'line',
          yAxisIndex: 1, // 索引从0开始
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          color: '#2d8cf0'
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
