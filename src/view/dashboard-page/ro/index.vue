<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" :decimals="infor.decimals" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <div ref="dom" style="height: 310px;"></div>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import echarts from 'echarts'
import { getBugDensityData } from '@/api/data'
import { on, off } from '@/libs/tools'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar
  },
  data () {
    return {
      inforCardData: [
        { title: '新增工时', icon: 'md-person-add', count: 803.164, decimals: 2, color: '#2d8cf0' },
        { title: '累计工时', icon: 'md-locate', count: 232, decimals: 2, color: '#19be6b' },
        { title: '缺陷数量', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '数据统计', icon: 'md-share', count: 657, color: '#ed3f14' }
      ],
      pieData: [
        { value: 335, name: '正常工时' },
        { value: 310, name: '计算工时' },
        { value: 234, name: 'BUG占用工时' },
        { value: 135, name: '修复工时' },
        { value: 1548, name: '需求工时' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      },
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    renderData (data) {
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
          data: ['BUG数量', '工作量', 'BUG密度']
        },
        xAxis: [
          {
            type: 'category',
            data: data.sprint_name,
            splitLine: {
              show: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',
            splitLine: {// 不显示分割线
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
            data: data.bug_counts,
            color: '#ff9900'
          },
          {
            name: '工作量',
            type: 'bar',
            data: data.story_points,
            color: '#19be6b'
          },
          {
            name: 'BUG密度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1, // 索引从0开始
            data: data.bug_density,
            color: '#2d8cf0'
          }
        ]
      }
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom)
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  mounted () {
    getBugDensityData().then(res => {
      this.renderData(res.data)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
