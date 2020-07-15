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
          <h3 class="title">用户访问来源</h3>
          <chart-pie style="height: 300px;" :value="pieData"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow v-if="barLineData1">
          <h3 class="title">{{bugDensityByWeekTrunkData.title}}</h3>
          <chart-custom style="height: 300px;" :option="barLineData1"></chart-custom>
        </Card>
      </i-col>
    </Row>
    <Row v-if="barLineData2">
      <Card shadow>
        <h3 class="title">{{bugDensityByWeekStudioData.title}}</h3>
        <chart-custom style="height: 330px;" :option="barLineData2"></chart-custom>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar, ChartCustom } from '_c/charts'
import { getReopenRate, getOnlineBugCycle, getLevelByWeeks, getBugDensityBySprintTrunk, getBugDensityBySprintStudio, getBugDensityByWeekTrunk, getBugDensityByWeekStudio } from '@/api/data'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    ChartCustom
  },
  data () {
    return {
      reopenRateData: null,
      onlineBugCycleData: null,
      levelByWeeksData: null,
      bugDensityBySprintTrunkData: null,
      bugDensityBySprintStudioData: null,
      bugDensityByWeekTrunkData: null,
      bugDensityByWeekStudioData: null,
      inforCardData: [
        { title: '****', icon: 'md-person-add', count: 0, decimals: 2, color: '#2d8cf0' },
        { title: '****', icon: 'md-locate', count: 0, decimals: 2, color: '#19be6b' },
        { title: '****', icon: 'md-help-circle', count: 0, decimals: 2, color: '#ff9900' },
        { title: '****', icon: 'md-share', count: 0, decimals: 2, color: '#ed3f14' }
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
      barLineData1: null,
      barLineData2: null
    }
  },
  watch: {
    reopenRateData (data) {
      this.inforCardData[0].title = data.title
      this.inforCardData[0].count = data.latest[data.latest.length - 1].split('%')[0] - 0
    },
    onlineBugCycleData (data) {

    },
    levelByWeeksData (data) {

    },
    bugDensityBySprintTrunkData (data) {
      this.inforCardData[3].title = data.title
      this.inforCardData[3].count = data.latest[data.latest.length - 1]
    },
    bugDensityBySprintStudioData (data) {

    },
    bugDensityByWeekTrunkData (data) {
      this.barLineData1 = this.rebuildData(data)
    },
    bugDensityByWeekStudioData (data) {
      this.barLineData2 = this.rebuildData(data)
    }
  },
  methods: {
    getInitData () {
      Promise.all([
        getReopenRate(),
        getOnlineBugCycle(),
        getLevelByWeeks(),
        getBugDensityBySprintTrunk(),
        getBugDensityBySprintStudio(),
        getBugDensityByWeekTrunk(),
        getBugDensityByWeekStudio()
      ]).then(res => {
        console.log(res)
        this.reopenRateData = res[0].data
        this.onlineBugCycleData = res[1].data
        this.levelByWeeksData = res[2].data
        this.bugDensityBySprintTrunkData = res[3].data
        this.bugDensityBySprintStudioData = res[4].data
        this.bugDensityByWeekTrunkData = res[5].data
        this.bugDensityByWeekStudioData = res[6].data
      }).catch(err => {
        console.log(err)
      })
    },
    rebuildData (data) {
      const yTitles = data.columns.splice(1, data.columns.length - 1)
      const xValues = []
      const yValues = []
      const colors = ['#2d8cf0', '#1bbe6a', '#ff9901', '#e46cbb']
      yTitles.forEach((item, index) => {
        if (index === yTitles.length - 1) {
          yValues.push({
            name: item,
            type: 'line',
            smooth: true,
            yAxisIndex: 1, // 索引从0开始
            data: [],
            color: colors[colors.length - 1]
          })
        } else {
          yValues.push({
            name: item,
            type: 'bar',
            data: [],
            color: colors[index]
          })
        }
      })
      data.data.forEach(item => {
        xValues.push(item[0])
        for (let i = 0; i < yValues.length; i++) {
          yValues[i].data.push(item[i + 1])
        }
      })
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
          data: yTitles
        },
        xAxis: [
          {
            type: 'category',
            data: xValues,
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
        series: yValues
      }
      return option
    }
  },
  mounted () {
    this.getInitData()
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}

.title {
  text-align: center;
  margin-bottom: 16px;
  color: #516a91;
}
</style>
